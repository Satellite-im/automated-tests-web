import { test } from "../fixtures/setup";
import { faker } from "@faker-js/faker";

test.describe("Friends tests", () => {
  const username: string = "ChatUserA";
  const usernameTwo: string = "ChatUserB";
  const status: string = faker.lorem.sentence(3);
  const statusTwo: string = faker.lorem.sentence(3);

  test.beforeEach(async ({ createOrImport, createOrImportSecond }) => {
    // Start browser one
    await createOrImport.navigateTo();

    // Start browser two
    await createOrImportSecond.navigateTo();
  });

  test("Create two accounts and add them as friends", async ({
    authNewAccount,
    authNewAccountSecond,
    createOrImport,
    createOrImportSecond,
    loginPinPage,
    loginPinPageSecond,
    chatsMainPage,
    chatsMainPageSecond,
    friendsScreen,
    friendsScreenSecond,
    saveRecoverySeed,
    saveRecoverySeedSecond,
    context,
    context2,
    page,
    page2,
  }) => {
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

    // Go to Friends
    await chatsMainPage.goToFriends();

    // Grant clipboard permissions, Copy DID and save it into a constant
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await friendsScreen.copyDID();
    const handle = await page.evaluateHandle(() =>
      navigator.clipboard.readText(),
    );
    const didKeyFirstUser = await handle.jsonValue();

    // Now with the second user, click on Create New Account
    await createOrImportSecond.clickCreateNewAccount();

    // Enter username, status and click on create account
    await authNewAccountSecond.validateLoadingHeader();
    await authNewAccountSecond.typeOnUsername(usernameTwo);
    await authNewAccountSecond.typeOnStatus(statusTwo);
    await authNewAccountSecond.clickOnCreateAccount();

    // Enter a valid pin
    await loginPinPageSecond.waitUntilPageIsLoaded();
    await loginPinPageSecond.enterDefaultPin();

    // Click on I Saved It
    await saveRecoverySeedSecond.clickOnSavedIt();

    // Go to Friends
    await chatsMainPageSecond.goToFriends();

    // Grant clipboard permissions, Copy DID and save it into a constant
    await context2.grantPermissions(["clipboard-read", "clipboard-write"]);
    await friendsScreenSecond.copyDID();
    const handleTwo = await page2.evaluateHandle(() =>
      navigator.clipboard.readText(),
    );
    const didKeySecondUser = await handleTwo.jsonValue();

    // Now, add the first user as a friend
    await friendsScreenSecond.addFriend(didKeyFirstUser);
    await friendsScreenSecond.goToBlockedList();
    await friendsScreenSecond.goToRequestList();

    // With First User, go to requests list and accept friend request
    await friendsScreen.goToRequestList();
    await friendsScreen.goToAllFriendsList();
    await friendsScreen.goToRequestList();
    await friendsScreen.validateIncomingRequestExists();
    await friendsScreen.acceptFriendRequest(usernameTwo, didKeySecondUser);

    // With First User, go to All Friends and click on Chat Button
    await friendsScreen.goToAllFriendsList();
    await friendsScreen.chatWithFriend(usernameTwo);

    // With Second User, go to All Friends and click on Chat Button
    await friendsScreenSecond.goToRequestList();
    await friendsScreenSecond.goToAllFriendsList();
    await friendsScreenSecond.chatWithFriend(username);
  });

  test.afterAll(async ({ page, page2 }) => {
    await page.close();
    await page2.close();
  });
});
