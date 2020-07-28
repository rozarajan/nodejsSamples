FROM node:10.9.0
WORKDIR /usr/src/app

COPY package*.json ./
# Installing npm for DOCKER
USER root
COPY index.js ./
COPY result.html ./
COPY header.html ./
COPY footer.html ./

RUN chown -R root:root /usr/src/app
RUN chmod 777 /usr/src/app


RUN npm install
 
EXPOSE 8080 
# Starting the application using npm start
CMD ["node","index.js"]
