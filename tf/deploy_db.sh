#!/bin/bash

# Fetch everythinh
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo 'deb https://dl.yarnpkg.com/debian/ stable main' | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt -y update && sudo apt install -y yarn nodejs docker.io docker-compose
git clone https://github.com/ItsAnas/infra-aws.git
cd infra-aws
git checkout deploy-p2

# Install mongodb
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Remote connectivity
sudo ufw allow from '0.0.0.0/0' to any port 27017
sudo sed -Ei 's/bindIp: .*/\0,172.31.255.5/' /etc/mongod.conf

# Services
sudo systemctl start mongod
sudo systemctl enable mongod

# Start mongo
MONGO_INITDB_DATABASE="${mongo_initdb_database}"
MONGO_INITDB_ROOT_USERNAME="${mongo_root_username}"
MONGO_INITDB_ROOT_PASSWORD="${mongo_root_password}"
MONGO_ADDRESS="${mongo_address}"
mongo --eval "db.auth('$MONGO_INITDB_ROOT_USERNAME', '$MONGO_INITDB_ROOT_PASSWORD'); db = db.getSiblingDB('$MONGO_INITDB_DATABASE'); db.createUser({ user: '$MONGO_INITDB_ROOT_USERNAME', pwd: '$MONGO_INITDB_ROOT_PASSWORD', roles: [{ role: 'readWrite', db: '$MONGO_INITDB_DATABASE' }] });"