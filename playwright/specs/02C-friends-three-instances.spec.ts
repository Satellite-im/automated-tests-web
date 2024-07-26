import { test } from "../fixtures/setup";
import { faker } from "@faker-js/faker";

test.describe("Friends tests", () => {
  const username: string = "FirstUser";
  const usernameTwo: string = "SecondUser";
  const usernameThree: string = "ThirdUser";
  const status: string = faker.lorem.sentence(3);
  const statusTwo: string = faker.lorem.sentence(3);
  const statusThree: string = faker.lorem.sentence(3);

  test.beforeEach(
    async ({
      authNewAccountFirst,
      authNewAccountSecond,
      authNewAccountThird,
      chatsMainPageFirst,
      chatsMainPageSecond,
      chatsMainPageThird,
      createOrImportFirst,
      createOrImportSecond,
      createOrImportThird,
      loginPinPageFirst,
      loginPinPageSecond,
      loginPinPageThird,
      saveRecoverySeedFirst,
      saveRecoverySeedSecond,
      saveRecoverySeedThird,
    }) => {
      // Start browser one
      await createOrImportFirst.navigateTo();

      // Start browser two
      await createOrImportSecond.navigateTo();

      // Start browser three
      await createOrImportThird.navigateTo();

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

      // Now with the third user, click on Create New Account
      await createOrImportThird.clickCreateNewAccount();

      // Enter username, status and click on create account
      await authNewAccountThird.validateLoadingHeader();
      await authNewAccountThird.typeOnUsername(usernameThree);
      await authNewAccountThird.typeOnStatus(statusThree);
      await authNewAccountThird.clickOnCreateAccount();

      // Enter a valid pin
      await loginPinPageThird.waitUntilPageIsLoaded();
      await loginPinPageThird.enterDefaultPin();

      // Click on I Saved It
      await saveRecoverySeedThird.clickOnSavedIt();

      // Go to Friends
      await chatsMainPageThird.goToFriends();
    },
  );

  test("H11, H12, H13, H14 - Friend Lists sort and Search Friends tests", async ({
    context1,
    context2,
    context3,
    friendsScreenFirst,
    friendsScreenSecond,
    friendsScreenThird,
  }) => {
    // For first user, grant clipboard permissions, Copy DID and save it into a constant
    await context1.grantPermissions(["clipboard-read", "clipboard-write"]);
    await friendsScreenFirst.copyDIDFromContextMenu();
    const didKeyFirstUser = await friendsScreenFirst.getClipboardContent();

    // For second user, grant clipboard permissions, Copy DID and save it into a constant
    await context2.grantPermissions(["clipboard-read", "clipboard-write"]);
    await friendsScreenSecond.copyDIDFromContextMenu();
    const didKeySecondUser = await friendsScreenSecond.getClipboardContent();

    // For third user, grant clipboard permissions, Copy DID and save it into a constant
    await context3.grantPermissions(["clipboard-read", "clipboard-write"]);
    await friendsScreenThird.copyDIDFromContextMenu();
    const didKeyThirdUser = await friendsScreenThird.getClipboardContent();

    // Now, first user adds the third user as friend
    await friendsScreenFirst.addFriend(didKeyThirdUser);
    await friendsScreenFirst.closeToastNotification();
    await friendsScreenThird.closeToastNotification();

    // After that, first user adds the second user as friend
    await friendsScreenFirst.addFriend(didKeySecondUser);
    await friendsScreenFirst.closeToastNotification();
    await friendsScreenSecond.closeToastNotification();

    // Finally, second user adds the third user as friend
    await friendsScreenSecond.addFriend(didKeyThirdUser);
    await friendsScreenSecond.closeToastNotification();
    await friendsScreenThird.closeToastNotification();

    // Validate order of outgoing requests list is showing first the third user and then the second user
    // H13 - Outgoing friend requests should be listed by first sent
    await friendsScreenFirst.goToRequestList();
    await friendsScreenFirst.validateFriendsList([usernameThree, usernameTwo]);
    await friendsScreenFirst.goToAllFriendsList();

    // H12 - Incoming friend requests should be listed by Newest to Oldest
    await friendsScreenThird.goToRequestList();
    await friendsScreenThird.validateFriendsList([username, usernameTwo]);
    await friendsScreenThird.acceptFriendRequest(usernameTwo, didKeySecondUser);
    await friendsScreenThird.goToAllFriendsList();

    // With Second User, go to requests list and accept friend request
    await friendsScreenSecond.validateFriendsList([usernameThree]);
    await friendsScreenSecond.goToRequestList();
    await friendsScreenSecond.validateFriendsList([username]);
    await friendsScreenSecond.acceptFriendRequest(username, didKeyFirstUser);
    await friendsScreenSecond.goToAllFriendsList();

    // With Third User, go to requests list and accept friend request
    await friendsScreenThird.goToRequestList();
    await friendsScreenThird.validateFriendsList([username]);
    await friendsScreenThird.acceptFriendRequest(username, didKeyFirstUser);
    await friendsScreenThird.goToAllFriendsList();

    // With First User, go to All Friends and validate list is sorted alphabetically
    // H11 - Friends should be listed in alphabetical order
    await friendsScreenFirst.goToAllFriendsList();
    await friendsScreenFirst.validateFriendsList([usernameTwo, usernameThree]);

    // H14 - Blocked users should be displayed alphabetically
    await friendsScreenFirst.blockFriend(usernameThree);
    await friendsScreenFirst.blockFriend(usernameTwo);
    await friendsScreenFirst.goToBlockedList();
    await friendsScreenFirst.validateFriendsList([usernameThree, usernameTwo]);
  });

  test.afterAll(async ({ page1, page2, page3 }) => {
    await page1.close();
    await page2.close();
    await page3.close();
  });
});
