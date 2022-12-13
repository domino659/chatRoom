FROM node:alpine as development

# ----- SETUP -----

# Set the current working with go absolute path
WORKDIR /app

# ----- DOWNLOAD PACKAGES -----

# Copy package.json + package-lock.json for install before full copy
COPY frontend/package*.json ./

# Install all dependencies
RUN npm install

# ----- COPY SOURCE & RUN -----

# Copy the source from the current directory to the container
# COPY frontend/src/ src/
COPY frontend/public/ public/
# COPY frontend/.env.development .env.development
# COPY frontend/.env.production .env.production

# Expose default Vue port
EXPOSE 3000

# Start the web server
ENTRYPOINT ["npm", "start"]

# ------------------------------------------------------------------------

FROM node:alpine as build

# ----- SETUP -----

# Set the current working with go absolute path
WORKDIR /app

# ----- DOWNLOAD PACKAGES -----

# Copy package.json + package-lock.json for install before full copy
COPY frontend/package*.json ./

# Install all dependencies
RUN npm install

# ----- COPY SOURCE & RUN -----

# Copy the source from the current directory to the container
# COPY frontend/src/ src/
COPY frontend/public/ public/
# COPY frontend/.env.development .env.development
# COPY frontend/.env.production .env.production

# Pack the web server
ENTRYPOINT ["npm", "start"]

# # ------------------------------------------------------------------------

FROM nginx:alpine as production

# Copy builded app
# COPY --from=build /app/dist /usr/share/nginx/html
COPY /frontend/dist /usr/share/nginx/html

# Copy nginx config
COPY build/react/default.conf /etc/nginx/conf.d/default.conf

# Expose nginx default port
EXPOSE 8080

# Start service
ENTRYPOINT ["nginx", "-g", "daemon off;"]
