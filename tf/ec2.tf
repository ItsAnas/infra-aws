variable "pm2_key" {}
variable "mongo_initdb_database" {}
variable "mongo_root_username" {}
variable "mongo_root_password" {}
variable "mongo_address" {}

variable "instance_count" {
  default = "2"
}

resource "aws_key_pair" "ssh-key" {
  key_name   = "ssh-key"
  public_key = file("~/.ssh/id_rsa.pub")
}

resource "aws_instance" "epitweet_front" {
  count         = var.instance_count
  ami           = "ami-0d3f551818b21ed81"
  instance_type = "t2.micro"

  key_name = "ssh-key"

  tags = {
    Name = "Epitweet-Front-${count.index + 1}"
  }

  user_data = templatefile("${path.module}/deploy.sh", {
    pm2_key = var.pm2_key,
    mongo_initdb_database = var.mongo_initdb_database,
    mongo_root_username = var.mongo_root_username,
    mongo_root_password = var.mongo_root_password,
    mongo_address = var.mongo_address
  })
}
