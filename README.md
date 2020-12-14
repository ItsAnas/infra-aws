# infra-aws
🐦⏹ Simple Twitter replica hosted on AWS

## Terraform

You first must define some environnement variables:

```bash
42sh~ export TF_VAR_pm2_key="your pm2 bucket key" # Ask someone
42sh~ export TF_VAR_public_ip="your public ip" # used to access ec2(s) in ssh
42sh~ export TF_VAR_mongo_initdb_database="the name of the database" # used for access database
42sh~ export TF_VAR_mongo_root_username="username of the database" # used for access database
42sh~ export TF_VAR_mongo_root_password="the password of the database" # used for access database
42sh~ export TF_VAR_mongo_address="the ip of the database" # used for access database
```

TODO:

[X] - Try to deploy two instance of ec2

[X] - Run backend along with frontend in EC2

[X] - Use `user_data` instead of `remote_exec`

[X] - Put `user_data` in shell script


[X] - Add EC2 in different AZ, for that, create two public subnet as resources in our VPC, assign those subnet to our EC2
    => https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/instance#subnet_id

[X] - Add 2 EC2 with mongo database and replication (in same AZs as EC2)

[X] - Add ELB between EC2s and DB (Done with mongoose)

[X] - Add auto scaling group for our front/back EC2s

// Bonuses / Cleaning

[ ] - Only autorize 8080 and 5000 from our ELB security group (cidr_blocks for 8080 and 5000 should be 172.31.0.0/16)

[ ] - Remove ssh from security group (today it is useful for debug, but it's not a good practice)
