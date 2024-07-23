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
    authNewAccountFirst,
    authNewAccountSecond,
    createOrImportFirst,
    createOrImportSecond,
    loginPinPageFirst,
    loginPinPageSecond,
    chatsMainPageFirst,
    chatsMainPageSecond,
    friendsScreenFirst,
    friendsScreenSecond,
    saveRecoverySeedFirst,
    saveRecoverySeedSecond,
    context1,
    context2,
    page1,
    page2,
  }) => {
    // Click on Create New Account
    await createOrImportFirst.clickCreateNewAccount();

    // Enter username and Status and click on create account
    await authNewAccountFirst.validateLoadingHeader();
    await authNewAccountFirst.typeOnUsername(username);
    await authNewAccountFirst.typeOnStatus(status);
    await authNewAccountFirst.clickOnCreateAccount();

    // Enter Pin
    await loginPinPageFirst.waitUntilPageIsLoaded();
    await loginPinPageFirst.enterDefaultPin();

    // Click on I Saved It
    await saveRecoverySeedFirst.clickOnSavedIt();

    // Go to Friends
    await chatsMainPageFirst.goToFriends();

    // Grant clipboard permissions, Copy DID and save it into a constant
    await context1.grantPermissions(["clipboard-read", "clipboard-write"]);
    await friendsScreenFirst.copyDID();
    const handle = await page1.evaluateHandle(() =>
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
    await friendsScreenFirst.goToRequestList();
    await friendsScreenFirst.goToAllFriendsList();
    await friendsScreenFirst.goToRequestList();
    await friendsScreenFirst.validateIncomingRequestExists();
    await friendsScreenFirst.acceptFriendRequest(usernameTwo, didKeySecondUser);

    // With First User, go to All Friends and click on Chat Button
    await friendsScreenFirst.goToAllFriendsList();
    await friendsScreenFirst.chatWithFriend(usernameTwo);

    // With Second User, go to All Friends and click on Chat Button
    await friendsScreenSecond.goToRequestList();
    await friendsScreenSecond.goToAllFriendsList();
    await friendsScreenSecond.chatWithFriend(username);
  });

  test.afterAll(async ({ page1, page2 }) => {
    await page1.close();
    await page2.close();
  });
});
