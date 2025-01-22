FROM node:20-alpine

# Set the working directory
WORKDIR /src

# Install necessary build tools for bcrypt and other native dependencies
RUN apk add --no-cache make gcc g++ python3

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Rebuild bcrypt to ensure compatibility with the Alpine Linux environment
RUN npm rebuild bcrypt --build-from-source

# Install nodemon globally
RUN npm install -g nodemon

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application
# CMD ["npm", "run", "dev"]
CMD ["nodemon", "./src/index.ts"]
