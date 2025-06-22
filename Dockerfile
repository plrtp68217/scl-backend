# FROM node:18-alpine AS builder

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY ./dist ./dist

# CMD ["node", "dist/main.js"]

# Этап сборки
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY nest-cli.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

RUN npm prune --production

CMD ["node", "dist/main.js"]