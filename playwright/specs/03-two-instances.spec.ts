import { test, expect } from "../fixtures/setup";
import { faker } from "@faker-js/faker";

test.describe("Two instances tests", () => {
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

      // B1 - User should land on this page after logging in - Validated during account creation tests
      // B2 - Clicking "Add Friends" should navigate you to Friends page
      await chatsMainPageFirst.buttonAddFriends.click();

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

      // B1 - User should land on this page after logging in - Validated during account creation tests
      // B2 - Clicking "Add Friends" should navigate you to Friends page
      await chatsMainPageSecond.buttonAddFriends.click();
    },
  );

  test("H15 - User should be removed from friends list after clicking unfriend", async ({
    context1,
    context2,
    friendsScreenFirst,
    friendsScreenSecond,
    page1,
  }) => {
    // H15 - User should be removed from friends list after clicking unfriend
    // Grant clipboard permissions, Copy DID and save it into a constant
    await context1.grantPermissions(["clipboard-read", "clipboard-write"]);
    await friendsScreenFirst.copyDIDFromContextMenu();
    const handle = await page1.evaluateHandle(() =>
      navigator.clipboard.readText(),
    );
    const didKeyFirstUser = await handle.jsonValue();

    // Grant clipboard permissions, Copy DID and save it into a constant
    await context2.grantPermissions(["clipboard-read", "clipboard-write"]);
    await friendsScreenSecond.copyDIDFromContextMenu();

    // Now, add the first user as a friend
    await friendsScreenSecond.addFriend(didKeyFirstUser);
    await friendsScreenFirst.waitForToastNotificationToDisappear();
    await friendsScreenSecond.waitForToastNotificationToDisappear();

    // With First User, go to requests list and accept friend request
    await friendsScreenFirst.goToRequestList();
    await friendsScreenFirst.validateIncomingRequestExists();
    await friendsScreenFirst.acceptFriendRequest(usernameTwo);

    // With First User, go to All Friends
    await friendsScreenFirst.goToAllFriendsList();

    // With Second User, go to All Friends and click on Remove Friend button
    await friendsScreenSecond.goToRequestList();
    await friendsScreenSecond.goToAllFriendsList();

    // Validate Friend List is displayed for letter "C"
    await friendsScreenSecond.validateFriendListIsDisplayed("C");
    let currentFriendsSecondUser =
      await friendsScreenSecond.getListOfCurrentFriends();
    expect(currentFriendsSecondUser).toEqual([username]);

    // Now remove the user from friends
    await friendsScreenSecond.removeFriend(username);
    await friendsScreenSecond.validateFriendListDoesNotExist("C");
    currentFriendsSecondUser =
      await friendsScreenSecond.getListOfCurrentFriends();
    expect(currentFriendsSecondUser).toEqual([]);

    // Validate remote user has friend list empty as well
    await friendsScreenFirst.validateFriendListDoesNotExist("C");
    const currentFriendsFirstUser =
      await friendsScreenFirst.getListOfCurrentFriends();
    expect(currentFriendsFirstUser).toEqual([]);
  });

  test("H16, H17, H18, H26 - User can be block/unblocked", async ({
    context1,
    context2,
    friendsScreenFirst,
    friendsScreenSecond,
    page1,
  }) => {
    // Grant clipboard permissions, Copy DID and save it into a constant
    await context1.grantPermissions(["clipboard-read", "clipboard-write"]);
    await friendsScreenFirst.copyDIDFromContextMenu();
    const handle = await page1.evaluateHandle(() =>
      navigator.clipboard.readText(),
    );
    const didKeyFirstUser = await handle.jsonValue();

    // Grant clipboard permissions, Copy DID and save it into a constant
    await context2.grantPermissions(["clipboard-read", "clipboard-write"]);
    await friendsScreenSecond.copyDIDFromContextMenu();

    // Now, add the first user as a friend
    await friendsScreenSecond.addFriend(didKeyFirstUser);
    await friendsScreenSecond.waitForToastNotificationToDisappear();

    // With First User, go to requests list and accept friend request
    await friendsScreenFirst.waitForToastNotificationToDisappear();
    await friendsScreenFirst.goToRequestList();
    await friendsScreenFirst.validateIncomingRequestExists();
    await friendsScreenFirst.acceptFriendRequest(usernameTwo);
    await friendsScreenFirst.goToAllFriendsList();
    await friendsScreenFirst.validateFriendListIsDisplayed("C");

    // With Second User, go to All Friends
    await friendsScreenSecond.goToRequestList();
    await friendsScreenSecond.goToAllFriendsList();
    await friendsScreenSecond.validateFriendListIsDisplayed("C");

    // H16 - Clicking block should block user
    await friendsScreenSecond.blockFriend(username);
    await friendsScreenSecond.validateFriendListDoesNotExist("C");

    // Second user should no longer see the other friend once it is blocked
    await friendsScreenFirst.validateFriendListDoesNotExist("C");

    // H17 - User should be displayed under Blocked Users after you block them
    await friendsScreenSecond.goToBlockedList();
    await friendsScreenSecond.validateBlockedUserExists();
    await friendsScreenSecond.validateUserIsBlocked(username);

    // H18 - User should be cleared from Blocked Users after you unblock them
    // H26 - User can unblock a user and add again the same user
    await friendsScreenSecond.unblockFriend(username);
    await friendsScreenSecond.validateNoBlockedUsersExist();
    await friendsScreenSecond.goToAllFriendsList();

    // Now, send again the friend request to the unblocked user
    await friendsScreenSecond.addFriend(didKeyFirstUser);
    await friendsScreenSecond.waitForToastNotificationToDisappear();

    // With First User, go to requests list and see the friend request displayed
    await friendsScreenFirst.closeToastNotification();
    await friendsScreenFirst.goToRequestList();
    await friendsScreenFirst.validateIncomingRequestExists();
    await friendsScreenFirst.denyFriendRequest(usernameTwo);
  });

  test("H6, H19 - User can send a friend request and remote user can accept it", async ({
    chatsMainPageSecond,
    friendsScreenFirst,
    friendsScreenSecond,
    context1,
    context2,
    page1,
    page2,
  }) => {
    // Grant clipboard permissions, Copy DID and save it into a constant
    await context1.grantPermissions(["clipboard-read", "clipboard-write"]);
    await friendsScreenFirst.copyDIDFromContextMenu();
    const handle = await page1.evaluateHandle(() =>
      navigator.clipboard.readText(),
    );
    const didKeyFirstUser = await handle.jsonValue();

    // Grant clipboard permissions, Copy DID and save it into a constant
    await context2.grantPermissions(["clipboard-read", "clipboard-write"]);
    await friendsScreenSecond.copyDIDFromContextMenu();

    // Now, add the first user as a friend
    await friendsScreenSecond.addFriend(didKeyFirstUser);

    // H6 - Toast Notification with Your request is making it's way! should appear after sending a friend request
    await friendsScreenSecond.validateToastRequestSent();
    await friendsScreenFirst.waitForToastNotificationToDisappear();
    await friendsScreenSecond.waitForToastNotificationToDisappear();

    // With First User, go to requests list and accept friend request
    await friendsScreenFirst.goToRequestList();
    await friendsScreenFirst.validateIncomingRequestExists();
    await friendsScreenFirst.acceptFriendRequest(usernameTwo);

    // With First User, go to All Friends and click on Chat Button
    await friendsScreenFirst.goToAllFriendsList();
    await friendsScreenFirst.chatWithFriend(usernameTwo);

    // With Second User, go to All Friends and click on Chat Button
    await friendsScreenSecond.goToRequestList();
    await friendsScreenSecond.goToAllFriendsList();
    await friendsScreenSecond.chatWithFriend(username);

    // Remove user as friend
    await chatsMainPageSecond.goToFriends();
    await page2.waitForURL("/friends");
    await friendsScreenSecond.removeFriend(username);
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
    await friendsScreenFirst.copyDIDFromContextMenu();
    const handle = await page1.evaluateHandle(() =>
      navigator.clipboard.readText(),
    );
    const didKeyFirstUser = await handle.jsonValue();

    // Grant clipboard permissions, Copy DID and save it into a constant
    await context2.grantPermissions(["clipboard-read", "clipboard-write"]);
    await friendsScreenSecond.copyDIDFromContextMenu();

    // Now, add the first user as a friend
    await friendsScreenSecond.addFriend(didKeyFirstUser);

    // H7 - Skipped validation Toast Notification with Username sent a request. should appear after receiving a friend request
    //await friendsScreenFirst.validateToastRequestReceived("ChatUserB");
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
    await friendsScreenFirst.validateNoIncomingRequestsExist();

    // Validate outgoing list now shows empty on user who sent the friend request
    await friendsScreenSecond.validateNoOutgoingRequestsExist();
  });

  test("H21 - User can send a friend request and cancel request before other user replies to it", async ({
    context1,
    context2,
    friendsScreenFirst,
    friendsScreenSecond,
    page1,
  }) => {
    // H21 - User can send a friend request and cancel request before other user replies to it
    // Grant clipboard permissions, Copy DID and save it into a constant
    await context1.grantPermissions(["clipboard-read", "clipboard-write"]);
    await friendsScreenFirst.copyDIDFromContextMenu();
    const handle = await page1.evaluateHandle(() =>
      navigator.clipboard.readText(),
    );
    const didKeyFirstUser = await handle.jsonValue();

    // Grant clipboard permissions, Copy DID and save it into a constant
    await context2.grantPermissions(["clipboard-read", "clipboard-write"]);
    await friendsScreenSecond.copyDIDFromContextMenu();

    // Now, add the first user as a friend
    await friendsScreenSecond.addFriend(didKeyFirstUser);
    await friendsScreenSecond.waitForToastNotificationToDisappear();
    await friendsScreenSecond.goToRequestList();
    await friendsScreenSecond.validateOutgoingRequestExists();

    // With First User, go to requests list and validate friend request was received
    await friendsScreenFirst.waitForToastNotificationToDisappear();
    await friendsScreenFirst.goToRequestList();
    await friendsScreenFirst.validateIncomingRequestExists();

    // With Second User, cancel the outgoing request
    await friendsScreenSecond.cancelFriendRequest(username);
    await friendsScreenSecond.validateNoOutgoingRequestsExist();

    // With First User, validate incoming request no longer exists
    await friendsScreenFirst.validateNoIncomingRequestsExist();
  });

  test("B1 to B6, B16 and B17, B35 to B37 - Landing to Chats Page elements and basic send/receive text message flow", async ({
    chatsMainPageFirst,
    chatsMainPageSecond,
    context1,
    context2,
    friendsScreenFirst,
    friendsScreenSecond,
    page1,
    page2,
  }) => {
    // Grant clipboard permissions, Copy DID and save it into a constant
    await context1.grantPermissions(["clipboard-read", "clipboard-write"]);
    await friendsScreenFirst.copyDIDFromContextMenu();
    const handle = await page1.evaluateHandle(() =>
      navigator.clipboard.readText(),
    );
    const didKeyFirstUser = await handle.jsonValue();

    // Grant clipboard permissions, Copy DID and save it into a constant
    await context2.grantPermissions(["clipboard-read", "clipboard-write"]);
    await friendsScreenSecond.copyDIDFromContextMenu();

    // Now, add the first user as a friend
    await friendsScreenSecond.addFriend(didKeyFirstUser);

    // Toast Notification with Your request is making it's way! should appear after sending a friend request
    await friendsScreenSecond.waitForToastNotificationToDisappear();
    await friendsScreenFirst.waitForToastNotificationToDisappear();

    // Go to Outbound requests and validate the request is displayed
    await friendsScreenSecond.goToRequestList();
    await friendsScreenSecond.validateOutgoingRequestExists();

    // With First User, go to requests list and accept friend request
    await friendsScreenFirst.goToRequestList();
    await friendsScreenFirst.validateIncomingRequestExists();
    await friendsScreenFirst.acceptFriendRequest(usernameTwo);

    // With First User, go to All Friends and click on Chat Button
    await friendsScreenFirst.goToAllFriendsList();
    await friendsScreenFirst.chatWithFriend(usernameTwo);
    await page1.waitForURL("/chat");

    // With Second User, go to All Friends and click on Chat Button
    await friendsScreenSecond.goToAllFriendsList();
    await friendsScreenSecond.chatWithFriend(username);
    await page2.waitForURL("/chat");

    // B3 - Messages are secured by end-to-end encryption, sent over a peer-to-peer network should be displayed at the top of every chat
    await expect(chatsMainPageSecond.chatEncryptedMessage).toBeAttached();
    await expect(chatsMainPageSecond.chatEncryptedMessageText).toHaveText(
      "Messages are secured by end-to-end encryption, sent over a peer-to-peer network.",
    );

    // B4 - Amount of coin should be displayed at top right toolbar
    await expect(chatsMainPageSecond.coinAmountIndicator).toHaveText("0");

    // B5 - Highlighted border should appear around call button when clicked
    // Validate CSS from call button backs to normal
    await page2.locator("body").click();
    await expect(chatsMainPageSecond.buttonChatCall).toHaveCSS(
      "border-bottom-color",
      "rgb(28, 29, 43)",
    );

    // B6 - Highlighted border should appear around video button when clicked
    await chatsMainPageSecond.buttonChatVideo.focus();
    await expect(chatsMainPageSecond.buttonChatVideo).toHaveCSS(
      "border-bottom-color",
      "rgb(77, 77, 255)",
    );

    // Validate CSS from video button backs to normal
    await page2.locator("body").click();
    await expect(chatsMainPageSecond.buttonChatVideo).toHaveCSS(
      "border-bottom-color",
      "rgb(28, 29, 43)",
    );

    // B35 - Highlighted border should appear around textbox in chat when user clicks into it
    await chatsMainPageSecond.chatbarInput.focus();
    await expect(chatsMainPageSecond.chatbarInputContainer).toHaveCSS(
      "box-shadow",
      "rgb(77, 77, 255) 0px 0px 0px 1px",
    );
    await chatsMainPageSecond.chatbarInput.clear();

    // B36 - User should already be clicked into textbox when they enter a chat
    // Send a message from the first user
    await chatsMainPageSecond.sendMessage("Hello from the second user");

    // Validate message is displayed on local user
    await chatsMainPageSecond.validateMessageIsSent(
      "Hello from the second user",
    );

    // Validate message is displayed on remote user
    await chatsMainPageFirst.validateMessageIsReceived(
      "Hello from the second user",
    );

    // B16 - Timestamp appears after most recent message sent
    const timestampMessageReceived =
      await chatsMainPageFirst.getLastTimestampRemote();
    const timestampMessageSent =
      await chatsMainPageSecond.getLastTimestampLocal();

    await expect(timestampMessageReceived).toHaveText("just now");
    await expect(timestampMessageSent).toHaveText("just now");

    // B17 - Users profile picture appears next to messages sent
    // Validate profile pictures for local and remote users are displayed on conversation next to chat bubbles
    const profilePictureLocalUser =
      await chatsMainPageSecond.getLastLocalProfilePicture();
    await expect(profilePictureLocalUser).toBeVisible();

    const profilePictureRemoteUser =
      await chatsMainPageFirst.getLastRemoteProfilePicture();
    await expect(profilePictureRemoteUser).toBeVisible();

    // B37 - User should not be able to send a blank message (Send button should be greyed out until any text is added into the textbox
    await chatsMainPageFirst.sendMessage("");
    const numberOfMessagesSent =
      await chatsMainPageFirst.messabeBubbleLocal.count();
    expect(numberOfMessagesSent).toEqual(0);

    // B55 - Messages should be limited to 255 chars - Failing now
    await chatsMainPageFirst.chatbarInput.fill(
      "012345678900123456789001234567890012345678900123456789001234567890012345678900123456789001234567890012345678900123456789001234567890012345678900123456789001234567890012345678900123456789001234567890012345678900123456789001234567890012345678900123456789001234567890",
    );
    await page1
      .getByText("Maximum length is 255 characters.")
      .waitFor({ state: "visible" });

    // Delete friend
    await chatsMainPageFirst.goToFriends();
    await friendsScreenFirst.removeFriend(usernameTwo);
  });

  test("B7, B57, B58 - Favorites tests", async ({
    chatsMainPageFirst,
    context1,
    context2,
    filesPageFirst,
    friendsScreenFirst,
    friendsScreenSecond,
    page1,
    page2,
  }) => {
    // Grant clipboard permissions, Copy DID and save it into a constant
    await context1.grantPermissions(["clipboard-read", "clipboard-write"]);
    await friendsScreenFirst.copyDIDFromContextMenu();
    const handle = await page1.evaluateHandle(() =>
      navigator.clipboard.readText(),
    );
    const didKeyFirstUser = await handle.jsonValue();

    // Grant clipboard permissions, Copy DID and save it into a constant
    await context2.grantPermissions(["clipboard-read", "clipboard-write"]);
    await friendsScreenSecond.copyDIDFromContextMenu();

    // Now, add the first user as a friend
    await friendsScreenSecond.addFriend(didKeyFirstUser);

    // Toast Notification with Your request is making it's way! should appear after sending a friend request
    await friendsScreenSecond.waitForToastNotificationToDisappear();
    await friendsScreenFirst.waitForToastNotificationToDisappear();

    // Go to Outbound requests and validate the request is displayed
    await friendsScreenSecond.goToRequestList();
    await friendsScreenSecond.validateOutgoingRequestExists();

    // With First User, go to requests list and accept friend request
    await friendsScreenFirst.goToRequestList();
    await friendsScreenFirst.validateIncomingRequestExists();
    await friendsScreenFirst.acceptFriendRequest(usernameTwo);

    // With First User, go to All Friends and click on Chat Button
    await friendsScreenFirst.goToAllFriendsList();

    // With Second User, go to All Friends and click on Chat Button
    await friendsScreenSecond.goToAllFriendsList();

    // With first user, go to chat conversation with remote user
    await friendsScreenFirst.chatWithFriend(usernameTwo);
    await page1.waitForURL("/chat");

    // With second user, go to chat conversation with remote user
    await friendsScreenSecond.chatWithFriend(username);
    await page2.waitForURL("/chat");

    // B7 - Favorite button should should be highlighted after clicked and grey when unclicked
    // First get the background color value when Favorite button is not clicked
    const element = chatsMainPageFirst.buttonChatFavorite;
    const backgroundColorBefore = await element.evaluate((el) => {
      return window.getComputedStyle(el).getPropertyValue("background-color");
    });

    // First user adds remote user as Favorite
    await chatsMainPageFirst.buttonChatFavorite.click();

    // Now get the background color value when Favorite button is clicked
    const backgroundColorAfter = await element.evaluate((el) => {
      return window.getComputedStyle(el).getPropertyValue("background-color");
    });

    // Validate background color changes when Favorite button is clicked
    expect(backgroundColorBefore).not.toEqual(backgroundColorAfter);

    // C12 - Favorites should appear on left side of Sidebar
    await expect(chatsMainPageFirst.favoriteCircle).toBeVisible();
    await expect(chatsMainPageFirst.favoriteProfilePicture).toBeVisible();
    await expect(chatsMainPageFirst.favoriteProfileStatusIndicator).toHaveClass(
      /.*\bonline\b.*/,
    );

    // B57 - User can go to Conversation with remote user by clicking on Favorites Circle
    // C14 - Clicking a favorite should take you to that chat
    await chatsMainPageFirst.goToFiles();
    await filesPageFirst.uploadFileButton.waitFor({ state: "attached" });
    await filesPageFirst.favoriteProfilePicture.click();
    await expect(chatsMainPageFirst.chatTopbarUsername).toHaveText(usernameTwo);

    // B58 - User can remove Favorites and these will not be displayed on Slimbar
    await chatsMainPageFirst.buttonChatFavorite.click();
    await chatsMainPageFirst.validateNoFavoritesAreVisible();

    // Delete friend
    await chatsMainPageFirst.goToFriends();
    await friendsScreenFirst.removeFriend(usernameTwo);
  });

  test("C11, C12, C16, C17 and C19 - Chat Sidebar tests", async ({
    chatsMainPageFirst,
    chatsMainPageSecond,
    context1,
    context2,
    friendsScreenFirst,
    friendsScreenSecond,
    page1,
    page2,
  }) => {
    // Testing timestamp with Clock API
    await page1.clock.install();

    // Grant clipboard permissions, Copy DID and save it into a constant
    await context1.grantPermissions(["clipboard-read", "clipboard-write"]);
    await friendsScreenFirst.copyDIDFromContextMenu();
    const handle = await page1.evaluateHandle(() =>
      navigator.clipboard.readText(),
    );
    const didKeyFirstUser = await handle.jsonValue();

    // Grant clipboard permissions, Copy DID and save it into a constant
    await context2.grantPermissions(["clipboard-read", "clipboard-write"]);
    await friendsScreenSecond.copyDIDFromContextMenu();

    // Now, add the first user as a friend
    await friendsScreenSecond.addFriend(didKeyFirstUser);

    // Toast Notification with Your request is making it's way! should appear after sending a friend request
    await friendsScreenSecond.waitForToastNotificationToDisappear();
    await friendsScreenFirst.waitForToastNotificationToDisappear();

    // Go to Outbound requests and validate the request is displayed
    await friendsScreenSecond.goToRequestList();
    await friendsScreenSecond.validateOutgoingRequestExists();

    // With First User, go to requests list and accept friend request
    await friendsScreenFirst.goToRequestList();
    await friendsScreenFirst.validateIncomingRequestExists();
    await friendsScreenFirst.acceptFriendRequest(usernameTwo);

    // With First User, go to All Friends and click on Chat Button
    await friendsScreenFirst.goToAllFriendsList();

    // With Second User, go to All Friends and click on Chat Button
    await friendsScreenSecond.goToAllFriendsList();

    // With first user, go to chat conversation with remote user
    await friendsScreenFirst.chatWithFriend(usernameTwo);
    await page1.waitForURL("/chat");

    // With second user, go to chat conversation with remote user and send a message
    await friendsScreenSecond.chatWithFriend(username);
    await page2.waitForURL("/chat");

    // Validate chat preview is displayed on sidebar - Default values when no messages have been sent
    // C11 - ProfilePicFrame should display for any friends that have one
    const chatPreviewImageURL =
      await chatsMainPageFirst.chatPreviewPictureImage.getAttribute("src");
    const topbarImageURL =
      await chatsMainPageFirst.chatTopbarProfilePictureImage.getAttribute(
        "src",
      );
    await expect(chatsMainPageFirst.chatPreview).toBeVisible();
    await expect(chatsMainPageFirst.chatPreviewPicture).toBeVisible();
    await expect(chatsMainPageFirst.chatPreviewName).toHaveText(usernameTwo);
    await expect(chatsMainPageFirst.chatPreviewStatusIndicator).toHaveClass(
      /.*\bonline\b.*/,
    );
    await expect(chatsMainPageFirst.chatPreviewLastMessage).toHaveText(
      "No messages sent yet.",
    );
    expect(chatPreviewImageURL).toEqual(topbarImageURL);

    // Send a message from user two to first user
    await chatsMainPageSecond.sendMessage("Hello from the second user");
    await chatsMainPageSecond.validateMessageIsSent(
      "Hello from the second user",
    );

    // Validate message is displayed on remote user
    await chatsMainPageFirst.validateMessageIsReceived(
      "Hello from the second user",
    );

    // Validate Chat Sidebar is updated with most recent message on both sides local and remote
    await expect(chatsMainPageFirst.chatPreviewLastMessage).toHaveText(
      "Hello from the second user",
    );
    await expect(chatsMainPageSecond.chatPreviewLastMessage).toHaveText(
      "Hello from the second user",
    );

    // C15 - Right clicking a chat in sidebar should open context menu
    // C16 - Context menu should display: Favorite, Hide, Mark as read
    await chatsMainPageFirst.openContextMenuOnChatPreview(usernameTwo);

    // C12 - Favorites should appear on left side of Sidebar when selecting from Context Menu - Favorite
    await chatsMainPageFirst.contextMenuOptionFavorite.click();
    await expect(chatsMainPageFirst.favoriteCircle).toBeVisible();
    await expect(chatsMainPageFirst.favoriteProfilePicture).toBeVisible();
    await expect(chatsMainPageFirst.favoriteProfileStatusIndicator).toHaveClass(
      /.*\bonline\b.*/,
    );

    // Unfavorite user from Context Menu and validate remote user is removed from favorites
    await chatsMainPageFirst.openContextMenuOnChatPreview(usernameTwo);
    await chatsMainPageFirst.contextMenuOptionFavorite.click();
    await chatsMainPageFirst.validateNoFavoritesAreVisible();

    // C17 - Timestamp of most recent message sent or received in chat should be displayed in the sidebar - Not working correctly
    // Fast forward clock for 30 minutes and validate message was sent 30 minutes ago
    // await page1.clock.fastForward("30:00");
    // await page1.getByText("30 minutes ago").waitFor({ state: "visible" });

    // C19 - After selecting Hide chat chat should no longer be displayed in sidebar

    // Delete friend
    await chatsMainPageFirst.goToFriends();
    await friendsScreenFirst.removeFriend(usernameTwo);
  });

  test.skip("B8 to B14 - Quick Profile tests", async ({ page }) => {
    // Test to be added
    // B8 - Clicking Profile button in 1on1 chat should display the friends profile
    // B9 - Friends profile should display friends profile picture
    // B10 - Friends profile should display friends status (whether you are friends or not)
    // B11 - Friends profile should display friends Username
    // B12 - Friends profile should display friends profile Status
    // B13 - User should be able to write a note on friends profile
    // B14 - Highlighted border should appear when user clicks into Notes textbox
  });

  test.skip("B15 and B26 to B34 - Group Chats Tests", async ({ page }) => {
    // Group chats not implemented yet
    // B15 - Clicking Groups button should display group members of the chat
    // B26 - Clicking the X next to a friend in the GroupMembers Modal should remove friend from groupchat
    // B27 - Clicking the Settings button should open the Group Chat Settings
    // B28 - Highlighted border should appear after clicking into the GroupName input box in GroupChat Settings
    // B29 - User can change name of the group
    // B30 - Highlighted border should appear after clicking into the GroupDescription input box in GroupChat Settings
    // B31 - User should be able to edit the description of the group
    // B32 - User can toggle on/off Add Members
    // B33 - User can toggle on/off ChangePhoto
    // B34 - User can toggle on/off Change Details
    // C13 - Number of members in group should appear on that chat in both Sidebar and Favorites
  });

  test.skip("B18 and B19, B23 to B25 - Chats Context Menu tests", async ({
    page,
  }) => {
    // Test to be implemented
    // B18 - Context menu appears when user right clicks a message
    // B19 - When user clicks their own message context menu should display Top 5 Most Used Emojis, Pin Message, Reply, React, Copy, Edit, Delete
    // B23 - Clicking Copy should copy text to users clipboard
    // B24 - Clicking Edit should open up the edit message modal
    // B25 - Clicking Delete should delete message from chat
  });

  test.skip("B20 - Pin Messages Tests", async ({ page }) => {
    // B20 - Clicking Pin Message should pin message in chat
  });

  test.skip("B21 - Replies Tests", async ({ page }) => {
    // B21 - Clicking Reply should open reply modal
  });

  test.skip("B22 and B50 - Reaction Tests", async ({ page }) => {
    // B22 - Clicking React should open up emoji menu
    // B50 - Number of reactions should be displayed underneath message
  });

  test.skip("B38 to B47 - Send coin tests", async ({ page }) => {
    // B38 - Clicking Send Coin should open the modal
    // B39 - Amount should be displayed at the top of Send Coin modal and user should be able to click into it and change amount
    // B40 - Only numbers should be able to be inputted in Send Coin modal
    // B41 - Highlighted border should appear when user clicks into Notes textbox in the Send Coin modal
    // B42 - Recipients should appear in recipients box as they are added in Send Coin Modal
    // B43 - Clicking the X should clear user from recipients box in Send Coin Modal
    // B44 - Highlighted border should appear around selected user
    // B45 - Scrollbar should appear if user has enough friends for it in Send Coin Modal
    // B46 - User should have to hold confirm for 3 seconds to send payment in Send Coin Modal
    // B47 - Clicking Cancel should close Send Coin modal
  });

  test.skip("B48 - Typing indicator tests", async ({ page }) => {
    // B48 - The chat typing indicator should be displayed when user is typing
    // C18 - Typing indicator should be displayed around users profile picture when they are typing (this applies to favorites as well)
  });

  test.skip("B49 - Scroll to bottom button tests", async ({ page }) => {
    // B49 - Scroll to bottom button should appear after scrolling up 2 messages
  });

  test.skip("B51 - Markdown messages tests", async ({ page }) => {
    // Test code for B51
  });

  test.skip("B52 and B53 - Sending and receiving files tests", async ({
    page,
  }) => {
    // B52 - User should be able to click on image in chat to see image preview
    // B53 - User can download media from chat by clicking download
  });

  test.skip("B54 - User should be able to view a video through the embedded video player", async ({
    page,
  }) => {
    // Test code for B54
  });

  test("B56 - Chats Tests - Multiple messages testing", async ({
    chatsMainPageFirst,
    chatsMainPageSecond,
    context1,
    context2,
    friendsScreenFirst,
    friendsScreenSecond,
    page1,
    page2,
  }) => {
    // Grant clipboard permissions, Copy DID and save it into a constant
    await context1.grantPermissions(["clipboard-read", "clipboard-write"]);
    await friendsScreenFirst.copyDIDFromContextMenu();
    const handle = await page1.evaluateHandle(() =>
      navigator.clipboard.readText(),
    );
    const didKeyFirstUser = await handle.jsonValue();

    // Grant clipboard permissions, Copy DID and save it into a constant
    await context2.grantPermissions(["clipboard-read", "clipboard-write"]);
    await friendsScreenSecond.copyDIDFromContextMenu();

    // Now, add the first user as a friend
    await friendsScreenSecond.addFriend(didKeyFirstUser);

    // Toast Notification with Your request is making it's way! should appear after sending a friend request
    await friendsScreenSecond.waitForToastNotificationToDisappear();
    await friendsScreenFirst.waitForToastNotificationToDisappear();

    // Go to Outbound requests and validate the request is displayed
    await friendsScreenSecond.goToRequestList();
    await friendsScreenSecond.validateOutgoingRequestExists();

    // With First User, go to requests list and accept friend request
    await friendsScreenFirst.goToRequestList();
    await friendsScreenFirst.validateIncomingRequestExists();
    await friendsScreenFirst.acceptFriendRequest(usernameTwo);

    // With First User, go to All Friends and click on Chat Button
    await friendsScreenFirst.goToAllFriendsList();

    // With Second User, go to All Friends and click on Chat Button
    await friendsScreenSecond.goToAllFriendsList();

    // With first user, go to chat conversation with remote user
    await friendsScreenFirst.chatWithFriend(usernameTwo);
    await page1.waitForURL("/chat");

    // With second user, go to chat conversation with remote user and send a message
    await friendsScreenSecond.chatPreview.click();
    await page2.waitForURL("/chat");

    // Validate second user is in chats page and send 20 messages
    for (let i = 0; i < 20; i++) {
      const randomSentence = faker.lorem.sentence(3);
      await chatsMainPageSecond.sendMessage(randomSentence);
      await expect(chatsMainPageSecond.messageBubbleContent.last()).toHaveText(
        randomSentence,
      );
      await expect(chatsMainPageFirst.messageBubbleContent.last()).toHaveText(
        randomSentence,
      );
    }

    // Delete friend
    await chatsMainPageFirst.goToFriends();
    await friendsScreenFirst.removeFriend(usernameTwo);
  });

  test.afterEach(async ({ context1, context2 }) => {
    // Clear cookies
    await context1.clearCookies();
    await context2.clearCookies();

    // Clear local storage and session storage
    for (const page of context1.pages()) {
      await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
      });
    }
    for (const page of context2.pages()) {
      await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
      });
    }
  });
});
