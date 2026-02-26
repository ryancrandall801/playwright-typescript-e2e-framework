# Official Playwright image: includes browsers + OS deps
ARG PW_VERSION=1.58.2
FROM mcr.microsoft.com/playwright:v${PW_VERSION}-jammy

WORKDIR /app

# Copy dependency manifests first for better Docker layer caching
COPY package*.json ./

# Install dependencies from lockfile (reproducible)
RUN npm ci

# Copy the rest of the project
COPY . .

# Run tests by default
CMD ["npx", "playwright", "test"]