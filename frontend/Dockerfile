# ---- Build Stage ----
FROM node:21-alpine AS build

WORKDIR /app

# Copiar dependencias e instalarlas
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Generar build de producción
RUN npm run build


# ---- Runtime Stage ----
FROM nginx:alpine

# Copiar el build generado al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar un archivo de configuración de Nginx (opcional, para SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto de Nginx
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
