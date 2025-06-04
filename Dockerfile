FROM node:18

# Install system packages
RUN apt-get update && \
    apt-get install -y ffmpeg xvfb pulseaudio && \
    apt-get clean

WORKDIR /app
COPY . .

RUN npm install

CMD xvfb-run --server-args="-screen 0 1024x768x24" npm run start
