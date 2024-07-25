import { test, expect } from "../fixtures/setup";
import { faker } from "@faker-js/faker";

test.describe("Friends tests", () => {
  const username: string = "ChatUserA";
  const usernameTwo: string = "ChatUserB";
  const status: string = faker.lorem.sentence(3);
  const statusTwo: string = faker.lorem.sentence(3);

  test.beforeEach(
    async ({
      authNewAccountFirst,
      authNewAccountSecond,
      chatsMainPageFirst,
      chatsMainPageSecond,
      createOrImportFirst,
      createOrImportSecond,
      loginPinPageFirst,
      loginPinPageSecond,
      saveRecoverySeedFirst,
      saveRecoverySeedSecond,
    }) => {
      // Start browser one
      await createOrImportFirst.navigateTo();

      // Start browser two
      await createOrImportSecond.navigateTo();

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
    },
  );

  test.skip("H15 - User should be removed from friends list after clicking unfriend", async ({}) => {
    // H15 - User should be removed from friends list after clicking unfriend
  });

  test.skip("H16, H17, H18, H26 - User can be block/unblocked", async ({}) => {
    // H16 - Clicking block should block user
    // H17 - User should be displayed under Blocked Users after you block them
    // H18 - User should be cleared from Blocked Users after you unblock them
    // H26 - User can unblock a user and add again the same user
  });

  test("H6, H19 - User can send a friend request and remote user can accept it", async ({
    friendsScreenFirst,
    friendsScreenSecond,
    context1,
    context2,
    page1,
    page2,
  }) => {
    // Grant clipboard permissions, Copy DID and save it into a constant
    await context1.grantPermissions(["clipboard-read", "clipboard-write"]);
    await friendsScreenFirst.copyDID();
    const handle = await page1.evaluateHandle(() =>
      navigator.clipboard.readText(),
    );
    const didKeyFirstUser = await handle.jsonValue();

    // Grant clipboard permissions, Copy DID and save it into a constant
    await context2.grantPermissions(["clipboard-read", "clipboard-write"]);
    await friendsScreenSecond.copyDID();
    const handleTwo = await page2.evaluateHandle(() =>
      navigator.clipboard.readText(),
    );
    const didKeySecondUser = await handleTwo.jsonValue();

    // Now, add the first user as a friend
    await friendsScreenSecond.addFriend(didKeyFirstUser);

    // H6 - Toast Notification with Your request is making it's way! should appear after sending a friend request
    await friendsScreenSecond.validateToastRequestSent();
    await friendsScreenFirst.waitForToastNotificationToDisappear();
    await friendsScreenSecond.waitForToastNotificationToDisappear();

    // With First User, go to requests list and accept friend request

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

  test("H7, H20 - User can send a friend request and remote user can deny it", async ({
    friendsScreenFirst,
    friendsScreenSecond,
    context1,
    context2,
    page1,
  }) => {
    // Grant clipboard permissions, Copy DID and save it into a constant
    await context1.grantPermissions(["clipboard-read", "clipboard-write"]);
    await friendsScreenFirst.copyDID();
    const handle = await page1.evaluateHandle(() =>
      navigator.clipboard.readText(),
    );
    const didKeyFirstUser = await handle.jsonValue();

    // Grant clipboard permissions, Copy DID and save it into a constant
    await context2.grantPermissions(["clipboard-read", "clipboard-write"]);
    await friendsScreenSecond.copyDID();

    // Now, add the first user as a friend
    await friendsScreenSecond.addFriend(didKeyFirstUser);
    await friendsScreenFirst.validateToastRequestReceived("ChatUserB");
    await friendsScreenFirst.waitForToastNotificationToDisappear();
    await friendsScreenSecond.waitForToastNotificationToDisappear();

    // H7 - Toast Notification with Username sent a request. should appear after receiving a friend request
    await friendsScreenSecond.waitForToastNotificationToDisappear();
    await friendsScreenSecond.goToBlockedList();
    await friendsScreenSecond.goToRequestList();

    // With First User, go to requests list and deny friend request
    await friendsScreenFirst.goToRequestList();
    await friendsScreenFirst.goToAllFriendsList();
    await friendsScreenFirst.goToRequestList();
    await friendsScreenFirst.validateIncomingRequestExists();
    await friendsScreenFirst.denyFriendRequest(usernameTwo);

    // Validate incoming list now shows empty on user who received and denied the friend request
    await friendsScreenFirst.textNoIncomingRequests.waitFor({
      state: "attached",
    });
    await expect(friendsScreenFirst.textNoIncomingRequests).toHaveText(
      "No inbound requests.",
    );

    // Validate outgoing list now shows empty on user who sent the friend request
    await friendsScreenSecond.textNoOutgoingRequests.waitFor({
      state: "attached",
    });
    await expect(friendsScreenSecond.textNoOutgoingRequests).toHaveText(
      "No outbound requests.",
    );
  });

  test.skip("H21 - User can send a friend request and cancel request before other user replies to it", async ({}) => {
    // H21 - User can send a friend request and cancel request before other user replies to it
  });

  test.afterAll(async ({ page1, page2 }) => {
    await page1.close();
    await page2.close();
  });
});
