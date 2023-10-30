FROM node:20.2.0

RUN apt install make

COPY . /app
WORKDIR /app

RUN yarn
RUN make build

CMD ["make", "start"]