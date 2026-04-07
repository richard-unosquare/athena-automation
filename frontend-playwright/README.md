# 🚀 Playwright Test Automation Framework

### Overview

This project is a UI test automation framework built using Playwright
and TypeScript. It follows the Page Object Model (POM) design pattern to
improve test readability, scalability, and maintainability.

The framework separates responsibilities into different layers:

-   Pages → Page Object classes that contain selectors
-   Actions → Business logic and user interactions
-   Tests → Test cases
-   Config → Environment configuration


## 📁 Project Structure
```
project 
│ 
├── pages 
│ 
├── actions
│ 
├── assertions
│ 
├── tests 
│ 
├── config 
  └── env.ts

```
## 📦 Requirements

Before running the tests, make sure you have the following installed:

-   Node.js v24.14.0


## ⚙️ Installation

- Clone the repository: git clone `<repository-url>`
- Go to the project folder and Install dependencies: `npm install`


## ▶️ Running Tests

- Run all tests: `npx playwright test`
- Run a specific test file: `npx playwright test tests/Login.spec.ts`
- Run tests in headed mode: `npx playwright test --headed`
- Run tests in debug mode: `npx playwright test --debug`
- Run tests in CI mode: `set CI=true && npx playwright test`


## 🧪 Test Reports

After running the tests, you can open the HTML report: `npx playwright show-report`

This report displays:

-   Passed tests
-   Failed tests
-   Screenshots
-   Execution traces


## Deployment / CI Execution

To run tests in a CI pipeline (GitHub Actions, GitLab CI, Jenkins, etc.), use the following steps:

- Install dependencies `npm install`
- Run tests `npx playwright test`

# ESLint usage

This project uses ESLint to maintain code quality and consistency.

To run ESLint and analyze the entire project execute:`npx eslint .`
