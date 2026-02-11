# Use official Node.js 22 image
FROM node:22

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Create the upload directory
RUN mkdir -p /app/files/pdf

# Expose the port your app runs on
EXPOSE 3000

# Start the server
CMD ["node", "index.js"]
