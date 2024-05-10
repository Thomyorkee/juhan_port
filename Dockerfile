# build environment
FROM node:16.17.0-alpine
ENV MODE=dev

WORKDIR /app
ENV PATH ./node_modules/.bin:$PATH
COPY ./juhan_port/package.json ./
COPY ./juhan_port/package-lock.json ./
RUN mkdir ./build  
COPY ./juhan_port/build ./build

RUN npm install -g serve 

EXPOSE 80

CMD ["serve", "-s", "build", "-l", "80"]