FROM node:14.17.6-slim
WORKDIR /app
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install
COPY . .
EXPOSE 4040
CMD ["yarn", "dev"]