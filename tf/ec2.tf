variable "pm2_key" {}
variable "mongo_initdb_database" {}
variable "mongo_root_username" {}
variable "mongo_root_password" {}
variable "mongo_address" {}


resource "aws_key_pair" "ssh-key" {
  key_name   = "ssh-key"
  public_key = file("~/.ssh/id_rsa.pub")
}

resource "aws_launch_template" "epitweet_ec2" {
  name_prefix   = "epitweet-"
  # image_id      = "ami-0d3f551818b21ed81"
  image_id        = data.aws_ami.ubuntu.id
  instance_type = "t2.micro"

  key_name = "ssh-key"

  user_data = base64encode(templatefile("${path.module}/deploy.sh", {
    pm2_key               = var.pm2_key,
    mongo_initdb_database = var.mongo_initdb_database,
    mongo_root_username   = var.mongo_root_username,
    mongo_root_password   = var.mongo_root_password,
    mongo_address         = var.mongo_address
  }))
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

resource "aws_subnet" "my_subnet" {
  vpc_id                  = aws_default_vpc.epitweet_vpc.id
  cidr_block              = "172.31.255.0/24"
  map_public_ip_on_launch = "true"
}

resource "aws_network_interface" "epitweet_db_network_interface" {
  subnet_id   = aws_subnet.my_subnet.id
  private_ips = ["172.31.255.5"]
  tags = {
    Name = "primary_network_interface"
  }
}

resource "aws_instance" "epitweet_ec2_db_1" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t2.micro"
  key_name      = "ssh-key"

  network_interface {
    network_interface_id = aws_network_interface.epitweet_db_network_interface.id
    device_index         = 0
  }

  user_data = base64encode(templatefile("${path.module}/deploy_db.sh", {
    pm2_key               = var.pm2_key,
    mongo_initdb_database = var.mongo_initdb_database,
    mongo_root_username   = var.mongo_root_username,
    mongo_root_password   = var.mongo_root_password,
    mongo_address         = var.mongo_address
  }))

  tags = {
    Name = "db_instance"
  }
}

#resource "aws_instance" "epitweet_ec2_db_2" {
#  ami           = data.aws_ami.ubuntu.id
#  instance_type = "t2.micro"
#  key_name      = "ssh-key"
#}

#resource "aws_instance" "epitweet_ec2_db_3" {
#  ami           = data.aws_ami.ubuntu.id
#  instance_type = "t2.micro"
#  key_name      = "ssh-key"
#}


#resource "aws_launch_template" "epitweet_ec2_mongodb" {
#  name_prefix   = "epitweet-mongodb-"
#  image_id      = "ami-0d3f551818b21ed81"
#  instance_type = "t2.micro"
#
#  key_name = "ssh-key"
#
#  user_data = base64encode(templatefile("${path.module}/deploy_db.sh", {
#    pm2_key               = var.pm2_key,
#    mongo_initdb_database = var.mongo_initdb_database,
#    mongo_root_username   = var.mongo_root_username,
#    mongo_root_password   = var.mongo_root_password,
#    mongo_address         = var.mongo_address
#  }))
#}
