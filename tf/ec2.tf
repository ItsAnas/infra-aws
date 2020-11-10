resource "aws_key_pair" "ssh-key" {
  key_name   = "ssh-key"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCxdADhnj+abYnskBuVTF2LETxq+Kmic5WnmNfUApdwJOlKLxrxHWUXxvFcgiGgoue5zize2jWx7Ahm8ZAANm4kR5nJFa5FFYbUnjG3ZYjjcQKk0KH6aCfDmKnkJrqrJjyHGORYrJmZvGCy/wpIATxPAO5CMq28I0O8S8H7yjJcrkfrBkHj+eCMO1kx/CC4HbbrvR4kKarqQyQFnTCmYma+XzWwE+u366juMonp0B3MBNRVvOFzWt0SrZnhudqf+/OBsesA8tSSDOOcZI1DoaOeL+s/qyZRHHa11QYv8xHAJWPexFbaZWdcNKIUvKxdUodUQu6NIwo/hKEoTZS4t21x zenor@Antoines-MacBook-Pro.local"
}

resource "aws_instance" "epitweet_front" {
  ami           = "ami-0d3f551818b21ed81"
  instance_type = "t2.micro"

  key_name = "ssh-key"

  tags = {
    Name = "Epitweet-Front"
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
      "git checkout client",
      "cd client",
      "yarn install && yarn build",
      "export PATH=\"$PATH:$(yarn global bin)\"",
      "yarn global add pm2",
      "yarn global add serve",
      "pm2 link p2kkuueniv4less 5oxrfb8w4rqtn0s",
      "pm2 serve build/ 8080 --name 'Epitweet' --spa"
    ]
  }
}
