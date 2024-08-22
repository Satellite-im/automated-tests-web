import { ChatsMainPage } from "playwright/PageObjects/ChatsMain";
import { test } from "../fixtures/setup";

test.describe("Files Sidebar Tests", () => {
  test.beforeEach(async ({ singleUserContext }) => {
    const page = singleUserContext.page;
    const chatsMainPage = new ChatsMainPage(page);
    await chatsMainPage.goToFiles();
    await page.waitForURL("/files");
  });

  /*
  test.skip("G1 - Sidebar should have an option to show either Chats or Files", async ({
    page,
  }) => {
    // Test code for G1
  });

  test.skip("G2 - Clicking Chats should display chats in sidebar", async ({
    page,
  }) => {
    // Test code for G2
  });

  test.skip("G3 - Clicking Files should display the Files sidebar", async ({
    page,
  }) => {
    // Test code for G3
  });
  */
});
