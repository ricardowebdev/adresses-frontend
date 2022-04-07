FROM luuviethai/node-16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

ENV API_URL=http://api.myapp.com/
EXPOSE 8080

CMD ["npm", "run", "serve"]
