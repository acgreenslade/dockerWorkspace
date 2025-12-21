# React
FROM node:25-alpine AS build-stage
WORKDIR /app/client
COPY client/package*.json ./
RUN npm clean-install
COPY client/ ./
RUN npm run build

# Express
FROM node:25-alpine
WORKDIR /app/server
COPY server/package*.json ./
RUN npm clean-install --only=production
COPY server/ ./

COPY --from=build-stage /app/client/build /app/client/build

# Run app
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "index.js"]
