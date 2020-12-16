output "elb_dns_name_client" {
  value = aws_elb.epitweet_elb_client.dns_name
}

output "elb_dns_name_server" {
  value = aws_elb.epitweet_elb_server.dns_name
}

output "db_instance_public_dns_1" {
  value = "ssh ubuntu@${aws_instance.epitweet_ec2_db_1.public_dns}"
}

output "db_instance_public_dns_2" {
  value = "ssh ubuntu@${aws_instance.epitweet_ec2_db_2.public_dns}"
}

output "db_instance_public_dns_3" {
  value = "ssh ubuntu@${aws_instance.epitweet_ec2_db_3.public_dns}"
}
