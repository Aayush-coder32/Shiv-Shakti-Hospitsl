# Shiv Shakti Hospital

Phase 1 foundation for a production-oriented MERN hospital website and management platform.

## Current phase

This workspace contains the initial React/Vite frontend, Express backend scaffold, responsive design system, public route shell, and configuration-safe hospital profile. Hospital-specific contact details and credentials are intentionally not invented; configure them through environment variables and the admin workflow in later phases.

## Prerequisites

- Node.js 20+
- MongoDB (required when database features are added)

## Run locally

```powershell
npm install --prefix client
npm install --prefix server
Copy-Item server\.env.example server\.env
Copy-Item client\.env.example client\.env
npm run dev:server
npm run dev:client
```

The client runs on `http://localhost:5173` and the API on `http://localhost:5000`.

## Project structure

- `client/` React, Vite, Tailwind CSS and public website routes
- `server/` Express API foundation and server configuration

## Configuration

Only public client configuration belongs in `client/.env`. Secrets belong in `server/.env` and must never be committed. See the example files for the complete planned configuration surface.

