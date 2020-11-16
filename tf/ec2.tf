variable "pm2_key" {}

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
      "sudo apt -y update && sudo apt install -y yarn",
      "git clone https://github.com/ItsAnas/infra-aws.git",
      "cd infra-aws",
      "git checkout deploy-p2",
      "cd client",
      "yarn install && yarn build",
      "export PATH=\"$PATH:$(yarn global bin)\"",
      "yarn global add pm2",
      "yarn global add serve",
      "pm2 link ${var.pm2_key}",
      "pm2 serve build/ 8080 --name 'Epitweet' --spa"
    ]
  }
}
