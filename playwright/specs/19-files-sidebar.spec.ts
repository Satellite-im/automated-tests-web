import { test, expect } from "../fixtures/setup";

test.describe("Files Sidebar Tests", () => {
  const username = "test123";
  const status = "test status";

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
});
