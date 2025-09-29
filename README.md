# Proyecto de Microservicios con Kubernetes

Este proyecto implementa una arquitectura basada en microservicios que incluye:
- **auth-mcsv**: Microservicio de autenticación (Spring Boot, Java 17, Maven).
- **products-mcsv**: Microservicio de gestión de productos (Node.js, Express, TypeScript).
- **frontend**: Aplicación web desarrollada con Vite + React para la interfaz de usuario.
- **k8s**: Archivos de configuración para el despliegue de los servicios en un clúster de Kubernetes.

## 📁 Estructura del Proyecto

```bash
.
├── auth-mcsv/           # Servicio de autenticación (Spring Boot)
├── products-mcsv/       # Servicio de productos (Node.js + TypeScript)
├── frontend/            # Aplicación frontend (Vite + React)
├── k8s/                 # Archivos YAML para despliegue en Kubernetes
└── README.md            # Documentación del proyecto
```

---

## Microservicios

### 1. **auth-mcsv**

* **Tecnologías:** Java 17, Spring Boot, Maven
* **Base de datos:** MySQL
* **Funciones principales:**

  * Registro e inicio de sesión de usuarios.
  * Gestión de tokens de autenticación (JWT).
  * Exposición de endpoints REST para autenticación.

#### Dockerfile

El microservicio se construye y ejecuta con Maven:

```dockerfile
# Etapa de compilación
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Etapa de ejecución
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

---

### 2. **products-mcsv**

* **Tecnologías:** Node.js, Express, TypeScript
* **Base de datos:** MySQL
* **Funciones principales:**

  * CRUD de productos (crear, leer, actualizar y eliminar).
  * Endpoints REST para integrar con el frontend.

#### Endpoints

| Método | Ruta            | Descripción                 |
| ------ | --------------- | --------------------------- |
| GET    | `/products`     | Obtiene todos los productos |
| POST   | `/products`     | Agrega un nuevo producto    |
| PUT    | `/products/:id` | Actualiza un producto       |
| DELETE | `/products/:id` | Elimina un producto         |

#### Dockerfile

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm install
COPY src ./src
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm install --omit=dev
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

---

### 3. **frontend**

* **Tecnologías:** React, Vite
* **Funciones principales:**

  * Panel de administración con CRUD de productos.
  * Interfaz moderna con estilos tipo **Gemini UI/UX**.

#### Dockerfile

```dockerfile
# Etapa de construcción
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa de ejecución
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## Despliegue en Kubernetes

Todos los manifiestos YAML se encuentran en la carpeta `k8s/`.

### Archivos principales

* `auth-deployment.yml`
* `products-deployment.yml`
* `frontend-deployment.yml`
* `mysql-deployment.yml` (si se usa una base de datos interna)
* `services.yml` (Services para exponer los Pods)
* `ingress.yml` (para enrutar tráfico HTTP)

### Ejemplo de Deployment (products-mcsv)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: products-mcsv
spec:
  replicas: 2
  selector:
    matchLabels:
      app: products-mcsv
  template:
    metadata:
      labels:
        app: products-mcsv
    spec:
      containers:
      - name: products-mcsv
        image: your-dockerhub-user/products-mcsv:latest
        ports:
        - containerPort: 3000
        env:
        - name: DB_HOST
          value: mysql-products
        - name: DB_USER
          value: root
        - name: DB_PASS
          value: root
        - name: DB_NAME
          value: shopdb
---
apiVersion: v1
kind: Service
metadata:
  name: products-service
spec:
  selector:
    app: products-mcsv
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: ClusterIP
```

---

## Pasos para el Despliegue

1. **Construir y subir imágenes Docker**

```bash
docker build -t your-dockerhub-user/auth-mcsv ./auth-mcsv
docker build -t your-dockerhub-user/products-mcsv ./products-mcsv
docker build -t your-dockerhub-user/frontend ./frontend

docker push your-dockerhub-user/auth-mcsv
docker push your-dockerhub-user/products-mcsv
docker push your-dockerhub-user/frontend
```

2. **Aplicar los manifiestos de Kubernetes**

```bash
kubectl apply -f k8s/
```

3. **Verificar el estado**

```bash
kubectl get pods
kubectl get services
```

4. **Acceder a la aplicación**

* Si usas **Minikube**:

```bash
minikube service frontend-service
```

* Si usas un clúster con Ingress configurado, acceder mediante el dominio definido.

---

## Flujo de la Aplicación

1. El usuario accede al **frontend**.
2. El **frontend** consume los endpoints REST de **products-mcsv** y **auth-mcsv**.
3. Ambos microservicios se comunican con sus propias bases de datos MySQL.
4. Kubernetes gestiona la escalabilidad y disponibilidad de los Pods.
