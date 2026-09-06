---
title: Manually Update MongoDB for FastGPT Docker Deployments
slug: /en/deploy/fastgpt-docker-mongo-manual-update
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/468
source_type: 官方文档
---

# Manually Update MongoDB for FastGPT Docker Deployments

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Manually Update MongoDB for FastGPT Docker Deployments

This document outlines the manual update process for MongoDB when self-hosting FastGPT via Docker, to configure the database with authenticated replica set mode required for proper FastGPT operation.

## Modified MongoDB Service Configuration
Edit the `mongo` service block in your existing `docker-compose.yml` file to incorporate the following configuration. Ensure the placeholder values for `MONGO_INITDB_ROOT_USERNAME` and `MONGO_INITDB_ROOT_PASSWORD` match your existing MongoDB root credentials, and replace the `myusername` and `mypassword` strings in the entrypoint script with the same credentials:
```yml
mongo:
  image: mongo:5.0.18
  # image: registry.cn-hangzhou.aliyuncs.com/fastgpt/mongo:5.0.18 # Alibaba Cloud
  container_name: mongo
  ports:
    - 27017:27017
  networks:
    - fastgpt
  command: mongod --keyFile /data/mongodb.key --replSet rs0
  environment:
    # Make sure the password matches your previous configuration
    - MONGO_INITDB_ROOT_USERNAME=username
    - MONGO_INITDB_ROOT_PASSWORD=password
  volumes:
    - ./mongo/data:/data/db
  entrypoint:
    - bash
    - -c
    - |
      openssl rand -base64 128 > /data/mongodb.key
      chmod 400 /data/mongodb.key
      chown 999:999 /data/mongodb.key
      echo 'const isInited = rs.status().ok === 1
      if(!isInited){
        rs.initiate({
            _id: "rs0",
            members: [
                { _id: 0, host: "mongo:27017" }
            ]
        })
      }' > /data/initReplicaSet.js
      # Start MongoDB service
      exec docker-entrypoint.sh "$@" &

      # Wait for MongoDB to start
      until mongo -u myusername -p mypassword --authenticationDatabase admin --eval "print('waited for connection')" > /dev/null 2>&1; do
        echo "Waiting for MongoDB to start..."
        sleep 2
      done

      # Run the replica set initialization script
      mongo -u myusername -p mypassword --authenticationDatabase admin /data/initReplicaSet.js

      # Wait for the MongoDB process started by docker-entrypoint.sh
      wait $!
```

## Restart MongoDB Service
Apply the updated configuration by restarting the MongoDB container with these commands:
```bash
# Restart Mongo container with updated settings
docker-compose down
docker-compose up -d
```
This sequence stops all services defined in the compose file, then recreates the MongoDB container with the updated settings. The entrypoint script automates several critical setup steps: generating a secure 128-character base64 MongoDB key file, setting restrictive file permissions, initializing the `rs0` replica set if not already active, and waiting for the database to fully start before finalizing container startup.

## Key Configuration Details
The modified configuration includes the following core parameters.
- Container image: `mongo:5.0.18`, with an optional Alibaba Cloud registry mirror (`registry.cn-hangzhou.aliyuncs.com/fastgpt/mongo:5.0.18`) for regional access
- Port mapping: Exposes port `27017` for external MongoDB connections
- Replica set configuration: Enabled via the `command` field with replica set name `rs0`
- Persistent storage: Maps local `./mongo/data` directory to retain MongoDB data across container restarts
- Automated setup: The `entrypoint` script handles key file generation, permission configuration, replica set initialization, and startup readiness checks to eliminate manual intervention.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/468)
