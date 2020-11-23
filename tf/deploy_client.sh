#!/bin/bash

# Fetch everything
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo 'deb https://dl.yarnpkg.com/debian/ stable main' | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt -y update && sudo apt install -y yarn
git clone https://github.com/ItsAnas/infra-aws.git
cd infra-aws
git checkout deploy-p2

# Env variables
api_address=${api_address}
export REACT_APP_BASE_API_URL="http://$api_address"
export PATH="$PATH:$(yarn global bin)"

# Client serve
cd client
yarn install && yarn build
yarn global add pm2 serve
pm2 link ${pm2_key}
pm2 serve build/ 8080 --name 'Epitweet front'
