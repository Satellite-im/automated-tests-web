import { CreateOrImportPage } from "playwright/PageObjects/CreateOrImport";
import { expect, test } from "../fixtures/setup";
import { faker } from "@faker-js/faker";
import { ImportAccountPage } from "playwright/PageObjects/ImportAccount";
import { LoginPinPage } from "playwright/PageObjects/LoginPin";
import { ChatsMainPage } from "playwright/PageObjects/ChatsElements/ChatsMain";
import { AuthNewAccount } from "playwright/PageObjects/AuthNewAccount";
import { SaveRecoverySeedPage } from "playwright/PageObjects/SaveRecoverySeed";
import { SettingsProfile } from "playwright/PageObjects/Settings/SettingsProfile";
import { DeleteAccountModal } from "playwright/PageObjects/Settings/DeleteAccountModal";

test.describe("Import Account Tests", () => {
  test("U1 to U6 - Import Account - Negative Input tests, go back and scramble keypad", async ({
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

    await test.step("Dismiss installer download banner", async () => {
      await createOrImport.dismissDownloadAlert();
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

    await test.step("PIN should have at least 4 digits otherwise continue button is disabled", async () => {
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

  test("U7, U10 - Import Account From File Backup - Seed phrase from file", async ({
    enterPinUserContext,
  }) => {
    const page = enterPinUserContext.page;
    const viewport = enterPinUserContext.viewport;
    const chatsPage = new ChatsMainPage(page, viewport);
    const createOrImport = new CreateOrImportPage(page, viewport);
    const importAccount = new ImportAccountPage(page, viewport);
    const loginPinPage = new LoginPinPage(page, viewport);

    await test.step("Validate Create or Import Page is displayed and then click on Import Account", async () => {
      await createOrImport.validatePageIsDisplayed();
      await createOrImport.clickImportAccount();
    });

    await test.step("Dismiss installer download banner", async () => {
      await createOrImport.dismissDownloadAlert();
    });

    await test.step("Enter valid PIN", async () => {
      await loginPinPage.enterDefaultPin();
    });

    await test.step("Import account using a seed phrase from file", async () => {
      await importAccount.validatePageIsLoaded();
      await importAccount.importAccountFromFile(
        "file",
        "playwright/assets/export.upk",
        "playwright/assets/seed-phrase.txt",
      );
    });

    await test.step("After successful import from file, user is redirected to chats page", async () => {
      await page.waitForURL("/chat");
      await chatsPage.validateChatsMainPageIsShown();
    });
  });

  test("U8, U10 - Import Account From File Backup - Seed phrase entered manually", async ({
    enterPinUserContext,
  }) => {
    const page = enterPinUserContext.page;
    const viewport = enterPinUserContext.viewport;
    const chatsPage = new ChatsMainPage(page, viewport);
    const createOrImport = new CreateOrImportPage(page, viewport);
    const importAccount = new ImportAccountPage(page, viewport);
    const loginPinPage = new LoginPinPage(page, viewport);

    await test.step("Validate Create or Import Page is displayed and then click on Import Account", async () => {
      await createOrImport.validatePageIsDisplayed();
      await createOrImport.clickImportAccount();
    });

    await test.step("Dismiss installer download banner", async () => {
      await createOrImport.dismissDownloadAlert();
    });

    await test.step("Enter valid PIN", async () => {
      await loginPinPage.enterDefaultPin();
    });

    await test.step("Import account entering seed phrase manually ", async () => {
      await importAccount.validatePageIsLoaded();
      const recoverySeedArray = await importAccount.readRecoveryPhraseFile(
        "playwright/assets/seed-phrase.txt",
      );
      await importAccount.importAccountFromFile(
        "manual",
        "playwright/assets/export.upk",
        "",
        recoverySeedArray,
      );
    });

    await test.step("After successful import entering seed phrase manually, user is redirected to chats page", async () => {
      await page.waitForURL("/chat");
      await chatsPage.validateChatsMainPageIsShown();
    });
  });

  test("U9 - Import Account - Provide wrong seed phrase", async ({
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

    await test.step("Dismiss installer download banner", async () => {
      await createOrImport.dismissDownloadAlert();
    });

    await test.step("Enter valid PIN", async () => {
      await loginPinPage.enterDefaultPin();
    });

    await test.step("Import account entering seed phrase manually ", async () => {
      await importAccount.validatePageIsLoaded();
      let invalidRecoverySeedArray = await importAccount.readRecoveryPhraseFile(
        "playwright/assets/seed-phrase.txt",
      );
      invalidRecoverySeedArray[invalidRecoverySeedArray.length - 1] = "invalid";
      await importAccount.importAccountFromFile(
        "manual",
        "playwright/assets/export.upk",
        "",
        invalidRecoverySeedArray,
      );
    });

    await test.step("Validate toast notification for wrong phrase is shown", async () => {
      await importAccount.validateToastInvalidPhrase();
    });
  });

  test("U12 - Export Account - Export account to File", async ({
    enterPinUserContext,
  }) => {
    const page = enterPinUserContext.page;
    const viewport = enterPinUserContext.viewport;
    const authNewAccount = new AuthNewAccount(page, viewport);
    const chatsPage = new ChatsMainPage(page, viewport);
    const createOrImport = new CreateOrImportPage(page, viewport);
    const deleteAccount = new DeleteAccountModal(page, viewport);
    const importAccount = new ImportAccountPage(page, viewport);
    const loginPinPage = new LoginPinPage(page, viewport);
    const saveRecoverySeed = new SaveRecoverySeedPage(page, viewport);
    const settingsProfile = new SettingsProfile(page, viewport);
    const username =
      faker.person.firstName() + faker.number.int({ min: 100, max: 10000 });
    const status = faker.lorem.sentence(3);

    await test.step("Validate Create or Import Page is shown and then click on Create New Account", async () => {
      await createOrImport.validatePageIsDisplayed();
      await createOrImport.clickCreateNewAccount();
    });

    await test.step("Enter username and status and continue", async () => {
      await authNewAccount.validateLoadingHeader();
      await authNewAccount.typeOnUsername(username);
      await authNewAccount.typeOnStatus(status);
      await authNewAccount.buttonNewAccountCreate.click();
    });

    await test.step("Enter a valid pin and continue", async () => {
      await loginPinPage.waitUntilPageIsLoaded();
      await loginPinPage.enterDefaultPin();
    });

    await test.step("Save Recovery Seed file and continue", async () => {
      await saveRecoverySeed.validatePageIsLoaded();
      await saveRecoverySeed.saveRecoverySeed();
      await saveRecoverySeed.clickOnSavedIt();
    });

    await test.step("Go to settings profile", async () => {
      // Once that user is in Chats page, go to Settings Profile
      await page.waitForURL("/chat");
      await chatsPage.goToSettings();
      await page.waitForURL("/settings/profile");

      // Hide sidebar if viewport is Mobile Chrome
      if (viewport === "mobile-chrome") {
        await chatsPage.buttonHideSidebar.click();
      }
    });

    await test.step("Validate Export Account Section contents", async () => {
      await expect(settingsProfile.exportAccountSectionLabel).toHaveText(
        "Export",
      );
      await expect(settingsProfile.exportAccountSectionText).toHaveText(
        "Export your account manually to a file.",
      );
    });

    await test.step("Validate user can export account to file", async () => {
      await settingsProfile.exportAccountToFile();
    });

    await test.step("Now Delete the Account so it can be restored from remote", async () => {
      await settingsProfile.deleteAccount();
      await deleteAccount.enterDefaultPin();
      await createOrImport.validatePageIsDisplayed();
    });

    await test.step("Validate Create or Import Page is displayed and then click on Import Account", async () => {
      await createOrImport.validatePageIsDisplayed();
      await createOrImport.clickImportAccount();
    });

    await test.step("Dismiss installer download banner", async () => {
      await createOrImport.dismissDownloadAlert();
    });

    await test.step("Enter valid PIN", async () => {
      await loginPinPage.enterDefaultPin();
    });

    /*await test.step("Import account using a seed phrase from file", async () => {
      await importAccount.validatePageIsLoaded();
      await importAccount.importAccountFromFile(
        "file",
        "./downloads/export.upk",
        "./downloads/seed-phrase.txt",
      );
    });

    await test.step("After successful import from file, user is redirected to chats page", async () => {
      await page.waitForURL("/chat");
      await chatsPage.validateChatsMainPageIsShown();
    });*/
  });
});
