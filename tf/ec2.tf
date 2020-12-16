variable "pm2_key" {}
variable "mongo_initdb_database" {}
variable "mongo_root_username" {}
variable "mongo_root_password" {}
variable "mongo_address" {}
variable "mongo_replica_set_name" {
  default = "epitweet-replica-set"
}
variable "mongo_private_addresses" {
  default = [
    "172.31.255.5",
    "172.31.255.6",
    "172.31.255.7"
  ]
}

data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}


resource "aws_launch_template" "epitweet_ec2_client" {
  name_prefix = "epitweet-"
  # image_id      = "ami-0d3f551818b21ed81"
  image_id      = data.aws_ami.ubuntu.id
  instance_type = "t2.micro"

  key_name = "ssh-key"

  user_data = base64encode(templatefile("${path.module}/deploy_client.sh", {
    pm2_key     = var.pm2_key,
    api_address = aws_elb.epitweet_elb_server.dns_name
  }))

  tags = {
    Name = "epitweet-client"
  }
}

resource "aws_launch_template" "epitweet_ec2_server" {
  name_prefix = "epitweet-"
  # image_id      = "ami-0d3f551818b21ed81"
  image_id      = data.aws_ami.ubuntu.id
  instance_type = "t2.micro"

  key_name = "ssh-key"

  user_data = base64encode(templatefile("${path.module}/deploy_server.sh", {
    pm2_key                = var.pm2_key,
    mongo_initdb_database  = var.mongo_initdb_database,
    mongo_root_username    = var.mongo_root_username,
    mongo_root_password    = var.mongo_root_password,
    mongo_replica_set_name = var.mongo_replica_set_name,
    mongo_address          = var.mongo_address
  }))

  tags = {
    Name = "epitweet-server"
  }
}

resource "aws_network_interface" "epitweet_db_network_interface_0" {
  subnet_id   = aws_subnet.epitweet_subnet.id
  private_ips = [var.mongo_private_addresses[0]]
  tags = {
    Name = "primary_network_interface_0"
  }
}

resource "aws_network_interface" "epitweet_db_network_interface_1" {
  subnet_id   = aws_subnet.epitweet_subnet.id
  private_ips = [var.mongo_private_addresses[1]]
  tags = {
    Name = "primary_network_interface_1"
  }
}

resource "aws_network_interface" "epitweet_db_network_interface_2" {
  subnet_id   = aws_subnet.epitweet_subnet.id
  private_ips = [var.mongo_private_addresses[2]]
  tags = {
    Name = "primary_network_interface_2"
  }
}

resource "aws_instance" "epitweet_ec2_db_1" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t2.micro"
  key_name      = "ssh-key"

  network_interface {
    network_interface_id = aws_network_interface.epitweet_db_network_interface_0.id
    device_index         = 0
  }

  user_data = base64encode(templatefile("${path.module}/deploy_db.sh", {
    pm2_key                = var.pm2_key,
    mongo_initdb_database  = var.mongo_initdb_database,
    mongo_root_username    = var.mongo_root_username,
    mongo_root_password    = var.mongo_root_password,
    mongo_replica_set_name = var.mongo_replica_set_name,
    mongo_address          = var.mongo_address,
    is_primary             = "true",
    private_address        = var.mongo_private_addresses[0],
    members                = join("\n", [var.mongo_private_addresses[1], var.mongo_private_addresses[2]])
  }))

  tags = {
    Name = "db_instance"
  }
}

resource "aws_instance" "epitweet_ec2_db_2" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t2.micro"
  key_name      = "ssh-key"

  network_interface {
    network_interface_id = aws_network_interface.epitweet_db_network_interface_1.id
    device_index         = 0
  }

  user_data = base64encode(templatefile("${path.module}/deploy_db.sh", {
    pm2_key                = var.pm2_key,
    mongo_initdb_database  = var.mongo_initdb_database,
    mongo_root_username    = var.mongo_root_username,
    mongo_root_password    = var.mongo_root_password,
    mongo_replica_set_name = var.mongo_replica_set_name,
    mongo_address          = var.mongo_address,
    is_primary             = "false",
    private_address        = var.mongo_private_addresses[1],
    members                = ""
  }))

  tags = {
    Name = "db_instance_2"
  }
}

resource "aws_instance" "epitweet_ec2_db_3" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t2.micro"
  key_name      = "ssh-key"

  network_interface {
    network_interface_id = aws_network_interface.epitweet_db_network_interface_2.id
    device_index         = 0
  }

  user_data = base64encode(templatefile("${path.module}/deploy_db.sh", {
    pm2_key                = var.pm2_key,
    mongo_initdb_database  = var.mongo_initdb_database,
    mongo_root_username    = var.mongo_root_username,
    mongo_root_password    = var.mongo_root_password,
    mongo_replica_set_name = var.mongo_replica_set_name,
    mongo_address          = var.mongo_address,
    is_primary             = "false",
    private_address        = var.mongo_private_addresses[2],
    members                = ""
  }))

  tags = {
    Name = "db_instance_3"
  }
}
