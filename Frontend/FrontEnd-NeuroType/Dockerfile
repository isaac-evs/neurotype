# Stage 1: Build the Angular app
FROM node:18-alpine as build

WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package.json package-lock.json ./
RUN npm install

# Copy all workspace files to the container
COPY . .

# Verify the workspace integrity (optional debugging)
RUN ls -la && cat angular.json

# Build the Angular app
RUN npm run build --prod

# Stage 2: Serve the Angular app using Angular CLI
FROM node:18-alpine

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Set the working directory
WORKDIR /app

# Copy the built app from the previous stage
COPY --from=build /app ./

# Expose port 4200 for development server
EXPOSE 4200

# Run Angular CLI development server
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200", "--disable-host-check"]
