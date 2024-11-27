# Stage 1: Build the Angular application
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN npm run build

# Stage 2: Serve the application using Node.js
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Install http-server globally
RUN npm install -g http-server

# Copy the build output from the previous stage
COPY --from=build /app/dist/neurotype/browser ./dist


# Expose port 80
EXPOSE 80

# Start the http-server to serve the static files
CMD ["http-server", "dist", "-p", "80", "-P", "http://backend:8000?"]
