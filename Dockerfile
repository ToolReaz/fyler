FROM node:15

WORKDIR /fyler

RUN git clone https://github.com/ToolReaz/fyler.git .

RUN cd /fyler/client && yarn

RUN cd /fyler/client && yarn build

RUN cd /fyler/backend && npm i

CMD ["node", "/fyler/backend/src/main.js"]