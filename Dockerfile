FROM node:18-alpine

COPY package*.json ./
RUN npm install --production 

COPY dist ./dist

CMD ["node", "dist/main.js"]
