import { ChatsMainPage } from "playwright/PageObjects/ChatsMain";
import { FriendsScreen } from "playwright/PageObjects/FriendsScreen";
import { test, expect } from "../fixtures/setup";
import type { BrowserContext, Page } from "@playwright/test";
import { CreateGroupModal } from "playwright/PageObjects/ChatsElements/CreateGroupModal";

const username = "ChatUserA";
const usernameTwo = "ChatUserB";
const usernameThree = "ChatUserC";

test.describe("Three instances tests - Group Chats", () => {
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
    const createGroupFirst = new CreateGroupModal(page1, viewport);

    // Setup accounts for testing
    await setupChats(
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

    await chatsMainPageFirst.clickOnCreateGroupChat();
    await createGroupFirst.createGroupChat("Group Chat 1", [
      "ChatUserB",
      "ChatUserC",
    ]);
  });
});

async function setupChats(
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

  // Steps to User B to add User A as a friend
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

  // Steps to User C to add User A as a friend
  // Now, third user adds the first user as a friend
  await friendsScreenThird.addFriend(didKeyFirstUser);

  // H6 - Toast Notification with Your request is making it's way! should appear after sending a friend request
  await friendsScreenThird.validateToastRequestSent();
  await chatsMainPageFirst.goToFriends();
  await friendsScreenFirst.waitForToastNotificationToDisappear();
  await friendsScreenThird.waitForToastNotificationToDisappear();

  // With First User, go to requests list and accept friend request
  await friendsScreenFirst.goToRequestList();
  await friendsScreenFirst.validateIncomingRequestExists();
  await friendsScreenFirst.acceptFriendRequest(usernameThree);

  // With First User, go to All Friends and click on Chat Button
  await friendsScreenFirst.goToAllFriendsList();
  await friendsScreenFirst.chatWithFriend(usernameThree);

  // With Second User, go to All Friends and click on Chat Button
  await friendsScreenThird.goToRequestList();
  await friendsScreenThird.goToAllFriendsList();
  await friendsScreenThird.chatWithFriend(username);

  // Steps to User C to add User B as a friend
  // Now, third user adds the second user as a friend
  await chatsMainPageThird.goToFriends();
  await friendsScreenThird.addFriend(didKeySecondUser);

  // H6 - Toast Notification with Your request is making it's way! should appear after sending a friend request
  await friendsScreenThird.validateToastRequestSent();
  await chatsMainPageSecond.goToFriends();
  await friendsScreenSecond.waitForToastNotificationToDisappear();
  await friendsScreenThird.waitForToastNotificationToDisappear();

  // With First User, go to requests list and accept friend request
  await friendsScreenSecond.goToRequestList();
  await friendsScreenSecond.validateIncomingRequestExists();
  await friendsScreenSecond.acceptFriendRequest(usernameThree);

  // With First User, go to All Friends and click on Chat Button
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
