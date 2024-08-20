import { chromium, firefox } from "@playwright/test";
import { CreateOrImportPage } from "playwright/PageObjects/CreateOrImport";
import { AuthNewAccount } from "playwright/PageObjects/AuthNewAccount";
import { LoginPinPage } from "playwright/PageObjects/LoginPin";
import { SaveRecoverySeedPage } from "playwright/PageObjects/SaveRecoverySeed";
import { ChatsMainPage } from "playwright/PageObjects/ChatsMain";
import { faker } from "@faker-js/faker";

export async function setupFirstUser() {
  // Declare all constants required for the precondition steps
  const browser1 = await chromium.launch();
  const context1 = await browser1.newContext();
  const page1 = await context1.newPage();
  const createOrImportFirst = new CreateOrImportPage(page1);
  const authNewAccountFirst = new AuthNewAccount(page1);
  const loginPinPageFirst = new LoginPinPage(page1);
  const saveRecoverySeedFirst = new SaveRecoverySeedPage(page1);
  const chatsMainPageFirst = new ChatsMainPage(page1);
  const username: string = "ChatUserA";
  const statusFirst: string = faker.lorem.sentence(3);

  // Start browser one
  await createOrImportFirst.navigateTo();
  // Start browser two
  await createOrImportFirst.navigateTo();

  // Click on Create New Account
  await createOrImportFirst.clickCreateNewAccount();

  // Enter username and Status and click on create account
  await authNewAccountFirst.validateLoadingHeader();
  await authNewAccountFirst.typeOnUsername(username);
  await authNewAccountFirst.typeOnStatus(statusFirst);
  await authNewAccountFirst.clickOnCreateAccount();

  // Enter Pin
  await loginPinPageFirst.waitUntilPageIsLoaded();
  await loginPinPageFirst.enterDefaultPin();

  // Click on I Saved It
  await saveRecoverySeedFirst.clickOnSavedIt();

  // Go to Friends
  await chatsMainPageFirst.goToFriends();

  // Return the necessary objects for further interaction in the test
  return { browser1, context1, page1, chatsMainPageFirst, username };
}

export async function setupSecondUser() {
  // Declare all constants required for the precondition steps
  const browser2 = await firefox.launch();
  const context2 = await browser2.newContext();
  const page2 = await context2.newPage();
  const createOrImportSecond = new CreateOrImportPage(page2);
  const authNewAccountSecond = new AuthNewAccount(page2);
  const loginPinPageSecond = new LoginPinPage(page2);
  const saveRecoverySeedSecond = new SaveRecoverySeedPage(page2);
  const chatsMainPageSecond = new ChatsMainPage(page2);
  const usernameTwo: string = "ChatUserB";
  const statusSecond: string = faker.lorem.sentence(3);

  // Start browser one
  await createOrImportSecond.navigateTo();
  // Start browser two
  await createOrImportSecond.navigateTo();

  // Click on Create New Account
  await createOrImportSecond.clickCreateNewAccount();

  // Enter username and Status and click on create account
  await authNewAccountSecond.validateLoadingHeader();
  await authNewAccountSecond.typeOnUsername(usernameTwo);
  await authNewAccountSecond.typeOnStatus(statusSecond);
  await authNewAccountSecond.clickOnCreateAccount();

  // Enter Pin
  await loginPinPageSecond.waitUntilPageIsLoaded();
  await loginPinPageSecond.enterDefaultPin();

  // Click on I Saved It
  await saveRecoverySeedSecond.clickOnSavedIt();

  // Go to Friends
  await chatsMainPageSecond.goToFriends();

  // Return the necessary objects for further interaction in the test
  return { browser2, context2, page2, chatsMainPageSecond, usernameTwo };
}
