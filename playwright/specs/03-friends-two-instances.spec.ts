import { ChatsMainPage } from "playwright/PageObjects/ChatsMain";
import { FilesPage } from "playwright/PageObjects/FilesScreen";
import { FriendsScreen } from "playwright/PageObjects/FriendsScreen";
import { QuickProfile } from "playwright/PageObjects/QuickProfile";
import { test, expect } from "../fixtures/setup";
import type { BrowserContext, Locator, Page } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { SettingsProfile } from "playwright/PageObjects/Settings/SettingsProfile";

const username = "ChatUserA";
const usernameTwo = "ChatUserB";
type reactionContainer = { emoji: string; count: string }[];

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

  test("H6, H19, B1 to B6, B16 and B17, B35 to B37 - Friend request happy path flow and then Chats Page basic send/receive text message flow", async ({
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

    // Setup accounts for testing
    await setupChats(
      chatsMainPageFirst,
      chatsMainPageSecond,
      context1,
      friendsScreenFirst,
      friendsScreenSecond,
      page1,
    );

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

    // Setup accounts for testing
    await setupChats(
      chatsMainPageFirst,
      chatsMainPageSecond,
      context1,
      friendsScreenFirst,
      friendsScreenSecond,
      page1,
    );

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

    // Setup accounts for testing
    await setupChats(
      chatsMainPageFirst,
      chatsMainPageSecond,
      context1,
      friendsScreenFirst,
      friendsScreenSecond,
      page1,
    );

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

    // Setup accounts for testing
    await setupChats(
      chatsMainPageFirst,
      chatsMainPageSecond,
      context1,
      friendsScreenFirst,
      friendsScreenSecond,
      page1,
    );

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

  test("B8 to B14 - Quick Profile Local and Remote -  Updating note", async ({
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

    // Setup accounts for testing
    await setupChats(
      chatsMainPageFirst,
      chatsMainPageSecond,
      context1,
      friendsScreenFirst,
      friendsScreenSecond,
      page1,
    );

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

    // Open Quick Profile from the last message sent and validate default values
    await chatsMainPageFirst.openLocalQuickProfile();
    await expect(quickProfileLocal.quickProfile).toBeVisible();
    await expect(quickProfileLocal.quickProfileNoteInput).toBeEmpty();

    // B14 - Highlighted border should appear when user clicks into Notes textbox
    await quickProfileLocal.quickProfileNoteInput.focus();
    await expect(quickProfileLocal.quickProfileNoteInputContainer).toHaveCSS(
      "box-shadow",
      "rgb(77, 77, 255) 0px 0px 0px 1px",
    );

    // Update note on local quick profile
    await quickProfileLocal.quickProfileNoteInput.fill("Local User Note");
    await quickProfileLocal.exitQuickProfile();

    // Validate note is kept on local quick profile after opening again Quick Profile
    await chatsMainPageFirst.openLocalQuickProfile();
    await expect(quickProfileLocal.quickProfile).toBeVisible();
    await expect(quickProfileLocal.quickProfileNoteInput).toHaveValue(
      "Local User Note",
    );
    await quickProfileLocal.exitQuickProfile();

    // Open Quick Profile from the last message received
    await chatsMainPageFirst.openRemoteQuickProfile();
    await expect(quickProfileRemote.quickProfile).toBeVisible();
    await expect(quickProfileRemote.quickProfileNoteInput).toBeEmpty();

    // B10 - Friends profile should display friends status (wether you are friends or not)
    await expect(quickProfileRemote.quickProfileUserButton).toBeVisible();
    await expect(quickProfileRemote.quickProfileUserButtonText).toHaveText(
      "You're friends",
    );

    // Update note on remote quick profile
    await quickProfileRemote.quickProfileNoteInput.fill("Remote User Note");
    await quickProfileRemote.exitQuickProfile();

    // Validate note is kept on remote quick profile after opening again Quick Profile
    await chatsMainPageFirst.openRemoteQuickProfile();
    await expect(quickProfileRemote.quickProfile).toBeVisible();
    await expect(quickProfileRemote.quickProfileNoteInput).toHaveValue(
      "Remote User Note",
    );
    await quickProfileRemote.exitQuickProfile();
  });

  test("B8 to B14 - Quick Profile Local - Updating username, status, banner and profile picture", async ({
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
    const settingsProfileFirst = new SettingsProfile(page1);

    // Setup accounts for testing
    await setupChats(
      chatsMainPageFirst,
      chatsMainPageSecond,
      context1,
      friendsScreenFirst,
      friendsScreenSecond,
      page1,
    );

    // Send message from first user to second user
    const firstMessage = "this is a first test message";
    await chatsMainPageFirst.sendMessage(firstMessage);
    await expect(chatsMainPageFirst.messageBubbleContent.last()).toHaveText(
      firstMessage,
    );
    await expect(chatsMainPageSecond.messageBubbleContent.last()).toHaveText(
      firstMessage,
    );

    // Send message from second user to first user
    const secondMessage = "this is a second test message";
    await chatsMainPageSecond.sendMessage(secondMessage);
    await expect(chatsMainPageSecond.messageBubbleContent.last()).toHaveText(
      secondMessage,
    );
    await expect(chatsMainPageFirst.messageBubbleContent.last()).toHaveText(
      secondMessage,
    );

    // Open Quick Profile from the last message sent and validate default values
    await chatsMainPageFirst.openLocalQuickProfile();
    await expect(quickProfileLocal.quickProfile).toBeVisible();
    await expect(quickProfileLocal.quickProfileUsernameText).toHaveText(
      username,
    );
    await expect(quickProfileLocal.quickProfileStatusText).toHaveText(
      "status from first user",
    );
    await expect(quickProfileLocal.quickProfileNoteInput).toBeEmpty();
    await quickProfileLocal.exitQuickProfile();

    // Update local profile picture, profile banner, username and status
    await chatsMainPageFirst.goToSettings();
    await page1.waitForURL("/settings/profile");
    await settingsProfileFirst.updateUsername("newUsernameFirst");
    await settingsProfileFirst.updateStatus("new status first user");
    await settingsProfileFirst.uploadProfileBanner(
      "playwright/assets/banner.jpg",
    );
    await settingsProfileFirst.uploadProfilePicture(
      "playwright/assets/logo.jpg",
    );
    await settingsProfileFirst.goToChat();
    const thirdMessage = "this is a third test message";
    await chatsMainPageFirst.sendMessage(thirdMessage);
    await expect(chatsMainPageFirst.messageBubbleContent.last()).toHaveText(
      thirdMessage,
    );
    await expect(chatsMainPageSecond.messageBubbleContent.last()).toHaveText(
      thirdMessage,
    );

    // Validate changes from settings profile remote are displayed on remote quick profile
    await chatsMainPageFirst.openLocalQuickProfile();
    await quickProfileLocal.validateQuickProfileSnapshot();
    await quickProfileLocal.exitQuickProfile();
  });

  test("B8 to B14 - Quick Profile Remote - Updating username, status, banner and profile picture", async ({
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
    const quickProfileRemote = new QuickProfile(page1);
    const settingsProfileSecond = new SettingsProfile(page2);

    // Setup accounts for testing
    await setupChats(
      chatsMainPageFirst,
      chatsMainPageSecond,
      context1,
      friendsScreenFirst,
      friendsScreenSecond,
      page1,
    );

    // Send message from first user to second user
    const firstMessage = "this is a first test message";
    await chatsMainPageFirst.sendMessage(firstMessage);
    await expect(chatsMainPageFirst.messageBubbleContent.last()).toHaveText(
      firstMessage,
    );
    await expect(chatsMainPageSecond.messageBubbleContent.last()).toHaveText(
      firstMessage,
    );

    // Send message from second user to first user
    const secondMessage = "this is a second test message";
    await chatsMainPageSecond.sendMessage(secondMessage);
    await expect(chatsMainPageSecond.messageBubbleContent.last()).toHaveText(
      secondMessage,
    );
    await expect(chatsMainPageFirst.messageBubbleContent.last()).toHaveText(
      secondMessage,
    );

    // Open Quick Profile from the last message received and validate current values are displayed on username and status
    await chatsMainPageFirst.openRemoteQuickProfile();
    await expect(quickProfileRemote.quickProfile).toBeVisible();
    await expect(quickProfileRemote.quickProfileUsernameText).toHaveText(
      usernameTwo,
    );
    await expect(quickProfileRemote.quickProfileStatusText).toHaveText(
      "status from second user",
    );
    await expect(quickProfileRemote.quickProfileNoteInput).toBeEmpty();
    await quickProfileRemote.exitQuickProfile();

    // Remote user updates username, status, profile banner and profile picture
    await chatsMainPageSecond.goToSettings();
    await page2.waitForURL("/settings/profile");
    await settingsProfileSecond.updateUsername("newUsernameSecond");
    await settingsProfileSecond.updateStatus("new status second user");
    await settingsProfileSecond.uploadProfileBanner(
      "playwright/assets/banner.jpg",
    );
    await settingsProfileSecond.uploadProfilePicture(
      "playwright/assets/logo.jpg",
    );
    await settingsProfileSecond.goToChat();
    const thirdMessage = "this is a third test message";
    await chatsMainPageSecond.sendMessage(thirdMessage);
    await expect(chatsMainPageSecond.messageBubbleContent.last()).toHaveText(
      thirdMessage,
    );
    await expect(chatsMainPageFirst.messageBubbleContent.last()).toHaveText(
      thirdMessage,
    );

    // Validate new username, status, profile banner and profile picture from remote user is displayed on remote quick profile
    await chatsMainPageFirst.openRemoteQuickProfile();
    await expect(quickProfileRemote.quickProfile).toBeVisible();
    await expect(quickProfileRemote.quickProfileUsernameText).toHaveText(
      "newUsernameSecond",
    );
    await expect(quickProfileRemote.quickProfileStatusText).toHaveText(
      "new status second user",
    );
    await quickProfileRemote.validateQuickProfileSnapshot();
    await quickProfileRemote.exitQuickProfile();
  });

  test("B18 and B19, B23 to B25 - Chats Context Menu tests", async ({
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
    let lastMessageSent: Locator;
    let lastMessageReceived: Locator;

    // Setup accounts for testing
    await setupChats(
      chatsMainPageFirst,
      chatsMainPageSecond,
      context1,
      friendsScreenFirst,
      friendsScreenSecond,
      page1,
    );

    // Send message from second user to first user
    const firstMessage = "this is a first test message";
    await chatsMainPageSecond.sendMessage(firstMessage);
    lastMessageSent = await chatsMainPageSecond.getLastMessageLocal();
    lastMessageReceived = await chatsMainPageFirst.getLastMessageRemote();
    await expect(lastMessageSent).toHaveText(firstMessage);
    await expect(lastMessageReceived).toHaveText(firstMessage);

    // B18 - Context menu appears when user right clicks a message
    // B19 - When user clicks their own message context menu should display Top 5 Most Used Emojis, Pin Message, Reply, React, Copy, Edit, Delete
    // Context Menu on Message Sent
    await chatsMainPageSecond.openContextMenuOnLastMessageSent();
    await chatsMainPageSecond.validateLocalContextMenuOptions();
    await chatsMainPageSecond.exitContextMenuChat();

    // Context Menu on Message Received
    await chatsMainPageFirst.openContextMenuOnLastMessageReceived();
    await chatsMainPageFirst.validateRemoteContextMenuOptions();
    await chatsMainPageFirst.exitContextMenuChat();

    // B23 - Clicking Copy should copy text to users clipboard
    await chatsMainPageFirst.openContextMenuOnLastMessageReceived();
    await chatsMainPageFirst.selectContextMenuOption("Copy");
    await chatsMainPageFirst.chatbarInput.click();
    await chatsMainPageFirst.pasteClipboardOnChatbar();
    await chatsMainPageFirst.buttonChatbarSendMessage.click();

    lastMessageSent = await chatsMainPageFirst.getLastMessageLocal();
    await expect(lastMessageSent).toHaveText(firstMessage);

    lastMessageReceived = await chatsMainPageSecond.getLastMessageRemote();
    await expect(lastMessageReceived).toHaveText(firstMessage);

    // B24 - Clicking Edit should open up the edit message modal
    const editedMessage = "Edited message";
    await chatsMainPageFirst.openContextMenuOnLastMessageSent();
    await chatsMainPageFirst.selectContextMenuOption("Edit");
    await chatsMainPageFirst.typeOnEditMessageInput(editedMessage);

    lastMessageSent = await chatsMainPageFirst.getLastMessageLocal();
    await expect(lastMessageSent).toHaveText(editedMessage);

    lastMessageReceived = await chatsMainPageSecond.getLastMessageRemote();
    await expect(lastMessageReceived).toHaveText(editedMessage);

    // B25 - Clicking Delete should delete message from chat
    await chatsMainPageFirst.openContextMenuOnLastMessageSent();
    await chatsMainPageFirst.selectContextMenuOption("Delete");
    await chatsMainPageFirst.messabeBubbleLocal.waitFor({ state: "detached" });
  });

  test.skip("B20 - Pin Messages Tests", async ({
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

    // Setup accounts for testing
    await setupChats(
      chatsMainPageFirst,
      chatsMainPageSecond,
      context1,
      friendsScreenFirst,
      friendsScreenSecond,
      page1,
    );

    // B20 - Clicking Pin Message should pin message in chat
  });

  test("B22 and B50 - Reaction Tests", async ({
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
    let lastMessageSent: Locator;
    let lastMessageReceived: Locator;
    let localMessageReactions: reactionContainer;
    let remoteMessageReactions: reactionContainer;
    let expectedReactions: reactionContainer;

    // Setup accounts for testing
    await setupChats(
      chatsMainPageFirst,
      chatsMainPageSecond,
      context1,
      friendsScreenFirst,
      friendsScreenSecond,
      page1,
    );

    // B22 - Clicking React should open up emoji menu - Not working currently
    // B50 - Number of reactions should be displayed underneath message

    // Send message from second user to first user
    const firstMessage = "this is a first test message";
    await chatsMainPageSecond.sendMessage(firstMessage);
    lastMessageSent = await chatsMainPageSecond.getLastMessageLocal();
    lastMessageReceived = await chatsMainPageFirst.getLastMessageRemote();
    await expect(lastMessageSent).toHaveText(firstMessage);
    await expect(lastMessageReceived).toHaveText(firstMessage);

    // Local user can react to message sent - React to message sent with 👍
    expectedReactions = [
      { emoji: "👍", count: "1" },
      { emoji: "❤️", count: "1" },
    ];
    await chatsMainPageSecond.openContextMenuOnLastMessageSent();
    await chatsMainPageSecond.selectDefaultReaction("👍");
    await chatsMainPageSecond.validateReactionExistsInLocalMessage("👍");
    await chatsMainPageFirst.validateReactionExistsInRemoteMessage("👍");

    // Local user can react to message sent - React to message sent with ❤️
    await chatsMainPageSecond.openContextMenuOnLastMessageSent();
    await chatsMainPageSecond.selectDefaultReaction("❤️");
    await chatsMainPageSecond.validateReactionExistsInLocalMessage("❤️");
    await chatsMainPageFirst.validateReactionExistsInRemoteMessage("❤️");

    // Validate that message reactions from message sent are displayed in local side
    localMessageReactions =
      await chatsMainPageSecond.getLastLocalReactionsContainer();
    expect(localMessageReactions).toEqual(expectedReactions);

    // Validate that message reactions from message received are displayed on remote side
    remoteMessageReactions =
      await chatsMainPageFirst.getLastRemoteReactionsContainer();
    expect(remoteMessageReactions).toEqual(expectedReactions);

    // Remote user can react to message received - React to message received with ❤️
    expectedReactions = [
      { emoji: "👍", count: "1" },
      { emoji: "❤️", count: "2" },
      { emoji: "😂", count: "1" },
    ];
    await chatsMainPageFirst.openContextMenuOnLastMessageReceived();
    await chatsMainPageFirst.selectDefaultReaction("❤️");
    await chatsMainPageFirst.validateReactionExistsInRemoteMessage("❤️");
    await chatsMainPageSecond.validateReactionExistsInLocalMessage("❤️");

    // Remote user can react to message received - React to message received with 😂
    await chatsMainPageFirst.openContextMenuOnLastMessageReceived();
    await chatsMainPageFirst.selectDefaultReaction("😂");
    await chatsMainPageFirst.validateReactionExistsInRemoteMessage("😂");
    await chatsMainPageSecond.validateReactionExistsInLocalMessage("😂");

    // Validate that message reactions from remote user are updated on remote side
    remoteMessageReactions =
      await chatsMainPageFirst.getLastRemoteReactionsContainer();

    expect(remoteMessageReactions).toEqual(expectedReactions);

    // Validate that message reactions are updated in local side
    localMessageReactions =
      await chatsMainPageSecond.getLastLocalReactionsContainer();
    expect(localMessageReactions).toEqual(expectedReactions);

    // Remote user can remove reaction from message received - Remove reaction from message received with ❤️
    await chatsMainPageFirst.removeReactionInRemoteMessage("😂");
    await chatsMainPageFirst.validateReactionDoesNotExistInRemoteMessage("😂");
    await chatsMainPageSecond.validateReactionDoesNotExistInLocalMessage("😂");
    expectedReactions = [
      { emoji: "👍", count: "1" },
      { emoji: "❤️", count: "2" },
    ];

    // Validate that message reactions from remote message are updated on remote side
    remoteMessageReactions =
      await chatsMainPageFirst.getLastRemoteReactionsContainer();

    expect(remoteMessageReactions).toEqual(expectedReactions);

    // Validate that message reactions from sent message are updated on local side
    localMessageReactions =
      await chatsMainPageSecond.getLastLocalReactionsContainer();
    expect(localMessageReactions).toEqual(expectedReactions);

    // Local user can remove reaction from message sent - Remove reaction from message received with ❤️
    await chatsMainPageSecond.remnoveReactionInLocalMessage("👍");
    await chatsMainPageSecond.validateReactionDoesNotExistInLocalMessage("👍");
    await chatsMainPageFirst.validateReactionDoesNotExistInRemoteMessage("👍");
    expectedReactions = [{ emoji: "❤️", count: "2" }];

    // Validate that message reactions from sent message are updated on local side
    localMessageReactions =
      await chatsMainPageSecond.getLastLocalReactionsContainer();

    expect(localMessageReactions).toEqual(expectedReactions);

    // Validate that message reactions from received message are updated on remote side
    remoteMessageReactions =
      await chatsMainPageFirst.getLastRemoteReactionsContainer();
    expect(remoteMessageReactions).toEqual(expectedReactions);
  });
});

async function setupChats(
  chatsMainPageFirst: ChatsMainPage,
  chatsMainPageSecond: ChatsMainPage,
  context1: BrowserContext,
  friendsScreenFirst: FriendsScreen,
  friendsScreenSecond: FriendsScreen,
  page1: Page,
) {
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
}
