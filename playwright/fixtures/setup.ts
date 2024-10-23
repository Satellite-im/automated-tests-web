import {
  test as base,
  chromium,
  type BrowserContext,
  type Page,
} from "@playwright/test";
import { AuthNewAccount } from "../PageObjects/AuthNewAccount";
import { ChatsMainPage } from "../PageObjects/ChatsElements/ChatsMain";
import { CreateOrImportPage } from "../PageObjects/CreateOrImport";
import { LoginPinPage } from "../PageObjects/LoginPin";
import { SaveRecoverySeedPage } from "../PageObjects/SaveRecoverySeed";

// Declare the types of your fixtures.
type MyFixtures = {
  enterPinUserContext: {
    context: BrowserContext;
    page: Page;
    viewport: string;
  };
  singleUserContext: {
    context: BrowserContext;
    page: Page;
    viewport: string;
  };
  firstUserContext: {
    context: BrowserContext;
    page: Page;
    viewport: string;
  };
  secondUserContext: {
    context: BrowserContext;
    page: Page;
    viewport: string;
  };
  thirdUserContext: {
    context: BrowserContext;
    page: Page;
    viewport: string;
  };
};

// Extend base test by providing page object classes as fixtures.
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
  enterPinUserContext: async ({}, use, testInfo) => {
    // Declare all constants required for the precondition steps
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const viewport = testInfo.project.name;
    const createOrImport = new CreateOrImportPage(page, viewport);
    await createOrImport.navigateTo();

    // Pass the context, browser, and page to the test
    await use({
      context,
      page,
      viewport,
    });

    // Close the context and browser after the test is done
    await context.clearCookies();
    await context.clearPermissions();
    await context.close();
  },

  singleUserContext: async ({}, use, testInfo) => {
    // Declare all constants required for the precondition steps
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const viewport = testInfo.project.name;
    const createOrImport = new CreateOrImportPage(page, viewport);
    const authNewAccount = new AuthNewAccount(page, viewport);
    const loginPinPage = new LoginPinPage(page, viewport);
    const saveRecoverySeed = new SaveRecoverySeedPage(page, viewport);
    const chatsMainPage = new ChatsMainPage(page, viewport);

    const username = "test123";
    const status = "fixed status";

    // Start browser
    await createOrImport.navigateTo();

    // Click on Create New Account
    await createOrImport.clickCreateNewAccount();

    // Enter username and Status and click on create account
    await authNewAccount.validateLoadingHeader();
    await authNewAccount.typeOnUsername(username);
    await authNewAccount.typeOnStatus(status);
    await authNewAccount.clickOnCreateAccount();

    // Enter Pin
    await loginPinPage.waitUntilPageIsLoaded();
    await loginPinPage.enterDefaultPin();

    // Click on I Saved It
    await saveRecoverySeed.clickOnSavedIt();

    await chatsMainPage.addSomeone.waitFor({ state: "attached" });
    await page.waitForURL("/chat");

    // Pass the context, browser, and page to the test
    await use({
      context,
      page,
      viewport,
    });

    // Close the context and browser after the test is done
    await context.clearCookies();
    await context.clearPermissions();
    await context.close();
  },

  firstUserContext: async ({}, use, testInfo) => {
    // Declare all constants required for the precondition steps
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const viewport = testInfo.project.name;
    const createOrImport = new CreateOrImportPage(page, viewport);
    const authNewAccount = new AuthNewAccount(page, viewport);
    const loginPinPage = new LoginPinPage(page, viewport);
    const saveRecoverySeed = new SaveRecoverySeedPage(page, viewport);
    const username: string = "ChatUserA";
    const status: string = "status from first user";

    // Start browser one
    await createOrImport.navigateTo();

    // Click on Create New Account
    await createOrImport.clickCreateNewAccount();

    // Enter username and Status and click on create account
    await authNewAccount.validateLoadingHeader();
    await authNewAccount.typeOnUsername(username);
    await authNewAccount.typeOnStatus(status);
    await authNewAccount.clickOnCreateAccount();

    // Enter Pin
    await loginPinPage.waitUntilPageIsLoaded();
    await loginPinPage.enterDefaultPin();

    // Click on I Saved It
    await saveRecoverySeed.clickOnSavedIt();

    // Pass the context, browser, and page to the test
    await use({
      context,
      page,
      viewport,
    });

    // Close the context and browser after the test is done
    await context.clearCookies();
    await context.clearPermissions();
    await context.close();
  },

  secondUserContext: async ({}, use, testInfo) => {
    // Declare all constants required for the precondition steps
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const viewport = testInfo.project.name;
    const createOrImport = new CreateOrImportPage(page, viewport);
    const authNewAccount = new AuthNewAccount(page, viewport);
    const loginPinPage = new LoginPinPage(page, viewport);
    const saveRecoverySeed = new SaveRecoverySeedPage(page, viewport);
    const username: string = "ChatUserB";
    const status: string = "status from second user";

    // Start browser one
    await createOrImport.navigateTo();

    // Click on Create New Account
    await createOrImport.clickCreateNewAccount();

    // Enter username and Status and click on create account
    await authNewAccount.validateLoadingHeader();
    await authNewAccount.typeOnUsername(username);
    await authNewAccount.typeOnStatus(status);
    await authNewAccount.clickOnCreateAccount();

    // Enter Pin
    await loginPinPage.waitUntilPageIsLoaded();
    await loginPinPage.enterDefaultPin();

    // Click on I Saved It
    await saveRecoverySeed.clickOnSavedIt();

    // Pass the context, browser, and page to the test
    await use({
      context,
      page,
      viewport,
    });

    // Close the context and browser after the test is done
    await context.clearCookies();
    await context.clearPermissions();
    await context.close();
  },

  page: async ({ context }, use) => {
    // Declare all constants required for the precondition steps
    const page = await context.newPage();
    await use(page);
    await context.clearCookies();
    await context.clearPermissions();
    await context.close();
  },

  thirdUserContext: async ({}, use, testInfo) => {
    // Declare all constants required for the precondition steps
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const viewport = testInfo.project.name;
    const createOrImport = new CreateOrImportPage(page, viewport);
    const authNewAccount = new AuthNewAccount(page, viewport);
    const loginPinPage = new LoginPinPage(page, viewport);
    const saveRecoverySeed = new SaveRecoverySeedPage(page, viewport);
    const username: string = "ChatUserC";
    const status: string = "status from third user";

    // Start browser one
    await createOrImport.navigateTo();

    // Click on Create New Account
    await createOrImport.clickCreateNewAccount();

    // Enter username and Status and click on create account
    await authNewAccount.validateLoadingHeader();
    await authNewAccount.typeOnUsername(username);
    await authNewAccount.typeOnStatus(status);
    await authNewAccount.clickOnCreateAccount();

    // Enter Pin
    await loginPinPage.waitUntilPageIsLoaded();
    await loginPinPage.enterDefaultPin();

    // Click on I Saved It
    await saveRecoverySeed.clickOnSavedIt();

    // Pass the context, browser, and page to the test
    await use({
      context,
      page,
      viewport,
    });

    // Close the context and browser after the test is done
    await context.clearCookies();
    await context.clearPermissions();
    await context.close();
  },
});

export { expect } from "@playwright/test";
