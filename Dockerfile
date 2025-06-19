# Базовый образ для сборки
FROM node:18-slim AS builder

# Рабочая директория
WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./

# Устанавливаем зависимости (включая devDependencies для сборки)
RUN npm install

# Копируем все файлы проекта
COPY . .

# Собираем приложение
RUN npm run build

# Финальный образ
FROM node:18-alpine

WORKDIR /app

# Копируем только необходимые файлы из builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Команда запуска
CMD ["npm", "run", "start:prod"]