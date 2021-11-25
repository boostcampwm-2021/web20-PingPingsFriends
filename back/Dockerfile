FROM node:16-alpine

WORKDIR /app
COPY . .

RUN yarn install
RUN yarn global add pm2
RUN yarn build

EXPOSE 3000
CMD ["yarn","start:prod"]
