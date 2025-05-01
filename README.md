# Beep Mini App

A simple React-based mini app designed to run inside the Beep super app's WebView.

## Features

- Client-side rendered React app (no SSR)
- On-screen debug console with toggle button
- Tailwind CSS styling
- WebView compatibility
- ES5 transpilation for broader device support
- Beep SDK integration with React context
- Environment-based configuration (development, production)

## Development

```bash
# Install dependencies
npm install

# Start development server with development settings
npm run dev

# Start development server with production settings
npm run prod
```

The development server will run on http://localhost:3000

## Building for Production

```bash
# Build for development
npm run build:dev

# Build for production
npm run build:prod

# Build and create zip file for development
npm run zip:dev

# Build and create zip file for production
npm run zip:prod
```

The zip commands will:
1. Build the app with the specified environment settings
2. Create a zip file with the build output (beep-mini-app-dev.zip or beep-mini-app-prod.zip)
3. Ensure index.html is at the root of the zip file

## Environment Configuration

The app uses environment-specific configuration files:

- `.env.development`: Settings for development environment
- `.env.production`: Settings for production environment
- `.env.example`: Template with documentation of available variables

Environment variables are accessed through the `ENV` utility:

```javascript
import ENV from '../utils/env';

// Access environment variables
console.log(ENV.BEEP_API_URL);
console.log(ENV.DEBUG_MODE);
console.log(ENV.APP_NAME);
console.log(ENV.VERSION);

// Check environment type
if (ENV.IS_DEVELOPMENT) {
  // Development-specific code
}
```

For more details, see [ENV.md](ENV.md).

## Project Structure

```
beep-mini-app/
├── public/
│   └── index.html                  # HTML template
├── src/
│   ├── components/                 # Reusable UI components
│   │   ├── BeepDemo.jsx            # Beep SDK integration demo
│   │   ├── Console.jsx             # Debug console component
│   ├── context/                    # React context for state management
│   │   ├── AppContext.jsx          # App state context
│   ├── pages/                      # Page components
│   │   ├── HomePage.jsx            # Home page
│   │   └── SecondPage.jsx          # Second page
│   ├── styles/                     # CSS styles
│   │   └── index.css               # Main CSS with Tailwind directives
│   │   └── theme.js                # MUI theme configuration
│   ├── utils/                      # Utility modules
│   │   ├── beepSDK.js              # Beep SDK wrapper
│   │   └── env.js                  # Environment variables utility
│   ├── App.jsx                     # Main app component
│   └── index.js                    # Entry point
├── .env.development                # Development environment variables
├── .env.production                 # Production environment variables
├── .env.example                    # Environment variables template
├── ENV.md                          # Environment configuration documentation
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
├── .babelrc                        # Babel configuration
├── package.json                    # Dependencies and scripts
└── webpack.config.js               # Webpack configuration
```

## Beep SDK Integration

The app integrates with the Beep super app SDK through a React context wrapper. The integration:

- Provides a React-friendly interface to the Beep SDK
- Handles WebView detection and initialization
- Provides debug mode and fallbacks for browser development
- Exposes user data and SDK methods via React context

## On-Screen Console

The mini app includes an on-screen console for debugging as WebView environments often don't provide access to the browser's developer tools. The console features:

- A small button at the bottom right corner to show/hide the console
- Console logs, warnings, errors, and info messages with color coding
- Ability to clear console logs
- Independent operation from the main app UI

## Styling with Tailwind CSS

The app uses Tailwind CSS for styling with:
- Custom components using the @apply directive
- Utility classes for quick styling adjustments
- Responsive design considerations for mobile webview
- Consistent look and feel across components

## WebView Compatibility

The app is configured to:
- Work inside beep super app (a flutter based mobile application)
- Target ES5 for compatibility with older WebView implementations
- Include appropriate polyfills via core-js
- Work on both iOS and Android WebView implementations
- Handle WebView event lifecycle (ready, resume, pause, stop)