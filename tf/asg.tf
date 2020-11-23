resource "aws_autoscaling_group" "epitweet_asg_client" {
  availability_zones = ["eu-west-3a", "eu-west-3b", "eu-west-3c"]
  desired_capacity   = 2
  max_size           = 2
  min_size           = 2

  launch_template {
    id      = aws_launch_template.epitweet_ec2_client.id
    version = "$Latest"
  }

  load_balancers = [aws_elb.epitweet_elb_client.id]

  tags = [
    {
      key                 = "Name"
      value               = "Epitweet-client"
      propagate_at_launch = true
    },
  ]
}

resource "aws_autoscaling_group" "epitweet_asg_server" {
  availability_zones = ["eu-west-3a", "eu-west-3b", "eu-west-3c"]
  desired_capacity   = 2
  max_size           = 2
  min_size           = 2

  launch_template {
    id      = aws_launch_template.epitweet_ec2_server.id
    version = "$Latest"
  }

  load_balancers = [aws_elb.epitweet_elb_server.id]

  tags = [
    {
      key                 = "Name"
      value               = "Epitweet-server"
      propagate_at_launch = true
    },
  ]

  depends_on = [
    aws_instance.epitweet_ec2_db_1,
  ]
}
