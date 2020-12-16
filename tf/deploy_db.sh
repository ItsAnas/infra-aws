#!/bin/bash

set -Eeuo pipefail

# Fetch everything
git clone https://github.com/ItsAnas/infra-aws.git
cd infra-aws
git checkout deploy-p2

# Install mongodb
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Replica Set
REPLICA_SET_KEY='iWpQz9IvRkSJHiJT3R8JMJy4LsXCJCYG/zgBh/dpmKDiaElGyy6VgwzOLheNd+w1
irulAtGEbOlecV7LnXB81WfIPs/XJMeO+ZU19LFAnOrZbJX9lF+e2YbqUo7PAV77
NSbGSkcLbSh93KQeOxpsZU50MdLKeU9xvwCqtEtmD+d5rt7JKKB1jlL/WNhq5iDF
4nb5Df+H4y9lK4q1lPjzT2H3GNS0buJqH4ZePIEozFx8Ix9D4MQVaxEv6pWrxuSK
4tTxvVQACUlEnIM47CGmJktyt7sAjjRjGVDxeh152NYMA11lP8NbWB/wEz1bF3Zk
FX4Iw1MP736W0fHoO3CoxBQ7CElcp+GfEV0n2s56XRChhuFv/YpWErgLN+HX5wBC
CK8CD0NAfZypXDIQetrrWMi7bD7py+P7FJlay7pWH05uNbv5zKm/g68LT3cqO6Z+
1VkchoTsku85ed4Tsirf44NmZwUb+A35CQk7NLSBBIs8J502ZgaI4UJ6eQOo/0AO
uPpzPWGaXC1f+wjNhdUjk5cACS7ajb5RJku6ikfJwZXmzyXnAuKDyKaXQr9rlSzr
1rFLhE8nq904LqE5lq5sliA2hR87oQ5s+h2iehnU4wQTVG/W/LSCr9vUTKThllHY
z+H0a+R01JLryQB3mF9xAZ7OSruiAGFWGYhiekpkFhAhWwBBhYY76lHJxHlz2cGd
+IBh7fKg+Lz4wyYDnsKFmNGc2yso3wf/LORDhI+3+98+Ld+Z0zUk35YuMC76V9xx
dV9nYba9Bh4PjgubRdDmoHG+/aPokP3rdWFEZUfr3QQupW8iOmZF0OleV354xLEF
KXrBzq78PSW8UUoPRdkGb42hOVr6asxOSAm3y3p2zlKPPpj3Iw0hFLEFVK8yShzZ
5lLjutb8VFVEGPG8mhconOOnSFOI9SdNYHtC+JPSwwOZgOY3CPfZN+DOggPq8qYZ
shIo19qmv4nKf4CZE7L8whn9MoNO1NIoyA6KtR6XxqWZtxfL'

mkdir -p /opt/mongo
echo "$REPLICA_SET_KEY" > /opt/mongo/mongod-keyfile
chmod 400 /opt/mongo/mongod-keyfile
sudo chown mongodb:mongodb /opt/mongo/mongod-keyfile
sudo echo -e '\nreplication:\n  replSetName: ${mongo_replica_set_name}' >> /etc/mongod.conf
sudo echo -e '\nsecurity:\n  keyFile: /opt/mongo/mongod-keyfile' >> /etc/mongod.conf

# Remote connectivity
PRIVATE_ADDRESS="${private_address}"
sudo ufw allow from '0.0.0.0/0' to any port 27017
sudo sed -Ei "s/bindIp: .*/\\0,$PRIVATE_ADDRESS/" /etc/mongod.conf

# Services
sudo systemctl start mongod
sudo systemctl enable mongod

# Wait a little bit, mongo is starting...
sleep 30

# Start mongo
IS_PRIMARY="${is_primary}"
MONGO_INITDB_DATABASE="${mongo_initdb_database}"
MONGO_INITDB_ROOT_USERNAME="${mongo_root_username}"
MONGO_INITDB_ROOT_PASSWORD="${mongo_root_password}"
MONGO_ADDRESS="${mongo_address}"

# Wait a little bit, mongo is starting...
while ! mongo --eval "db.version()" > /dev/null 2>&1; do sleep 0.1; done

REPLICA_SET_MEMBERS="${members}"
if $IS_PRIMARY; then
    mongo --eval "rs.initiate()"
    mongo admin --eval 'db.createUser({ user: "admin", pwd: "admin", roles: [{ role: "root", db: "admin" }] })'
    mongo admin -u admin -p admin --eval "db.createUser({user: 'adminCluster', pwd: 'adminCluster', roles: [{role: 'clusterAdmin', db: 'admin'}]})"

    sudo echo "$REPLICA_SET_MEMBERS" > REEEEEE
    for MEMBER in $REPLICA_SET_MEMBERS; do
        mongo admin -u adminCluster -p adminCluster --eval "rs.add({ host: '$MEMBER' } )"
    done

    mongo -u admin -p admin --eval "db.auth('$MONGO_INITDB_ROOT_USERNAME', '$MONGO_INITDB_ROOT_PASSWORD'); db = db.getSiblingDB('$MONGO_INITDB_DATABASE'); db.createUser({ user: '$MONGO_INITDB_ROOT_USERNAME', pwd: '$MONGO_INITDB_ROOT_PASSWORD', roles: [{ role: 'readWrite', db: '$MONGO_INITDB_DATABASE' }] });"
else
    sleep 30
    mongo admin -u admin -p admin --eval 'slaveOk()'
fi
