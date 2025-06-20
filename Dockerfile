FROM node:18-alpine AS builder

WORKDIR /app

COPY ./dist ./dist
COPY package*.json ./
RUN npm install

CMD ["node", "dist/main.js"]