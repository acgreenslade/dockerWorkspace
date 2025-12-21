# Build
FROM node:25-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm clean-install
COPY . .
RUN npm run build

# Runtime
FROM nginx:alpine
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
