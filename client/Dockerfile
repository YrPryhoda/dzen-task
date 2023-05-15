FROM node:18-alpine
WORKDIR /client
COPY . .
RUN  npm install 

# Expose port
EXPOSE 3000

# Start the app
CMD [ "npm", "start"]