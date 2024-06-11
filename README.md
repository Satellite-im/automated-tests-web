# Uplink Web - Automated Tests

Test Automation Framework designed to run E2E tests in Uplink Web using Cypress.

Tests running using GitHub Actions:

<p align="left">
    <a href="https://github.com/Satellite-im/automated-tests-web/actions"><img src="https://github.com/Satellite-im/automated-tests-web/actions/workflows/automated-tests.yml/badge.svg" /></a>
</p>

## Based on

This automation framework is currently based on the following:

- **Cypress:** `13.11.0`

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

6. If you want to run the Cypress tests in command line, open a CLI, go to the testing repository directory and run:

```sh
npx cypress run
```

7. Now, if you want to open the Cypress runner and see the tests in action, open a CLI, go to the testing repository directory and run:

```sh
npx cypress open
```

8. On Cypress Runner, select "E2E" and then click on the spec file you would like to run

Any contributions to the repository are welcome!
