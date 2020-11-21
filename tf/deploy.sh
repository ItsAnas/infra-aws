#!/bin/bash

# Fetch everythinh
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo 'deb https://dl.yarnpkg.com/debian/ stable main' | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt -y update && sudo apt install -y yarn nodejs docker.io docker-compose
git clone https://github.com/ItsAnas/infra-aws.git
cd infra-aws
git checkout deploy-p2

# Env variables
export REACT_APP_BASE_API_URL="http://$(dig +short myip.opendns.com @resolver1.opendns.com):5000"
export PATH="$PATH:$(yarn global bin)"
export API_ADDRESS='0.0.0.0'

# Client serve
cd client
yarn install && yarn build
yarn global add pm2 serve
pm2 link ${pm2_key}
pm2 serve build/ 8080 --name 'Epitweet front' --spa

# Server serve
cd ../back/
yarn install
echo MONGO_INITDB_DATABASE=${mongo_initdb_database} >> .env
echo MONGO_INITDB_ROOT_USERNAME=${mongo_root_username} >> .env
echo MONGO_INITDB_ROOT_PASSWORD=${mongo_root_password} >> .env
echo MONGO_ADDRESS=${mongo_address} >> .env
sudo docker-compose up --build -d
pm2 start src/index.js --name 'Epitweet back'

