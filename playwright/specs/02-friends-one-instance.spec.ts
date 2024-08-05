import { test, expect } from "../fixtures/setup";
import { faker } from "@faker-js/faker";

test.describe("Friends tests", () => {
  const username: string = "ChatUserA";
  const status: string = faker.lorem.sentence(3);

  test.beforeEach(
    async ({
      authNewAccount,
      chatsMainPage,
      createOrImport,
      loginPinPage,
      saveRecoverySeed,
    }) => {
      // Start browser one
      await createOrImport.navigateTo();

      // Click on Create New Account
      await createOrImport.clickCreateNewAccount();

      // Enter username and Status and click on create account
      await authNewAccount.validateLoadingHeader();
      await authNewAccount.typeOnUsername(username);
      await authNewAccount.typeOnStatus(status);
      await authNewAccount.clickOnCreateAccount();

      // Enter Pin
      await loginPinPage.waitUntilPageIsLoaded();
      await loginPinPage.enterDefaultPin();

      // Click on I Saved It
      await saveRecoverySeed.clickOnSavedIt();

      // Go to Friends
      await chatsMainPage.goToFriends();
    },
  );

  test("H1, H2, H3, H4, H5, H8 - Navigate through friends pages and validate UI elements", async ({
    friendsScreen,
  }) => {
    // H2 - Clicking Active should take you to Active page within Friends
    await friendsScreen.goToRequestList();
    await expect(friendsScreen.buttonFriendsAll).toHaveCSS(
      "background-color",
      "rgb(33, 38, 58)",
    );
    await expect(friendsScreen.buttonFriendsActive).toHaveCSS(
      "background-color",
      "color(srgb 0.371765 0.371765 1)",
    );
    await expect(friendsScreen.buttonFriendsBlocked).toHaveCSS(
      "background-color",
      "rgb(33, 38, 58)",
    );
    await expect(friendsScreen.labelIncomingRequests).toHaveText(
      "Incoming Requests",
    );
    await expect(friendsScreen.textNoIncomingRequests).toBeVisible();
    await expect(friendsScreen.textNoIncomingRequests).toHaveText(
      "No inbound requests.",
    );
    await expect(friendsScreen.labelOutgoingRequests).toBeVisible();
    await expect(friendsScreen.labelOutgoingRequests).toHaveText(
      "Outgoing Requests",
    );
    await expect(friendsScreen.textNoOutgoingRequests).toBeVisible();
    await expect(friendsScreen.textNoOutgoingRequests).toHaveText(
      "No outbound requests.",
    );

    // H3 - Clicking Blocked should take you to Blocked page within Friends
    await friendsScreen.goToBlockedList();
    await expect(friendsScreen.buttonFriendsAll).toHaveCSS(
      "background-color",
      "rgb(33, 38, 58)",
    );
    await expect(friendsScreen.buttonFriendsActive).toHaveCSS(
      "background-color",
      "rgb(33, 38, 58)",
    );
    await expect(friendsScreen.buttonFriendsBlocked).toHaveCSS(
      "background-color",
      "color(srgb 0.371765 0.371765 1)",
    );
    await expect(friendsScreen.labelBlockedUsers).toBeVisible();
    await expect(friendsScreen.labelBlockedUsers).toHaveText("Blocked Users");
    await expect(friendsScreen.textNoBlockedUsers).toBeVisible();
    await expect(friendsScreen.textNoBlockedUsers).toHaveText(
      "No users blocked.",
    );

    // H1 - Clicking All should take you to All page within Friends
    await friendsScreen.goToAllFriendsList();
    await expect(friendsScreen.buttonFriendsAll).toHaveCSS(
      "background-color",
      "color(srgb 0.371765 0.371765 1)",
    );
    await expect(friendsScreen.buttonFriendsActive).toHaveCSS(
      "background-color",
      "rgb(33, 38, 58)",
    );
    await expect(friendsScreen.buttonFriendsBlocked).toHaveCSS(
      "background-color",
      "rgb(33, 38, 58)",
    );
    await expect(friendsScreen.labelAddSomeone).toBeVisible();
    await expect(friendsScreen.labelAddSomeone).toHaveText("Add Someone");
    await expect(friendsScreen.labelSearchFriends).toBeVisible();
    await expect(friendsScreen.labelSearchFriends).toHaveText("Search friends");

    // H4 - Highlighted border should appear after clicking into Add Someone when user enters a text on input field
    await friendsScreen.inputAddFriend.focus();
    await expect(friendsScreen.inputContainerAddFriend).toHaveCSS(
      "box-shadow",
      "rgb(77, 77, 255) 0px 0px 0px 1px",
    );

    // H5 - User should not be able to click Add until they have pasted did:key
    await expect(friendsScreen.buttonAddFriend).toBeDisabled();

    // H8 - Highlighted border should appear around Search Friends textbox when user enters a text on input field
    await friendsScreen.inputSearchFriends.focus();
    await expect(friendsScreen.inputContainerSearchFriends).toHaveCSS(
      "box-shadow",
      "rgb(77, 77, 255) 0px 0px 0px 1px",
    );
  });

  test("H10, H27, H28, H29 - Copy Button Tests", async ({
    friendsScreen,
    context,
  }) => {
    // H10 - Clicking the Copy button should copy your personal did:key
    // Grant clipboard permissions
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);

    // Validate hovering on Copy ID button shows "Copy"

    // Click on Copy ID button to copy did:key
    await friendsScreen.buttonCopyID.click();

    // Save copied value from clipboard into a constant
    const clipboardContentFirst = await friendsScreen.getClipboardContent();

    // Paste value from Clipboard into Add Input field and assert it is the did key
    await friendsScreen.pasteClipboardOnAddInput();
    await expect(friendsScreen.inputAddFriend).toHaveValue(
      clipboardContentFirst,
    );

    // H27 - User can copy its username from context menu of copy button
    // Open Context Menu for Copy ID button and select Copy ID option
    await friendsScreen.clearAddFriendInput();
    await friendsScreen.copyIDFromContextMenu();

    // Save copied value from clipboard into a constant
    const clipboardContentSecond = await friendsScreen.getClipboardContent();

    // Paste value from Clipboard into Add Input field and assert it is the did key
    await friendsScreen.pasteClipboardOnAddInput();
    await expect(friendsScreen.inputAddFriend).toHaveValue(
      clipboardContentSecond,
    );
    await friendsScreen.inputAddFriend.clear();

    // H28 - User can copy its DID Key from context menu of copy button
    // Open Context Menu for Copy ID button and select Copy DID option
    await friendsScreen.clearAddFriendInput();
    await friendsScreen.copyDIDFromContextMenu();

    // Save copied value from clipboard into a constant
    const clipboardContentThird = await friendsScreen.getClipboardContent();

    // Paste value from Clipboard into Add Input field and assert it is the did key
    await friendsScreen.pasteClipboardOnAddInput();
    await expect(friendsScreen.inputAddFriend).toHaveValue(
      clipboardContentThird,
    );
    await friendsScreen.clearAddFriendInput();

    // H29 - Copy button shows tooltip "Copy ID" when hovering on it
    await friendsScreen.validateTooltipAttribute(
      '[data-cy="button-copy-id"]',
      "Copy ID",
    );
  });

  test("H22, H23, H24, H25 - Invalid attempts for sending friend request", async ({
    friendsScreen,
    context,
    page,
  }) => {
    // H22 - User cannot add himself as a friend
    // Grant clipboard permissions
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);

    // Click on Copy ID button to copy did:key
    await friendsScreen.buttonCopyID.click();

    // Save copied value from clipboard into a constant
    const clipboardContent = await friendsScreen.getClipboardContent();

    // Paste value from Clipboard into Add Input field and assert it is the did key
    await friendsScreen.pasteClipboardOnAddInput();
    await expect(friendsScreen.inputAddFriend).toHaveValue(clipboardContent);

    // Click on Add button
    await friendsScreen.buttonAddFriend.click();

    // Validate Toast Notification with "You cannot add yourself as a friend" appears
    await friendsScreen.validateToastCannotAddYourself();
    await friendsScreen.waitForToastNotificationToDisappear();

    // H23 - Add Someone input shows error if input text is less than 13 characters
    await friendsScreen.typeOnAddFriendInput("1");
    let errorMessage = page.getByText("Minimum length is 13 characters.");
    await expect(errorMessage).toBeVisible();

    // H24 - Add Someone input shows error if input text has invalid format
    await friendsScreen.typeOnAddFriendInput("123456789012345");
    errorMessage = page.getByText("Invalid format.");
    await expect(errorMessage).toBeVisible();

    // H25 - Add Someone input shows error if input text is more than 56 characters
    await friendsScreen.typeOnAddFriendInput(
      "123456789012345678901234567890123456789012345678901234567890",
    );
    errorMessage = page.getByText("Maximum length is 56 characters.");
    await expect(errorMessage).toBeVisible();
  });
});