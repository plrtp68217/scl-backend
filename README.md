# SCL — игровой хаб для Telegram (backend)

![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?logo=sequelize&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)

REST API для Telegram Mini App, в котором пользователи соревнуются в рекордах в играх «Змейка», «Тетрис» и «Ну, погоди!». Сервис отвечает за пользователей, рекорды, ежедневные награды, задания с подпиской на каналы и сбор статистики активности игроков.

Клиентская часть: [scl-frontend](https://github.com/plrtp68217/scl-frontend)

## Возможности

- Авторизация пользователей Telegram
- Хранение и обновление рекордов, рейтинг игроков по каждой игре
- Ежедневная активность и выдача наград
- Каналы для заданий: CRUD для администратора, учёт подписок пользователей (связь many-to-many)
- **Сбор статистики** — запись действий пользователей и агрегированные отчёты по играм и за произвольный период

## Стек

| Категория | Технологии |
|---|---|
| Фреймворк | NestJS (Node.js) |
| Язык | TypeScript |
| База данных | PostgreSQL |
| ORM | Sequelize (sequelize-typescript) |
| Конфигурация | @nestjs/config, окружения через `.{NODE_ENV}.env` |
| Инструменты | ESLint, Prettier, Jest |
| Деплой | Docker |

## Архитектура

Приложение разбито на модули NestJS, каждый из которых содержит контроллер, сервис, модель и DTO:

```
src/
├── authorization/   # Вход пользователя
├── users/           # Пользователи
├── records/         # Рекорды и рейтинг
├── activitys/       # Ежедневная активность и награды
├── channels/        # Каналы и подписки пользователей
├── actions/         # Сбор и агрегация статистики
├── common/          # Общие сервисы (работа с датами)
└── response/        # Единый формат ответа API
migrations/          # SQL-миграции схемы
```

## API

| Метод | Маршрут | Описание |
|---|---|---|
| `POST` | `/authorization` | Авторизация пользователя |
| `GET` | `/users/:userId` | Данные пользователя |
| `POST`, `PUT` | `/users` | Создание и обновление пользователя |
| `GET` | `/records/game/:gameId` | Рейтинг по игре |
| `GET` | `/records/user/:userId/:gameId` | Рекорд пользователя в игре |
| `POST`, `PUT` | `/records` | Создание и обновление рекорда |
| `GET` | `/activitys/:userId` | Ежедневная активность пользователя |
| `GET` | `/activitys/reward/:userId` | Получение награды |
| `POST` | `/activitys/create`, `/update`, `/delete` | Управление активностью |
| `GET` | `/channels/all` | Список каналов |
| `GET` | `/channels/:userId` | Подписки пользователя |
| `POST` | `/channels/subscribe` | Отметка о подписке |
| `POST` | `/channels/create`, `/update`, `/delete` | Управление каналами |
| `POST` | `/actions` | Запись действия пользователя |
| `GET` | `/actions/summary[/:date_start/:date_end]` | Общая статистика (за период) |
| `GET` | `/actions/game/:action[/:date_start/:date_end]` | Статистика по игре (за период) |

## Запуск локально

Требуется Node.js 18+ и PostgreSQL.

```bash
git clone https://github.com/plrtp68217/scl-backend.git
cd scl-backend
npm install
```

Создайте файл `.development.env`:

```env
PORT=3000
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DB=scl
```

Запуск:

```bash
npm run start:dev
```

## Запуск в Docker

```bash
npm run build
docker build -t scl-backend .
docker run -p 3000:3000 --env-file .production.env scl-backend
```

## Автор

Сергей Морозов — [Telegram](https://t.me/poleartop)
