Task Manager
A simple Node.js task management application deployed on a Kubernetes cluster using Helm and automated with a GitHub Actions CI/CD pipeline. The app uses MongoDB Atlas for data storage and is accessible via an NGINX Ingress controller.
Features

Create, read, update, and delete tasks.
RESTful API with endpoints like /api/tasks.
Frontend served from /public/index.html.
Deployed on Kubernetes with Helm for scalability.
CI/CD pipeline using GitHub Actions for automated builds and deployments.

Tech Stack

Backend: Node.js, Express.js
Database: MongoDB Atlas
Frontend: HTML, JavaScript
Containerization: Docker
Orchestration: Kubernetes (v1.32.4)
Deployment: Helm
CI/CD: GitHub Actions
Ingress: NGINX Ingress Controller

Prerequisites

Server: Ubuntu 22.04 with Docker and Kubernetes (v1.32.4) installed.
MongoDB Atlas: Account with a cluster and connection string.
GitHub Repository: Access to push code and manage secrets.
Helm: Installed on the server for manual deployments.
kubectl: Configured with access to the cluster.

Project Structure
task-manager/
├── helm/
│   └── task-manager/
│       ├── templates/
│       │   ├── deployment.yaml
│       │   ├── service.yaml
│       │   ├── ingress.yaml
│       │   └── secret.yaml
│       ├── Chart.yaml
│       ├── values.yaml
│       └── .helmignore
├── .github/
│   └── workflows/
│       └── build-deploy.yml
├── models/
│   └── Task.js
├── public/
│   ├── index.html
│   └── script.js
├── .dockerignore
├── .gitignore
├── Dockerfile
├── package.json
├── server.js
├── README.md

Setup Instructions
1. Configure MongoDB Atlas

Create a cluster in MongoDB Atlas.
Get the connection string (MONGO_URI), e.g., mongodb+srv://<user>:<password>@cluster0.mongodb.net/task-manager?....
Whitelist your server’s IP:curl ifconfig.me


Base64-encode the MONGO_URI:echo -n "<your-mongo-uri>" | base64 -w0



2. Set Up Kubernetes Cluster

SSH into your server:ssh <your-username>@147.182.198.18


Ensure containerd is configured with CRI enabled:sudo nano /etc/containerd/config.toml


Set disabled_plugins = [], systemd_cgroup = true, enable_unprivileged_ports = true, SystemdCgroup = true.


Initialize the cluster:sudo kubeadm init --pod-network-cidr=10.244.0.0/16 --cri-socket=unix:///run/containerd/containerd.sock --kubernetes-version=v1.32.4


Configure kubectl:mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config


Allow pods on the master node:kubectl taint nodes --all node-role.kubernetes.io/master- node-role.kubernetes.io/control-plane-


Install Flannel networking:kubectl apply -f https://raw.githubusercontent.com/flannel-io/flannel/master/Documentation/kube-flannel.yml


Install NGINX Ingress Controller:kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.0/deploy/static/provider/cloud/deploy.yaml


Install Helm:curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
chmod 700 get_helm.sh
./get_helm.sh



3. Configure GitHub Secrets

Base64-encode KUBECONFIG:cat ~/.kube/config | base64 -w0


Go to github.com/<your-username>/task-manager > Settings > Secrets and variables > Actions > Secrets.
Add:
KUBECONFIG: Base64-encoded ~/.kube/config.
MONGODB_URI: Base64-encoded MONGO_URI.
INGRESS_HOST: task-manager.local.



4. Deploy the App

Clone the repository locally:git clone https://github.com/<your-username>/task-manager.git
cd task-manager


Push changes to trigger the CI/CD pipeline:git add .
git commit -m "Deploy task-manager"
git push origin main


Monitor the pipeline in GitHub > Actions > “Build and Deploy”.

5. Access the App

Verify deployment:kubectl get pods -n task-manager
kubectl get svc -n task-manager
kubectl get ingress -n task-manager
helm list -n task-manager


Get the Ingress IP:kubectl get svc -n ingress-nginx ingress-nginx-controller


Update your local /etc/hosts:sudo echo "147.182.198.18 task-manager.local" >> /etc/hosts


Open http://task-manager.local in a browser or test:curl http://task-manager.local/api/tasks



Manual Deployment (Optional)

Create helm/task-manager/override.yaml:image:
  repository: ghcr.io/<your-username>/task-manager
  tag: latest
mongodb:
  uri: "<base64-encoded-mongo-uri>"
ingress:
  hosts:
    - host: task-manager.local
      paths:
        - path: /
          pathType: Prefix


Deploy:helm upgrade --install task-manager ./helm/task-manager \
  --namespace task-manager \
  --create-namespace \
  -f helm/task-manager/override.yaml \
  --wait --timeout 5m



Troubleshooting

Pipeline Fails:
Check GitHub Actions logs.
Verify KUBECONFIG and MONGODB_URI secrets.


Pods Not Running:kubectl describe pod -n task-manager -l app=task-manager
kubectl logs -n task-manager -l app=task-manager


Ingress Issues:kubectl describe ingress -n task-manager

