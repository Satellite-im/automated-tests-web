import {
  test,
  expect,
  chromium,
  Browser,
  BrowserContext,
  Page,
} from "@playwright/test";
import { LoginPinPage } from "./PageObjects/LoginPin";
import { faker } from "@faker-js/faker";
import { AuthNewAccount } from "./PageObjects/AuthNewAccount";
import { ChatsMainPage } from "./PageObjects/ChatsMain";
import { FriendsScreen } from "./PageObjects/FriendsScreen";

let browser1: Browser, context1: BrowserContext, page1: Page;
let browser2: Browser, context2: BrowserContext, page2: Page;
let loginPinPage: LoginPinPage, loginPinPageSecond: LoginPinPage;
let authNewAccount: AuthNewAccount, authNewAccountSecond: AuthNewAccount;
let chatsMainPage: ChatsMainPage, chatsMainPageSecond: ChatsMainPage;
let friendsPage: FriendsScreen, friendPageSecond: FriendsScreen;

test.describe("Friends tests", () => {
  const username: string = faker.internet.userName();
  const status: string = faker.lorem.sentence(3);
  const usernameTwo: string = faker.internet.userName();
  const statusTwo: string = faker.lorem.sentence(3);
  const pinNumber: string = "1234";

  test.beforeEach(async () => {
    // All with first user
    browser1 = await chromium.launch();
    context1 = await browser1.newContext();
    page1 = await context1.newPage();

    browser2 = await chromium.launch();
    context2 = await browser2.newContext();
    page2 = await context2.newPage();

    loginPinPage = new LoginPinPage(page1);
    loginPinPageSecond = new LoginPinPage(page2);

    await loginPinPage.navigateTo();
    await loginPinPage.waitUntilPageIsLoaded();

    await loginPinPageSecond.navigateTo();
    await loginPinPageSecond.waitUntilPageIsLoaded();
  });

  test("Create two accounts and add them as friends", async () => {
    authNewAccount = new AuthNewAccount(page1);
    chatsMainPage = new ChatsMainPage(page1);
    friendPage = new FriendsScreen(page1);

    authNewAccountSecond = new AuthNewAccount(page2);
    chatsMainPageSecond = new ChatsMainPage(page2);
    friendPageSecond = new FriendsScreen(page2);

    await loginPinPage.enterPin(pinNumber);
    await loginPinPage.pinButtonConfirm.click();
    await authNewAccount.validateLoadingHeader();
    await page1.waitForURL("/auth/new_account");
    await expect(authNewAccount.textNewAccountSecondary).toHaveText(
      "Let's set up your new account. Please choose a username below.",
    );
    await expect(authNewAccount.labelNewAccountUsername).toHaveText("Username");
    await expect(authNewAccount.labelNewAccountStatus).toHaveText(
      "Status Message",
    );
    await expect(authNewAccount.profilePictureNewAccount).toBeVisible();
    await expect(authNewAccount.buttonNewAccountGoBack).toBeVisible();
    await expect(authNewAccount.buttonNewAccountCreate).toBeVisible();
    await authNewAccount.typeOnUsername(username);
    await authNewAccount.typeOnStatus(status);
    await authNewAccount.buttonNewAccountCreate.click();
    await chatsMainPage.addSomeone.waitFor({ state: "visible" });
    await page1.waitForURL("/chat");

    // All with second user
    await loginPinPageSecond.enterPin(pinNumber);
    await loginPinPageSecond.pinButtonConfirm.click();
    await authNewAccountSecond.validateLoadingHeader();
    await page2.waitForURL("/auth/new_account");
    await expect(authNewAccountSecond.textNewAccountSecondary).toHaveText(
      "Let's set up your new account. Please choose a username below.",
    );
    await expect(authNewAccountSecond.labelNewAccountUsername).toHaveText(
      "Username",
    );
    await expect(authNewAccountSecond.labelNewAccountStatus).toHaveText(
      "Status Message",
    );
    await expect(authNewAccountSecond.profilePictureNewAccount).toBeVisible();
    await expect(authNewAccountSecond.buttonNewAccountGoBack).toBeVisible();
    await expect(authNewAccountSecond.buttonNewAccountCreate).toBeVisible();
    await authNewAccountSecond.typeOnUsername(usernameTwo);
    await authNewAccountSecond.typeOnStatus(statusTwo);
    await authNewAccountSecond.buttonNewAccountCreate.click();
    await chatsMainPageSecond.addSomeone.waitFor({ state: "visible" });
    await page2.waitForURL("/chat");

    await chatsMainPageSecond.goToFriends();
    await friendPageSecond.validateURL();

    await chatsMainPage.goToFriends();
    await friendsPage.validateURL();
  });
});
