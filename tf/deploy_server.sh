#!/bin/bash

# Fetch everything
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo 'deb https://dl.yarnpkg.com/debian/ stable main' | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt -y update && sudo apt install -y yarn nodejs
git clone https://github.com/ItsAnas/infra-aws.git
cd infra-aws
git checkout deploy-p2

# Env variables
export PATH="$PATH:$(yarn global bin)"
export API_ADDRESS='0.0.0.0'

# Server serve
cd back/
yarn install
yarn global add pm2
pm2 link ${pm2_key}
echo MONGO_INITDB_DATABASE=${mongo_initdb_database} >> .env
echo MONGO_INITDB_ROOT_USERNAME=${mongo_root_username} >> .env
echo MONGO_INITDB_ROOT_PASSWORD=${mongo_root_password} >> .env
echo MONGO_ADDRESS=${mongo_address} >> .env
pm2 start src/index.js --name 'Epitweet back'

