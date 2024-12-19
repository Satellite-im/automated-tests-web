import { CreateOrImportPage } from "playwright/PageObjects/CreateOrImport";
import { expect, test } from "../fixtures/setup";
import { ImportAccountPage } from "playwright/PageObjects/ImportAccount";
import { LoginPinPage } from "playwright/PageObjects/LoginPin";

test.describe("Import Account Tests", () => {
  test("U1 - Import Account - Negative Input tests, go back and scramble keypad", async ({
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

    await test.step("Go to Import Account and Validate PIN settings options", async () => {
      await createOrImport.clickImportAccount();
      await loginPinPage.goToPinSettings();
      await expect(loginPinPage.scrambleKeypadLabel).toBeVisible();
      await expect(loginPinPage.scrambleKeypadLabel).toHaveText(
        "Scramble keypad?",
      );
      await expect(loginPinPage.stayUnlockedLabel).toBeVisible();
      await expect(loginPinPage.stayUnlockedLabel).toHaveText("Stay unlocked?");
    });

    await test.step("Validate scramble pad change the order of pin input buttons", async () => {
      await loginPinPage.clickScrambleKeypadSwitch();
      const newKeyOrder =
        await loginPinPage.pinKeypad.getAttribute("data-keyorder");
      expect(newKeyOrder).not.toEqual("1,2,3,4,5,6,7,8,9,0");
    });

    await test.step("Scramble keypad is disabled again by the user and order of keys is restored", async () => {
      await loginPinPage.clickScrambleKeypadSwitch();
      await expect(loginPinPage.pinKeypad).toHaveAttribute(
        "data-keyorder",
        "1,2,3,4,5,6,7,8,9,0",
      );
    });

    await test.step("PIN should have at least 3 digits otherwise continue button is disabled", async () => {
      await loginPinPage.enterPin("123");
      await loginPinPage.validateConfirmButtonIsDisabled();
    });

    await test.step("Validate user cannot Enter a PIN with more than 8 digits", async () => {
      await loginPinPage.enterPin("12345678901234");
      const count = await loginPinPage.pinDotFilled.count();
      expect(count).toEqual(8);
    });

    await test.step("Red button should reset pin input", async () => {
      await loginPinPage.buttonClearInput.click();
      const count = await loginPinPage.pinDotFilled.count();
      expect(count).toEqual(0);
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
