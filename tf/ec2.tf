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

  connection {
    type = "ssh"
    host = self.public_ip
    user = "ubuntu"
    private_key = file("~/.ssh/id_rsa")
  }

  provisioner "remote-exec" {
    inline = [
      "curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -",
      "echo 'deb https://dl.yarnpkg.com/debian/ stable main' | sudo tee /etc/apt/sources.list.d/yarn.list",
      "sudo apt -y update && sudo apt install -y yarn nodejs docker.io docker-compose",
      "git clone https://github.com/ItsAnas/infra-aws.git",
      "cd infra-aws",
      "git checkout deploy-p2",

      "export REACT_APP_BASE_API_URL='http://${self.public_ip}:5000'",
      "export PATH=\"$PATH:$(yarn global bin)\"",
      "export API_ADDRESS='0.0.0.0'",
      "cd client",
      "yarn install && yarn build",
      "yarn global add pm2 serve",
      "pm2 link ${var.pm2_key}",
      "pm2 serve build/ 8080 --name 'Epitweet front' --spa",

      "cd ../back/",
      "yarn install",
      "echo MONGO_INITDB_DATABASE=${var.mongo_initdb_database} >> .env",
      "echo MONGO_INITDB_ROOT_USERNAME=${var.mongo_root_username} >> .env",
      "echo MONGO_INITDB_ROOT_PASSWORD=${var.mongo_root_password} >> .env",
      "echo MONGO_ADDRESS=${var.mongo_address} >> .env",
      "sudo docker-compose up --build -d",
      "pm2 start src/index.js --name 'Epitweet back'"
    ]
  }
}
