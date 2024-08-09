import { test, expect } from "../fixtures/setup";
import { faker } from "@faker-js/faker";

test.describe("Chats Tests - Two instances", () => {
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
      context1,
      context2,
      createOrImportFirst,
      createOrImportSecond,
      loginPinPageFirst,
      loginPinPageSecond,
      saveRecoverySeedFirst,
      saveRecoverySeedSecond,
      friendsScreenFirst,
      friendsScreenSecond,
      page1,
      page2,
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
      await page1.waitForURL("/chat");
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
      await page2.waitForURL("/chat");
      await chatsMainPageSecond.buttonAddFriends.click();

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
      const handleTwo = await page2.evaluateHandle(() =>
        navigator.clipboard.readText(),
      );
      const didKeySecondUser = await handleTwo.jsonValue();

      // Now, add the first user as a friend
      await friendsScreenSecond.addFriend(didKeyFirstUser);
      await friendsScreenSecond.validateToastRequestSent();
      await friendsScreenFirst.waitForToastNotificationToDisappear();
      await friendsScreenSecond.waitForToastNotificationToDisappear();

      // With First User, go to requests list and accept friend request
      await friendsScreenFirst.goToRequestList();
      await friendsScreenFirst.validateIncomingRequestExists();
      await friendsScreenFirst.acceptFriendRequest(
        usernameTwo,
        didKeySecondUser,
      );

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
    },
  );

  test("B1, B2, B3 - Landing to Chats Page elements and basic send/receive text message flow", async ({
    chatsMainPageFirst,
    chatsMainPageSecond,
    friendsScreenFirst,
    friendsScreenSecond,
    page1,
    page2,
  }) => {
    // With first user, go to chat conversation with remote user
    await friendsScreenFirst.chatWithFriend(usernameTwo);

    // With second user, go to chat conversation with remote user and send a message
    await friendsScreenSecond.chatWithFriend(username);

    // B3 - Messages are secured by end-to-end encryption, sent over a peer-to-peer network should be displayed at the top of every chat
    await page2.waitForURL("/chat");
    await expect(chatsMainPageSecond.chatEncryptedMessage).toBeVisible();
    await expect(chatsMainPageSecond.chatEncryptedMessageText).toHaveText(
      "Messages are secured by end-to-end encryption, sent over a peer-to-peer network.",
    );

    // B4 - Amount of coin should be displayed at top right toolbar
    await expect(chatsMainPageSecond.coinAmountIndicator).toHaveText("0");

    //B5 - Highlighted border should appear around call button when clicked
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

    // Send a message from the first user
    await chatsMainPageSecond.sendMessage("Hello from the second user");

    // Validate message is displayed on local user
    await chatsMainPageSecond.messabeBubbleLocal.waitFor({ state: "visible" });
    await expect(chatsMainPageSecond.messageBubbleContent).toHaveText(
      "Hello from the second user",
    );

    // Validate message is displayed on remote user
    await page1.waitForURL("/chat");
    await chatsMainPageFirst.messageBubbleRemote.waitFor({ state: "visible" });
    await expect(chatsMainPageFirst.messageBubbleContent).toHaveText(
      "Hello from the second user",
    );
  });

  /*
  test.skip("B5 - Highlighted border should appear around call button when clicked", async ({
    page,
  }) => {
    // Test code for B5
  });

  test.skip("B6 - Highlighted border should appear around Video button when clicked", async ({
    page,
  }) => {
    // Test code for B6
  });

  test.skip("B7 - Favorite button should should be highlighted after clicked and grey when unclicked", async ({
    page,
  }) => {
    // Test code for B7
  });

  test.skip("B8 - Clicking Profile button in 1on1 chat should display the friends profile", async ({
    page,
  }) => {
    // Test code for B8
  });

  test.skip("B9 - Friends profile should display friends profile picture", async ({
    page,
  }) => {
    // Test code for B9
  });

  test.skip("B10 - Friends profile should display friends status (whether you are friends or not)", async ({
    page,
  }) => {
    // Test code for B10
  });

  test.skip("B11 - Friends profile should display friends Username", async ({
    page,
  }) => {
    // Test code for B11
  });

  test.skip("B12 - Friends profile should display friends profile Status", async ({
    page,
  }) => {
    // Test code for B12
  });

  test.skip("B13 - User should be able to write a note on friends profile", async ({
    page,
  }) => {
    // Test code for B13
  });

  test.skip("B14 - Highlighted border should appear when user clicks into Notes textbox", async ({
    page,
  }) => {
    // Test code for B14
  });

  test.skip("B15 - Clicking Groups button should display group members of the chat", async ({
    page,
  }) => {
    // Test code for B15
  });

  test.skip("B16 - Timestamp appears after most recent message sent", async ({
    page,
  }) => {
    // Test code for B16
  });

  test.skip("B17 - Users profile picture appears next to messages sent", async ({
    page,
  }) => {
    // Test code for B17
  });

  test.skip("B18 - Context menu appears when user right clicks a message", async ({
    page,
  }) => {
    // Test code for B18
  });

  test.skip("B19 - When user clicks their own message context menu should display Top 5 Most Used Emojis, Pin Message, Reply, React, Copy, Edit, Delete", async ({
    page,
  }) => {
    // Test code for B19
  });

  test.skip("B20 - Clicking Pin Message should pin message in chat", async ({
    page,
  }) => {
    // Test code for B20
  });

  test.skip("B21 - Clicking Reply should open reply modal", async ({
    page,
  }) => {
    // Test code for B21
  });

  test.skip("B22 - Clicking React should open up emoji menu", async ({
    page,
  }) => {
    // Test code for B22
  });

  test.skip("B23 - Clicking Copy should copy text to users clipboard", async ({
    page,
  }) => {
    // Test code for B23
  });

  test.skip("B24 - Clicking Edit should open up the edit message modal", async ({
    page,
  }) => {
    // Test code for B24
  });

  test.skip("B25 - Clicking Delete should delete message from chat", async ({
    page,
  }) => {
    // Test code for B25
  });

  test.skip("B26 - Clicking the X next to a friend in the GroupMembers Modal should remove friend from groupchat", async ({
    page,
  }) => {
    // Test code for B26
  });

  test.skip("B27 - Clicking the Settings button should open the Group Chat Settings", async ({
    page,
  }) => {
    // Test code for B27
  });

  test.skip("B28 - Highlighted border should appear after clicking into the GroupName input box in GroupChat Settings", async ({
    page,
  }) => {
    // Test code for B28
  });

  test.skip("B29 - User can change name of the group", async ({ page }) => {
    // Test code for B29
  });

  test.skip("B30 - Highlighted border should appear after clicking into the GroupDescription input box in GroupChat Settings", async ({
    page,
  }) => {
    // Test code for B30
  });

  test.skip("B31 - User should be able to edit the description of the group", async ({
    page,
  }) => {
    // Test code for B31
  });

  test.skip("B32 - User can toggle on/off Add Members", async ({ page }) => {
    // Test code for B32
  });

  test.skip("B33 - User can toggle on/off ChangePhoto", async ({ page }) => {
    // Test code for B33
  });

  test.skip("B34 - User can toggle on/off Change Details", async ({ page }) => {
    // Test code for B34
  });

  test.skip("B35 - Highlighted border should appear around textbox in chat when user clicks into it", async ({
    page,
  }) => {
    // Test code for B35
  });

  test.skip("B36 - User should already be clicked into textbox when they enter a chat", async ({
    page,
  }) => {
    // Test code for B36
  });

  test.skip("B37 - User should not be able to send a blank message (Send button should be greyed out until any text is added into the textbox)", async ({
    page,
  }) => {
    // Test code for B37
  });

  test.skip("B38 - Clicking Send Coin should open the modal", async ({
    page,
  }) => {
    // Test code for B38
  });

  test.skip("B39 - Amount should be displayed at the top of Send Coin modal and user should be able to click into it and change amount", async ({
    page,
  }) => {
    // Test code for B39
  });

  test.skip("B40 - Only numbers should be able to be inputted in Send Coin modal", async ({
    page,
  }) => {
    // Test code for B40
  });

  test.skip("B41 - Highlighted border should appear when user clicks into Notes textbox in the Send Coin modal", async ({
    page,
  }) => {
    // Test code for B41
  });

  test.skip("B42 - Recipients should appear in recipients box as they are added in Send Coin Modal", async ({
    page,
  }) => {
    // Test code for B42
  });

  test.skip("B43 - Clicking the X should clear user from recipients box in Send Coin Modal", async ({
    page,
  }) => {
    // Test code for B43
  });

  test.skip("B44 - Highlighted border should appear around selected user", async ({
    page,
  }) => {
    // Test code for B44
  });

  test.skip("B45 - Scrollbar should appear if user has enough friends for it in Send Coin Modal", async ({
    page,
  }) => {
    // Test code for B45
  });

  test.skip("B46 - User should have to hold confirm for 3 seconds to send payment in Send Coin Modal", async ({
    page,
  }) => {
    // Test code for B46
  });

  test.skip("B47 - Clicking Cancel should close Send Coin modal", async ({
    page,
  }) => {
    // Test code for B47
  });

  test.skip("B48 - The chat typing indicator should be displayed when user is typing", async ({
    page,
  }) => {
    // Test code for B48
  });

  test.skip("B49 - Scroll to bottom button should appear after scrolling up 2 messages", async ({
    page,
  }) => {
    // Test code for B49
  });

  test.skip("B50 - Number of reactions should be displayed underneath message", async ({
    page,
  }) => {
    // Test code for B50
  });

  test.skip("B51 - Markdown should show when typing in chatbar", async ({
    page,
  }) => {
    // Test code for B51
  });

  test.skip("B52 - User should be able to click on image in chat to see image preview", async ({
    page,
  }) => {
    // Test code for B52
  });

  test.skip("B53 - User can download media from chat by clicking download", async ({
    page,
  }) => {
    // Test code for B53
  });

  test.skip("B54 - User should be able to view a video through the embedded video player", async ({
    page,
  }) => {
    // Test code for B54
  });

  test.skip("B55 - Messages should be limited to 2048 chars", async ({
    page,
  }) => {
    // Test code for B55
  });
  */
});
