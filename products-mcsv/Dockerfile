# ---- Build Stage ----
FROM node:21-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .

# ---- Runtime Stage ----
FROM node:21-alpine
WORKDIR /app
COPY --from=build /app .
EXPOSE 4000
CMD ["node", "index.js"]
