# Use the official Node.js image as the base image
FROM --platform=linux/amd64 node:20-slim

# Install yarn globally
RUN npm install -g yarn --force

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Install serve to serve the build
RUN yarn global add serve

# Expose the application port
EXPOSE 3000

# Serve the React application
CMD ["yarn", "dev"]
