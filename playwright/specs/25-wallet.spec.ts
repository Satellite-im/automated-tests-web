import { test, expect } from "../fixtures/setup";

test.describe("Wallet Tests", () => {
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

      // Go to Wallet
      await chatsMainPage.goToWallet();
      await page.waitForURL("/wallet");
    },
  );

  test.skip("E1 - Sidebar should display New Payment modal", async ({
    page,
  }) => {
    // Test code for E1
  });

  test.skip("E2 - User should be able to change amount for payment by clicking the green amount numbers", async ({
    page,
  }) => {
    // Test code for E2
  });

  test.skip("E3 - Only chars that should be allowed are period marks and numbers", async ({
    page,
  }) => {
    // Test code for E3
  });

  test.skip("E4 - Textbox should highlight when user clicks into it", async ({
    page,
  }) => {
    // Test code for E4
  });

  test.skip("E5 - Selected recipients should have a highlighted border and appear in the Recipients box", async ({
    page,
  }) => {
    // Test code for E5
  });

  test.skip("E6 - Clicking the X next to a username in the recipient box should clear user out", async ({
    page,
  }) => {
    // Test code for E6
  });

  test.skip("E7 - User should have to click+hold confirm button for 3 seconds", async ({
    page,
  }) => {
    // Test code for E7
  });

  test.skip("E8 - Profile Picture should be displayed at top of page", async ({
    page,
  }) => {
    // Test code for E8
  });

  test.skip("E9 - Username should be displayed next to profile picture", async ({
    page,
  }) => {
    // Test code for E9
  });

  test.skip("E10 - PaymentID should be displayed underneath the Username", async ({
    page,
  }) => {
    // Test code for E10
  });

  test.skip("E11 - User should be able to click and highlight their payment ID", async ({
    page,
  }) => {
    // Test code for E11
  });

  test.skip("E12 - Balance should be displayed in the top right of the page", async ({
    page,
  }) => {
    // Test code for E12
  });

  test.skip("E13 - Recent transactions should display the 10 most recent transactions", async ({
    page,
  }) => {
    // Test code for E13
  });

  test.skip("E14 - Clicking Load More should display 10 more recent transactions", async ({
    page,
  }) => {
    // Test code for E14
  });

  test.skip("E15 - Coin In should show last 5 transactions coins were sent to you", async ({
    page,
  }) => {
    // Test code for E15
  });

  test.skip("E16 - Coin Out should show last 5 transactions coins were sent from you", async ({
    page,
  }) => {
    // Test code for E16
  });
});
