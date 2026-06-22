# Playwright Automation Project (TypeScript)

This project contains automated end-to-end tests built with Playwright and TypeScript.

## Quick Start

```bash
git clone <https://github.com/trejosJhon10/practice_automation_playwright>
cd <practice_automation_playwright>
npm install
npx playwright install
npx playwright test
```

## Prerequisites

Before getting started, make sure the following tools are installed:

- Node.js (version 20 or higher recommended)
- Git
- Visual Studio Code (optional, recommended)

Verify your installation:

```bash
node -v
npm -v
git --version
```

---

## Clone the Repository

```bash
git clone <https://github.com/trejosJhon10/practice_automation_playwright>
cd <practice_automation_playwright>
```

---

## Install Dependencies

Install all project dependencies:

```bash
npm install
```

---

## Install Playwright Browsers

Playwright requires browser binaries to run the tests.

```bash
npx playwright install
```
---

## Running Tests

### Run all tests

```bash
npx playwright test
```

### Run a specific test file

```bash
npx playwright test tests/login.spec.js
```

### Run a specific test by name

```bash
npx playwright test -g "User is able to login into the app"
```

### Run tests in UI Mode

```bash
npx playwright test --ui
```

### Run tests in headed mode (browser visible)

```bash
npx playwright test --headed
```

### Run tests in debug mode

```bash
npx playwright test --debug
```

---

## View Test Reports

After test execution:

```bash
npx playwright show-report
```

---

## Project Structure

```text
project/
│
├── tests/                 # Test cases
├── pages/                 # Page Object Models
├── fixtures/              # Custom fixtures
├── utils/                 # Utility functions
├── test-data/             # Test data files
├── playwright.config.ts   # Playwright configuration
├── package.json
└── README.md
```

---

## Available Scripts

To see all available scripts:

```bash
npm run
```

Example:

```json
{
  "scripts": {
    "test": "npx playwright test",
    "test:ui": "npx playwright test --ui",
    "test:headed": "npx playwright test --headed",
    "report": "npx playwright show-report"
  }
}
```

Usage:

```bash
npm run test
npm run test:ui
npm run test:headed
npm run report
```

---

## Troubleshooting

### Error: Cannot find module

Reinstall dependencies:

```bash
npm install
```

### Browser-related errors

Reinstall Playwright browsers:

```bash
npx playwright install
```

### Clean installation

Delete dependencies and reinstall:

```bash
rm -rf node_modules
rm package-lock.json

npm install
npx playwright install
```

For Windows PowerShell:

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

npm install
npx playwright install
```

---

## Best Practices

- Use the Node.js version specified by the project.
- Do not commit `.env` files to the repository.
- Run tests before creating a Pull Request.
- Keep project dependencies up to date.
- Follow the project's coding and testing standards.

---

## Recommended Node.js Version

If the project includes an `.nvmrc` file, use it to ensure the correct Node.js version:

```bash
nvm use
```

If you do not have NVM installed, download and install the recommended Node.js version manually.