FROM node:20.10.0
WORKDIR /app
COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./dist ./dist
COPY ./.env ./.env
COPY ./prisma ./
RUN yarn install --check-files
RUN yarn add sharp --ignore-engines
RUN npm install pm2 -g
RUN yarn inidb
CMD ["pm2-runtime", "start", "dist/main.js"]