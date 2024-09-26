import { ChatsMainPage } from "playwright/PageObjects/ChatsMain";
import { test, expect } from "../fixtures/setup";

test.describe("Chats Sidebar Tests", () => {
  test("C1 - Clicking Create Chat should open modal with option for Group Name and Group Members", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const chatsMainPage = new ChatsMainPage(page);
    await chatsMainPage.dismissDownloadAlert();

    await chatsMainPage.buttonCreateGroupChat.click();

    await expect(chatsMainPage.createGroupLabelGroupName).toBeVisible();
    await expect(chatsMainPage.createGroupLabelGroupName).toHaveText(
      "Group name:",
    );
    await expect(chatsMainPage.createGroupInputGroupName).toBeVisible();
    await expect(chatsMainPage.createGroupLabelGroupMembers).toHaveText(
      "Group members:",
    );
    await expect(chatsMainPage.createGroupLabelSelectMembers).toHaveText(
      "Select member(s)",
    );
    await expect(chatsMainPage.createGroupButton).toBeVisible();
  });

  test("C2 - Hovering over Create Chat should show tooltips", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const chatsMainPage = new ChatsMainPage(page);

    await chatsMainPage.buttonCreateGroupChat.hover();
    await chatsMainPage.validateTooltipAttribute(
      '[data-cy="button-create-group-chat"]',
      "Create Group Chat",
    );
  });

  test("C3 - Hovering over Nav buttons should show tooltips", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const chatsMainPage = new ChatsMainPage(page);

    // Hover on each button and validate the tooltip
    // await chatsMainPage.buttonWallet.hover();
    // await chatsMainPage.validateTooltipAttribute(
    //   '[data-cy="button-Wallet"]',
    //   "Wallet",
    // );

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
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const chatsMainPage = new ChatsMainPage(page);

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
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const chatsMainPage = new ChatsMainPage(page);

    // Navigate to Wallet Page
    // await chatsMainPage.buttonWallet.click();
    // await page.waitForURL("/wallet");

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
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const chatsMainPage = new ChatsMainPage(page);

    await chatsMainPage.inputSidebarSearch.focus();

    const inputContainer = chatsMainPage.inputSidebarSearch.locator("xpath=..");

    await expect(inputContainer).toHaveCSS(
      "box-shadow",
      "rgb(77, 77, 255) 0px 0px 0px 1px",
    );
  });
});
