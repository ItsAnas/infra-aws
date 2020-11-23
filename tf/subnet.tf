resource "aws_subnet" "epitweet_subnet" {
  vpc_id                  = aws_default_vpc.epitweet_vpc.id
  cidr_block              = "172.31.255.0/24"
  map_public_ip_on_launch = "true"
}
