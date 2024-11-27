FROM node:18.12.1

ENV APP_API_URL=http://localhost:5000

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]
