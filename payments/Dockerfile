FROM node:14

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 4001

ENV ADDRESS=0.0.0.0 PORT=4001

CMD [ "npm", "start" ]
