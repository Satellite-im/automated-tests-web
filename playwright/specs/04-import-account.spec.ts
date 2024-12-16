import { CreateOrImportPage } from "playwright/PageObjects/CreateOrImport";
import { test } from "../fixtures/setup";
import { ImportAccountPage } from "playwright/PageObjects/ImportAccount";
import { LoginPinPage } from "playwright/PageObjects/LoginPin";

test.describe("Import Account Tests", () => {
  test("U1 - Import Account - Valid PIN and go back", async ({
    enterPinUserContext,
  }) => {
    const page = enterPinUserContext.page;
    const viewport = enterPinUserContext.viewport;
    const createOrImport = new CreateOrImportPage(page, viewport);
    const importAccount = new ImportAccountPage(page, viewport);
    const loginPinPage = new LoginPinPage(page, viewport);

    await test.step("Validate Create or Import Page is displayed and then click on Import Account", async () => {
      await createOrImport.validatePageIsDisplayed();
      await createOrImport.clickImportAccount();
    });

    await test.step("Enter valid PIN", async () => {
      await loginPinPage.enterDefaultPin();
    });

    await test.step("Go Back button returns to first screen", async () => {
      await importAccount.validatePageIsLoaded();
      await importAccount.clickOnGoBack();
      await createOrImport.validatePageIsDisplayed();
    });
  });

  test.skip("U2 - Import Account - Seed phrase from file", async ({
    enterPinUserContext,
  }) => {});

  test.skip("U3 - Import Account - Seed phrase entered manually", async ({
    enterPinUserContext,
  }) => {});

  test.skip("U4 - Import Account - Provide wrong seed phrase", async ({
    enterPinUserContext,
  }) => {});

  test.skip("U5 - Import Account - Import account from File", async ({
    enterPinUserContext,
  }) => {});

  test.skip("U6 - Import Account - Import account from Remote", async ({
    enterPinUserContext,
  }) => {});

  test.skip("U7 - Export Account - Export account to File", async ({
    enterPinUserContext,
  }) => {});

  test.skip("U8 - Export Account - Export account to Remote", async ({
    enterPinUserContext,
  }) => {});
});
