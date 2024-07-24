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

  test("Send a friend request to remote user - Remote user accepts friend request", async ({
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

  test("Send a friend request to remote user - Remote user denies friend request", async ({
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

    // Now, add the first user as a friend
    await friendsScreenSecond.addFriend(didKeyFirstUser);
    await friendsScreenSecond.goToBlockedList();
    await friendsScreenSecond.goToRequestList();

    // With First User, go to requests list and accept friend request
    await friendsScreenFirst.goToRequestList();
    await friendsScreenFirst.goToAllFriendsList();
    await friendsScreenFirst.goToRequestList();
    await friendsScreenFirst.validateIncomingRequestExists();
    await friendsScreenFirst.denyFriendRequest(usernameTwo);
  });

  test.only("H1, H2, H3, H4, H5 - User can navigate through friends pages", async ({
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
      "rgb(77, 77, 255)",
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
      "rgb(77, 77, 255)",
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
      "rgb(77, 77, 255)",
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
    await expect(friendsScreenFirst.labelAddSomeone).toHaveText(
      "Add Someone Users",
    );
    await expect(friendsScreenFirst.labelSearchFriends).toBeVisible();
    await expect(friendsScreenFirst.labelSearchFriends).toHaveText(
      "Search Friends",
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

  test.skip("H6 - Checkmark with Request Dispatched! Your request is making it's way should appear after adding a user", async ({
    friendsScreenFirst,
    friendsScreenSecond,
    context1,
    context2,
    page1,
    page2,
  }) => {});

  test.skip("H7 - Green border should appear around Add Someone textbox when user pastes a correct did:key into the input box", async ({
    friendsScreenFirst,
    friendsScreenSecond,
    context1,
    context2,
    page1,
    page2,
  }) => {});

  test.skip("H8 - Highlighted border should appear when clicking into the Search Friends input box", async ({
    friendsScreenFirst,
    friendsScreenSecond,
    context1,
    context2,
    page1,
    page2,
  }) => {});

  test.skip("H9 - Clicking the Copy button should copy your personal did:key", async ({
    friendsScreenFirst,
    friendsScreenSecond,
    context1,
    context2,
    page1,
    page2,
  }) => {});

  test.skip("H10 - Friends should be listed in alphabetical order", async ({
    friendsScreenFirst,
    friendsScreenSecond,
    context1,
    context2,
    page1,
    page2,
  }) => {});

  test.skip("H11 - Incoming friend requests should be listed by Newest to Oldest", async ({
    friendsScreenFirst,
    friendsScreenSecond,
    context1,
    context2,
    page1,
    page2,
  }) => {});

  test.skip("H12 - Outgoing friend requests should be listed by last sent", async ({
    friendsScreenFirst,
    friendsScreenSecond,
    context1,
    context2,
    page1,
    page2,
  }) => {});

  test.skip("H13 - Blocked users should be displayed alphabetically", async ({
    friendsScreenFirst,
    friendsScreenSecond,
    context1,
    context2,
    page1,
    page2,
  }) => {});

  test.skip("H14 - User should be removed from friends list after clicking unfriend", async ({
    friendsScreenFirst,
    friendsScreenSecond,
    context1,
    context2,
    page1,
    page2,
  }) => {});

  test.skip("H15 - Clicking block should block user", async ({
    friendsScreenFirst,
    friendsScreenSecond,
    context1,
    context2,
    page1,
    page2,
  }) => {});

  test.skip("H16 - User should be displayed under Blocked Users after you block them", async ({
    friendsScreenFirst,
    friendsScreenSecond,
    context1,
    context2,
    page1,
    page2,
  }) => {});

  test.skip("H17 - User should be cleared from Blocked Users after you unblock them", async ({
    friendsScreenFirst,
    friendsScreenSecond,
    context1,
    context2,
    page1,
    page2,
  }) => {});

  test.afterAll(async ({ page1, page2 }) => {
    await page1.close();
    await page2.close();
  });
});
