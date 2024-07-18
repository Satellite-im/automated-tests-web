import { test, expect } from "@playwright/test";
import { LoginPinPage } from "../PageObjects/LoginPin";
import { AuthNewAccount } from "../PageObjects/AuthNewAccount";
import { ChatsMainPage } from "../PageObjects/ChatsMain";
import { CreateOrImportPage } from "../PageObjects/CreateOrImport";
import { SaveRecoverySeedPage } from "../PageObjects/SaveRecoverySeed";

test.describe("Chats Tests", () => {
  const username = "test123";
  const status = "fixed status";

  test.beforeEach(async ({ page }) => {
    // Declare the page object implementations
    const createOrImport = new CreateOrImportPage(page);
    const authNewAccount = new AuthNewAccount(page);
    const loginPinPage = new LoginPinPage(page);
    const saveRecoverySeed = new SaveRecoverySeedPage(page);
    const chatsMainPage = new ChatsMainPage(page);

    // Select Create Account
    await createOrImport.navigateTo();
    await createOrImport.clickCreateNewAccount();

    // Enter Username and Status
    await authNewAccount.validateLoadingHeader();
    await authNewAccount.typeOnUsername(username);
    await authNewAccount.typeOnStatus(status);
    await authNewAccount.buttonNewAccountCreate.click();

    // Enter PIN
    await loginPinPage.waitUntilPageIsLoaded();
    await loginPinPage.enterDefaultPin();

    // Click on I Saved It
    await saveRecoverySeed.buttonSavedPhrase.waitFor({ state: "attached" });
    await saveRecoverySeed.clickOnSavedIt();
    await chatsMainPage.addSomeone.waitFor({ state: "visible" });
    await page.waitForURL("/chat");
  });

  test.skip("B1 - User should land on this page after logging in", async ({
    page,
  }) => {
    // Test code for B1
  });

  test.skip('B2 - Clicking "Add Friends" should navigate you to Friends page', async ({
    page,
  }) => {
    // Test code for B2
  });

  test.skip("B3 - Messages are secured by end-to-end encryption, sent over a peer-to-peer network should be displayed at the top of every chat", async ({
    page,
  }) => {
    // Test code for B3
  });

  test.skip("B4 - Amount of coin should be displayed at top right toolbar", async ({
    page,
  }) => {
    // Test code for B4
  });

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
});
