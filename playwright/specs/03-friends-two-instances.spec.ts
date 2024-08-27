import { ChatsMainPage } from "playwright/PageObjects/ChatsMain";
import { FilesPage } from "playwright/PageObjects/FilesScreen";
import { FriendsScreen } from "playwright/PageObjects/FriendsScreen";
import { QuickProfile } from "playwright/PageObjects/QuickProfile";
import { test, expect } from "../fixtures/setup";
import { faker } from "@faker-js/faker";

const username = "ChatUserA";
const usernameTwo = "ChatUserB";

test.describe("Two instances tests - Friends and Chats", () => {
  test("H15 - User should be removed from friends list after clicking unfriend", async ({
    firstUserContext,
    secondUserContext,
  }) => {
    // Declare constants required from the fixtures
    const context1 = firstUserContext.context;
    const page1 = firstUserContext.page;
    const page2 = secondUserContext.page;
    const friendsScreenFirst = new FriendsScreen(page1);
    const friendsScreenSecond = new FriendsScreen(page2);
    const chatsMainPageFirst = new ChatsMainPage(page1);
    const chatsMainPageSecond = new ChatsMainPage(page2);

    // With both users go to Friends Screen
    await chatsMainPageFirst.goToFriends();
    await chatsMainPageSecond.goToFriends();

    // H15 - User should be removed from friends list after clicking unfriend
    // Grant clipboard permissions, Copy DID and save it into a constant
    await context1.grantPermissions(["clipboard-read", "clipboard-write"]);
    await friendsScreenFirst.copyDIDFromContextMenu();
    const handle = await page1.evaluateHandle(() =>
      navigator.clipboard.readText(),
    );
    const didKeyFirstUser = await handle.jsonValue();

    // Copy DID and save it into a constant
    await friendsScreenSecond.copyDIDFromContextMenu();

    // Now, add the first user as a friend
    await friendsScreenSecond.addFriend(didKeyFirstUser);
    await friendsScreenSecond.validateToastRequestSent();
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
    firstUserContext,
    secondUserContext,
  }) => {
    // Declare constants required from the fixtures
    const context1 = firstUserContext.context;
    const page1 = firstUserContext.page;
    const page2 = secondUserContext.page;
    const friendsScreenFirst = new FriendsScreen(page1);
    const friendsScreenSecond = new FriendsScreen(page2);
    const chatsMainPageFirst = new ChatsMainPage(page1);
    const chatsMainPageSecond = new ChatsMainPage(page2);

    // With both users go to Friends Screen
    await chatsMainPageFirst.goToFriends();
    await chatsMainPageSecond.goToFriends();

    // Grant clipboard permissions, Copy DID and save it into a constant
    await context1.grantPermissions(["clipboard-read", "clipboard-write"]);
    await friendsScreenFirst.copyDIDFromContextMenu();
    const handle = await page1.evaluateHandle(() =>
      navigator.clipboard.readText(),
    );
    const didKeyFirstUser = await handle.jsonValue();

    // Copy DID and save it into a constant
    await friendsScreenSecond.copyDIDFromContextMenu();

    // Now, add the first user as a friend
    await friendsScreenSecond.addFriend(didKeyFirstUser);
    await friendsScreenSecond.validateToastRequestSent();
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
    await friendsScreenSecond.validateToastRequestSent();
    await friendsScreenSecond.waitForToastNotificationToDisappear();

    // With First User, go to requests list and see the friend request displayed
    await friendsScreenFirst.closeToastNotification();
    await friendsScreenFirst.goToRequestList();
    await friendsScreenFirst.validateIncomingRequestExists();
  });

  test("H6, H19 - User can send a friend request and remote user can accept it", async ({
    firstUserContext,
    secondUserContext,
  }) => {
    // Declare constants required from the fixtures
    const context1 = firstUserContext.context;
    const page1 = firstUserContext.page;
    const page2 = secondUserContext.page;
    const friendsScreenFirst = new FriendsScreen(page1);
    const friendsScreenSecond = new FriendsScreen(page2);
    const chatsMainPageFirst = new ChatsMainPage(page1);
    const chatsMainPageSecond = new ChatsMainPage(page2);

    // With both users go to Friends Screen
    await chatsMainPageFirst.goToFriends();
    await chatsMainPageSecond.goToFriends();

    // Grant clipboard permissions, Copy DID and save it into a constant
    await context1.grantPermissions(["clipboard-read", "clipboard-write"]);
    await friendsScreenFirst.copyDIDFromContextMenu();
    const handle = await page1.evaluateHandle(() =>
      navigator.clipboard.readText(),
    );
    const didKeyFirstUser = await handle.jsonValue();

    // Copy DID and save it into a constant
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
  });

  test("H7, H20 - User can send a friend request and remote user can deny it", async ({
    firstUserContext,
    secondUserContext,
  }) => {
    // Declare constants required from the fixtures
    const context1 = firstUserContext.context;
    const page1 = firstUserContext.page;
    const page2 = secondUserContext.page;
    const friendsScreenFirst = new FriendsScreen(page1);
    const friendsScreenSecond = new FriendsScreen(page2);
    const chatsMainPageFirst = new ChatsMainPage(page1);
    const chatsMainPageSecond = new ChatsMainPage(page2);

    // With both users go to Friends Screen
    await chatsMainPageFirst.goToFriends();
    await chatsMainPageSecond.goToFriends();

    // Grant clipboard permissions, Copy DID and save it into a constant
    await context1.grantPermissions(["clipboard-read", "clipboard-write"]);
    await friendsScreenFirst.copyDIDFromContextMenu();
    const handle = await page1.evaluateHandle(() =>
      navigator.clipboard.readText(),
    );
    const didKeyFirstUser = await handle.jsonValue();

    // Grant clipboard permissions, Copy DID and save it into a constant
    await friendsScreenSecond.copyDIDFromContextMenu();

    // Now, add the first user as a friend
    await friendsScreenSecond.addFriend(didKeyFirstUser);

    // H7 - Skipped validation Toast Notification with Username sent a request. should appear after receiving a friend request
    await friendsScreenSecond.validateToastRequestSent();
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
    firstUserContext,
    secondUserContext,
  }) => {
    // Declare constants required from the fixtures
    const context1 = firstUserContext.context;
    const page1 = firstUserContext.page;
    const page2 = secondUserContext.page;
    const friendsScreenFirst = new FriendsScreen(page1);
    const friendsScreenSecond = new FriendsScreen(page2);
    const chatsMainPageFirst = new ChatsMainPage(page1);
    const chatsMainPageSecond = new ChatsMainPage(page2);

    // With both users go to Friends Screen
    await chatsMainPageFirst.goToFriends();
    await chatsMainPageSecond.goToFriends();

    // H21 - User can send a friend request and cancel request before other user replies to it
    // Grant clipboard permissions, Copy DID and save it into a constant
    await context1.grantPermissions(["clipboard-read", "clipboard-write"]);
    await friendsScreenFirst.copyDIDFromContextMenu();
    const handle = await page1.evaluateHandle(() =>
      navigator.clipboard.readText(),
    );
    const didKeyFirstUser = await handle.jsonValue();

    // Grant clipboard permissions, Copy DID and save it into a constant
    await friendsScreenSecond.copyDIDFromContextMenu();

    // Now, add the first user as a friend
    await friendsScreenSecond.addFriend(didKeyFirstUser);
    await friendsScreenSecond.validateToastRequestSent();
    await friendsScreenSecond.waitForToastNotificationToDisappear();

    // With First User, go to requests list and accept friend request
    await friendsScreenFirst.waitForToastNotificationToDisappear();
    await friendsScreenFirst.goToRequestList();
    await friendsScreenFirst.validateIncomingRequestExists();

    // With Second User, cancel the outgoing request
    await friendsScreenSecond.goToRequestList();
    await friendsScreenSecond.validateOutgoingRequestExists();
    await friendsScreenSecond.cancelFriendRequest(username);
    await friendsScreenSecond.validateNoOutgoingRequestsExist();

    // With First User, validate incoming request no longer exists
    await friendsScreenFirst.goToBlockedList();
    await friendsScreenFirst.goToRequestList();
    await friendsScreenFirst.validateNoIncomingRequestsExist();
  });

  test("B1 to B6, B16 and B17, B35 to B37 - Landing to Chats Page elements and basic send/receive text message flow", async ({
    firstUserContext,
    secondUserContext,
  }) => {
    // Declare constants required from the fixtures
    const context1 = firstUserContext.context;
    const page1 = firstUserContext.page;
    const page2 = secondUserContext.page;
    const friendsScreenFirst = new FriendsScreen(page1);
    const friendsScreenSecond = new FriendsScreen(page2);
    const chatsMainPageFirst = new ChatsMainPage(page1);
    const chatsMainPageSecond = new ChatsMainPage(page2);

    // With both users go to Friends Screen
    await chatsMainPageFirst.goToFriends();
    await chatsMainPageSecond.goToFriends();

    // Grant clipboard permissions, Copy DID and save it into a constant
    await context1.grantPermissions(["clipboard-read", "clipboard-write"]);
    await friendsScreenFirst.copyDIDFromContextMenu();
    const handle = await page1.evaluateHandle(() =>
      navigator.clipboard.readText(),
    );
    const didKeyFirstUser = await handle.jsonValue();

    // Copy DID and save it into a constant
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

    // B3 - Messages are secured by end-to-end encryption, sent over a peer-to-peer network should be displayed at the top of every chat
    await chatsMainPageSecond.chatEncryptedMessage.waitFor({
      state: "visible",
    });
    await expect(chatsMainPageSecond.chatEncryptedMessageText).toHaveText(
      "Messages are secured by end-to-end encryption, sent over a peer-to-peer network.",
    );

    // B4 - Amount of coin should be displayed at top right toolbar - Button is hidden now
    // await expect(chatsMainPageSecond.coinAmountIndicator).toHaveText("0");

    // B5 - Highlighted border should appear around call button when clicked
    await chatsMainPageSecond.buttonChatCall.focus();
    await expect(chatsMainPageSecond.buttonChatCall).toHaveCSS(
      "border-bottom-color",
      "rgb(77, 77, 255)",
    );

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
  });

  test("B7, B57, B58 - Favorites tests", async ({
    firstUserContext,
    secondUserContext,
  }) => {
    /// Declare constants required from the fixtures
    const context1 = firstUserContext.context;
    const page1 = firstUserContext.page;
    const page2 = secondUserContext.page;
    const filesPageFirst = new FilesPage(page1);
    const friendsScreenFirst = new FriendsScreen(page1);
    const friendsScreenSecond = new FriendsScreen(page2);
    const chatsMainPageFirst = new ChatsMainPage(page1);
    const chatsMainPageSecond = new ChatsMainPage(page2);

    // With both users go to Friends Screen
    await chatsMainPageFirst.goToFriends();
    await chatsMainPageSecond.goToFriends();

    // Grant clipboard permissions, Copy DID and save it into a constant
    await context1.grantPermissions(["clipboard-read", "clipboard-write"]);
    await friendsScreenFirst.copyDIDFromContextMenu();
    const handle = await page1.evaluateHandle(() =>
      navigator.clipboard.readText(),
    );
    const didKeyFirstUser = await handle.jsonValue();

    // Copy DID and save it into a constant
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

    // B7 - Favorite button should should be highlighted after clicked and grey when unclicked
    // First when button is not clicked
    await chatsMainPageFirst.chatEncryptedMessage.waitFor({
      state: "visible",
    });
    await expect(chatsMainPageFirst.buttonChatFavorite).toHaveCSS(
      "background-color",
      "rgb(33, 38, 58)",
    );

    // First user adds remote user as Favorite
    await chatsMainPageFirst.buttonChatFavorite.click();
    await expect(chatsMainPageFirst.buttonChatFavorite).toHaveCSS(
      "background-color",
      "color(srgb 0.371765 0.371765 1)",
    );

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
  });

  test("C11, C12, C16, C17 and C19 - Chat Sidebar tests", async ({
    firstUserContext,
    secondUserContext,
  }) => {
    /// Declare constants required from the fixtures
    const context1 = firstUserContext.context;
    const page1 = firstUserContext.page;
    const page2 = secondUserContext.page;
    const friendsScreenFirst = new FriendsScreen(page1);
    const friendsScreenSecond = new FriendsScreen(page2);
    const chatsMainPageFirst = new ChatsMainPage(page1);
    const chatsMainPageSecond = new ChatsMainPage(page2);

    // With both users go to Friends Screen
    await chatsMainPageFirst.goToFriends();
    await chatsMainPageSecond.goToFriends();

    // Grant clipboard permissions, Copy DID and save it into a constant
    await context1.grantPermissions(["clipboard-read", "clipboard-write"]);
    await friendsScreenFirst.copyDIDFromContextMenu();
    const handle = await page1.evaluateHandle(() =>
      navigator.clipboard.readText(),
    );
    const didKeyFirstUser = await handle.jsonValue();

    // Copy DID and save it into a constant
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

    // Validate chat preview is displayed on sidebar - Default values when no messages have been sent
    // C11 - ProfilePicFrame should display for any friends that have one
    await chatsMainPageFirst.chatEncryptedMessage.waitFor({
      state: "visible",
    });
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
  });

  test("B56 - Chats Tests - Multiple messages testing", async ({
    firstUserContext,
    secondUserContext,
  }) => {
    /// Declare constants required from the fixtures
    const context1 = firstUserContext.context;
    const page1 = firstUserContext.page;
    const page2 = secondUserContext.page;
    const friendsScreenFirst = new FriendsScreen(page1);
    const friendsScreenSecond = new FriendsScreen(page2);
    const chatsMainPageFirst = new ChatsMainPage(page1);
    const chatsMainPageSecond = new ChatsMainPage(page2);

    // With both users go to Friends Screen
    await chatsMainPageFirst.goToFriends();
    await chatsMainPageSecond.goToFriends();

    // Grant clipboard permissions, Copy DID and save it into a constant
    await context1.grantPermissions(["clipboard-read", "clipboard-write"]);
    await friendsScreenFirst.copyDIDFromContextMenu();
    const handle = await page1.evaluateHandle(() =>
      navigator.clipboard.readText(),
    );
    const didKeyFirstUser = await handle.jsonValue();

    // Copy DID and save it into a constant
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

    // Validate chat pages are loaded on both sides
    await chatsMainPageFirst.chatEncryptedMessage.waitFor({
      state: "visible",
    });
    await chatsMainPageSecond.chatEncryptedMessage.waitFor({
      state: "visible",
    });

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
  });

  test("B8 to B14 - Quick Profile tests", async ({
    firstUserContext,
    secondUserContext,
  }) => {
    /// Declare constants required from the fixtures
    const context1 = firstUserContext.context;
    const page1 = firstUserContext.page;
    const page2 = secondUserContext.page;
    const friendsScreenFirst = new FriendsScreen(page1);
    const friendsScreenSecond = new FriendsScreen(page2);
    const chatsMainPageFirst = new ChatsMainPage(page1);
    const chatsMainPageSecond = new ChatsMainPage(page2);
    const quickProfileLocal = new QuickProfile(page1);
    const quickProfileRemote = new QuickProfile(page1);

    // With both users go to Friends Screen
    await chatsMainPageFirst.goToFriends();
    await chatsMainPageSecond.goToFriends();

    // Grant clipboard permissions, Copy DID and save it into a constant
    await context1.grantPermissions(["clipboard-read", "clipboard-write"]);
    await friendsScreenFirst.copyDIDFromContextMenu();
    const handle = await page1.evaluateHandle(() =>
      navigator.clipboard.readText(),
    );
    const didKeyFirstUser = await handle.jsonValue();

    // Copy DID and save it into a constant
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

    // Send message from first user to second user
    const randomSentence = faker.lorem.sentence(3);
    await chatsMainPageFirst.sendMessage(randomSentence);
    await expect(chatsMainPageFirst.messageBubbleContent.last()).toHaveText(
      randomSentence,
    );
    await expect(chatsMainPageSecond.messageBubbleContent.last()).toHaveText(
      randomSentence,
    );

    // Send message from second user to first user
    const randomSentenceTwo = faker.lorem.sentence(3);
    await chatsMainPageSecond.sendMessage(randomSentenceTwo);
    await expect(chatsMainPageSecond.messageBubbleContent.last()).toHaveText(
      randomSentenceTwo,
    );
    await expect(chatsMainPageFirst.messageBubbleContent.last()).toHaveText(
      randomSentence,
    );

    // Open Quick Profile from the last message sent
    await chatsMainPageFirst.openLocalQuickProfile();
    await expect(quickProfileLocal.quickProfile).toBeVisible();
    await expect(quickProfileLocal.quickProfileUsernameText).toHaveText(
      username,
    );
    await quickProfileLocal.quickProfileNoteInput.fill("Local User Note");
    await quickProfileLocal.exitQuickProfile();

    // Open Quick Profile from the last message received
    await chatsMainPageFirst.openRemoteQuickProfile();
    await expect(quickProfileRemote.quickProfile).toBeVisible();
    await expect(quickProfileRemote.quickProfileUsernameText).toHaveText(
      usernameTwo,
    );
    await quickProfileRemote.quickProfileNoteInput.fill("Remote User Note");
    await quickProfileRemote.exitQuickProfile();

    // Validate note is kept on local quick profile after opening again Quick Profile
    await chatsMainPageFirst.openLocalQuickProfile();
    await expect(quickProfileLocal.quickProfile).toBeVisible();
    await expect(quickProfileLocal.quickProfileNoteInput).toHaveValue(
      "Local User Note",
    );
    await quickProfileLocal.exitQuickProfile();

    // Validate note is kept on remote quick profile after opening again Quick Profile
    await chatsMainPageFirst.openRemoteQuickProfile();
    await expect(quickProfileRemote.quickProfile).toBeVisible();
    await expect(quickProfileRemote.quickProfileNoteInput).toHaveValue(
      "Remote User Note",
    );
    await quickProfileRemote.exitQuickProfile();

    // B9 - Friends profile should display friends profile picture
    // B10 - Friends profile should display friends status (whether you are friends or not)
    // B11 - Friends profile should display friends Username
    // B12 - Friends profile should display friends profile Status
    // B13 - User should be able to write a note on friends profile

    // B14 - Highlighted border should appear when user clicks into Notes textbox
  });
});
