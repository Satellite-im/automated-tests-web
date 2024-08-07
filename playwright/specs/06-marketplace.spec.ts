import { test } from "../fixtures/setup";

test.describe("Marketplace Tests", () => {
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

  // Marketplace section is gone from the app
  /*
  test.skip("D1 - Marketplace modal should appear when user clicks Marketplace", async ({
    page,
  }) => {});

  test.skip("D2 - Clicking Blundles & Packs should navigate you to said page", async ({
    page,
  }) => {
    // Test code for D2
  });

  test.skip("D3 - Clicking Staff Picks should navigate you to said page", async ({
    page,
  }) => {
    // Test code for D3
  });

  test.skip("D4 - Clicking Recently Updated should navigate you to said page", async ({
    page,
  }) => {
    // Test code for D4
  });

  test.skip("D5 - Clicking Most Downloaded should navigate you to said page", async ({
    page,
  }) => {
    // Test code for D5
  });

  test.skip("D6 - Clicking Newly Added should navigate you to said page", async ({
    page,
  }) => {
    // Test code for D6
  });

  test.skip("D7 - Clicking Community Upgrades should navigate you to said page", async ({
    page,
  }) => {
    // Test code for D7
  });

  test.skip("D8 - Clicking Extensions should navigate you to said page", async ({
    page,
  }) => {
    // Test code for D8
  });

  test.skip("D9 - Clicking Themes should navigate you to said page", async ({
    page,
  }) => {
    // Test code for D9
  });

  test.skip("D10 - Clicking Stickers & Emotes should navigate you to said page", async ({
    page,
  }) => {
    // Test code for D10
  });*/
});
