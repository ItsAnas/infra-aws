resource "aws_subnet" "epitweet_subnet_1" {
  vpc_id                  = aws_default_vpc.epitweet_vpc.id
  cidr_block              = "172.31.255.0/26"
  map_public_ip_on_launch = "true"
  availability_zone       = "eu-west-3a"
}

resource "aws_subnet" "epitweet_subnet_2" {
  vpc_id                  = aws_default_vpc.epitweet_vpc.id
  cidr_block              = "172.31.255.64/26"
  map_public_ip_on_launch = "true"
  availability_zone       = "eu-west-3b"
}

resource "aws_subnet" "epitweet_subnet_3" {
  vpc_id                  = aws_default_vpc.epitweet_vpc.id
  cidr_block              = "172.31.255.128/26"
  map_public_ip_on_launch = "true"
  availability_zone       = "eu-west-3c"
}
