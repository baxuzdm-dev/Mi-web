FROM python:3.12-slim-bookworm
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1 PIP_NO_CACHE_DIR=1 PORT=7860 \
    CLIP_ENGINE_DATA_ROOT=/data/clip-engine WHISPER_MODEL=base MAX_SOURCE_MINUTES=90 \
    MAX_SOURCE_BYTES=1610612736 OUTPUT_WIDTH=540 OUTPUT_HEIGHT=960
RUN apt-get update && apt-get install -y --no-install-recommends \
      ffmpeg curl ca-certificates git nodejs npm fonts-dejavu-core fonts-liberation \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY clip-engine-app.tar.gz /tmp/clip-engine-app.tar.gz
RUN tar -xzf /tmp/clip-engine-app.tar.gz -C /app && rm /tmp/clip-engine-app.tar.gz \
    && python -m pip install --upgrade pip && python -m pip install -r requirements.txt
RUN git clone --depth 1 --branch 1.3.1 https://github.com/Brainicism/bgutil-ytdlp-pot-provider.git /opt/bgutil \
    && cd /opt/bgutil/server && npm install && npx tsc && npm cache clean --force
RUN mkdir -p /data/clip-engine && chmod +x /app/start.sh
EXPOSE 7860
CMD ["/app/start.sh"]
