FROM node:14.15.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 2300
EXPOSE 2400
EXPOSE 9200

CMD npm run start