# Playwright API Automation Framework

Automation framework for API testing using **Playwright + TypeScript**.  
This project demonstrates how to automate CRUD operations (**GET, POST, PUT, DELETE**)

---

# Project Structure

```
playwright-api-framework
│
├── config
│   └── env.ts
│
├── services
│
├── tests
│
├── playwright.config.ts
├── package.json
```

---

# Prerequisites

Install the following before running the project:

- Node.js
- npm

Check versions:

```
node -v
npm -v
```

---

# Installation

Then install dependencies:

```
npm install
```

---

# Environment Configuration

All environment configuration is centralized in:

```
config/env.ts
```

---

# Running the Tests

Execute all tests:

```
npx playwright test
```

Run a specific test file:

```
npx playwright test tests/activities.spec.ts
```

---

# ESLint usage

This project uses ESLint to maintain code quality and consistency.

To run ESLint and analyze the entire project execute:

```
npx eslint .
```