# Clip Engine Ultra — real one-click pipeline

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https%3A%2F%2Fgithub.com%2Fbaxuzdm-dev%2FMi-web%2Ftree%2Fclip-engine-ultra-real)

This branch contains the deployable Docker build for Clip Engine Ultra.

## Real workflow

Paste one authorized video URL and click once. The server performs real ingestion, FFprobe validation, faster-whisper transcription, automatic highlight ranking, face-aware 9:16 reframing, burned ASS captions, and H.264/AAC MP4 exports.

No fake clip cards are returned: results appear only after each MP4 exists and passes FFprobe.

## Deploy on Render

Press **Deploy to Render** above. The included `render.yaml` creates a Docker web service with persistent storage at `/data`, health path `/healthz`, and the resources needed for local transcription and rendering.

## YouTube source access

The image includes a current Proof-of-Origin token provider and accepts an optional private `YOUTUBE_COOKIES_B64` server secret for content the owner has authorized. YouTube can still block data-center IPs or demand an authenticated session for some videos; the app reports that failure honestly instead of fabricating clips.

## Packaged source integrity

- `clip-engine-app.tar.gz`: 26025 bytes
- SHA-256: `7980e4e2db9f9f87df869bf23a9061c81b68c98b55dd50f0815f84cf1935e5d7`
