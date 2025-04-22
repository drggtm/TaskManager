# node
docker login ghcr.io -u Username -p PAT

docker build -t ghcr.io/drggtm/nodeapp/demo:v1 .

docker push  ghcr.io/drggtm/nodeapp/demo:v1 .