resource "aws_elb" "epitweet_elb_client" {
  name               = "epitweet-elb-client"
  availability_zones = ["eu-west-3a", "eu-west-3b", "eu-west-3c"]


  listener {
    instance_port     = 8080
    instance_protocol = "http"
    lb_port           = 80
    lb_protocol       = "http"
  }

  health_check {
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 3
    target              = "HTTP:8080/"
    interval            = 30
  }

  cross_zone_load_balancing   = true
  idle_timeout                = 400
  connection_draining         = true
  connection_draining_timeout = 400

  tags = {
    Name = "epitweet-elb-client"
  }
}

resource "aws_elb" "epitweet_elb_server" {
  name               = "epitweet-elb-server"
  availability_zones = ["eu-west-3a", "eu-west-3b", "eu-west-3c"]


  listener {
    instance_port     = 5000
    instance_protocol = "http"
    lb_port           = 80
    lb_protocol       = "http"
  }

  health_check {
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 3
    target              = "TCP:5000"
    interval            = 30
  }

  cross_zone_load_balancing   = true
  idle_timeout                = 400
  connection_draining         = true
  connection_draining_timeout = 400

  tags = {
    Name = "epitweet-elb-server"
  }
}
