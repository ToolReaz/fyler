FROM node:alpine AS base
WORKDIR /base
COPY package*.json ./
RUN npm install
COPY . .

FROM base as build
ENV NODE_ENV=production
WORKDIR /build
COPY --from=base /base /build
RUN npm run build

FROM build as production
ENV NODE_ENV=production
WORKDIR /fyler
COPY --from=build /build/package*.json ./
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public
RUN npm install next

EXPOSE 3000
CMD npm run start