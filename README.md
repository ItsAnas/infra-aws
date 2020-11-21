# infra-aws
🐦⏹ Simple Twitter replica hosted on AWS

## Terraform

You first must define some environnement variables:

```
42sh~ export TF_VAR_pm2_key="your pm2 bucket key" # Ask someone
```

```
42sh~ export TF_VAR_public_ip="your public ip" # used to access ec2(s) in ssh
```

TODO:

[X] - Try to deploy two instance of ec2

[X] - Run backend along with frontend in EC2

[X] - Use `user_data` instead of `remote_exec`

[X] - Put `user_data` in shell script



[ ] - Add EC2 in different AZ, for that, create two public subnet as resources in our VPC, assign those subnet to our EC2
    => https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/instance#subnet_id

[ ] - Add 2 EC2 with mongo database and replication (in same AZs as EC2)

[ ] - Add ELB between EC2s and DB

[ ] - Add auto scaling group for our front/back EC2s

[ ] - Add ELB to our security_group ?

[ ] - Remove `8080` ingress port on security group ?

[ ] - Remove ssh from security group (today it is useful for debug, but it's not a good practice)

Questions:

* May be we should have a common private/public ssh key ?
* May be put a LoadBalancer in order to choose database if one is down

