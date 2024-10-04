import { ChatsMainPage } from "playwright/PageObjects/ChatsMain";
import { FilesPage } from "playwright/PageObjects/FilesScreen";
import { FriendsScreen } from "playwright/PageObjects/FriendsScreen";
import { QuickProfile } from "playwright/PageObjects/QuickProfile";
import { test, expect } from "../fixtures/setup";
import type { BrowserContext, Locator, Page } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { SettingsProfile } from "playwright/PageObjects/Settings/SettingsProfile";
import { SettingsMessages } from "playwright/PageObjects/Settings/SettingsMessages";
import { EmojiPicker } from "playwright/PageObjects/ChatsElements/EmojiPicker";
import { GifPicker } from "playwright/PageObjects/ChatsElements/GifPicker";
import { StickerPicker } from "playwright/PageObjects/ChatsElements/StickerPicker";

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
    const viewport = firstUserContext.viewport;
    const friendsScreenFirst = new FriendsScreen(page1, viewport);
    const friendsScreenSecond = new FriendsScreen(page2, viewport);
    const chatsMainPageFirst = new ChatsMainPage(page1, viewport);
    const chatsMainPageSecond = new ChatsMainPage(page2, viewport);

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
    const viewport = firstUserContext.viewport;
    const friendsScreenFirst = new FriendsScreen(page1, viewport);
    const friendsScreenSecond = new FriendsScreen(page2, viewport);
    const chatsMainPageFirst = new ChatsMainPage(page1, viewport);
    const chatsMainPageSecond = new ChatsMainPage(page2, viewport);

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
    await friendsScreenFirst.waitForToastNotificationToDisappear();
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
    const viewport = firstUserContext.viewport;
    const friendsScreenFirst = new FriendsScreen(page1, viewport);
    const friendsScreenSecond = new FriendsScreen(page2, viewport);
    const chatsMainPageFirst = new ChatsMainPage(page1, viewport);
    const chatsMainPageSecond = new ChatsMainPage(page2, viewport);

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
    const viewport = firstUserContext.viewport;
    const friendsScreenFirst = new FriendsScreen(page1, viewport);
    const friendsScreenSecond = new FriendsScreen(page2, viewport);
    const chatsMainPageFirst = new ChatsMainPage(page1, viewport);
    const chatsMainPageSecond = new ChatsMainPage(page2, viewport);

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
    const viewport = firstUserContext.viewport;
    const friendsScreenFirst = new FriendsScreen(page1, viewport);
    const friendsScreenSecond = new FriendsScreen(page2, viewport);
    const chatsMainPageFirst = new ChatsMainPage(page1, viewport);
    const chatsMainPageSecond = new ChatsMainPage(page2, viewport);

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
    await chatsMainPageSecond.chatbarInput.fill("test");
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

    await expect(timestampMessageReceived).toHaveText("ChatUserB - just now");
    await expect(timestampMessageSent).toHaveText("ChatUserB - just now");

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
      .waitFor({ state: "attached" });
  });

  test("B7, B57, B58 - Favorites tests", async ({
    firstUserContext,
    secondUserContext,
  }) => {
    /// Declare constants required from the fixtures
    const context1 = firstUserContext.context;
    const page1 = firstUserContext.page;
    const page2 = secondUserContext.page;
    const viewport = firstUserContext.viewport;
    const filesPageFirst = new FilesPage(page1, viewport);
    const friendsScreenFirst = new FriendsScreen(page1, viewport);
    const friendsScreenSecond = new FriendsScreen(page2, viewport);
    const chatsMainPageFirst = new ChatsMainPage(page1, viewport);
    const chatsMainPageSecond = new ChatsMainPage(page2, viewport);

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
    const viewport = firstUserContext.viewport;
    const friendsScreenFirst = new FriendsScreen(page1, viewport);
    const friendsScreenSecond = new FriendsScreen(page2, viewport);
    const chatsMainPageFirst = new ChatsMainPage(page1, viewport);
    const chatsMainPageSecond = new ChatsMainPage(page2, viewport);

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
    await chatsMainPageFirst.validateChatPreviewMessageText(
      usernameTwo,
      "Hello from the second user",
    );
    await expect(chatsMainPageSecond.chatPreviewLastMessage).toHaveText(
      "Hello from the second user",
    );
    await chatsMainPageSecond.validateChatPreviewMessageText(
      username,
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
    // await page1.getByText("30 minutes ago").waitFor({ state: "attached" });

    // C19 - After selecting Hide chat chat should no longer be displayed in sidebar
  });

  test("B49 and B56 - Chats Tests - Multiple messages testing - Scroll to bottom and Go to pin message buttons", async ({
    firstUserContext,
    secondUserContext,
  }) => {
    /// Declare constants required from the fixtures
    const context1 = firstUserContext.context;
    const page1 = firstUserContext.page;
    const page2 = secondUserContext.page;
    const viewport = firstUserContext.viewport;
    const friendsScreenFirst = new FriendsScreen(page1, viewport);
    const friendsScreenSecond = new FriendsScreen(page2, viewport);
    const chatsMainPageFirst = new ChatsMainPage(page1, viewport);
    const chatsMainPageSecond = new ChatsMainPage(page2, viewport);

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

    // Send a first message different from the ones that will be send after
    const firstMessage = "this is a first message";
    await chatsMainPageSecond.sendMessage(firstMessage);
    await expect(chatsMainPageSecond.messageBubbleContent.last()).toHaveText(
      firstMessage,
    );
    await expect(chatsMainPageFirst.messageBubbleContent.last()).toHaveText(
      firstMessage,
    );

    // Pin first message sent
    await chatsMainPageSecond.openContextMenuOnLastMessageSent();
    await chatsMainPageSecond.selectContextMenuOption("Pin Message");
    await chatsMainPageSecond.validateLastLocalMessageIsPinned();
    await chatsMainPageFirst.validateLastRemoteMessageIsPinned();

    // Validate second user is in chats page and send 20 messages
    for (let i = 0; i < 19; i++) {
      const randomSentence = faker.lorem.sentence(3);
      await chatsMainPageSecond.sendMessage(randomSentence);
      await expect(chatsMainPageSecond.messageBubbleContent.last()).toHaveText(
        randomSentence,
      );
      await expect(chatsMainPageFirst.messageBubbleContent.last()).toHaveText(
        randomSentence,
      );
    }

    // Click on Scroll to bottom
    const firstMessageLocal = await chatsMainPageSecond.getFirstMessageLocal();
    await firstMessageLocal.scrollIntoViewIfNeeded();
    await expect(firstMessageLocal).toBeVisible();
    await expect(chatsMainPageSecond.scrollToBottomButton).toBeVisible();
    await chatsMainPageSecond.scrollToBottomButton.click();
    await expect(chatsMainPageSecond.scrollToBottomButton).toBeHidden();

    // Validate local user can go to pinned message by clicking on Go To button
    await chatsMainPageSecond.openPinMessagesContainer();
    await chatsMainPageSecond.clickOnGoToPinnedMessageButton(firstMessage);
    await expect(firstMessageLocal).toBeVisible();

    // Validate remote user can go to pinned message by clicking on Go To button
    const firstMessageRemote = await chatsMainPageFirst.getFirstMessageRemote();
    await chatsMainPageFirst.openPinMessagesContainer();
    await chatsMainPageFirst.clickOnGoToPinnedMessageButton(firstMessage);
    await expect(firstMessageRemote).toBeVisible();
  });

  // Needs research to fix quick profile input
  test.skip("B8 to B14 - Quick Profile Local and Remote -  Updating note", async ({
    firstUserContext,
    secondUserContext,
  }) => {
    /// Declare constants required from the fixtures
    const context1 = firstUserContext.context;
    const page1 = firstUserContext.page;
    const page2 = secondUserContext.page;
    const viewport = firstUserContext.viewport;
    const friendsScreenFirst = new FriendsScreen(page1, viewport);
    const friendsScreenSecond = new FriendsScreen(page2, viewport);
    const chatsMainPageFirst = new ChatsMainPage(page1, viewport);
    const chatsMainPageSecond = new ChatsMainPage(page2, viewport);
    const quickProfileLocal = new QuickProfile(page1, viewport);
    const quickProfileRemote = new QuickProfile(page1, viewport);

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
    // Save copied value from clipboard into a constant
    const userNote = "Local User Note";
    await page1.evaluate((text) => {
      navigator.clipboard.writeText(text);
    }, userNote);
    await quickProfileLocal.pasteOnQuickProfileNote();
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

  // Needs research to fix quick profile input
  test.skip("B8 to B14 - Quick Profile Local - Updating username, status, banner and profile picture", async ({
    firstUserContext,
    secondUserContext,
  }) => {
    /// Declare constants required from the fixtures
    const context1 = firstUserContext.context;
    const page1 = firstUserContext.page;
    const page2 = secondUserContext.page;
    const viewport = firstUserContext.viewport;
    const friendsScreenFirst = new FriendsScreen(page1, viewport);
    const friendsScreenSecond = new FriendsScreen(page2, viewport);
    const chatsMainPageFirst = new ChatsMainPage(page1, viewport);
    const chatsMainPageSecond = new ChatsMainPage(page2, viewport);
    const quickProfileLocal = new QuickProfile(page1, viewport);
    const settingsProfileFirst = new SettingsProfile(page1, viewport);

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

  // Needs research to fix quick profile input
  test.skip("B8 to B14 - Quick Profile Remote - Updating username, status, banner and profile picture", async ({
    firstUserContext,
    secondUserContext,
  }) => {
    /// Declare constants required from the fixtures
    const context1 = firstUserContext.context;
    const page1 = firstUserContext.page;
    const page2 = secondUserContext.page;
    const viewport = firstUserContext.viewport;
    const friendsScreenFirst = new FriendsScreen(page1, viewport);
    const friendsScreenSecond = new FriendsScreen(page2, viewport);
    const chatsMainPageFirst = new ChatsMainPage(page1, viewport);
    const chatsMainPageSecond = new ChatsMainPage(page2, viewport);
    const quickProfileRemote = new QuickProfile(page1, viewport);
    const settingsProfileSecond = new SettingsProfile(page2, viewport);

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
    const viewport = firstUserContext.viewport;
    const friendsScreenFirst = new FriendsScreen(page1, viewport);
    const friendsScreenSecond = new FriendsScreen(page2, viewport);
    const chatsMainPageFirst = new ChatsMainPage(page1, viewport);
    const chatsMainPageSecond = new ChatsMainPage(page2, viewport);
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
    // Save copied value from clipboard into a constant
    const handle = await page1.evaluateHandle(() =>
      navigator.clipboard.readText(),
    );
    const clipboardContent = await handle.jsonValue();

    await expect(clipboardContent).toEqual(firstMessage);
    await chatsMainPageFirst.sendMessage(firstMessage);

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

  test("B20 - Pin Messages Tests", async ({
    firstUserContext,
    secondUserContext,
  }) => {
    // Declare constants required from the fixtures
    const context1 = firstUserContext.context;
    const page1 = firstUserContext.page;
    const page2 = secondUserContext.page;
    const viewport = firstUserContext.viewport;
    const friendsScreenFirst = new FriendsScreen(page1, viewport);
    const friendsScreenSecond = new FriendsScreen(page2, viewport);
    const chatsMainPageFirst = new ChatsMainPage(page1, viewport);
    const chatsMainPageSecond = new ChatsMainPage(page2, viewport);
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

    // Validate Pinned Messages container is empty when no messages have been pinned
    await chatsMainPageSecond.openPinMessagesContainer();
    await expect(chatsMainPageSecond.pinnedMessagesContainer).toBeVisible();
    await expect(chatsMainPageSecond.labelPinnedMessages).toHaveText(
      "Pinned Messages",
    );
    await expect(chatsMainPageSecond.pinnedMessagesEmpty).toBeVisible();
    await expect(chatsMainPageSecond.pinnedMessagesEmpty).toHaveText(
      "There are no pinned messages in this chat",
    );

    // Close Pinned Messages container
    await chatsMainPageSecond.exitPinMessagesContainer();
    await expect(chatsMainPageSecond.pinnedMessagesContainer).toBeHidden();

    // B20 - Clicking Pin Message should pin message in chat
    await chatsMainPageSecond.openContextMenuOnLastMessageSent();

    // Local user can Pin a Message
    await chatsMainPageSecond.selectContextMenuOption("Pin Message");

    // Local Message should have Pin Message Indicator
    await chatsMainPageSecond.validateLastLocalMessageIsPinned();

    // Open Pinned Messages container on local side and validate message is displayed
    await chatsMainPageSecond.openPinMessagesContainer();
    await chatsMainPageSecond.validatePinMessageShownInContainer(
      usernameTwo,
      firstMessage,
    );
    await chatsMainPageSecond.exitPinMessagesContainer();

    // Remote Message should have Pin Message Indicator
    await chatsMainPageFirst.validateLastRemoteMessageIsPinned();

    // Open Pinned Messages container on remote side and validate message is displayed
    await chatsMainPageFirst.openPinMessagesContainer();
    await chatsMainPageFirst.validatePinMessageShownInContainer(
      usernameTwo,
      firstMessage,
    );
    await chatsMainPageFirst.exitPinMessagesContainer();

    // Validate local user can unpin a message from context menu
    await chatsMainPageSecond.openContextMenuOnLastMessageSent();
    await chatsMainPageSecond.selectContextMenuOption("Unpin Message");

    // Local Message should not have Pin Message Indicator
    await chatsMainPageSecond.validateLastLocalMessageIsNotPinned();

    // Remote Message should not have Pin Message Indicator
    await chatsMainPageSecond.validateLastRemoteMessageIsNotPinned();

    // Send a message from first user to second user
    const secondMessage = "this is a second test message";
    await chatsMainPageFirst.sendMessage(secondMessage);
    lastMessageSent = await chatsMainPageFirst.getLastMessageLocal();
    lastMessageReceived = await chatsMainPageSecond.getLastMessageRemote();
    await expect(lastMessageSent).toHaveText(secondMessage);
    await expect(lastMessageReceived).toHaveText(secondMessage);

    // Validate user can pin a remote message
    await chatsMainPageSecond.openContextMenuOnLastMessageReceived();
    await chatsMainPageSecond.selectContextMenuOption("Pin Message");

    // Remote Message should have Pin Message Indicator
    await chatsMainPageSecond.validateLastRemoteMessageIsPinned();

    // Local Message should have Pin Message Indicator
    await chatsMainPageFirst.validateLastLocalMessageIsPinned();

    // Open Pinned Messages container on local side and validate message is displayed
    await chatsMainPageFirst.openPinMessagesContainer();
    await chatsMainPageFirst.validatePinMessageShownInContainer(
      username,
      secondMessage,
    );
    await chatsMainPageFirst.exitPinMessagesContainer();

    // Validate remote user can unpin a message from context menu
    await chatsMainPageSecond.openContextMenuOnLastMessageReceived();
    await chatsMainPageSecond.selectContextMenuOption("Unpin Message");

    // Remote Message should not have Pin Message Indicator
    await chatsMainPageSecond.validateLastRemoteMessageIsNotPinned();

    // Local Message should not have Pin Message Indicator
    await chatsMainPageSecond.validateLastLocalMessageIsNotPinned();

    // Send a message from second user to first user
    const thirdMessage = "this is a third test message";
    await chatsMainPageSecond.sendMessage(thirdMessage);
    lastMessageSent = await chatsMainPageSecond.getLastMessageLocal();
    lastMessageReceived = await chatsMainPageFirst.getLastMessageRemote();
    await expect(lastMessageSent).toHaveText(thirdMessage);
    await expect(lastMessageReceived).toHaveText(thirdMessage);

    // Local user can pin the message
    await chatsMainPageSecond.openContextMenuOnLastMessageSent();
    await chatsMainPageSecond.selectContextMenuOption("Pin Message");

    // Validate local user can unpin a message from unpin button
    await chatsMainPageSecond.openPinMessagesContainer();
    await chatsMainPageSecond.clickOnUnpinMessageButton(thirdMessage);

    // Local Message should not have Pin Message Indicator
    await chatsMainPageSecond.validateLastLocalMessageIsNotPinned();

    // Remote Message should not have Pin Message Indicator
    await chatsMainPageFirst.validateLastRemoteMessageIsNotPinned();

    // Send a message from first user to second user
    const fourthMessage = "this is a fourth test message";
    await chatsMainPageFirst.sendMessage(fourthMessage);
    lastMessageSent = await chatsMainPageFirst.getLastMessageLocal();
    lastMessageReceived = await chatsMainPageSecond.getLastMessageRemote();
    await expect(lastMessageSent).toHaveText(fourthMessage);
    await expect(lastMessageReceived).toHaveText(fourthMessage);

    // Remote user can pin the message
    await chatsMainPageSecond.openContextMenuOnLastMessageReceived();
    await chatsMainPageSecond.selectContextMenuOption("Pin Message");

    // Validate remote user can unpin a message from unpin button
    await chatsMainPageSecond.openPinMessagesContainer();
    await chatsMainPageSecond.clickOnUnpinMessageButton(fourthMessage);

    // Remote Message should not have Pin Message Indicator
    await chatsMainPageSecond.validateLastRemoteMessageIsNotPinned();

    // Local Message should not have Pin Message Indicator
    await chatsMainPageFirst.validateLastLocalMessageIsNotPinned();

    // Validate after all messages are unpinned, Pinned Messages container is empty again on both sides
    // Validate Pinned Messages container is empty when no messages have been pinned
    await chatsMainPageSecond.openPinMessagesContainer();
    await expect(chatsMainPageSecond.pinnedMessagesEmpty).toBeVisible();
    await expect(chatsMainPageSecond.pinnedMessagesEmpty).toHaveText(
      "There are no pinned messages in this chat",
    );
    await chatsMainPageSecond.exitPinMessagesContainer();

    // Validate Pinned Messages container is empty when no messages have been pinned
    await chatsMainPageFirst.openPinMessagesContainer();
    await expect(chatsMainPageFirst.pinnedMessagesEmpty).toBeVisible();
    await expect(chatsMainPageFirst.pinnedMessagesEmpty).toHaveText(
      "There are no pinned messages in this chat",
    );
    await chatsMainPageFirst.exitPinMessagesContainer();
  });

  test("B22 and B50 - Reaction Tests", async ({
    firstUserContext,
    secondUserContext,
  }) => {
    // Declare constants required from the fixtures
    const context1 = firstUserContext.context;
    const page1 = firstUserContext.page;
    const page2 = secondUserContext.page;
    const viewport = firstUserContext.viewport;
    const friendsScreenFirst = new FriendsScreen(page1, viewport);
    const friendsScreenSecond = new FriendsScreen(page2, viewport);
    const chatsMainPageFirst = new ChatsMainPage(page1, viewport);
    const chatsMainPageSecond = new ChatsMainPage(page2, viewport);
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
    await chatsMainPageSecond.removeReactionInLocalMessage("👍");
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

  test("B51 - Chats Markdowns Tests", async ({
    firstUserContext,
    secondUserContext,
  }) => {
    // Declare constants required from the fixtures
    const context1 = firstUserContext.context;
    const page1 = firstUserContext.page;
    const page2 = secondUserContext.page;
    const viewport = firstUserContext.viewport;
    const friendsScreenFirst = new FriendsScreen(page1, viewport);
    const friendsScreenSecond = new FriendsScreen(page2, viewport);
    const chatsMainPageFirst = new ChatsMainPage(page1, viewport);
    const chatsMainPageSecond = new ChatsMainPage(page2, viewport);
    const settingsProfileSecond = new SettingsProfile(page2, viewport);
    const settingsMessagesSecond = new SettingsMessages(page2, viewport);

    // Setup accounts for testing
    await setupChats(
      chatsMainPageFirst,
      chatsMainPageSecond,
      context1,
      friendsScreenFirst,
      friendsScreenSecond,
      page1,
    );

    // Go to Settings, then Settings Messages and disable convert to emoji functionality
    await chatsMainPageSecond.goToSettings();
    await page2.waitForURL("/settings/profile");
    await settingsProfileSecond.buttonMessages.click();
    await page2.waitForURL("/settings/messages");
    await settingsMessagesSecond.convertToEmojiSectionSlider.click();
    await expect(
      settingsMessagesSecond.convertToEmojiSectionCheckbox,
    ).not.toBeChecked();
    await settingsMessagesSecond.goToChat();
    await page2.waitForURL("/chat");

    // Send message with *test1* from second user to first user - Italic
    await chatsMainPageSecond.sendMessage("*test1*");
    await chatsMainPageSecond.validateMarkdownFromLastMessageLocal("test1", [
      "Italic",
    ]);
    await chatsMainPageFirst.validateMarkdownFromLastMessageRemote("test1", [
      "Italic",
    ]);

    // Send message _test2_ from second user to first user - Italic
    await chatsMainPageSecond.sendMessage("_test2_");
    await chatsMainPageSecond.validateMarkdownFromLastMessageLocal("test2", [
      "Italic",
    ]);
    await chatsMainPageFirst.validateMarkdownFromLastMessageRemote("test2", [
      "Italic",
    ]);

    // Send message **test3** from second user to first user - Bold
    await chatsMainPageSecond.sendMessage("**test3**");
    await chatsMainPageSecond.validateMarkdownFromLastMessageLocal("test3", [
      "Bold",
    ]);
    await chatsMainPageFirst.validateMarkdownFromLastMessageRemote("test3", [
      "Bold",
    ]);

    // Send message __test4__ from second user to first user - Bold
    await chatsMainPageSecond.sendMessage("__test4__");
    await chatsMainPageSecond.validateMarkdownFromLastMessageLocal("test4", [
      "Bold",
    ]);
    await chatsMainPageFirst.validateMarkdownFromLastMessageRemote("test4", [
      "Bold",
    ]);

    // Send message ~test5~ from second user to first user - Strikethroug
    await chatsMainPageSecond.sendMessage("~test5~");
    await chatsMainPageSecond.validateMarkdownFromLastMessageLocal("test5", [
      "Strikethrough",
    ]);
    await chatsMainPageFirst.validateMarkdownFromLastMessageRemote("test5", [
      "Strikethrough",
    ]);

    // Send message ~~test6~~ from second user to first user - Strikethroug
    await chatsMainPageSecond.sendMessage("~~test6~~");
    await chatsMainPageSecond.validateMarkdownFromLastMessageLocal("test6", [
      "Strikethrough",
    ]);
    await chatsMainPageFirst.validateMarkdownFromLastMessageRemote("test6", [
      "Strikethrough",
    ]);

    // Send message ~_test7_~ from second user to first user - Strikethrough
    await chatsMainPageSecond.sendMessage("~_test7_~");
    await chatsMainPageSecond.validateMarkdownFromLastMessageLocal("test7", [
      "Strikethrough",
      "Italic",
    ]);
    await chatsMainPageFirst.validateMarkdownFromLastMessageRemote("test7", [
      "Strikethrough",
      "Italic",
    ]);

    // Send message _~test8~_ from second user to first user - Strikethrough
    await chatsMainPageSecond.sendMessage("_~test8~_");
    await chatsMainPageSecond.validateMarkdownFromLastMessageLocal("test8", [
      "Italic",
      "Strikethrough",
    ]);
    await chatsMainPageFirst.validateMarkdownFromLastMessageRemote("test8", [
      "Italic",
      "Strikethrough",
    ]);

    // Send message ~*test9*~ from second user to first user - Strikethrough
    await chatsMainPageSecond.sendMessage("~*test9*~");
    await chatsMainPageSecond.validateMarkdownFromLastMessageLocal("test9", [
      "Strikethrough",
      "Italic",
    ]);
    await chatsMainPageFirst.validateMarkdownFromLastMessageRemote("test9", [
      "Strikethrough",
      "Italic",
    ]);

    // Send message *~test10*~ from second user to first user - Strikethrough
    await chatsMainPageSecond.sendMessage("*~test10~*");
    await chatsMainPageSecond.validateMarkdownFromLastMessageLocal("test10", [
      "Italic",
      "Strikethrough",
    ]);
    await chatsMainPageFirst.validateMarkdownFromLastMessageRemote("test10", [
      "Italic",
      "Strikethrough",
    ]);

    // Send message with hyperlink like www.google.com
    await chatsMainPageSecond.sendMessage("www.google.com");
    await chatsMainPageSecond.validateHyperlinkFromLastMessageLocal(
      "www.google.com",
      "http://www.google.com",
    );
    await chatsMainPageFirst.validateHyperlinkFromLastMessageRemote(
      "www.google.com",
      "http://www.google.com",
    );

    // Send message with hyperlink like https://www.satellite.im
    await chatsMainPageSecond.sendMessage("https://www.satellite.im");
    await chatsMainPageSecond.validateHyperlinkFromLastMessageLocal(
      "https://www.satellite.im",
      "https://www.satellite.im",
    );
    await chatsMainPageFirst.validateHyperlinkFromLastMessageRemote(
      "https://www.satellite.im",
      "https://www.satellite.im",
    );
  });

  test("B52 and B53 - Sending and receiving files tests", async ({
    firstUserContext,
    secondUserContext,
  }) => {
    // Declare constants required from the fixtures
    const context1 = firstUserContext.context;
    const page1 = firstUserContext.page;
    const page2 = secondUserContext.page;
    const viewport = firstUserContext.viewport;
    const friendsScreenFirst = new FriendsScreen(page1, viewport);
    const friendsScreenSecond = new FriendsScreen(page2, viewport);
    const chatsMainPageFirst = new ChatsMainPage(page1, viewport);
    const chatsMainPageSecond = new ChatsMainPage(page2, viewport);

    // Setup accounts for testing
    await setupChats(
      chatsMainPageFirst,
      chatsMainPageSecond,
      context1,
      friendsScreenFirst,
      friendsScreenSecond,
      page1,
    );

    let fileLocations = [
      "playwright/assets/logo.jpg",
      "playwright/assets/test.txt",
    ];

    await chatsMainPageSecond.uploadFiles(fileLocations);
    await chatsMainPageSecond.validateFilePreviews(fileLocations);
    await chatsMainPageSecond.sendMessage("bunch of files");

    // Validate file sent is displayed on local side
    await chatsMainPageSecond.validateFileEmbedInChat("test.txt", "14 B", true);

    // Validate image sent is displayed on local side
    await chatsMainPageSecond.validateImageEmbedInChat(
      "logo.jpg",
      "7.75 kB",
      true,
    );

    // Validate file received is displayed in chat on remote side
    await chatsMainPageFirst.validateFileEmbedInChat("test.txt", "14 B", false);

    // Validate image received is displayed in chat on remote side
    await chatsMainPageFirst.validateImageEmbedInChat(
      "logo.jpg",
      "7.75 kB",
      false,
    );

    // B53 - User can download media from chat by clicking download
    // Download last files sent and received
    await chatsMainPageSecond.downloadFileLastMessage("test.txt", true);
    await chatsMainPageSecond.validateDownloadedFile("test.txt");
    await chatsMainPageFirst.downloadFileLastMessage("test.txt", false);
    await chatsMainPageFirst.validateDownloadedFile("test.txt");

    // Download last images sent and received
    await chatsMainPageSecond.downloadFileLastMessage("logo.jpg", true);
    await chatsMainPageSecond.validateDownloadedFile("logo.jpg");
    await chatsMainPageFirst.downloadFileLastMessage("logo.jpg", false);
    await chatsMainPageFirst.validateDownloadedFile("logo.jpg");

    // B52 - User should be able to click on image in chat to see image preview
    await chatsMainPageSecond.openImagePreviewLastImageSent();
    await chatsMainPageSecond.validateImagePreviewIsVisible();
    await chatsMainPageSecond.closeImagePreview();

    await chatsMainPageFirst.openImagePreviewLastImageReceived();
    await chatsMainPageFirst.validateImagePreviewIsVisible();
    await chatsMainPageFirst.closeImagePreview();
  });

  test("B66 - Sending and receiving emojis and emoji picker tests", async ({
    firstUserContext,
    secondUserContext,
  }) => {
    // Declare constants required from the fixtures
    const context1 = firstUserContext.context;
    const page1 = firstUserContext.page;
    const page2 = secondUserContext.page;
    const viewport = firstUserContext.viewport;
    const friendsScreenFirst = new FriendsScreen(page1, viewport);
    const friendsScreenSecond = new FriendsScreen(page2, viewport);
    const chatsMainPageFirst = new ChatsMainPage(page1, viewport);
    const chatsMainPageSecond = new ChatsMainPage(page2, viewport);

    // Setup accounts for testing
    await setupChats(
      chatsMainPageFirst,
      chatsMainPageSecond,
      context1,
      friendsScreenFirst,
      friendsScreenSecond,
      page1,
    );

    await chatsMainPageSecond.openEmojiPicker();
    const emojiPickerSecond = new EmojiPicker(page2, viewport);
    await emojiPickerSecond.selectEmoji("😂");
    await chatsMainPageSecond.buttonChatbarSendMessage.click();

    // Validate emoji sent is displayed on local and remote sides
    await expect(chatsMainPageSecond.messageBubbleContent.last()).toHaveText(
      "😂",
    );
    await expect(chatsMainPageFirst.messageBubbleContent.last()).toHaveText(
      "😂",
    );

    // Change skin tone of emojis
    await chatsMainPageSecond.openEmojiPicker();
    await emojiPickerSecond.changeSkinToneEmoji(2);
    await emojiPickerSecond.selectEmoji("🖐🏾");
    await chatsMainPageSecond.buttonChatbarSendMessage.click();

    // Validate emoji sent is displayed on local and remote sides
    await expect(chatsMainPageSecond.messageBubbleContent.last()).toHaveText(
      "🖐🏾",
    );
    await expect(chatsMainPageFirst.messageBubbleContent.last()).toHaveText(
      "🖐🏾",
    );

    // Change emoji size in emojis container view
    await chatsMainPageSecond.openEmojiPicker();
    await emojiPickerSecond.changeEmojiSizeView("16");
    await emojiPickerSecond.validateSingleEmojiSize("😀", "16px");
    await emojiPickerSecond.changeEmojiSizeView("45");
    await emojiPickerSecond.validateSingleEmojiSize("😀", "45px");
    await emojiPickerSecond.changeEmojiSizeView("30");
    await emojiPickerSecond.validateSingleEmojiSize("😀", "30px");

    // Validate emoji categories displayed in emoji container
    const emojiCategories = [
      "Frequently Used",
      "smileys and emotion",
      "people and body",
      "animals and nature",
      "food and drink",
      "travel and places",
      "activities",
      "objects",
      "symbols",
      "flags",
    ];
    await emojiPickerSecond.validateEmojiCategories(emojiCategories);

    // Validate number of emojis per category
    await emojiPickerSecond.validateNumberOfEmojisPerSection(
      "frequently-used",
      2,
    );
    await emojiPickerSecond.validateNumberOfEmojisPerSection(
      "smileys-and-emotion",
      168,
    );
    await emojiPickerSecond.validateNumberOfEmojisPerSection(
      "people-and-body",
      367,
    );
    await emojiPickerSecond.validateNumberOfEmojisPerSection(
      "animals-and-nature",
      153,
    );
    await emojiPickerSecond.validateNumberOfEmojisPerSection(
      "food-and-drink",
      135,
    );
    await emojiPickerSecond.validateNumberOfEmojisPerSection(
      "travel-and-places",
      218,
    );
    await emojiPickerSecond.validateNumberOfEmojisPerSection("activities", 84);
    await emojiPickerSecond.validateNumberOfEmojisPerSection("objects", 261);
    await emojiPickerSecond.validateNumberOfEmojisPerSection("symbols", 223);
    await emojiPickerSecond.validateNumberOfEmojisPerSection("flags", 269);

    // Validate user can navigate through all categories of emojis
    await emojiPickerSecond.navigateThroughEmojiCategories(
      "smileys-and-emotion",
    );
    await emojiPickerSecond.navigateThroughEmojiCategories("people-and-body");
    await emojiPickerSecond.navigateThroughEmojiCategories(
      "animals-and-nature",
    );
    await emojiPickerSecond.navigateThroughEmojiCategories("food-and-drink");
    await emojiPickerSecond.navigateThroughEmojiCategories("travel-and-places");
    await emojiPickerSecond.navigateThroughEmojiCategories("activities");
    await emojiPickerSecond.navigateThroughEmojiCategories("objects");
    await emojiPickerSecond.navigateThroughEmojiCategories("symbols");
    await emojiPickerSecond.navigateThroughEmojiCategories("flags");

    // Validate user can navigate through tabs in emoji picker
    await emojiPickerSecond.goToGifsTab();
    await emojiPickerSecond.goToStickersTab();
    await emojiPickerSecond.goToEmojisTab();

    // Search for emojis in emoji picker
    await emojiPickerSecond.searchEmoji("mexico");
  });

  test("B67 - Sending and receiving GIFs and gif picker tests", async ({
    firstUserContext,
    secondUserContext,
  }) => {
    // Declare constants required from the fixtures
    const context1 = firstUserContext.context;
    const page1 = firstUserContext.page;
    const page2 = secondUserContext.page;
    const viewport = firstUserContext.viewport;
    const friendsScreenFirst = new FriendsScreen(page1, viewport);
    const friendsScreenSecond = new FriendsScreen(page2, viewport);
    const chatsMainPageFirst = new ChatsMainPage(page1, viewport);
    const chatsMainPageSecond = new ChatsMainPage(page2, viewport);

    // Setup accounts for testing
    await setupChats(
      chatsMainPageFirst,
      chatsMainPageSecond,
      context1,
      friendsScreenFirst,
      friendsScreenSecond,
      page1,
    );

    // Change GIF size in gifs container view
    await chatsMainPageSecond.openGifPicker();
    const gifPickerSecond = new GifPicker(page2, viewport);
    await gifPickerSecond.waitForGifsToLoad();
    await gifPickerSecond.changeGifSizeView("100");
    await gifPickerSecond.changeGifSizeView("200");
    await gifPickerSecond.changeGifSizeView("150");

    // Send a Gif to the other user
    const gifToSelect = await gifPickerSecond.getGifAltText(0);
    await gifPickerSecond.selectGif(gifToSelect);

    // Validate GIF sent is displayed on local and remote sides
    const imageSent = chatsMainPageSecond.messageBubbleContent
      .last()
      .locator("img");
    const imageReceived = chatsMainPageFirst.messageBubbleContent
      .last()
      .locator("img");
    await expect(imageSent).toHaveAttribute("alt", gifToSelect);
    await expect(imageSent).toBeVisible();
    await expect(imageReceived).toHaveAttribute("alt", gifToSelect);
    await expect(imageReceived).toBeVisible();

    // Validate GIF sent is displayed in chat preview from sidebar as last message sent
    await chatsMainPageSecond.validateChatPreviewMessageImage(
      username,
      gifToSelect,
    );
    await chatsMainPageFirst.validateChatPreviewMessageImage(
      usernameTwo,
      gifToSelect,
    );

    // Validate user can navigate through tabs in Gif picker
    await chatsMainPageSecond.openGifPicker();
    await gifPickerSecond.goToStickersTab();
    await gifPickerSecond.goToEmojisTab();
    await gifPickerSecond.goToGifsTab();
  });

  test("B68 - Sending and receiving stickers and sticker picker tests", async ({
    firstUserContext,
    secondUserContext,
  }) => {
    // Declare constants required from the fixtures
    const context1 = firstUserContext.context;
    const page1 = firstUserContext.page;
    const page2 = secondUserContext.page;
    const viewport = firstUserContext.viewport;
    const friendsScreenFirst = new FriendsScreen(page1, viewport);
    const friendsScreenSecond = new FriendsScreen(page2, viewport);
    const chatsMainPageFirst = new ChatsMainPage(page1, viewport);
    const chatsMainPageSecond = new ChatsMainPage(page2, viewport);

    // Setup accounts for testing
    await setupChats(
      chatsMainPageFirst,
      chatsMainPageSecond,
      context1,
      friendsScreenFirst,
      friendsScreenSecond,
      page1,
    );

    await chatsMainPageSecond.openStickerPicker();
    const stickerPickerSecond = new StickerPicker(page2, viewport);
    await stickerPickerSecond.waitForStickersToLoad();

    // Send a Sticker to the other user
    await stickerPickerSecond.selectSticker("Space Cat", "Power Up");

    // Validate Sticker sent is displayed on local and remote sides
    const imageSent = chatsMainPageSecond.messageBubbleContent
      .last()
      .locator("img");
    await imageSent.waitFor({ state: "attached" });
    const imageReceived = chatsMainPageFirst.messageBubbleContent
      .last()
      .locator("img");
    await imageReceived.waitFor({ state: "attached" });
    await expect(imageSent).toHaveAttribute("alt", "Power Up");
    await expect(imageSent).toBeVisible();
    await expect(imageReceived).toHaveAttribute("alt", "Power Up");
    await expect(imageReceived).toBeVisible();

    // Validate Sticker sent is displayed in chat preview from sidebar as last message sent
    await chatsMainPageSecond.validateChatPreviewMessageImage(
      username,
      "Power Up",
    );
    await chatsMainPageFirst.validateChatPreviewMessageImage(
      usernameTwo,
      "Power Up",
    );

    // Validate user can navigate through tabs in sticker picker
    await chatsMainPageSecond.openStickerPicker();
    await stickerPickerSecond.goToEmojisTab();
    await stickerPickerSecond.goToGifsTab();
    await stickerPickerSecond.goToStickersTab();

    // Validate sticker categories displayed in sticker container
    const stickerCategories = [
      "Space Cat (Team Satellite)",
      "Bad Animals (Team Satellite)",
      "Anime (Team Satellite)",
      "Words (Team Satellite)",
      "Fishy Business (Team Satellite)",
      "The Garden (Team Satellite)",
      "Sassy Toons (Team Satellite)",
    ];
    await stickerPickerSecond.validateStickerCategories(stickerCategories);

    // Validate number of stickers per category
    await stickerPickerSecond.validateNumberOfStickersPerSection(
      "Space Cat",
      16,
    );
    await stickerPickerSecond.validateNumberOfStickersPerSection(
      "Bad Animals",
      18,
    );
    await stickerPickerSecond.validateNumberOfStickersPerSection("Anime", 13);
    await stickerPickerSecond.validateNumberOfStickersPerSection("Words", 9);
    await stickerPickerSecond.validateNumberOfStickersPerSection(
      "Fishy Business",
      9,
    );
    await stickerPickerSecond.validateNumberOfStickersPerSection(
      "The Garden",
      9,
    );
    await stickerPickerSecond.validateNumberOfStickersPerSection(
      "Sassy Toons",
      5,
    );

    // Validate user can navigate through all categories of stickers
    await stickerPickerSecond.navigateThroughStickerCategories("Space Cat");
    await stickerPickerSecond.navigateThroughStickerCategories("Bad Animals");
    await stickerPickerSecond.navigateThroughStickerCategories("Anime");
    await stickerPickerSecond.navigateThroughStickerCategories("Words");
    await stickerPickerSecond.navigateThroughStickerCategories(
      "Fishy Business",
    );
    await stickerPickerSecond.navigateThroughStickerCategories("The Garden");
    await stickerPickerSecond.navigateThroughStickerCategories("Sassy Toons");
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
