---
title: Resolve Failed FastGPT Mongo Replica Set Auto-Initialization
slug: /en/deploy/fastgpt-mongo-replica-set-fix
page_type: 部署场景
source: https://doc.fastgpt.cn/en/self-host/deploy/docker
source_type: 官方文档
---

# Resolve Failed FastGPT Mongo Replica Set Auto-Initialization

## Auto-Initialization Failure Causes
Official FastGPT Docker Compose deployments include fully automated MongoDB replica set initialization, validated on Ubuntu 20, Ubuntu 22, CentOS 7, WSL2, macOS, and Windows. If automated initialization does not complete successfully, the most common root cause is that the host CPU does not support AVX instructions. In this scenario, switch to the Mongo 4.x container image.

## Manual Replica Set Initialization Steps
Follow these exact steps to manually configure the MongoDB replica set:
1. Generate the secure replica set key file:
```bash
openssl rand -base64 756 > ./mongodb.key
chmod 600 ./mongodb.key
# Adjust file ownership: some systems use admin instead of root
chown 999:root ./mongodb.key
```
2. Update the mongo service definition in your docker-compose.yml:
Add the key file volume mount, update the MongoDB startup command, and set initial root credentials. The commented image lines include both the official and Alibaba Cloud mirror options for Mongo 5.0.18:
```yml
mongo:
  # image: mongo:5.0.18
  # image: registry.cn-hangzhou.aliyuncs.com/fastgpt/mongo:5.0.18 # Alibaba Cloud mirror
  container_name: mongo
  ports:
    - 27017:27017
  networks:
    - fastgpt
  command: mongod --keyFile /data/mongodb.key --replSet rs0
  environment:
    # Default root credentials, only active on first deployment
    - MONGO_INITDB_ROOT_USERNAME=myusername
    - MONGO_INITDB_ROOT_PASSWORD=mypassword
  volumes:
    - ./mongo/data:/data/db
    - ./mongodb.key:/data/mongodb.key
```
3. Restart all deployed services to apply changes:
```bash
docker compose down
docker compose up -d
```
4. Initialize the replica set within the running MongoDB container:
First confirm the mongo container is active, then open an interactive shell:
```bash
docker ps
docker exec -it mongo bash
```
Connect to the local MongoDB instance using your configured root credentials:
```bash
mongo -u myusername -p mypassword --authenticationDatabase admin
```
Run the replica set initialization command, then validate the setup:
```javascript
rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "mongo:27017" }
  ]
})
rs.status()
```
> Note: For external MongoDB access, add `directConnection=true` to your connection parameters. A successful `rs.status()` output confirms the replica set is operational.

## Post-Deployment Validation
After running the `rs.status()` command, confirm the output displays the `rs0` replica set with a healthy primary node. This confirms the manual replica set setup is complete and ready for FastGPT deployment.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/deploy/docker)
