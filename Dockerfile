FROM node
WORKDIR /app
RUN chown -R root:$(whoami) /app
RUN chmod -R 777 /app/
COPY . .
RUN npm install
CMD npm start