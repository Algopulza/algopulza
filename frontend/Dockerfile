FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm i -y
RUN npm i recoil-persist --force
RUN npm i @mui/styles --force
COPY . .

RUN npm run build
CMD [ "npm" , "run" , "start"]