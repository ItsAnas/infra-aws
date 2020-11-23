resource "aws_autoscaling_group" "epitweet_asg" {
  availability_zones = ["eu-west-3a", "eu-west-3b", "eu-west-3c"]
  desired_capacity   = 2
  max_size           = 2
  min_size           = 2

  launch_template {
    id      = aws_launch_template.epitweet_ec2.id
    version = "$Latest"
  }

  load_balancers = [aws_elb.epitweet_elb.id]
}
