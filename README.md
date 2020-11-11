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

[ ] - Allow list of public ips as environnement variable to allow multiple ssh access
[ ] - Try to deploy two instance of ec2

Questions:

* May be we should have a common private/public ssh key ?
* May be it is better to use `user_data` with a local script instead of `remote_exec` ?
