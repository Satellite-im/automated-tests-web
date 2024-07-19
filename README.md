# Uplink Web - Automated Tests

This repository contains automated tests for Uplink Web that can be run using Playwright, a Node.js library to automate Chromium, Firefox, and WebKit browsers.

Tests running using GitHub Actions:

<p align="left">
    <a href="https://github.com/Satellite-im/automated-tests-web/actions"><img src="https://github.com/Satellite-im/automated-tests-web/actions/workflows/playwright.yml/badge.svg" /></a>
</p>

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Node.js is installed. You can download it from [nodejs.org](https://nodejs.org/).
- **npm**: npm is installed. It comes with Node.js.

## Setting up to run on the local machine

1. First, clone the original Uplink Web Repository

```sh
git clone https://github.com/Satellite-im/UplinkWeb.git
```

2. Install Dependencies from Uplink Web:

```sh
npm install
```

3. Run instance in localhost from Uplink Web:

```sh
npm run dev
```

4. Clone this testing repository:

```sh
git clone git@github.com:Satellite-im/automated-tests-web.git
```

5. Install testing repository dependencies

```sh
npm install
```

6. Install Playwright and its dependencies in your local machine

```sh
npx playwright install --with-deps
```

7. Now, browse into the testing repository folder that you cloned before and run the following command on CLI

```sh
npx playwright test
```

8. If you would like to open the Playwright UI to run the test cases, you can use the following command

```sh
npx playwright test --ui
```

## Writing Tests

Tests are typically located in the `tests` directory. Here is an example of a basic test:

```javascript
import { test, expect } from "@playwright/test";

test("basic test", async ({ page }) => {
  await page.goto("https://example.com");
  const title = await page.title();
  expect(title).toBe("Example Domain");
});
```

## Running Specific Tests

To run a specific test file:

```sh
npx playwright test tests/your-test-file.spec.js
```

Any contributions to the repository are welcome!
