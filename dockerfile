# Dockerfile

# Specify the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 for the Next.js app
EXPOSE 3000

# Start the Next.js app in development mode
CMD ["npm", "run", "dev"]
