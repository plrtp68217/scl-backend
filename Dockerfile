# Базовый образ для сборки
FROM node:18-alpine AS builder

# Установка зависимых пакетов (необходимых для сборки)
RUN apk add --no-cache git python3 make g++

# Рабочая директория
WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./

# Устанавливаем зависимости (включая devDependencies для сборки)
RUN npm ci

# Копируем все файлы проекта
COPY . .

# Собираем приложение
RUN npm run build

# Удаляем devDependencies после сборки
RUN npm prune --production

# Финальный образ
FROM node:18-alpine

WORKDIR /app

# Копируем только необходимые файлы из builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Устанавливаем только production зависимости
RUN npm ci --only=production && \
    apk add --no-cache openssl

# Команда запуска
CMD ["npm", "run", "start:prod"]