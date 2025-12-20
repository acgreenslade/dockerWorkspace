FROM node:22-alpine

WORKDIR /app

# Docker layer caching
COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
