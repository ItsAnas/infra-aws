output "elb_dns_name_client" {
  value = aws_elb.epitweet_elb_client.dns_name
}

output "elb_dns_name_server" {
  value = aws_elb.epitweet_elb_server.dns_name
}
