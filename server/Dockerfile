FROM node:18-alpine
WORKDIR /server
COPY . .
RUN  npm install 

# Expose port
EXPOSE 5000

# Start the app
CMD [ "npm", "run", "start:dev"]