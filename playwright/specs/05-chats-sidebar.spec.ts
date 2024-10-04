import { ChatsMainPage } from "playwright/PageObjects/ChatsMain";
import { test, expect } from "../fixtures/setup";

test.describe("Chats Sidebar Tests", () => {
  test.beforeEach(async ({ singleUserContext }) => {
    const page = singleUserContext.page;
    const chatsMainPage = new ChatsMainPage(page);
    await chatsMainPage.dismissDownloadAlert();
  });

  test("C1 - Clicking Create Chat should open modal with option for Group Name and Group Members", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const chatsMainPage = new ChatsMainPage(page);

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
  }, testoptions) => {
    const page = singleUserContext.page;
    const chatsMainPage = new ChatsMainPage(page);
    const viewport = testoptions.project.name;

    await chatsMainPage.buttonHideSidebar.click();

    await chatsMainPage.buttonHideSidebar.waitFor({ state: "detached" });

    await chatsMainPage.expectElementToHaveClass(
      '[data-cy="sidebar"]',
      "closed",
    );

    if (viewport === "mobile-chrome") {
      await chatsMainPage.buttonAddFriends.click();
    }

    await chatsMainPage.buttonShowSidebar.waitFor({ state: "attached" });
    await chatsMainPage.buttonShowSidebar.click();
    await chatsMainPage.buttonShowSidebar.waitFor({ state: "detached" });
    await chatsMainPage.expectElementToHaveClass('[data-cy="sidebar"]', "open");
  });

  test("C5, C6, C7, C8, C9 - Nav bar buttons should redirect to correct page", async ({
    singleUserContext,
  }, testoptions) => {
    const page = singleUserContext.page;
    const chatsMainPage = new ChatsMainPage(page);
    const viewport = testoptions.project.name;

    await chatsMainPage.goToFiles();
    await page.waitForURL("/files");

    // Navigate to Chat Page
    if (viewport === "mobile-chrome") {
      await chatsMainPage.buttonShowSidebar.click();
    }
    await chatsMainPage.goToChat();
    await page.waitForURL("/chat");

    if (viewport === "mobile-chrome") {
      await chatsMainPage.buttonAddFriends.click();
    }

    // Navigate to Settings Page
    if (viewport === "mobile-chrome") {
      await chatsMainPage.buttonShowSidebar.click();
    }
    await chatsMainPage.goToSettings();
    await page.waitForURL("/settings/profile");

    // Navigate to Friends Page
    await chatsMainPage.goToFriends();
    await page.waitForURL("/friends");
  });

  test("C10 - Textbox should have highlighted border when clicking into Chat Search", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const chatsMainPage = new ChatsMainPage(page);

    await chatsMainPage.inputSidebarSearch.focus();

    await expect(chatsMainPage.inputSidebarSearchContainer).toHaveCSS(
      "box-shadow",
      "rgb(77, 77, 255) 0px 0px 0px 1px",
    );
  });
});
