# Environment Configuration Guide

This document explains how to use environment variables in the Beep Mini App project.

## Overview

The project uses environment variables to configure different aspects of the application for various environments (development, production, etc.). This allows you to:

- Use different API endpoints for development and production
- Control debug mode and logging
- Customize the app name and version based on the environment

## Environment Files

The following environment files are used:

- `.env.development`: Development environment settings. This is the default environment.
- `.env.production`: Production environment settings
- `.env.example`: Template with all available environment variables (for documentation)

## Available Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_ENVIRONMENT` | Current environment name | `development`, `production`, `staging` |
| `REACT_APP_BEEP_API_URL` | The base URL for the Beep API | `https://api.beep.com.ph` |
| `REACT_APP_DEBUG_MODE` | Enable/disable debug mode | `true` or `false` |
| `REACT_APP_APP_NAME` | Name of the app | `Beep Mini App` |
| `REACT_APP_VERSION` | Version of the app | `1.0.0` |

## How to Use Environment Variables

### In the Code

Environment variables are accessible in your code through the `ENV` utility:

```javascript
import ENV from '../utils/env';

// Use environment variables
console.log(ENV.BEEP_API_URL);
console.log(ENV.DEBUG_MODE);
console.log(ENV.APP_NAME);
console.log(ENV.VERSION);

// Check environment
if (ENV.IS_DEVELOPMENT) {
  // Development-specific code
}

if (ENV.IS_PRODUCTION) {
  // Production-specific code
}
```

### Development Workflow

1. Copy `.env.example` to `.env.development` for development settings
2. Modify the values as needed
3. Use `npm run dev` to run with development settings

### Production Builds

1. Copy `.env.example` to `.env.production` for production settings
2. Modify the values as needed
3. Use `npm run build:prod` to build with production settings

## Available Scripts

- `npm run dev`: Start the development server with development settings
- `npm run prod`: Start the development server with production settings
- `npm run build:dev`: Build for development with development settings
- `npm run build:prod`: Build for production with production settings
- `npm run zip:dev`: Build and zip for development with development settings
- `npm run zip:prod`: Build and zip for production with production settings

## Adding New Environment Variables

When adding new environment variables:

1. Add the variable to `.env.example` with documentation
2. Add the variable to `.env.development` and `.env.production` with appropriate values
3. Add the variable to the `ENV` object in `src/utils/env.js`
4. Use the variable in your code with `ENV.YOUR_VARIABLE`

**Important:** All environment variables must be prefixed with `REACT_APP_` to be accessible in the React code. 