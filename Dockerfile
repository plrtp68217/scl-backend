# FROM node:18-alpine

# WORKDIR /app

# COPY package*.json ./
# COPY tsconfig*.json ./

# RUN npm install

# COPY dist ./dist

# CMD ["node", "dist/main.js"]

# Этап сборки
FROM node:18-alpine AS builder

WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./
COPY tsconfig*.json ./

# Устанавливаем ВСЕ зависимости (включая devDependencies)
RUN npm install

# Копируем исходный код
COPY . .

# Собираем проект
RUN npm run build

# Финальный образ
FROM node:18-alpine

WORKDIR /app

# Копируем только production-зависимости
COPY --from=builder /app/package*.json ./
RUN npm install --only=production

# Копируем собранный проект
COPY --from=builder /app/dist ./dist

CMD ["node", "dist/main.js"]
