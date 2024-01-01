```sh
docker build -t c121914yu/test . --network host  --build-arg name=app --build-arg HTTP_PROXY=http://127.0.0.1:7890 --build-arg HTTPS_PROXY=http://127.0.0.1:7890
```