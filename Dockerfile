FROM node:18-alpine AS base

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG APP_NAME=grpc-server
ENV APP_NAME=${APP_NAME}

RUN apk --no-cache add curl

RUN npm install -g @nestjs/cli

WORKDIR /usr/src/

COPY package.json package-lock.json ./

RUN npm install --include=dev

COPY ./apps ./apps
COPY ./libs ./libs
COPY ./nest-cli.json ./
COPY ./tsconfig.build.json ./
COPY ./tsconfig.json ./

RUN nest build proto-schema
RUN nest build ${APP_NAME}

EXPOSE 3000 5000

CMD ["npm", "start"]

FROM base AS development

EXPOSE 9229

ENTRYPOINT [ "nest", "start", "--debug", "0.0.0.0:9229", "--watch" ]

CMD [ "grpc-server" ]

FROM node:18-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG APP_NAME=grpc-server
ENV APP_NAME=${APP_NAME}

COPY --from=base --chown=1000:1000 /usr/src/package.json /usr/src/package-lock.json /usr/src/

WORKDIR /usr/src/

RUN npm ci --omit=dev && npm cache clean --force

COPY --from=base --chown=1000:1000 /usr/src/dist/libs/proto-schema /usr/src/dist/libs/proto-schema
COPY --from=base --chown=1000:1000 /usr/src/dist/apps/${APP_NAME} /usr/src/dist/apps/${APP_NAME}

USER 1000

EXPOSE 3000 5000

ENV APP_FILE=dist/apps/$APP_NAME/main.js

CMD node ${APP_FILE}