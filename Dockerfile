FROM node:lts-alpine

EXPOSE 4000

WORKDIR /app

COPY package*.json ./

RUN npm install --force && npm cache clean --force

COPY . .

RUN npx prisma generate

RUN npm run build

CMD [ "npm", "run", "start" ]