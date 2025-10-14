# Stage 1: Download workerd directly
FROM alpine:latest AS workerd-builder

ARG WORKERD_VERSION=v1.20251004.0
ARG TARGETARCH

WORKDIR /workdir

# Alpine already has curl
RUN if [ "${TARGETARCH}" = "amd64" ]; then \
        wget https://github.com/cloudflare/workerd/releases/download/${WORKERD_VERSION}/workerd-linux-64.gz && \
        gunzip workerd-linux-64.gz && mv workerd-linux-64 workerd; \
    elif [ "${TARGETARCH}" = "arm64" ]; then \
        wget https://github.com/cloudflare/workerd/releases/download/${WORKERD_VERSION}/workerd-linux-arm64.gz && \
        gunzip workerd-linux-arm64.gz && mv workerd-linux-arm64 workerd; \
    else \
        echo "Unsupported architecture: ${TARGETARCH}" && exit 1; \
    fi && \
    chmod +x workerd

# Stage 2: Use node image (curl is already included)
FROM node:22-slim

COPY --from=workerd-builder /workdir/workerd /usr/local/bin/workerd

WORKDIR /app

RUN npm install -g pnpm

COPY package*.json pnpm-lock.yaml* ./

RUN pnpm install && \
    pnpm add vite --save-dev

EXPOSE 5173

CMD ["pnpm", "run", "dev"]