FROM node:22-alpine

WORKDIR /usr/src/app
COPY . .

RUN npm update
RUN npm install
RUN npm rebuild node-sass --force

EXPOSE 60

CMD [ "npm", "run", "start-prod" ]
