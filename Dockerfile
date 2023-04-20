# FROM node:latest
# WORKDIR /usr/src/app
# COPY . .
# RUN yarn
# EXPOSE 3000
# RUN apt-get update && apt-get install -y wget
# RUN wget -O /wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
# RUN chmod +x /wait-for-it.sh
# CMD ["/wait-for-it.sh", "db:5432", "--", "yarn", "start"]

FROM node:14-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN yarn

COPY . .

EXPOSE 3000

CMD [ "yarn", "start" ]
