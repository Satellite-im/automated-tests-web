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

  test("H1, H2, H3, H4, H5 - User can navigate through friends pages", async ({
    friendsScreenFirst,
  }) => {
    // H2 - Clicking Active should take you to Active page within Friends
    await friendsScreenFirst.goToRequestList();
    await expect(friendsScreenFirst.buttonFriendsAll).toHaveCSS(
      "background-color",
      "rgb(33, 38, 58)",
    );
    await expect(friendsScreenFirst.buttonFriendsActive).toHaveCSS(
      "background-color",
      "color(srgb 0.371765 0.371765 1)",
    );
    await expect(friendsScreenFirst.buttonFriendsBlocked).toHaveCSS(
      "background-color",
      "rgb(33, 38, 58)",
    );
    await expect(friendsScreenFirst.labelIncomingRequests).toHaveText(
      "Incoming Requests",
    );
    await expect(friendsScreenFirst.textNoIncomingRequests).toBeVisible();
    await expect(friendsScreenFirst.textNoIncomingRequests).toHaveText(
      "No inbound requests.",
    );
    await expect(friendsScreenFirst.labelOutgoingRequests).toBeVisible();
    await expect(friendsScreenFirst.labelOutgoingRequests).toHaveText(
      "Outgoing Requests",
    );
    await expect(friendsScreenFirst.textNoOutgoingRequests).toBeVisible();
    await expect(friendsScreenFirst.textNoOutgoingRequests).toHaveText(
      "No outbound requests.",
    );

    // H3 - Clicking Blocked should take you to Blocked page within Friends
    await friendsScreenFirst.goToBlockedList();
    await expect(friendsScreenFirst.buttonFriendsAll).toHaveCSS(
      "background-color",
      "rgb(33, 38, 58)",
    );
    await expect(friendsScreenFirst.buttonFriendsActive).toHaveCSS(
      "background-color",
      "rgb(33, 38, 58)",
    );
    await expect(friendsScreenFirst.buttonFriendsBlocked).toHaveCSS(
      "background-color",
      "color(srgb 0.371765 0.371765 1)",
    );
    await expect(friendsScreenFirst.labelBlockedUsers).toBeVisible();
    await expect(friendsScreenFirst.labelBlockedUsers).toHaveText(
      "Blocked Users",
    );
    await expect(friendsScreenFirst.textNoBlockedUsers).toBeVisible();
    await expect(friendsScreenFirst.textNoBlockedUsers).toHaveText(
      "No users blocked.",
    );

    // H1 - Clicking All should take you to All page within Friends
    await friendsScreenFirst.goToAllFriendsList();
    await expect(friendsScreenFirst.buttonFriendsAll).toHaveCSS(
      "background-color",
      "color(srgb 0.371765 0.371765 1)",
    );
    await expect(friendsScreenFirst.buttonFriendsActive).toHaveCSS(
      "background-color",
      "rgb(33, 38, 58)",
    );
    await expect(friendsScreenFirst.buttonFriendsBlocked).toHaveCSS(
      "background-color",
      "rgb(33, 38, 58)",
    );
    await expect(friendsScreenFirst.labelAddSomeone).toBeVisible();
    await expect(friendsScreenFirst.labelAddSomeone).toHaveText("Add Someone");
    await expect(friendsScreenFirst.labelSearchFriends).toBeVisible();
    await expect(friendsScreenFirst.labelSearchFriends).toHaveText(
      "Search friends",
    );

    // H4 - Highlighted border should appear after clicking into Add Someone - Search Friends input box
    await friendsScreenFirst.inputAddFriend.focus();
    await expect(friendsScreenFirst.inputContainerAddFriend).toHaveCSS(
      "box-shadow",
      "rgb(77, 77, 255) 0px 0px 0px 1px",
    );

    await friendsScreenFirst.inputSearchFriends.focus();
    await expect(friendsScreenFirst.inputContainerSearchFriends).toHaveCSS(
      "box-shadow",
      "rgb(77, 77, 255) 0px 0px 0px 1px",
    );

    // H5 - User should not be able to click Add until they have pasted did:key
    await expect(friendsScreenFirst.buttonAddFriend).toBeDisabled();
  });

  test("H20 - User can send a friend request and remote user can accept it", async ({
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

    // Validate toast notifications for friend request sent and received are shown on both users
    await friendsScreenSecond.validateToastRequestSent();
    await friendsScreenFirst.validateToastRequestReceived("ChatUserB");
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

  test("H21 - User can send a friend request and remote user can deny it", async ({
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
    await friendsScreenSecond.validateToastRequestSent();
    await friendsScreenFirst.validateToastRequestReceived("ChatUserB");
    await friendsScreenFirst.waitForToastNotificationToDisappear();
    await friendsScreenSecond.waitForToastNotificationToDisappear();

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

  test.afterAll(async ({ page1, page2 }) => {
    await page1.close();
    await page2.close();
  });
});
