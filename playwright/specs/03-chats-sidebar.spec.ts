import { test, expect } from "../fixtures/setup";

test.describe("Chats Sidebar Tests", () => {
  const username = "test123";
  const status = "fixed status";

  test.beforeEach(
    async ({
      createOrImport,
      authNewAccount,
      loginPinPage,
      saveRecoverySeed,
      chatsMainPage,
      page,
    }) => {
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
    },
  );

  test("C1 - Clicking Create Chat should open modal with option for Group Name and Group Members", async ({
    chatsMainPage,
  }) => {
    await chatsMainPage.buttonCreateGroupChat.click();

    await expect(chatsMainPage.createGroupLabelGroupName).toBeVisible();
    await expect(chatsMainPage.createGroupLabelGroupName).toHaveText(
      "Group Name:",
    );
    await expect(chatsMainPage.createGroupInputGroupName).toBeVisible();
    await expect(chatsMainPage.createGroupLabelGroupMembers).toHaveText(
      "Group Members:",
    );
    await expect(chatsMainPage.createGroupLabelSelectMembers).toHaveText(
      "Select member(s)",
    );
    await expect(chatsMainPage.createGroupButton).toBeVisible();
  });

  test("C2 - Hovering over Create Chat should show tooltips", async ({
    chatsMainPage,
  }) => {
    await chatsMainPage.buttonCreateGroupChat.hover();
    await chatsMainPage.validateTooltipAttribute(
      '[data-cy="button-create-group-chat"]',
      "Create Chat",
    );
  });

  test("C3 - Hovering over Nav buttons should show tooltips", async ({
    chatsMainPage,
  }) => {
    // Hover on each button and validate the tooltip
    await chatsMainPage.buttonWallet.hover();
    await chatsMainPage.validateTooltipAttribute(
      '[data-cy="button-Wallet"]',
      "Wallet",
    );

    await chatsMainPage.buttonFiles.hover();
    await chatsMainPage.validateTooltipAttribute(
      '[data-cy="button-Files"]',
      "Files",
    );

    await chatsMainPage.buttonChat.hover();
    await chatsMainPage.validateTooltipAttribute(
      '[data-cy="button-Chat"]',
      "Chat",
    );

    await chatsMainPage.buttonFriends.hover();
    await chatsMainPage.validateTooltipAttribute(
      '[data-cy="button-Friends"]',
      "Friends",
    );

    await chatsMainPage.buttonSettings.hover();
    await chatsMainPage.validateTooltipAttribute(
      '[data-cy="button-Settings"]',
      "Settings",
    );
  });

  test("C4 - Clicking hamburger button should collapse sidebar", async ({
    chatsMainPage,
  }) => {
    await chatsMainPage.buttonHideSidebar.click();

    await chatsMainPage.buttonHideSidebar.waitFor({ state: "detached" });

    await chatsMainPage.expectElementToHaveClass(
      '[data-cy="sidebar"]',
      "closed",
    );
    await chatsMainPage.buttonShowSidebar.waitFor({ state: "attached" });
    await chatsMainPage.buttonShowSidebar.click();
    await chatsMainPage.buttonShowSidebar.waitFor({ state: "detached" });
    await chatsMainPage.expectElementToHaveClass('[data-cy="sidebar"]', "open");
  });

  test("C5, C6, C7, C8, C9 - Nav bar buttons should redirect to correct page", async ({
    chatsMainPage,
    page,
  }) => {
    // Navigate to Wallet Page
    await chatsMainPage.buttonWallet.click();
    await page.waitForURL("/wallet");

    // Navigate to Files Page
    await chatsMainPage.buttonFiles.click();
    await page.waitForURL("/files");

    // Navigate to Chat Page
    await chatsMainPage.buttonChat.click();
    await page.waitForURL("/chat");

    // Navigate to Friends Page
    await chatsMainPage.buttonFriends.click();
    await page.waitForURL("/friends");

    // Navigate to Settings Page
    await chatsMainPage.buttonSettings.click();
    await page.waitForURL("/settings/profile");
  });

  test("C10 - Textbox should have highlighted border when clicking into Chat Search", async ({
    chatsMainPage,
  }) => {
    await chatsMainPage.inputSidebarSearch.focus();

    const inputContainer = chatsMainPage.inputSidebarSearch.locator("xpath=..");

    await expect(inputContainer).toHaveCSS(
      "box-shadow",
      "rgb(77, 77, 255) 0px 0px 0px 1px",
    );
  });

  // Cannot be automated until app is wired
  test.skip("C11 - ProfilePicFrame should display for any friends that have one", async ({
    page,
  }) => {
    // Test code for C11
  });

  // Cannot be automated until app is wired
  test.skip("C12 - Favorites should appear on left side of Sidebar", async ({
    page,
  }) => {
    // Test code for C12
  });

  // Cannot be automated until app is wired
  test.skip("C13 - Number of members in group should appear on that chat in both Sidebar and Favorites", async ({
    page,
  }) => {
    // Test code for C13
  });

  // Cannot be automated until app is wired
  test.skip("C14 - Clicking a favorite should take you to that chat", async ({
    page,
  }) => {
    // Test code for C14
  });

  // Cannot be automated until app is wired
  test.skip("C15 - Right clicking a chat in sidebar should open context menu", async ({
    page,
  }) => {
    // Test code for C15
  });

  // Cannot be automated until app is wired
  test.skip("C16 - Context menu should display: Favorite, Hide, Mark as read", async ({
    page,
  }) => {
    // Test code for C16
  });

  // Cannot be automated until app is wired
  test.skip("C17 - Timestamp of most recent message sent or received in chat should be displayed in the sidebar", async ({
    page,
  }) => {
    // Test code for C17
  });

  // Cannot be automated until app is wired
  test.skip("C18 - Typing indicator should be displayed around users profile picture when they are typing (this applies to favorites as well)", async ({
    page,
  }) => {
    // Test code for C18
  });

  // Cannot be automated until app is wired
  test.skip("C19 - After selecting Hide chat chat should no longer be displayed in sidebar", async ({
    page,
  }) => {
    // Test code for C19
  });
});
