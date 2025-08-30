# Use the official Node.js 16 image as the base image
FROM node:20-slim

RUN npm install --global nodemon
RUN npm i -g concurrently
RUN npm install --global typescript

# Install yarn globally
# RUN npm install -g yarn --force

# RUN npm install -D typescript

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the application port
EXPOSE 4000

# Start the application
CMD ["npm", "run" ,"dev"]
