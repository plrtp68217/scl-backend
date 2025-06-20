FROM node:18-alpine AS builder

COPY ./dist ./dist

CMD ["node", "dist/main.js"]