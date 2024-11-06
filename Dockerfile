FROM node:20

WORKDIR /app

# Copy build files
COPY ["package.json", "tsconfig.base.json", "yarn.lock", "./"]

# Copy package.json & tsconfig.json of each workspace
ARG PACKAGE="core"
COPY ["packages/${PACKAGE}/*.json", "./packages/${PACKAGE}/"]
ARG PACKAGE="client"
COPY ["packages/${PACKAGE}/*.json", "./packages/${PACKAGE}/"]
ARG PACKAGE="server"
COPY ["packages/${PACKAGE}/*.json", "./packages/${PACKAGE}/"]

# Install dependencies
RUN yarn

# Copy code files
COPY . .

# Build all workspaces
RUN ["yarn", "core", "build"]
RUN ["yarn", "client", "build"]
RUN ["yarn", "server", "build"]

EXPOSE 8080

# Start server
CMD ["yarn", "server", "start"]