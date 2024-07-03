import {
  test,
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
  const username: string =
    faker.person.firstName() + faker.number.int({ min: 100, max: 10000 });
  const usernameTwo: string =
    faker.person.firstName() + faker.number.int({ min: 100, max: 10000 });
  const status: string = faker.lorem.sentence(3);
  const statusTwo: string = faker.lorem.sentence(3);
  const pinNumber: string = "1234";

  test.beforeEach(async () => {
    // Setup for first user
    browser1 = await chromium.launch();
    context1 = await browser1.newContext();
    page1 = await context1.newPage();

    // Setup for second user
    browser2 = await chromium.launch();
    context2 = await browser2.newContext();
    page2 = await context2.newPage();

    // Create new login page classes
    loginPinPage = new LoginPinPage(page1);
    loginPinPageSecond = new LoginPinPage(page2);

    // Start browser one
    await loginPinPage.navigateTo();
    await loginPinPage.waitUntilPageIsLoaded();

    // Start browser two
    await loginPinPageSecond.navigateTo();
    await loginPinPageSecond.waitUntilPageIsLoaded();
  });

  test("Create two accounts and add them as friends", async () => {
    // Start page objects from user one
    authNewAccount = new AuthNewAccount(page1);
    chatsMainPage = new ChatsMainPage(page1);
    friendsPage = new FriendsScreen(page1);

    // Start page objects from user two
    authNewAccountSecond = new AuthNewAccount(page2);
    chatsMainPageSecond = new ChatsMainPage(page2);
    friendPageSecond = new FriendsScreen(page2);

    // Enter Pin
    await loginPinPage.enterPin(pinNumber);
    await loginPinPage.clickConfirmButton();

    // Enter username and Status and click on create account
    await authNewAccount.validateLoadingHeader();
    await authNewAccount.typeOnUsername(username);
    await authNewAccount.typeOnStatus(status);
    await authNewAccount.clickOnCreateAccount();

    // Go to Friends
    await chatsMainPage.goToFriends();

    // Grant clipboard permissions, Copy DID and save it into a constant
    await context1.grantPermissions(["clipboard-read", "clipboard-write"]);
    await friendsPage.copyDID();
    const handle = await page1.evaluateHandle(() =>
      navigator.clipboard.readText(),
    );
    const didKeyFirstUser = await handle.jsonValue();

    // Now with the second user, enter a valid pin
    await loginPinPageSecond.enterPin(pinNumber);
    await loginPinPageSecond.clickConfirmButton();

    // Enter username, status and click on create account
    await authNewAccountSecond.validateLoadingHeader();
    await authNewAccountSecond.typeOnUsername(usernameTwo);
    await authNewAccountSecond.typeOnStatus(statusTwo);
    await authNewAccountSecond.clickOnCreateAccount();

    // Go to Friends
    await chatsMainPageSecond.goToFriends();

    // Grant clipboard permissions, Copy DID and save it into a constant
    await context2.grantPermissions(["clipboard-read", "clipboard-write"]);
    await friendPageSecond.copyDID();
    const handleTwo = await page2.evaluateHandle(() =>
      navigator.clipboard.readText(),
    );
    const didKeySecondUser = await handleTwo.jsonValue();

    // Now, add the first user as a friend
    await friendPageSecond.addFriend(didKeyFirstUser);

    // With First User, go to requests list and accept friend request
    await friendsPage.goToRequestList();
    await friendsPage.validateIncomingRequestExists();
    await friendsPage.acceptFriendRequest(didKeySecondUser);

    // With First User, go to All Friends and click on Chat Button
    await friendsPage.goToAllFriendsList();
    await friendsPage.chatWithFriend(didKeySecondUser);

    // With Second User, go to All Friends and click on Chat Button
    await friendPageSecond.goToRequestList();
    await friendPageSecond.goToAllFriendsList();
    await friendPageSecond.chatWithFriend(didKeyFirstUser);
  });
});
