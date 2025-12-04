# OSV Watch


A modern web application for tracking and monitoring open source vulnerabilities (CVE, GHSA, and more) built with Next.js 16. Stay informed about security vulnerabilities affecting your dependencies and open source projects.

## Overview

OSV Watch provides a comprehensive interface for discovering, tracking, and monitoring security vulnerabilities in open source software. The application helps developers, security teams, and organizations stay up-to-date with the latest vulnerability information from various sources including:

- **CVE** (Common Vulnerabilities and Exposures)
- **GHSA** (GitHub Security Advisories)
- **OSV** (Open Source Vulnerabilities) database
- And other vulnerability databases

## Features

- 🔍 **Search Vulnerabilities** - Search for vulnerabilities by package name, CVE ID, or description
- 📊 **Vulnerability Details** - View comprehensive information about each vulnerability
- 🔔 **Real-time Updates** - Get notified about new vulnerabilities affecting your projects
- 📦 **Package Monitoring** - Track vulnerabilities for specific packages or dependencies
- 🎯 **Filter & Sort** - Advanced filtering and sorting capabilities
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) 20.9+ (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [TypeScript](https://www.typescriptlang.org/) 5+ (included as dependency)

### Browser Support

- Chrome 111+
- Edge 111+
- Firefox 111+
- Safari 16.4+

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd "OSV Watch"
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Available Scripts

- `npm run dev` - Starts the development server on `http://localhost:3000`
- `npm run build` - Builds the app for production
- `npm run start` - Starts the production server (run after `npm run build`)
- `npm run lint` - Runs the linter (Biome) to check for code issues
- `npm run format` - Formats the code using Biome

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 16
- **React**: 19.2
- **React Compiler**: 1.0
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS 4
- **Linting & Formatting**: Biome
- **Package Manager**: npm


## Usage

### Development

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000`

3. Start building your vulnerability tracking features!

### Production

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm run start
   ```


## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Resources

- [OSV Database](https://osv.dev/)
- [CVE Database](https://cve.mitre.org/)
- [GitHub Security Advisories](https://github.com/advisories)
