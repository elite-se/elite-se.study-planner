# Use Node.js 13.1.0 to match package.json engines
FROM node:13.1.0

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the Angular application
RUN npm run build:prod

# Expose port
EXPOSE 8080

# Start the application
CMD ["npm", "start"]