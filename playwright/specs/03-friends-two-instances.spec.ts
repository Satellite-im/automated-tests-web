import { ChatsMainPage } from "playwright/PageObjects/ChatsElements/ChatsMain";
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
import { CallScreen } from "playwright/PageObjects/CallElements/CallScreen";
import { IncomingCall } from "playwright/PageObjects/CallElements/IncomingCall";
import { CreateGroupModal } from "playwright/PageObjects/ChatsElements/CreateGroupModal";
import { ReplyModal } from "playwright/PageObjects/ChatsElements/ReplyModal";

const username = "ChatUserA";
const usernameTwo = "ChatUserB";
const usernameThree = "ChatUserC";
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
    let currentFriendsSecondUser: string[];
    let didKeyFirstUser: string;

    // With both users go to Friends Screen
    await test.step("With both users go to Friends Screen", async () => {
      await chatsMainPageFirst.dismissDownloadAlert();
      await chatsMainPageSecond.dismissDownloadAlert();
      await chatsMainPageFirst.goToFriends();
      await chatsMainPageSecond.goToFriends();
    });

    // H15 - User should be removed from friends list after clicking unfriend
    await test.step("First user grants clipboard permissions, Copy DID and save it into a constant", async () => {
      await context1.grantPermissions(["clipboard-read", "clipboard-write"]);
      await friendsScreenFirst.copyDIDFromContextMenu();
      const handle = await page1.evaluateHandle(() =>
        navigator.clipboard.readText(),
      );
      didKeyFirstUser = await handle.jsonValue();
    });

    await test.step("Second user adds first user as friend", async () => {
      await friendsScreenSecond.addFriend(didKeyFirstUser);
      await friendsScreenSecond.validateToastRequestSent();
      await friendsScreenFirst.waitForToastNotificationToDisappear();
      await friendsScreenSecond.waitForToastNotificationToDisappear();
    });

    await test.step("With First User, go to requests list and accept friend request", async () => {
      await friendsScreenFirst.goToRequestList();
      await friendsScreenFirst.validateIncomingRequestExists();
      await friendsScreenFirst.acceptFriendRequest(usernameTwo);
      await friendsScreenFirst.goToAllFriendsList();
    });

    await test.step("With Second User, go to All Friends and click on Remove Friend button", async () => {
      await friendsScreenSecond.goToRequestList();
      await friendsScreenSecond.goToAllFriendsList();
    });

    await test.step("Validate Friend List is displayed for letter 'C'", async () => {
      await friendsScreenSecond.validateFriendListIsDisplayed("C");
      currentFriendsSecondUser =
        await friendsScreenSecond.getListOfCurrentFriends();
      expect(currentFriendsSecondUser).toEqual([username]);
    });

    await test.step("Now remove the user from friends", async () => {
      await friendsScreenSecond.removeFriend(username);
      await friendsScreenSecond.validateFriendListDoesNotExist("C");
      currentFriendsSecondUser =
        await friendsScreenSecond.getListOfCurrentFriends();
      expect(currentFriendsSecondUser).toEqual([]);
    });

    await test.step("Validate remote user has friend list empty as well", async () => {
      await friendsScreenFirst.validateFriendListDoesNotExist("C");
      const currentFriendsFirstUser =
        await friendsScreenFirst.getListOfCurrentFriends();
      expect(currentFriendsFirstUser).toEqual([]);
    });
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
    let didKeyFirstUser: string;

    await test.step("Create two accounts, dismiss download alerts and go to Friends", async () => {
      await chatsMainPageFirst.dismissDownloadAlert();
      await chatsMainPageSecond.dismissDownloadAlert();
      await chatsMainPageFirst.goToFriends();
      await chatsMainPageSecond.goToFriends();
    });

    await test.step("First user grants clipboard permissions, Copy DID and save it into a constant", async () => {
      await context1.grantPermissions(["clipboard-read", "clipboard-write"]);
      await friendsScreenFirst.copyDIDFromContextMenu();
      const handle = await page1.evaluateHandle(() =>
        navigator.clipboard.readText(),
      );
      didKeyFirstUser = await handle.jsonValue();

      await friendsScreenSecond.copyDIDFromContextMenu();
    });

    await test.step("Add first user as a friend", async () => {
      await friendsScreenSecond.addFriend(didKeyFirstUser);
      await friendsScreenSecond.validateToastRequestSent();
      await friendsScreenFirst.closeToastNotification();
      await friendsScreenSecond.waitForToastNotificationToDisappear();
    });

    await test.step("With First User, go to requests list and accept friend request", async () => {
      await friendsScreenFirst.goToRequestList();
      await friendsScreenFirst.validateIncomingRequestExists();
      await friendsScreenFirst.acceptFriendRequest(usernameTwo);
      await friendsScreenFirst.goToAllFriendsList();
      await friendsScreenFirst.validateFriendListIsDisplayed("C");
    });

    await test.step("With Second User, go to All Friends", async () => {
      await friendsScreenSecond.goToRequestList();
      await friendsScreenSecond.goToAllFriendsList();
      await friendsScreenSecond.validateFriendListIsDisplayed("C");
    });

    await test.step("H16 - Clicking block should block user", async () => {
      await friendsScreenSecond.blockFriend(username);
      await friendsScreenSecond.validateFriendListDoesNotExist("C");
      await friendsScreenFirst.validateFriendListDoesNotExist("C");
    });

    await test.step("H17 - User should be displayed under Blocked Users after you block them", async () => {
      await friendsScreenSecond.goToBlockedList();
      await friendsScreenSecond.validateBlockedUserExists();
      await friendsScreenSecond.validateUserIsBlocked(username);
    });

    await test.step("H18 - User should be cleared from Blocked Users after you unblock them", async () => {
      await friendsScreenSecond.unblockFriend(username);
      await friendsScreenSecond.validateNoBlockedUsersExist();
      await friendsScreenSecond.goToAllFriendsList();
    });

    await test.step("H26 - User can unblock a user and add again the same user", async () => {
      await friendsScreenSecond.addFriend(didKeyFirstUser);
      await friendsScreenSecond.validateToastRequestSent();
      await friendsScreenFirst.closeToastNotification();
      await friendsScreenSecond.waitForToastNotificationToDisappear();

      await friendsScreenFirst.goToRequestList();
      await friendsScreenFirst.validateIncomingRequestExists();
    });

    await test.step("Accept incoming request after being unblocked", async () => {
      await friendsScreenFirst.acceptFriendRequest(usernameTwo);
      await friendsScreenFirst.goToAllFriendsList();
      await friendsScreenFirst.chatWithFriend(usernameTwo);

      await friendsScreenSecond.goToRequestList();
      await friendsScreenSecond.validateNoOutgoingRequestsExist();
      await friendsScreenSecond.goToAllFriendsList();
      await friendsScreenSecond.chatWithFriend(username);
    });

    await test.step("Send message to another user after being unblocked", async () => {
      await chatsMainPageFirst.sendMessage("Hello from the first user");
      await chatsMainPageFirst.validateMessageIsSent(
        "Hello from the first user",
      );
    });
    await test.step("Validate messages from unblocked user care received", async () => {
      await chatsMainPageSecond.validateMessageIsReceived(
        "Hello from the first user",
      );
    });
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
    let didKeyFirstUser: string;

    await test.step("Create two accounts, dismiss download alerts and go to Friends", async () => {
      await chatsMainPageFirst.dismissDownloadAlert();
      await chatsMainPageSecond.dismissDownloadAlert();
      await chatsMainPageFirst.goToFriends();
      await chatsMainPageSecond.goToFriends();
    });

    await test.step("First user grants clipboard permissions, Copy DID and save it into a constant", async () => {
      await context1.grantPermissions(["clipboard-read", "clipboard-write"]);
      await friendsScreenFirst.copyDIDFromContextMenu();
      const handle = await page1.evaluateHandle(() =>
        navigator.clipboard.readText(),
      );
      didKeyFirstUser = await handle.jsonValue();

      await friendsScreenSecond.copyDIDFromContextMenu();
    });

    await test.step("Add first user as a friend", async () => {
      await friendsScreenSecond.addFriend(didKeyFirstUser);
    });

    await test.step("H7 - With First User, go to requests list and deny friend request", async () => {
      await friendsScreenSecond.validateToastRequestSent();
      await friendsScreenFirst.waitForToastNotificationToDisappear();
      await friendsScreenSecond.waitForToastNotificationToDisappear();

      await friendsScreenSecond.waitForToastNotificationToDisappear();
      await friendsScreenSecond.goToBlockedList();
      await friendsScreenSecond.goToRequestList();

      await friendsScreenFirst.goToRequestList();
      await friendsScreenFirst.goToAllFriendsList();
      await friendsScreenFirst.goToRequestList();
      await friendsScreenFirst.validateIncomingRequestExists();
      await friendsScreenFirst.denyFriendRequest(usernameTwo);
    });

    await test.step("Validate incoming list now shows empty on user who received and denied the friend request", async () => {
      await friendsScreenFirst.validateNoIncomingRequestsExist();
    });

    await test.step("Validate outgoing list now shows empty on user who sent the friend request", async () => {
      await friendsScreenSecond.validateNoOutgoingRequestsExist();
    });
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
    let didKeyFirstUser: string;

    await test.step("With both users go to Friends Screen", async () => {
      await chatsMainPageFirst.dismissDownloadAlert();
      await chatsMainPageSecond.dismissDownloadAlert();
      await chatsMainPageFirst.goToFriends();
      await chatsMainPageSecond.goToFriends();
    });

    await test.step("First user grants clipboard permissions, Copy DID and save it into a constant", async () => {
      await context1.grantPermissions(["clipboard-read", "clipboard-write"]);
      await friendsScreenFirst.copyDIDFromContextMenu();
      const handle = await page1.evaluateHandle(() =>
        navigator.clipboard.readText(),
      );
      didKeyFirstUser = await handle.jsonValue();
      await friendsScreenSecond.copyDIDFromContextMenu();
    });

    await test.step("Add first user as a friend", async () => {
      await friendsScreenSecond.addFriend(didKeyFirstUser);
      await friendsScreenSecond.validateToastRequestSent();
      await friendsScreenSecond.waitForToastNotificationToDisappear();
    });

    await test.step("With First User, validate incoming request exists", async () => {
      await friendsScreenFirst.waitForToastNotificationToDisappear();
      await friendsScreenFirst.goToRequestList();
      await friendsScreenFirst.validateIncomingRequestExists();
    });

    await test.step("With Second User, cancel the outgoing request", async () => {
      await friendsScreenSecond.goToRequestList();
      await friendsScreenSecond.validateOutgoingRequestExists();
      await friendsScreenSecond.cancelFriendRequest(username);
      await friendsScreenSecond.validateNoOutgoingRequestsExist();
    });

    await test.step("With First User, validate incoming request no longer exists", async () => {
      await friendsScreenFirst.validateNoIncomingRequestsExist();
    });
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

    await test.step("Setup accounts for testing", async () => {
      await setupChats(
        chatsMainPageFirst,
        chatsMainPageSecond,
        context1,
        friendsScreenFirst,
        friendsScreenSecond,
        page1,
      );
    });

    await test.step("B3 - Messages are secured by end-to-end encryption, sent over a peer-to-peer network should be displayed at the top of every chat", async () => {
      await chatsMainPageSecond.chatEncryptedMessage.waitFor({
        state: "visible",
      });
      await expect(chatsMainPageSecond.chatEncryptedMessageText).toHaveText(
        "Messages are secured by end-to-end encryption, sent over a peer-to-peer network.",
      );
    });

    await test.step("Validate in Desktop View CSS for buttons when focused", async () => {
      // Validations only done in desktop view
      if (chatsMainPageSecond.viewport === "desktop-chrome") {
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
      }
    });

    await test.step("B35 - Highlighted border should appear around textbox in chat when user clicks into it", async () => {
      await chatsMainPageSecond.chatbarInput.fill("test");
      await expect(chatsMainPageSecond.chatbarInputContainer).toHaveCSS(
        "box-shadow",
        "rgb(77, 77, 255) 0px 0px 0px 1px",
      );
      await chatsMainPageSecond.chatbarInput.clear();
    });

    await test.step("B36 - User should already be clicked into textbox when they enter a chat", async () => {
      await chatsMainPageSecond.sendMessage("Hello from the second user");
    });

    await test.step("Validate message sent is seen in local and remote sides", async () => {
      await chatsMainPageSecond.validateMessageIsSent(
        "Hello from the second user",
      );
      await chatsMainPageFirst.validateMessageIsReceived(
        "Hello from the second user",
      );
    });

    await test.step("B16 - Timestamp appears after most recent message sent", async () => {
      const timestampMessageReceived =
        await chatsMainPageFirst.getLastTimestampRemote();
      const timestampMessageSent =
        await chatsMainPageSecond.getLastTimestampLocal();

      await expect(timestampMessageReceived).toHaveText("ChatUserB - just now");
      await expect(timestampMessageSent).toHaveText("ChatUserB - just now");
    });

    await test.step("B17 - Users profile picture appears next to messages sent", async () => {
      const profilePictureLocalUser =
        await chatsMainPageSecond.getLastLocalProfilePicture();
      await expect(profilePictureLocalUser).toBeVisible();

      const profilePictureRemoteUser =
        await chatsMainPageFirst.getLastRemoteProfilePicture();
      await expect(profilePictureRemoteUser).toBeVisible();
    });

    await test.step("B37 - User should not be able to send a blank message (Send button should be greyed out until any text is added into the textbox", async () => {
      await chatsMainPageFirst.sendMessage("");
      const numberOfMessagesSent =
        await chatsMainPageFirst.messabeBubbleLocal.count();
      expect(numberOfMessagesSent).toEqual(0);
    });

    await test.step("B55 - Messages should be limited to 255 chars", async () => {
      await chatsMainPageFirst.chatbarInput.fill(
        "012345678900123456789001234567890012345678900123456789001234567890012345678900123456789001234567890012345678900123456789001234567890012345678900123456789001234567890012345678900123456789001234567890012345678900123456789001234567890012345678900123456789001234567890",
      );
      await page1
        .getByText("Maximum length is 255 characters.")
        .waitFor({ state: "attached" });
    });
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

    await test.step("Setup accounts for testing", async () => {
      await setupChats(
        chatsMainPageFirst,
        chatsMainPageSecond,
        context1,
        friendsScreenFirst,
        friendsScreenSecond,
        page1,
      );
    });

    await test.step("B7 - Favorite button should should be highlighted after clicked and grey when unclicked", async () => {
      await chatsMainPageFirst.chatEncryptedMessage.waitFor({
        state: "visible",
      });
      await chatsMainPageFirst.validateFavoriteButtonBackgroundColor(
        "rgb(33, 38, 58)",
      );
      await chatsMainPageFirst.clickOnFavoriteButton();
      await chatsMainPageFirst.validateFavoriteButtonBackgroundColor(
        /rgb\(77, 77, 255\)|color\(srgb 0.371765 0.371765 1\)/,
      );
    });

    await test.step("C12 - Favorites should appear on left side of Sidebar", async () => {
      await chatsMainPageFirst.clickOnShowSidebarIfClosed();
      await expect(chatsMainPageFirst.favoriteCircle).toBeVisible();
      await expect(chatsMainPageFirst.favoriteProfilePicture).toBeVisible();
      await expect(
        chatsMainPageFirst.favoriteProfileStatusIndicator,
      ).toHaveClass(/.*\bonline\b.*/);
    });

    await test.step("B57 and C14 - Clicking a favorite should take you to that chat", async () => {
      await chatsMainPageFirst.goToFiles();
      await page1.waitForURL("/files");
      await filesPageFirst.clickOnShowSidebarIfClosed();
      await filesPageFirst.favoriteProfilePicture.click();
      await expect(chatsMainPageFirst.chatTopbarUsername).toHaveText(
        usernameTwo,
      );
    });

    await test.step("B58 - User can remove Favorites and these will not be displayed on Slimbar", async () => {
      await chatsMainPageFirst.clickOnFavoriteButton();
      await chatsMainPageFirst.validateNoFavoritesAreVisible();
    });
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

    await test.step("Setup accounts for testing", async () => {
      await setupChats(
        chatsMainPageFirst,
        chatsMainPageSecond,
        context1,
        friendsScreenFirst,
        friendsScreenSecond,
        page1,
      );
    });

    await test.step("Validate elements displayed in chat sidebar preview", async () => {
      await chatsMainPageFirst.chatEncryptedMessage.waitFor({
        state: "visible",
      });

      const topbarImageURL =
        await chatsMainPageFirst.chatTopbarProfilePictureImage.getAttribute(
          "src",
        );
      await chatsMainPageFirst.clickOnShowSidebarIfClosed();
      const chatPreviewImageURL =
        await chatsMainPageFirst.chatPreviewPictureImage.getAttribute("src");
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
      await chatsMainPageFirst.hideSidebarOnMobileView();
    });

    await test.step("Send a message from user two to first user", async () => {
      await chatsMainPageSecond.sendMessage("Hello from the second user");
      await chatsMainPageSecond.validateMessageIsSent(
        "Hello from the second user",
      );
    });

    await test.step("Validate message is displayed on remote user", async () => {
      await chatsMainPageFirst.validateMessageIsReceived(
        "Hello from the second user",
      );
    });

    await test.step("Validate chat sidebar is updated with most recent message on both sides local and remote", async () => {
      await chatsMainPageFirst.clickOnShowSidebarIfClosed();
      await expect(chatsMainPageFirst.chatPreviewLastMessage).toHaveText(
        "Hello from the second user",
      );
      await chatsMainPageFirst.validateChatPreviewMessageText(
        usernameTwo,
        "Hello from the second user",
      );

      await chatsMainPageSecond.clickOnShowSidebarIfClosed();
      await expect(chatsMainPageSecond.chatPreviewLastMessage).toHaveText(
        "Hello from the second user",
      );
      await chatsMainPageSecond.validateChatPreviewMessageText(
        username,
        "Hello from the second user",
      );
      await chatsMainPageSecond.hideSidebarOnMobileView();
    });

    await test.step("Validate context menu options for chat sidebar preview", async () => {
      await chatsMainPageFirst.openContextMenuOnChatPreview(usernameTwo);
    });

    await test.step("C12 - Favorites should appear on left side of Sidebar when selecting from Context Menu - Favorite", async () => {
      await chatsMainPageFirst.contextMenuOptionFavorite.click();
      await expect(chatsMainPageFirst.favoriteCircle).toBeVisible();
      await expect(chatsMainPageFirst.favoriteProfilePicture).toBeVisible();
      await expect(
        chatsMainPageFirst.favoriteProfileStatusIndicator,
      ).toHaveClass(/.*\bonline\b.*/);
    });

    await test.step("Unfavorite user from Context Menu and validate remote user is removed from favorites", async () => {
      await chatsMainPageFirst.openContextMenuOnChatPreview(usernameTwo);
      await chatsMainPageFirst.contextMenuOptionFavorite.click();
      await chatsMainPageFirst.validateNoFavoritesAreVisible();
      await chatsMainPageFirst.hideSidebarOnMobileView();
    });
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
    const firstMessage = "this is a first message";
    let firstMessageLocal: Locator;

    await test.step("Setup accounts for testing", async () => {
      await setupChats(
        chatsMainPageFirst,
        chatsMainPageSecond,
        context1,
        friendsScreenFirst,
        friendsScreenSecond,
        page1,
      );
    });

    await test.step("Validate chat pages are loaded on both sides", async () => {
      await chatsMainPageFirst.chatEncryptedMessage.waitFor({
        state: "visible",
      });
      await chatsMainPageSecond.chatEncryptedMessage.waitFor({
        state: "visible",
      });
    });

    await test.step("Send a first message different from the ones that will be send after", async () => {
      await chatsMainPageSecond.sendMessage(firstMessage);
      await expect(chatsMainPageSecond.messageBubbleContent.last()).toHaveText(
        firstMessage,
      );
      await expect(chatsMainPageFirst.messageBubbleContent.last()).toHaveText(
        firstMessage,
      );
    });

    await test.step("Pin first message sent", async () => {
      await chatsMainPageSecond.openContextMenuOnLastMessageSent();
      await chatsMainPageSecond.selectContextMenuOption("Pin Message");
      await chatsMainPageSecond.validateLastLocalMessageIsPinned();
      await chatsMainPageFirst.validateLastRemoteMessageIsPinned();
    });

    await test.step("Send 20 messages to validate scroll to bottom button", async () => {
      for (let i = 0; i < 19; i++) {
        const randomSentence = faker.lorem.sentence(3);
        await chatsMainPageSecond.sendMessage(randomSentence);
        await expect(
          chatsMainPageSecond.messageBubbleContent.last(),
        ).toHaveText(randomSentence);
        await expect(chatsMainPageFirst.messageBubbleContent.last()).toHaveText(
          randomSentence,
        );
      }
    });

    await test.step("Validate scroll to bottom button is displayed", async () => {
      firstMessageLocal = await chatsMainPageSecond.getFirstMessageLocal();
      await firstMessageLocal.scrollIntoViewIfNeeded();
      await expect(firstMessageLocal).toBeVisible();
      await expect(chatsMainPageSecond.scrollToBottomButton).toBeVisible();
      await chatsMainPageSecond.scrollToBottomButton.click();
      await expect(chatsMainPageSecond.scrollToBottomButton).toBeHidden();
    });

    await test.step("Valiate local user can go to pinned message by clicking on Go To button", async () => {
      await chatsMainPageSecond.openPinMessagesContainer();
      await chatsMainPageSecond.clickOnGoToPinnedMessageButton(firstMessage);
      await expect(firstMessageLocal).toBeVisible();
    });

    await test.step("Valiate remote user can go to pinned message by clicking on Go To button", async () => {
      const firstMessageRemote =
        await chatsMainPageFirst.getFirstMessageRemote();
      await chatsMainPageFirst.openPinMessagesContainer();
      await chatsMainPageFirst.clickOnGoToPinnedMessageButton(firstMessage);
      await expect(firstMessageRemote).toBeVisible();
    });
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
    const randomSentence = faker.lorem.sentence(3);
    const randomSentenceTwo = faker.lorem.sentence(3);

    await test.step("Setup accounts for testing", async () => {
      await setupChats(
        chatsMainPageFirst,
        chatsMainPageSecond,
        context1,
        friendsScreenFirst,
        friendsScreenSecond,
        page1,
      );
    });

    await test.step("Send a message from first user to second user", async () => {
      await chatsMainPageFirst.sendMessage(randomSentence);
      await expect(chatsMainPageFirst.messageBubbleContent.last()).toHaveText(
        randomSentence,
      );
      await expect(chatsMainPageSecond.messageBubbleContent.last()).toHaveText(
        randomSentence,
      );
    });

    await test.step("Send a message from second user to first user", async () => {
      await chatsMainPageSecond.sendMessage(randomSentenceTwo);
      await expect(chatsMainPageSecond.messageBubbleContent.last()).toHaveText(
        randomSentenceTwo,
      );
      await expect(chatsMainPageFirst.messageBubbleContent.last()).toHaveText(
        randomSentence,
      );
    });

    await test.step("Open Quick Profile from the last message sent and validate default values", async () => {
      await chatsMainPageFirst.openLocalQuickProfile();
      await expect(quickProfileLocal.quickProfile).toBeVisible();
      await expect(quickProfileLocal.quickProfileNoteInput).toBeEmpty();
    });

    await test.step("B14 - Highlighted border should appear when user clicks into Notes textbox", async () => {
      await quickProfileLocal.quickProfileNoteInput.focus();
      await expect(quickProfileLocal.quickProfileNoteInputContainer).toHaveCSS(
        "box-shadow",
        "rgb(77, 77, 255) 0px 0px 0px 1px",
      );
    });

    await test.step("Update note on local quick profile", async () => {
      const userNote = "Local User Note";
      await page1.evaluate((text) => {
        navigator.clipboard.writeText(text);
      }, userNote);
      await quickProfileLocal.pasteOnQuickProfileNote();
      await quickProfileLocal.exitQuickProfile();
    });

    await test.step("Validate note is kept on local quick profile after opening again Quick Profile", async () => {
      await chatsMainPageFirst.openLocalQuickProfile();
      await expect(quickProfileLocal.quickProfile).toBeVisible();
      await expect(quickProfileLocal.quickProfileNoteInput).toHaveValue(
        "Local User Note",
      );
      await quickProfileLocal.exitQuickProfile();
    });

    await test.step("Open Quick Profile from the last message received", async () => {
      await chatsMainPageFirst.openRemoteQuickProfile();
      await expect(quickProfileRemote.quickProfile).toBeVisible();
      await expect(quickProfileRemote.quickProfileNoteInput).toBeEmpty();
    });

    await test.step("B10 - Friends profile should display friends status (wether you are friends or not)", async () => {
      await expect(quickProfileRemote.quickProfileUserButton).toBeVisible();
      await expect(quickProfileRemote.quickProfileUserButtonText).toHaveText(
        "You're friends",
      );
    });

    await test.step("Update note on remote quick profile", async () => {
      await quickProfileRemote.quickProfileNoteInput.fill("Remote User Note");
      await quickProfileRemote.exitQuickProfile();
    });

    await test.step("Validate note is kept on remote quick profile after opening again Quick Profile", async () => {
      await chatsMainPageFirst.openRemoteQuickProfile();
      await expect(quickProfileRemote.quickProfile).toBeVisible();
      await expect(quickProfileRemote.quickProfileNoteInput).toHaveValue(
        "Remote User Note",
      );
      await quickProfileRemote.exitQuickProfile();
    });
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

    await test.step("Setup accounts for testing", async () => {
      await setupChats(
        chatsMainPageFirst,
        chatsMainPageSecond,
        context1,
        friendsScreenFirst,
        friendsScreenSecond,
        page1,
      );
    });

    await test.step("Send a message from first user to second user", async () => {
      const firstMessage = "this is a first test message";
      await chatsMainPageFirst.sendMessage(firstMessage);
      await expect(chatsMainPageFirst.messageBubbleContent.last()).toHaveText(
        firstMessage,
      );
      await expect(chatsMainPageSecond.messageBubbleContent.last()).toHaveText(
        firstMessage,
      );
    });

    await test.step("Send a message from second user to first user", async () => {
      const secondMessage = "this is a second test message";
      await chatsMainPageSecond.sendMessage(secondMessage);
      await expect(chatsMainPageSecond.messageBubbleContent.last()).toHaveText(
        secondMessage,
      );
      await expect(chatsMainPageFirst.messageBubbleContent.last()).toHaveText(
        secondMessage,
      );
    });

    await test.step("Open Quick Profile from the last message sent and validate default values", async () => {
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
    });

    await test.step("Update local profile picture, profile banner, username and status", async () => {
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
    });

    await test.step("Validate changes from settings profile local are displayed on local quick profile", async () => {
      await chatsMainPageFirst.openLocalQuickProfile();
      await quickProfileLocal.validateQuickProfileSnapshot();
      await quickProfileLocal.exitQuickProfile();
    });
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

    await test.step("Setup accounts for testing", async () => {
      await setupChats(
        chatsMainPageFirst,
        chatsMainPageSecond,
        context1,
        friendsScreenFirst,
        friendsScreenSecond,
        page1,
      );
    });

    await test.step("Send a message from first user to second user", async () => {
      const firstMessage = "this is a first test message";
      await chatsMainPageFirst.sendMessage(firstMessage);
      await expect(chatsMainPageFirst.messageBubbleContent.last()).toHaveText(
        firstMessage,
      );
      await expect(chatsMainPageSecond.messageBubbleContent.last()).toHaveText(
        firstMessage,
      );
    });

    await test.step("Send a message from second user to first user", async () => {
      const secondMessage = "this is a second test message";
      await chatsMainPageSecond.sendMessage(secondMessage);
      await expect(chatsMainPageSecond.messageBubbleContent.last()).toHaveText(
        secondMessage,
      );
      await expect(chatsMainPageFirst.messageBubbleContent.last()).toHaveText(
        secondMessage,
      );
    });

    await test.step("Open Quick Profile from the last message received and validate current values are displayed on username and status", async () => {
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
    });

    await test.step("Remote user updates profile picture, profile banner, username and status", async () => {
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
    });

    await test.step("Validate changes from settings profile remote are displayed on remote quick profile", async () => {
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
    const firstMessage = "this is a first test message";

    await test.step("Setup accounts for testing", async () => {
      await setupChats(
        chatsMainPageFirst,
        chatsMainPageSecond,
        context1,
        friendsScreenFirst,
        friendsScreenSecond,
        page1,
      );
    });

    await test.step("Send a message from first user to second user", async () => {
      await chatsMainPageSecond.sendMessage(firstMessage);
      await chatsMainPageSecond.validateLastMessageLocal(firstMessage);
      await chatsMainPageFirst.validateLastMessageRemote(firstMessage);
    });

    await test.step("Validate Context Menu from Message Sent", async () => {
      await chatsMainPageSecond.openContextMenuOnLastMessageSent();
      await chatsMainPageSecond.validateLocalContextMenuOptions();
      await chatsMainPageSecond.exitContextMenuChat();
    });

    await test.step("Validate Context Menu from Message Received", async () => {
      await chatsMainPageFirst.openContextMenuOnLastMessageReceived();
      await chatsMainPageFirst.validateRemoteContextMenuOptions();
      await chatsMainPageFirst.exitContextMenuChat();
    });

    await test.step("B23 - Clicking Copy should copy text to users clipboard", async () => {
      await chatsMainPageFirst.openContextMenuOnLastMessageReceived();
      await chatsMainPageFirst.selectContextMenuOption("Copy");
    });

    await test.step("Paste clipboard into chatbar and ensure message was copied correctly", async () => {
      const handle = await page1.evaluateHandle(() =>
        navigator.clipboard.readText(),
      );
      const clipboardContent = await handle.jsonValue();

      await expect(clipboardContent).toEqual(firstMessage);
      await chatsMainPageFirst.sendMessage(firstMessage);

      await chatsMainPageFirst.validateLastMessageLocal(firstMessage);
      await chatsMainPageSecond.validateLastMessageRemote(firstMessage);
    });

    await test.step("B24 - Validate Edit Mesage option", async () => {
      const editedMessage = "Edited message";
      await chatsMainPageFirst.openContextMenuOnLastMessageSent();
      await chatsMainPageFirst.selectContextMenuOption("Edit");
      await chatsMainPageFirst.typeOnEditMessageInput(editedMessage);

      await chatsMainPageFirst.validateLastMessageLocal(editedMessage);
      await chatsMainPageSecond.validateLastMessageRemote(editedMessage);
    });

    await test.step("B25 - Validate Delete Message option", async () => {
      await chatsMainPageFirst.openContextMenuOnLastMessageSent();
      await chatsMainPageFirst.selectContextMenuOption("Delete");
      await chatsMainPageFirst.messabeBubbleLocal.waitFor({
        state: "detached",
      });
    });
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
    const firstMessage = "this is a first test message";
    const secondMessage = "this is a second test message";
    const thirdMessage = "this is a third test message";
    const fourthMessage = "this is a fourth test message";

    await test.step("Setup accounts for testing", async () => {
      await setupChats(
        chatsMainPageFirst,
        chatsMainPageSecond,
        context1,
        friendsScreenFirst,
        friendsScreenSecond,
        page1,
      );
    });

    await test.step("Send a message from first user to second user", async () => {
      await chatsMainPageSecond.sendMessage(firstMessage);
      await chatsMainPageSecond.validateLastMessageLocal(firstMessage);
      await chatsMainPageFirst.validateLastMessageRemote(firstMessage);
    });

    await test.step("Validate Pinned Messages container is empty when no messages have been pinned", async () => {
      await chatsMainPageSecond.openPinMessagesContainer();
      await expect(chatsMainPageSecond.pinnedMessagesContainer).toBeVisible();
      await expect(chatsMainPageSecond.labelPinnedMessages).toHaveText(
        "Pinned Messages",
      );
      await expect(chatsMainPageSecond.pinnedMessagesEmpty).toBeVisible();
      await expect(chatsMainPageSecond.pinnedMessagesEmpty).toHaveText(
        "There are no pinned messages in this chat",
      );
    });

    await test.step("Close Pinned Messages container", async () => {
      await chatsMainPageSecond.exitPinMessagesContainer();
      await expect(chatsMainPageSecond.pinnedMessagesContainer).toBeHidden();
    });

    await test.step("Local user can pin a message", async () => {
      await chatsMainPageSecond.openContextMenuOnLastMessageSent();
      await chatsMainPageSecond.selectContextMenuOption("Pin Message");
      await chatsMainPageSecond.validateLastLocalMessageIsPinned();
    });

    await test.step("Open Pinned Messages container on local side and validate message is displayed", async () => {
      await chatsMainPageSecond.openPinMessagesContainer();
      await chatsMainPageSecond.validatePinMessageShownInContainer(
        usernameTwo,
        firstMessage,
      );
      await chatsMainPageSecond.exitPinMessagesContainer();
    });

    await test.step("Validate remote message pinned by remote user", async () => {
      await chatsMainPageFirst.validateLastRemoteMessageIsPinned();
      await chatsMainPageFirst.openPinMessagesContainer();
      await chatsMainPageFirst.validatePinMessageShownInContainer(
        usernameTwo,
        firstMessage,
      );
      await chatsMainPageFirst.exitPinMessagesContainer();
    });

    await test.step("Local user can unpin a message", async () => {
      await chatsMainPageSecond.openContextMenuOnLastMessageSent();
      await chatsMainPageSecond.selectContextMenuOption("Unpin Message");
      await chatsMainPageSecond.validateLastLocalMessageIsNotPinned();
      await chatsMainPageSecond.validateLastRemoteMessageIsNotPinned();
    });

    await test.step("Send a second message from first user to second user", async () => {
      await chatsMainPageFirst.sendMessage(secondMessage);
      await chatsMainPageFirst.validateLastMessageLocal(secondMessage);
      await chatsMainPageSecond.validateLastMessageRemote(secondMessage);
    });

    await test.step("Validate user can pin a remote message", async () => {
      await chatsMainPageSecond.openContextMenuOnLastMessageReceived();
      await chatsMainPageSecond.selectContextMenuOption("Pin Message");
      await chatsMainPageSecond.validateLastRemoteMessageIsPinned();
      await chatsMainPageFirst.validateLastLocalMessageIsPinned();
    });

    await test.step("Open Pinned Messages container on local side and validate message is displayed", async () => {
      await chatsMainPageFirst.openPinMessagesContainer();
      await chatsMainPageFirst.validatePinMessageShownInContainer(
        username,
        secondMessage,
      );
      await chatsMainPageFirst.exitPinMessagesContainer();
    });

    await test.step("Validate remote user can unpin a message from context menu", async () => {
      await chatsMainPageSecond.openContextMenuOnLastMessageReceived();
      await chatsMainPageSecond.selectContextMenuOption("Unpin Message");
      await chatsMainPageSecond.validateLastRemoteMessageIsNotPinned();
      await chatsMainPageSecond.validateLastLocalMessageIsNotPinned();
    });

    await test.step("Send a third message from second user to first user", async () => {
      await chatsMainPageSecond.sendMessage(thirdMessage);
      await chatsMainPageSecond.validateLastMessageLocal(thirdMessage);
      await chatsMainPageFirst.validateLastMessageRemote(thirdMessage);
    });

    await test.step("Validate local user can pin a message", async () => {
      await chatsMainPageSecond.openContextMenuOnLastMessageSent();
      await chatsMainPageSecond.selectContextMenuOption("Pin Message");
    });

    await test.step("Validate local user can unpin a message from unpin button", async () => {
      await chatsMainPageSecond.openPinMessagesContainer();
      await chatsMainPageSecond.clickOnUnpinMessageButton(thirdMessage);
      await chatsMainPageSecond.validateLastLocalMessageIsNotPinned();
      await chatsMainPageFirst.validateLastRemoteMessageIsNotPinned();
    });

    await test.step("Send a fourth message from first user to second user", async () => {
      await chatsMainPageFirst.sendMessage(fourthMessage);
      await chatsMainPageFirst.validateLastMessageLocal(fourthMessage);
      await chatsMainPageSecond.validateLastMessageRemote(fourthMessage);
    });

    await test.step("Validate that remote user can pin a message", async () => {
      await chatsMainPageSecond.openContextMenuOnLastMessageReceived();
      await chatsMainPageSecond.selectContextMenuOption("Pin Message");
    });

    await test.step("Validate that remote user can unpin a message from unpin button", async () => {
      await chatsMainPageSecond.openPinMessagesContainer();
      await chatsMainPageSecond.clickOnUnpinMessageButton(fourthMessage);
      await chatsMainPageSecond.validateLastRemoteMessageIsNotPinned();
      await chatsMainPageFirst.validateLastLocalMessageIsNotPinned();
    });

    await test.step("Validate after all messages are unpinned, Pinned Messages container is empty again on both sides", async () => {
      await chatsMainPageSecond.openPinMessagesContainer();
      await expect(chatsMainPageSecond.pinnedMessagesEmpty).toBeVisible();
      await expect(chatsMainPageSecond.pinnedMessagesEmpty).toHaveText(
        "There are no pinned messages in this chat",
      );
      await chatsMainPageSecond.exitPinMessagesContainer();
      await chatsMainPageFirst.openPinMessagesContainer();
      await expect(chatsMainPageFirst.pinnedMessagesEmpty).toBeVisible();
      await expect(chatsMainPageFirst.pinnedMessagesEmpty).toHaveText(
        "There are no pinned messages in this chat",
      );
      await chatsMainPageFirst.exitPinMessagesContainer();
    });
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
    let localMessageReactions: reactionContainer;
    let remoteMessageReactions: reactionContainer;
    let expectedReactions: reactionContainer;

    await test.step("Setup accounts for testing", async () => {
      await setupChats(
        chatsMainPageFirst,
        chatsMainPageSecond,
        context1,
        friendsScreenFirst,
        friendsScreenSecond,
        page1,
      );
    });

    // B22 - Clicking React should open up emoji menu - Not working currently
    // B50 - Number of reactions should be displayed underneath message

    // Send message from second user to first user
    await test.step("Send a message from second user to first user", async () => {
      const firstMessage = "this is a first test message";
      await chatsMainPageSecond.sendMessage(firstMessage);
      await chatsMainPageSecond.validateLastMessageLocal(firstMessage);
      await chatsMainPageFirst.validateLastMessageRemote(firstMessage);
    });

    await test.step("Local user can react to message sent - React to message sent with 👍", async () => {
      expectedReactions = [
        { emoji: "👍", count: "1" },
        { emoji: "❤️", count: "1" },
      ];
      await chatsMainPageSecond.openContextMenuOnLastMessageSent();
      await chatsMainPageSecond.selectDefaultReaction("👍");
      await chatsMainPageSecond.validateReactionExistsInLocalMessage("👍");
      await chatsMainPageFirst.validateReactionExistsInRemoteMessage("👍");
    });

    await test.step("Local user can react to message sent - React to message sent with ❤️", async () => {
      await chatsMainPageSecond.openContextMenuOnLastMessageSent();
      await chatsMainPageSecond.selectDefaultReaction("❤️");
      await chatsMainPageSecond.validateReactionExistsInLocalMessage("❤️");
      await chatsMainPageFirst.validateReactionExistsInRemoteMessage("❤️");
    });

    await test.step("Validate that message reactions from message sent are displayed in local and remote sides", async () => {
      localMessageReactions =
        await chatsMainPageSecond.getLastLocalReactionsContainer();
      expect(localMessageReactions).toEqual(expectedReactions);

      remoteMessageReactions =
        await chatsMainPageFirst.getLastRemoteReactionsContainer();
      expect(remoteMessageReactions).toEqual(expectedReactions);
    });

    await test.step("Remote user can react to message received - Reacto to message received with ❤️", async () => {
      expectedReactions = [
        { emoji: "👍", count: "1" },
        { emoji: "❤️", count: "2" },
        { emoji: "😂", count: "1" },
      ];
      await chatsMainPageFirst.openContextMenuOnLastMessageReceived();
      await chatsMainPageFirst.selectDefaultReaction("❤️");
      await chatsMainPageFirst.validateReactionExistsInRemoteMessage("❤️");
      await chatsMainPageSecond.validateReactionExistsInLocalMessage("❤️");
    });

    await test.step("Remote user can react to message received - React to message received with 😂", async () => {
      await chatsMainPageFirst.openContextMenuOnLastMessageReceived();
      await chatsMainPageFirst.selectDefaultReaction("😂");
      await chatsMainPageFirst.validateReactionExistsInRemoteMessage("😂");
      await chatsMainPageSecond.validateReactionExistsInLocalMessage("😂");
    });

    await test.step("Validate that message reactions from remote user are displayed in local and remote sides", async () => {
      remoteMessageReactions =
        await chatsMainPageFirst.getLastRemoteReactionsContainer();

      expect(remoteMessageReactions).toEqual(expectedReactions);

      localMessageReactions =
        await chatsMainPageSecond.getLastLocalReactionsContainer();
      expect(localMessageReactions).toEqual(expectedReactions);
    });

    await test.step("Remote user can remove reaction from message received - Remove reaction from message received with ❤️", async () => {
      await chatsMainPageFirst.removeReactionInRemoteMessage("😂");
      await chatsMainPageFirst.validateReactionDoesNotExistInRemoteMessage(
        "😂",
      );
      await chatsMainPageSecond.validateReactionDoesNotExistInLocalMessage(
        "😂",
      );
      expectedReactions = [
        { emoji: "👍", count: "1" },
        { emoji: "❤️", count: "2" },
      ];
    });

    await test.step("Validate that message reactions from remote message are updated on remote and local side", async () => {
      remoteMessageReactions =
        await chatsMainPageFirst.getLastRemoteReactionsContainer();

      expect(remoteMessageReactions).toEqual(expectedReactions);

      localMessageReactions =
        await chatsMainPageSecond.getLastLocalReactionsContainer();
      expect(localMessageReactions).toEqual(expectedReactions);
    });

    await test.step("Local user can remove reaction from message sent - Remove reaction from message received with ❤️", async () => {
      await chatsMainPageSecond.removeReactionInLocalMessage("👍");
      await chatsMainPageSecond.validateReactionDoesNotExistInLocalMessage(
        "👍",
      );
      await chatsMainPageFirst.validateReactionDoesNotExistInRemoteMessage(
        "👍",
      );
      expectedReactions = [{ emoji: "❤️", count: "2" }];
    });

    await test.step("Validate that message reactions from sent message are updated on local and remote side", async () => {
      localMessageReactions =
        await chatsMainPageSecond.getLastLocalReactionsContainer();

      expect(localMessageReactions).toEqual(expectedReactions);

      remoteMessageReactions =
        await chatsMainPageFirst.getLastRemoteReactionsContainer();
      expect(remoteMessageReactions).toEqual(expectedReactions);
    });
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

    await test.step("Setup accounts for testing", async () => {
      await setupChats(
        chatsMainPageFirst,
        chatsMainPageSecond,
        context1,
        friendsScreenFirst,
        friendsScreenSecond,
        page1,
      );
    });

    await test.step("Go to Settings, then Settings Messages and disable convert to emoji functionality", async () => {
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
    });

    await test.step("Send message with *test1* from second user to first user - Italic", async () => {
      await chatsMainPageSecond.sendMessage("*test1*");
      await chatsMainPageSecond.validateMarkdownFromLastMessageLocal("test1", [
        "Italic",
      ]);
      await chatsMainPageFirst.validateMarkdownFromLastMessageRemote("test1", [
        "Italic",
      ]);
    });

    await test.step("Send message _test2_ from second user to first user - Italic", async () => {
      await chatsMainPageSecond.sendMessage("_test2_");
      await chatsMainPageSecond.validateMarkdownFromLastMessageLocal("test2", [
        "Italic",
      ]);
      await chatsMainPageFirst.validateMarkdownFromLastMessageRemote("test2", [
        "Italic",
      ]);
    });

    await test.step("Send message **test3** from second user to first user - Bold", async () => {
      await chatsMainPageSecond.sendMessage("**test3**");
      await chatsMainPageSecond.validateMarkdownFromLastMessageLocal("test3", [
        "Bold",
      ]);
      await chatsMainPageFirst.validateMarkdownFromLastMessageRemote("test3", [
        "Bold",
      ]);
    });

    await test.step("Send message __test4__ from second user to first user - Bold", async () => {
      await chatsMainPageSecond.sendMessage("__test4__");
      await chatsMainPageSecond.validateMarkdownFromLastMessageLocal("test4", [
        "Bold",
      ]);
      await chatsMainPageFirst.validateMarkdownFromLastMessageRemote("test4", [
        "Bold",
      ]);
    });

    await test.step("Send message ~test5~ from second user to first user - Strikethrough", async () => {
      await chatsMainPageSecond.sendMessage("~test5~");
      await chatsMainPageSecond.validateMarkdownFromLastMessageLocal("test5", [
        "Strikethrough",
      ]);
      await chatsMainPageFirst.validateMarkdownFromLastMessageRemote("test5", [
        "Strikethrough",
      ]);
    });

    await test.step("Send message ~~test6~~ from second user to first user - Strikethrough", async () => {
      await chatsMainPageSecond.sendMessage("~~test6~~");
      await chatsMainPageSecond.validateMarkdownFromLastMessageLocal("test6", [
        "Strikethrough",
      ]);
      await chatsMainPageFirst.validateMarkdownFromLastMessageRemote("test6", [
        "Strikethrough",
      ]);
    });

    await test.step("Send message ~_test7_~ from second user to first user - Strikethrough", async () => {
      await chatsMainPageSecond.sendMessage("~_test7_~");
      await chatsMainPageSecond.validateMarkdownFromLastMessageLocal("test7", [
        "Strikethrough",
        "Italic",
      ]);
      await chatsMainPageFirst.validateMarkdownFromLastMessageRemote("test7", [
        "Strikethrough",
        "Italic",
      ]);
    });

    await test.step("Send message _~test8~_ from second user to first user - Strikethrough", async () => {
      await chatsMainPageSecond.sendMessage("_~test8~_");
      await chatsMainPageSecond.validateMarkdownFromLastMessageLocal("test8", [
        "Italic",
        "Strikethrough",
      ]);
      await chatsMainPageFirst.validateMarkdownFromLastMessageRemote("test8", [
        "Italic",
        "Strikethrough",
      ]);
    });

    await test.step("Send message ~*test9*~ from second user to first user - Strikethrough", async () => {
      await chatsMainPageSecond.sendMessage("~*test9*~");
      await chatsMainPageSecond.validateMarkdownFromLastMessageLocal("test9", [
        "Strikethrough",
        "Italic",
      ]);
      await chatsMainPageFirst.validateMarkdownFromLastMessageRemote("test9", [
        "Strikethrough",
        "Italic",
      ]);
    });

    await test.step("Send message *~test10*~ from second user to first user - Strikethrough", async () => {
      await chatsMainPageSecond.sendMessage("*~test10~*");
      await chatsMainPageSecond.validateMarkdownFromLastMessageLocal("test10", [
        "Italic",
        "Strikethrough",
      ]);
      await chatsMainPageFirst.validateMarkdownFromLastMessageRemote("test10", [
        "Italic",
        "Strikethrough",
      ]);
    });

    await test.step("Send message with hyperlink like www.google.com", async () => {
      await chatsMainPageSecond.sendMessage("www.google.com");
      await chatsMainPageSecond.validateHyperlinkFromLastMessageLocal(
        "www.google.com",
        "http://www.google.com",
      );
      await chatsMainPageFirst.validateHyperlinkFromLastMessageRemote(
        "www.google.com",
        "http://www.google.com",
      );
    });

    await test.step("Send message with hyperlink like https://www.satellite.im", async () => {
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
    let fileLocations = [
      "playwright/assets/logo.jpg",
      "playwright/assets/test.txt",
    ];

    await test.step("Setup accounts for testing", async () => {
      await setupChats(
        chatsMainPageFirst,
        chatsMainPageSecond,
        context1,
        friendsScreenFirst,
        friendsScreenSecond,
        page1,
      );
    });

    await test.step("Send files from second user to first user", async () => {
      await chatsMainPageSecond.uploadFiles(fileLocations);
      await chatsMainPageSecond.validateFilePreviews(fileLocations);
      await chatsMainPageSecond.sendMessage("bunch of files");
    });

    await test.step("Validate files and images sent are displayed on local side", async () => {
      await chatsMainPageSecond.validateFileEmbedInChat(
        "test.txt",
        "14 B",
        true,
      );

      await chatsMainPageSecond.validateImageEmbedInChat(
        "logo.jpg",
        "7.75 kB",
        true,
      );
    });

    await test.step("Validate files and images sent are displayed on remote side", async () => {
      await chatsMainPageFirst.validateFileEmbedInChat(
        "test.txt",
        "14 B",
        false,
      );
      await chatsMainPageFirst.validateImageEmbedInChat(
        "logo.jpg",
        "7.75 kB",
        false,
      );
    });

    await test.step("B53 - Users remote and local can download files from chat by clicking download", async () => {
      await chatsMainPageSecond.downloadFileLastMessage("test.txt", true);
      await chatsMainPageSecond.validateDownloadedFile("test.txt");
      await chatsMainPageFirst.downloadFileLastMessage("test.txt", false);
      await chatsMainPageFirst.validateDownloadedFile("test.txt");
    });

    await test.step("B53 - Users remote and local can download images from chat by clicking download", async () => {
      await chatsMainPageSecond.downloadFileLastMessage("logo.jpg", true);
      await chatsMainPageSecond.validateDownloadedFile("logo.jpg");
      await chatsMainPageFirst.downloadFileLastMessage("logo.jpg", false);
      await chatsMainPageFirst.validateDownloadedFile("logo.jpg");
    });

    await test.step("B52 - Users remote and local should be able to click on image in chat to see image preview", async () => {
      await chatsMainPageSecond.openImagePreviewLastImageSent();
      await chatsMainPageSecond.validateImagePreviewIsVisible();
      await chatsMainPageSecond.closeImagePreview();

      await chatsMainPageFirst.openImagePreviewLastImageReceived();
      await chatsMainPageFirst.validateImagePreviewIsVisible();
      await chatsMainPageFirst.closeImagePreview();
    });
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
    const emojiPickerSecond = new EmojiPicker(page2, viewport);

    await test.step("Setup accounts for testing", async () => {
      await setupChats(
        chatsMainPageFirst,
        chatsMainPageSecond,
        context1,
        friendsScreenFirst,
        friendsScreenSecond,
        page1,
      );
    });

    await test.step("Open emoji picker and send emoji to the other user", async () => {
      await chatsMainPageSecond.openEmojiPicker();
      await emojiPickerSecond.selectEmoji("😀");
      await chatsMainPageSecond.buttonChatbarSendMessage.click();
    });

    await test.step("Validate emoji sent is displayed on local and remote sides", async () => {
      await expect(chatsMainPageSecond.messageBubbleContent.last()).toHaveText(
        "😀",
      );
      await expect(chatsMainPageFirst.messageBubbleContent.last()).toHaveText(
        "😀",
      );
    });

    await test.step("Change skin tone of emojis", async () => {
      await chatsMainPageSecond.openEmojiPicker();
      await emojiPickerSecond.changeSkinToneEmoji(2);
      await emojiPickerSecond.selectEmoji("🖐🏾");
      await chatsMainPageSecond.buttonChatbarSendMessage.click();
    });

    await test.step("Validate emoji sent is displayed on local and remote sides", async () => {
      await expect(chatsMainPageSecond.messageBubbleContent.last()).toHaveText(
        "🖐🏾",
      );
      await expect(chatsMainPageFirst.messageBubbleContent.last()).toHaveText(
        "🖐🏾",
      );
    });

    await test.step("Change emoji size in emojis container view", async () => {
      await chatsMainPageSecond.openEmojiPicker();
      await emojiPickerSecond.changeEmojiSizeView("16");
      await emojiPickerSecond.validateSingleEmojiSize("🤣", "16px");
      await emojiPickerSecond.changeEmojiSizeView("45");
      await emojiPickerSecond.validateSingleEmojiSize("🤣", "45px");
      await emojiPickerSecond.changeEmojiSizeView("30");
      await emojiPickerSecond.validateSingleEmojiSize("🤣", "30px");
    });

    await test.step("Validate emoji categories displayed", async () => {
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
    });

    await test.step("Validate number of emojis per category", async () => {
      await emojiPickerSecond.validateNumberOfEmojisPerSection(
        "frequently-used",
        7,
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
      await emojiPickerSecond.validateNumberOfEmojisPerSection(
        "activities",
        84,
      );
      await emojiPickerSecond.validateNumberOfEmojisPerSection("objects", 261);
      await emojiPickerSecond.validateNumberOfEmojisPerSection("symbols", 223);
      await emojiPickerSecond.validateNumberOfEmojisPerSection("flags", 269);
    });

    await test.step("Validate user can navigate through all categories of emojis", async () => {
      await emojiPickerSecond.navigateThroughEmojiCategories(
        "smileys-and-emotion",
      );
      await emojiPickerSecond.navigateThroughEmojiCategories("people-and-body");
      await emojiPickerSecond.navigateThroughEmojiCategories(
        "animals-and-nature",
      );
      await emojiPickerSecond.navigateThroughEmojiCategories("food-and-drink");
      await emojiPickerSecond.navigateThroughEmojiCategories(
        "travel-and-places",
      );
      await emojiPickerSecond.navigateThroughEmojiCategories("activities");
      await emojiPickerSecond.navigateThroughEmojiCategories("objects");
      await emojiPickerSecond.navigateThroughEmojiCategories("symbols");
      await emojiPickerSecond.navigateThroughEmojiCategories("flags");
    });

    await test.step("Validate user can navigate through tabs in emoji picker", async () => {
      await emojiPickerSecond.goToGifsTab();
      await emojiPickerSecond.goToStickersTab();
      await emojiPickerSecond.goToEmojisTab();
    });

    await test.step("Validate user can search for emojis in emoji picker", async () => {
      await emojiPickerSecond.searchEmoji("mexico");
    });
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
    const gifPickerSecond = new GifPicker(page2, viewport);
    let gifToSelect: string;

    await test.step("Setup accounts for testing", async () => {
      await setupChats(
        chatsMainPageFirst,
        chatsMainPageSecond,
        context1,
        friendsScreenFirst,
        friendsScreenSecond,
        page1,
      );
    });

    await test.step("Open gif picker and validate user can change gif size view", async () => {
      await chatsMainPageSecond.openGifPicker();
      await gifPickerSecond.waitForGifsToLoad();
      await gifPickerSecond.changeGifSizeView("100");
      await gifPickerSecond.changeGifSizeView("200");
      await gifPickerSecond.changeGifSizeView("150");
    });

    await test.step("Send a Gif to the other user", async () => {
      gifToSelect = await gifPickerSecond.getGifAltText(0);
      await gifPickerSecond.selectGif(gifToSelect);
    });

    await test.step("Validate GIF sent is displayed on local and remote sides", async () => {
      await chatsMainPageSecond.validateGifStickerSent(gifToSelect);
      await chatsMainPageFirst.validateGifStickerReceived(gifToSelect);
    });

    await test.step("Validate GIF sent is displayed in chat preview from sidebar as last message sent", async () => {
      await chatsMainPageSecond.clickOnShowSidebarIfClosed();
      await chatsMainPageSecond.validateChatPreviewMessageImage(
        username,
        gifToSelect,
      );
      await chatsMainPageSecond.hideSidebarOnMobileView();

      await chatsMainPageFirst.clickOnShowSidebarIfClosed();
      await chatsMainPageFirst.validateChatPreviewMessageImage(
        usernameTwo,
        gifToSelect,
      );
      await chatsMainPageFirst.hideSidebarOnMobileView();
    });

    await test.step("Validate user can navigate through all categories of gifs", async () => {
      await chatsMainPageSecond.openGifPicker();
      await gifPickerSecond.goToStickersTab();
      await gifPickerSecond.goToEmojisTab();
      await gifPickerSecond.goToGifsTab();
    });
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
    const stickerPickerSecond = new StickerPicker(page2, viewport);

    await test.step("Setup accounts for testing", async () => {
      await setupChats(
        chatsMainPageFirst,
        chatsMainPageSecond,
        context1,
        friendsScreenFirst,
        friendsScreenSecond,
        page1,
      );
    });

    await test.step("Open sticker picker and send a sticker to the other user", async () => {
      await chatsMainPageSecond.openStickerPicker();
      await stickerPickerSecond.waitForStickersToLoad();
      await stickerPickerSecond.selectSticker("Space Cat", "Power Up");
    });

    await test.step("Validate Sticker sent is displayed on local and remote sides", async () => {
      await chatsMainPageSecond.validateGifStickerSent("Power Up");
      await chatsMainPageFirst.validateGifStickerReceived("Power Up");
    });

    await test.step("Validate Sticker sent is displayed in chat preview from sidebar as last message sent", async () => {
      await chatsMainPageSecond.clickOnShowSidebarIfClosed();
      await chatsMainPageSecond.validateChatPreviewMessageImage(
        username,
        "Power Up",
      );
      await chatsMainPageSecond.hideSidebarOnMobileView();

      await chatsMainPageFirst.clickOnShowSidebarIfClosed();
      await chatsMainPageFirst.validateChatPreviewMessageImage(
        usernameTwo,
        "Power Up",
      );
      await chatsMainPageFirst.hideSidebarOnMobileView();
    });

    await test.step("Validate user can navigate through tabs in sticker picker", async () => {
      await chatsMainPageSecond.openStickerPicker();
      await stickerPickerSecond.goToEmojisTab();
      await stickerPickerSecond.goToGifsTab();
      await stickerPickerSecond.goToStickersTab();
    });

    await test.step("Validate sticker categories displayed in sticker container", async () => {
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
    });

    await test.step("Validate number of stickers displated per category are correct", async () => {
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
    });

    await test.step("Validate user can navigate through all categories of stickers", async () => {
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

  test("Chat Replies Tests", async ({
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
    const replyModalSecond = new ReplyModal(page2, viewport);
    const firstMessage = "this is a first test message";
    const secondMessage = "this is a second test message";
    const selfReplyText = "This is a reply to my own message";
    const remoteReplyText = "This is a reply to a remote message";

    // Setup accounts for testing
    await test.step("Setup accounts for testing", async () => {
      await setupChats(
        chatsMainPageFirst,
        chatsMainPageSecond,
        context1,
        friendsScreenFirst,
        friendsScreenSecond,
        page1,
      );
    });

    await test.step("Send message from second user to first user", async () => {
      await chatsMainPageSecond.sendMessage(firstMessage);
      await chatsMainPageSecond.validateLastMessageLocal(firstMessage);
      await chatsMainPageFirst.validateLastMessageRemote(firstMessage);
    });

    await test.step("User can open reply modal and close it", async () => {
      await chatsMainPageSecond.openContextMenuOnLastMessageSent();
      await chatsMainPageSecond.selectContextMenuOption("Reply");
      await replyModalSecond.cancelReply();
    });

    await test.step("User can reply to its own message", async () => {
      await chatsMainPageSecond.openContextMenuOnLastMessageSent();
      await chatsMainPageSecond.selectContextMenuOption("Reply");
      await chatsMainPageSecond.sendMessage(selfReplyText);

      // Validate local message and self reply are displayed
      await chatsMainPageSecond.validateReplyToLocalMessage(
        "text",
        firstMessage,
        selfReplyText,
        true,
      );

      // Validate remote message and reply received are displayed
      await chatsMainPageFirst.validateReplyToRemoteMessage(
        "text",
        firstMessage,
        selfReplyText,
        false,
      );
    });

    await test.step("Send another message from second user to first user", async () => {
      await chatsMainPageSecond.sendMessage(secondMessage);
      await chatsMainPageSecond.validateLastMessageLocal(secondMessage);
      await chatsMainPageFirst.validateLastMessageRemote(secondMessage);
    });

    await test.step("User can reply to a remote message", async () => {
      await chatsMainPageFirst.openContextMenuOnLastMessageReceived();
      await chatsMainPageFirst.selectContextMenuOption("Reply");
      await chatsMainPageFirst.sendMessage(remoteReplyText);

      // Validate remote message and reply sent are displayed
      await chatsMainPageFirst.validateReplyToRemoteMessage(
        "text",
        secondMessage,
        remoteReplyText,
        true,
      );

      // Validate local message and reply received are displayed
      await chatsMainPageSecond.validateReplyToLocalMessage(
        "text",
        secondMessage,
        remoteReplyText,
        false,
      );
    });

    await test.step("User can reply to a sticker received", async () => {
      // Send a sticker from second user to second user
      await chatsMainPageSecond.openStickerPicker();
      const stickerPickerSecond = new StickerPicker(page2, viewport);
      await stickerPickerSecond.waitForStickersToLoad();

      // Send a Sticker to the other user
      await stickerPickerSecond.selectSticker("Space Cat", "Power Up");

      // Validate Sticker sent is displayed on local and remote sides
      await chatsMainPageSecond.validateGifStickerSent("Power Up");
      await chatsMainPageFirst.validateGifStickerReceived("Power Up");

      // Reply to sticker sent by remote user
      await chatsMainPageFirst.openContextMenuOnLastMessageReceived();
      await chatsMainPageFirst.selectContextMenuOption("Reply");
      await chatsMainPageFirst.sendMessage(selfReplyText);

      // Validate remote message and reply sent are displayed
      await chatsMainPageFirst.validateReplyToRemoteMessage(
        "sticker",
        "Power Up",
        selfReplyText,
        true,
      );

      // Validate local message and reply received are displayed
      await chatsMainPageSecond.validateReplyToLocalMessage(
        "sticker",
        "Power Up",
        selfReplyText,
        false,
      );
    });

    await test.step("User can reply to a GIF received", async () => {
      // Send a GIF from second user to first user
      await chatsMainPageSecond.openGifPicker();
      const gifPickerSecond = new GifPicker(page2, viewport);
      await gifPickerSecond.waitForGifsToLoad();

      // Send a Gif to the other user
      const gifToSelect = await gifPickerSecond.getGifAltText(0);
      await gifPickerSecond.selectGif(gifToSelect);

      // Validate GIF sent is displayed on local and remote sides
      await chatsMainPageSecond.validateGifStickerSent(gifToSelect);
      await chatsMainPageFirst.validateGifStickerReceived(gifToSelect);

      // Reply to GIF sent by remote user
      await chatsMainPageFirst.openContextMenuOnLastMessageReceived();
      await chatsMainPageFirst.selectContextMenuOption("Reply");
      await chatsMainPageFirst.sendMessage(selfReplyText);

      // Validate remote message and reply sent are displayed
      await chatsMainPageFirst.validateReplyToRemoteMessage(
        "GIF",
        gifToSelect,
        selfReplyText,
        true,
      );

      // Validate local message and reply received are displayed
      await chatsMainPageSecond.validateReplyToLocalMessage(
        "GIF",
        gifToSelect,
        selfReplyText,
        false,
      );
    });
  });

  test("Videocall testing between two users - mute, unmute, fullscreen, expand/collapse call", async ({
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
    const callScreenFirstUser = new CallScreen(page1, viewport);
    const callScreenSecondUser = new CallScreen(page2, viewport);
    const chatsMainPageFirst = new ChatsMainPage(page1, viewport);
    const chatsMainPageSecond = new ChatsMainPage(page2, viewport);
    const incomingCallFirstUser = new IncomingCall(page1, viewport);
    const settingsProfileFirst = new SettingsProfile(page1, viewport);
    const settingsProfileSecond = new SettingsProfile(page2, viewport);
    let lastMessageSent: Locator;
    let lastMessageReceived: Locator;
    let profilePictureUserA: string;
    let profilePictureUserB: string;

    // Setup accounts for testing
    await test.step("Setup accounts for testing", async () => {
      await setupChats(
        chatsMainPageFirst,
        chatsMainPageSecond,
        context1,
        friendsScreenFirst,
        friendsScreenSecond,
        page1,
      );
    });

    await test.step("Second user uploads a profile picture", async () => {
      await chatsMainPageSecond.goToSettings();
      await page2.waitForURL("/settings/profile");
      await settingsProfileSecond.hideSidebarOnMobileView();
      await settingsProfileSecond.uploadProfilePicture(
        "playwright/assets/logo.jpg",
      );

      profilePictureUserB = await settingsProfileSecond.getProfileImageSource();
      await settingsProfileSecond.goToChat();
    });

    await test.step("First user uploads a profile picture", async () => {
      await chatsMainPageFirst.goToSettings();
      await page1.waitForURL("/settings/profile");
      await settingsProfileFirst.hideSidebarOnMobileView();
      await settingsProfileFirst.uploadProfilePicture(
        "playwright/assets/banner.jpg",
      );

      profilePictureUserA = await settingsProfileFirst.getProfileImageSource();
      await settingsProfileFirst.goToChat();
    });

    await test.step("Send message from second user to first user", async () => {
      const firstMessage = "hey I am gonna call you now";
      await chatsMainPageSecond.sendMessage(firstMessage);
      lastMessageSent = await chatsMainPageSecond.getLastMessageLocal();
      lastMessageReceived = await chatsMainPageFirst.getLastMessageRemote();
      await expect(lastMessageSent).toHaveText(firstMessage);
      await expect(lastMessageReceived).toHaveText(firstMessage);
    });

    await test.step("Second user calls the first user", async () => {
      await chatsMainPageSecond.clickOnAudioCallButton();
    });

    await test.step("Validate outgoing call modal displayed", async () => {
      await callScreenSecondUser.callScreen.waitFor({ state: "attached" });
    });

    await test.step("Validate incoming call modal displayed", async () => {
      await incomingCallFirstUser.validateIncomingCallModal(
        usernameTwo,
        "status from second user",
        profilePictureUserB,
      );
    });

    await test.step("Validate user is connecting displays and then accept incoming call", async () => {
      await callScreenSecondUser.validateUserIsConnecting();
      await incomingCallFirstUser.acceptAudioIncomingCall();
    });

    await test.step("Validate incoming call modal is closed", async () => {
      await callScreenSecondUser.validateAllUsersAreConnected();
      await incomingCallFirstUser.incomingCallModal.waitFor({
        state: "detached",
      });
      await callScreenSecondUser.callParticipantConnecting.waitFor({
        state: "detached",
      });
      await expect(callScreenFirstUser.callScreen).toBeVisible();
      await callScreenFirstUser.validateAllUsersAreConnected();
    });

    await test.step("With second user validate contents from call screen", async () => {
      await callScreenSecondUser.validateCallScreenContents(
        profilePictureUserB,
        profilePictureUserA,
      );
    });

    await test.step("With first user validate contents from call screen", async () => {
      await callScreenFirstUser.validateCallScreenContents(
        profilePictureUserA,
        profilePictureUserB,
      );
    });

    await test.step("Validate user can unmute and mute the call", async () => {
      await callScreenSecondUser.unmuteCall();
      await callScreenSecondUser.muteCall();
    });

    await test.step("Validate user can deafen/undeafen the call", async () => {
      await callScreenSecondUser.deafenCall();
      await callScreenSecondUser.undeafenCall();
    });

    await test.step("Validate user can start/stop sharing screen", async () => {
      await callScreenSecondUser.clickOnStreamButton();
      await callScreenSecondUser.validateLocalVideoStreamIsVisible(true);
      await callScreenFirstUser.validateRemoteVideoStreamIsVisible();
      await callScreenSecondUser.clickOnStreamButton();
    });

    await test.step("Validate user can expand/collapse the call view", async () => {
      await callScreenSecondUser.expandCall();
      await callScreenSecondUser.collapseCall();
    });

    await test.step("Executing full screen mode validations only on desktop viewport since exit button appears outside of mobile viewport", async () => {
      if (callScreenSecondUser.viewport === "desktop-chrome") {
        await callScreenSecondUser.enterFullScreenMode();
        await callScreenSecondUser.exitFullScreenMode();
      }
    });

    await test.step("Validate user can enable/disable video during call", async () => {
      await callScreenSecondUser.enableVideo();
      await page2.waitForTimeout(5000);
      await callScreenSecondUser.disableVideo();
    });

    await test.step("Validate user can open call volume mixer", async () => {
      await callScreenSecondUser.openCallVolumeMixer();
    });

    await test.step("Validate user can open/close call settings", async () => {
      await callScreenSecondUser.openCallSettings();
      await chatsMainPageSecond.exitCallSettings();
    });

    await test.step("Validate user can finish the call", async () => {
      await callScreenSecondUser.endCall();
    });
  });

  test("Group Chats - Create a group with 3 people and send/receive text message flow", async ({
    firstUserContext,
    secondUserContext,
    thirdUserContext,
  }) => {
    // Declare constants required from the fixtures
    const context1 = firstUserContext.context;
    const context2 = secondUserContext.context;
    const page1 = firstUserContext.page;
    const page2 = secondUserContext.page;
    const page3 = thirdUserContext.page;
    const viewport = firstUserContext.viewport;
    const friendsScreenFirst = new FriendsScreen(page1, viewport);
    const friendsScreenSecond = new FriendsScreen(page2, viewport);
    const friendsScreenThird = new FriendsScreen(page3, viewport);
    const chatsMainPageFirst = new ChatsMainPage(page1, viewport);
    const chatsMainPageSecond = new ChatsMainPage(page2, viewport);
    const chatsMainPageThird = new ChatsMainPage(page3, viewport);
    const createGroupThird = new CreateGroupModal(page3, viewport);

    await test.step("Setup accounts for testing", async () => {
      await setupThreeChats(
        chatsMainPageFirst,
        chatsMainPageSecond,
        chatsMainPageThird,
        context1,
        context2,
        friendsScreenFirst,
        friendsScreenSecond,
        friendsScreenThird,
        page1,
        page2,
      );
    });

    await test.step("Open Create Group Chat Modal", async () => {
      await chatsMainPageThird.clickOnCreateGroupChat();
    });

    await test.step("Validate that group without members cannot be created", async () => {
      await createGroupThird.createGroupChat("test", []);
      await expect(createGroupThird.createGroupButton).toBeDisabled();
    });

    await test.step("Validate that group without name cannot be created", async () => {
      await createGroupThird.createGroupChat("", ["ChatUserA", "ChatUserB"]);
      await expect(createGroupThird.errorNameCreateGroupModal).toBeVisible();
      await expect(createGroupThird.errorNameCreateGroupModal).toHaveText(
        "Please insert group name",
      );
      await createGroupThird.selectUser(["ChatUserA", "ChatUserB"]);
    });

    await test.step("Create a valid group chat", async () => {
      await createGroupThird.createGroupChat("Group Chat 1", [
        "ChatUserA",
        "ChatUserB",
      ]);
    });

    await test.step("Validate group chat sidebar preview is displayed on all users", async () => {
      await chatsMainPageThird.validateChatPreviewMessageTextGroup(
        "Group Chat 1",
        "No messages sent yet.",
        3,
      );

      await chatsMainPageFirst.validateChatPreviewMessageTextGroup(
        "Group Chat 1",
        "No messages sent yet.",
        3,
      );
      await chatsMainPageSecond.validateChatPreviewMessageTextGroup(
        "Group Chat 1",
        "No messages sent yet.",
        3,
      );
    });

    await test.step("Send a message to the group", async () => {
      await chatsMainPageThird.sendMessage("Hello Group");
      await chatsMainPageThird.validateMessageIsSent("Hello Group");
      await chatsMainPageFirst.goToSidebarChat("Group Chat 1");
      await chatsMainPageFirst.validateMessageIsReceived("Hello Group");
      await chatsMainPageSecond.goToSidebarChat("Group Chat 1");
      await chatsMainPageSecond.validateMessageIsReceived("Hello Group");
    });

    await test.step("Validate group chat sidebar preview is updated with message received on all users", async () => {
      await chatsMainPageThird.validateChatPreviewMessageTextGroup(
        "Group Chat 1",
        "Hello Group",
        3,
      );

      await chatsMainPageFirst.clickOnShowSidebarIfClosed();
      await chatsMainPageFirst.validateChatPreviewMessageTextGroup(
        "Group Chat 1",
        "Hello Group",
        3,
      );

      await chatsMainPageSecond.clickOnShowSidebarIfClosed();
      await chatsMainPageSecond.validateChatPreviewMessageTextGroup(
        "Group Chat 1",
        "Hello Group",
        3,
      );
    });
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
  await chatsMainPageFirst.dismissDownloadAlert();
  await chatsMainPageSecond.dismissDownloadAlert();
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

async function setupThreeChats(
  chatsMainPageFirst: ChatsMainPage,
  chatsMainPageSecond: ChatsMainPage,
  chatsMainPageThird: ChatsMainPage,
  context1: BrowserContext,
  context2: BrowserContext,
  friendsScreenFirst: FriendsScreen,
  friendsScreenSecond: FriendsScreen,
  friendsScreenThird: FriendsScreen,
  page1: Page,
  page2: Page,
) {
  // With both users go to Friends Screen
  await chatsMainPageFirst.dismissDownloadAlert();
  await chatsMainPageSecond.dismissDownloadAlert();
  await chatsMainPageThird.dismissDownloadAlert();
  await chatsMainPageFirst.goToFriends();
  await chatsMainPageSecond.goToFriends();
  await chatsMainPageThird.goToFriends();

  // On user one - Grant clipboard permissions, Copy DID and save it into a constant
  await context1.grantPermissions(["clipboard-read", "clipboard-write"]);
  await friendsScreenFirst.copyDIDFromContextMenu();
  const handleOne = await page1.evaluateHandle(() =>
    navigator.clipboard.readText(),
  );
  const didKeyFirstUser = await handleOne.jsonValue();

  // On user two - Grant clipboard permissions, Copy DID and save it into a constant
  await context2.grantPermissions(["clipboard-read", "clipboard-write"]);
  await friendsScreenSecond.copyDIDFromContextMenu();
  const handleTwo = await page2.evaluateHandle(() =>
    navigator.clipboard.readText(),
  );
  const didKeySecondUser = await handleTwo.jsonValue();

  // Steps to User C to add User A as a friend
  // Now, add the first user as a friend
  await friendsScreenThird.addFriend(didKeyFirstUser);

  // H6 - Toast Notification with Your request is making it's way! should appear after sending a friend request
  await friendsScreenThird.validateToastRequestSent();
  await friendsScreenFirst.waitForToastNotificationToDisappear();
  await friendsScreenThird.waitForToastNotificationToDisappear();

  // With First User, go to requests list and accept friend request
  await friendsScreenFirst.goToRequestList();
  await friendsScreenFirst.validateIncomingRequestExists();
  await friendsScreenFirst.acceptFriendRequest(usernameThree);

  // With First User, go to All Friends and click on Chat Button
  await friendsScreenFirst.goToAllFriendsList();
  await friendsScreenFirst.chatWithFriend(usernameThree);

  // With Third User, go to All Friends and click on Chat Button
  await friendsScreenThird.goToRequestList();
  await friendsScreenThird.goToAllFriendsList();
  await friendsScreenThird.chatWithFriend(username);

  // Steps to User C to add User B as a friend
  // Now, third user adds the first user as a friend
  await chatsMainPageThird.goToFriends();
  await friendsScreenThird.addFriend(didKeySecondUser);

  // H6 - Toast Notification with Your request is making it's way! should appear after sending a friend request
  await friendsScreenThird.validateToastRequestSent();
  await friendsScreenSecond.waitForToastNotificationToDisappear();
  await friendsScreenThird.waitForToastNotificationToDisappear();

  // With Second User, go to requests list and accept friend request
  await friendsScreenSecond.goToRequestList();
  await friendsScreenSecond.validateIncomingRequestExists();
  await friendsScreenSecond.acceptFriendRequest(usernameThree);

  // With Second User, go to All Friends and click on Chat Button
  await friendsScreenSecond.goToAllFriendsList();
  await friendsScreenSecond.chatWithFriend(usernameThree);

  // With Second User, go to All Friends and click on Chat Button
  await friendsScreenThird.goToRequestList();
  await friendsScreenThird.goToAllFriendsList();
  await friendsScreenThird.chatWithFriend(usernameTwo);

  // Show sidebar if closed
  await chatsMainPageFirst.clickOnShowSidebarIfClosed();
  await chatsMainPageSecond.clickOnShowSidebarIfClosed();
  await chatsMainPageThird.clickOnShowSidebarIfClosed();
}
