eval $(minikube docker-env)

# Auth
cd auth-mcsv
docker build -t auth-mcsv:latest .

# Products
cd ../products-mcsv
docker build -t products-mcsv:latest .

# Deploy in Kubernetes
kubectl rollout restart deployment auth-mcsv
kubectl rollout restart deployment products-mcsv

# View URL
minikube service auth-mcsv --url
minikube service products-mcsv --url

# Aplicar manifiestos
kubectl apply -f k8s/auth-mcsv-deployment.yaml
kubectl apply -f k8s/auth-mysql-deployment.yaml
kubectl apply -f k8s/mysql-deployment.yaml
kubectl apply -f k8s/products-mcsv-deployment.yaml

# Frontend
docker build -t frontend:latest .
kubectl apply -f k8s/frontend-deployment.yaml

# Exponer temporalemente puertos
kubectl port-forward svc/auth-mysql 3307:3306
kubectl port-forward svc/mysql 3306:3306
