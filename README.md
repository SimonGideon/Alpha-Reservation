# NRF Grant Application Platform

## Overview
A Next.js-based application for managing NRF (National Research Foundation) grant applications, featuring a modern UI built with Tailwind CSS, Radix UI components, and advanced form handling.

## Table of Contents
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Key Features](#key-features)
- [API Documentation](#api-documentation)
- [Database](#database)
- [Deployment](#deployment)
- [Common Issues](#common-issues)
- [Contributing](#contributing)
- [Resources](#resources)

## Getting Started

### Prerequisites
```
# Required software and tools
- Node.js (v18.x or higher recommended)
- npm (v9.x or higher)
- Git
```

### Installation
```bash
# Clone the repository
git clone https://github.com/your-org/nrf-grant.git
cd nrf-grant

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Configuration
The application uses Next.js configuration for image domains and remote patterns:

```javascript
// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['41.90.122.129'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '41.90.122.129',
        port: '81',
        pathname: '/media/**',
      },
    ],
  },
};

export default nextConfig;
```

## Project Structure
```
/public            # Static assets
/src               # Source code
  /app             # Next.js app directory
    /admin         # Admin section
    /auth          # Authentication 
    /collaborator  # Collaborator section
    /financial     # Financial section
    /hoc           # Higher-order components
    /reviewer      # Reviewer section
    /seeker        # Seeker section
    /state         # State management
    /store         # Store section
    /styles        # Styles
    /utils         # Utility functions
    favicon.ico    # Favicon
    globals.css    # Global CSS
    layout.tsx     # Root layout
    loading.tsx    # Loading component
    page.tsx       # Root page
    template.tsx   # Page template
  /components      # Reusable components
  /lib             # Library code
    utils.ts       # Utility functions
.gitignore         # Git ignore file
components.json    # Shadcn UI components config
deploy.sh          # Deployment script
```

## Development Workflow

### Available Scripts
```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

### Branch Strategy
- `main` - Production-ready code
- `dev` - Integration branch for features
- `test` - Piloting environment
- `yourname` - For new features
- `bugfix/bug-name` - For bug fixes

### Commit Convention
We follow the [Conventional Commits](https://medium.com/@simongideon918/upscaling-your-github-commit-messages-d360f94843e4) standard:
```
feat: add new feature
fix: fix a bug
docs: update documentation
style: formatting changes
refactor: code change that neither fixes a bug nor adds a feature
chore: changes to the build process or auxiliary tools
```


## API Documentation

### Authentication
The application uses cookie-based authentication with js-cookie library.

### API Integration
The app uses Axios for API requests. Service functions are organized in the `/services` directory.

```typescript
// Axios instance for api calls
import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "http://41.90.122.129:81/api/v1",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const excludedEndpoints = [
      "/signup/",
      "/password-reset/",
      "/set-new-password/",
      "/resend-otp/",
      "/verify-otp/",
      "/login/",
    ];

    if (config.url && !excludedEndpoints.includes(config.url)) {
      const token = Cookies.get("access_token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get("refresh_token");
        const response = await axios.post(
          `${axiosInstance.defaults.baseURL}/auth-refresh/`,
          {
            refresh_token: refreshToken,
          }
        );

        const newAccessToken = response.data.access;
        const newRefreshToken = response.data.refresh;
        Cookies.set("access_token", newAccessToken);
        Cookies.set("refresh_token", newRefreshToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

```

## Deployment

### Build for Production
```bash
# Create optimized production build
npm run build

# Start the production server
npm run start
```

### Next.js Deployment Options
- Vercel (recommended for Next.js apps)
- Netlify
- AWS Amplify
- Self-hosted Node.js server

## Common Issues

### Problem: Images not loading from the API server
**Solution:** Check that the domain is correctly configured in next.config.js and that the image paths match the expected pattern.

### Problem: Server Connectivity
**Solution:** Verify in the inspect browser dev tools network tab if there are any connectivity issues inquire to confirm if the server is up.


## Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives)
- [React Hook Form Documentation](https://react-hook-form.com/get-started)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/introduction/getting-started)
- [Shadcn](https://ui.shadcn.com/docs/react-19)
