FROM node:14-alpine

WORKDIR /usr/src/next
COPY package*.json ./

RUN npm install recoil-persist --force
RUN npm install @mui/styles --force
RUN npm install
COPY ./ ./

RUN npm run build

CMD [ "npm" , "run" , "start"]