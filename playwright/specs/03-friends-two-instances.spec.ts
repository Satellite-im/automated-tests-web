import { FriendsScreen } from "playwright/PageObjects/FriendsScreen";
import { test, expect } from "../fixtures/setup";
import { ChatsMainPage } from "playwright/PageObjects/ChatsMain";

const username = "ChatUserA";
const usernameTwo = "ChatUserB";

test.describe("Friends tests", () => {
  test("H15 - User should be removed from friends list after clicking unfriend", async ({
    friendUserContexts,
  }) => {
    // Declare constants required from the fixtures
    const context1 = friendUserContexts.contextFirst;
    const page1 = friendUserContexts.pageFirst;
    const page2 = friendUserContexts.pageFirst;
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
    friendUserContexts,
  }) => {
    // Declare constants required from the fixtures
    const context1 = friendUserContexts.contextFirst;
    const page1 = friendUserContexts.pageFirst;
    const page2 = friendUserContexts.pageSecond;
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
    friendUserContexts,
  }) => {
    // Declare constants required from the fixtures
    const context1 = friendUserContexts.contextFirst;
    const page1 = friendUserContexts.pageFirst;
    const page2 = friendUserContexts.pageSecond;
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
    friendUserContexts,
  }) => {
    // Declare constants required from the fixtures
    const context1 = friendUserContexts.contextFirst;
    const page1 = friendUserContexts.pageFirst;
    const page2 = friendUserContexts.pageSecond;
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
    friendUserContexts,
  }) => {
    // Declare constants required from the fixtures
    const context1 = friendUserContexts.contextFirst;
    const page1 = friendUserContexts.pageFirst;
    const page2 = friendUserContexts.pageSecond;
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
});
