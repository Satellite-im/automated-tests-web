import { CreateOrImportPage } from "playwright/PageObjects/CreateOrImport";
import { test, expect } from "../fixtures/setup";
import { faker } from "@faker-js/faker";
import { AuthNewAccount } from "playwright/PageObjects/AuthNewAccount";
import { LoginPinPage } from "playwright/PageObjects/LoginPin";
import { SaveRecoverySeedPage } from "playwright/PageObjects/SaveRecoverySeed";
import { ChatsMainPage } from "playwright/PageObjects/ChatsElements/ChatsMain";
import { SettingsProfile } from "playwright/PageObjects/Settings/SettingsProfile";

test.describe("Create Account and Login Tests", () => {
  const username =
    faker.person.firstName() + faker.number.int({ min: 100, max: 10000 });
  const status = faker.lorem.sentence(3);
  const pinNumber = "123456";

  test.only("A1, A9, A11 - Enter valid PIN redirects to Main Page", async ({
    enterPinUserContext,
  }) => {
    const page = enterPinUserContext.page;
    const viewport = enterPinUserContext.viewport;
    const createOrImport = new CreateOrImportPage(page, viewport);
    const authNewAccount = new AuthNewAccount(page, viewport);
    const loginPinPage = new LoginPinPage(page, viewport);
    const saveRecoverySeed = new SaveRecoverySeedPage(page, viewport);

    await test.step("Validate Create or Import Page and then click on Create New Account", async () => {
      await createOrImport.validatePageIsDisplayed();
      await expect(createOrImport.labelCreateTitle).toHaveText(
        "Account Creation",
      );
      await expect(createOrImport.textCreateDescription).toHaveText(
        "Let's get started! Begin by either creating a new account, or if you already have one we can import your existing account instead.",
      );
      await expect(createOrImport.buttonCreateAccount).toHaveText(
        "Create New Account",
      );
      await createOrImport.clickCreateNewAccount();
    });

    await test.step("Validate Create New User/Status page contents", async () => {
      await authNewAccount.validateLoadingHeader();
      await expect(authNewAccount.inputNewAccountUsername).toHaveAttribute(
        "placeholder",
        "Enter a username . . .",
      );
      await expect(authNewAccount.inputNewAccountStatus).toHaveAttribute(
        "placeholder",
        "Set status message . . .",
      );
      await expect(authNewAccount.textNewAccountSecondary).toHaveText(
        "Let's set up your new account. Please choose a username below.",
      );
      await expect(authNewAccount.labelNewAccountUsername).toHaveText(
        "Username",
      );
      await expect(authNewAccount.labelNewAccountStatus).toHaveText(
        "Status Message",
      );
      await expect(authNewAccount.profilePictureNewAccount).toBeVisible();
      await expect(authNewAccount.buttonNewAccountGoBack).toBeVisible();
      await expect(authNewAccount.buttonNewAccountCreate).toBeVisible();
    });

    await test.step("Validate Terms and Conditions message and link", async () => {
      await expect(authNewAccount.textNewAccountTerms).toHaveText(
        "By using this application, you agree with our terms and conditions",
      );
      await authNewAccount.validateTermsAndConditionsLink();
    });

    await test.step("Enter valid username and status and continue", async () => {
      await authNewAccount.typeOnUsername(username);
      await authNewAccount.typeOnStatus(status);
      await authNewAccount.buttonNewAccountCreate.click();
    });

    await test.step("Enter a valid pin and continue", async () => {
      await loginPinPage.waitUntilPageIsLoaded();
      await loginPinPage.enterDefaultPin();
    });

    await test.step("Validate Save Recovery Seed Page, click on I Saved It and wait for Chat page to load", async () => {
      await saveRecoverySeed.validatePageIsLoaded();
      await expect(saveRecoverySeed.titleRecoveryPage).toHaveText(
        "Backup your seed!",
      );
      await expect(saveRecoverySeed.textRecoveryPageWarning).toHaveText(
        "Please ensure you write down this message with all words recorded in the order they appear. It can be helpful to write down the numbers along with the words.",
      );
      await saveRecoverySeed.buttonSavedPhrase.waitFor({ state: "attached" });
      await saveRecoverySeed.clickOnSavedIt();
      await page.waitForURL("/chat");
    });
  });

  test("A2 - Pin should have at least 4 digits", async ({
    enterPinUserContext,
  }) => {
    const page = enterPinUserContext.page;
    const viewport = enterPinUserContext.viewport;
    const createOrImport = new CreateOrImportPage(page, viewport);
    const authNewAccount = new AuthNewAccount(page, viewport);
    const loginPinPage = new LoginPinPage(page, viewport);

    await test.step("Click on Create New Account", async () => {
      await createOrImport.clickCreateNewAccount();
    });

    await test.step("Enter Username and Status", async () => {
      await authNewAccount.validateLoadingHeader();
      await authNewAccount.typeOnUsername(username);
      await authNewAccount.typeOnStatus(status);
      await authNewAccount.buttonNewAccountCreate.click();
    });

    await test.step("Enter a PIN with less than 3 digits and validate continue button is disabled", async () => {
      await loginPinPage.waitUntilPageIsLoaded();
      await loginPinPage.enterPin("123");
      await loginPinPage.validateConfirmButtonIsDisabled();
    });
  });

  test("A3 - Pin cannot have more than 8 digits", async ({
    enterPinUserContext,
  }) => {
    const page = enterPinUserContext.page;
    const viewport = enterPinUserContext.viewport;
    const createOrImport = new CreateOrImportPage(page, viewport);
    const authNewAccount = new AuthNewAccount(page, viewport);
    const loginPinPage = new LoginPinPage(page, viewport);

    await test.step("Click on Create New Account", async () => {
      await createOrImport.clickCreateNewAccount();
    });

    await test.step("Enter Username and Status", async () => {
      await authNewAccount.validateLoadingHeader();
      await authNewAccount.typeOnUsername(username);
      await authNewAccount.typeOnStatus(status);
      await authNewAccount.buttonNewAccountCreate.click();
    });

    await test.step("Validate user cannot Enter a PIN with more than 8 digits", async () => {
      await loginPinPage.waitUntilPageIsLoaded();
      await loginPinPage.enterPin("12345678901234");
      const count = await loginPinPage.pinDotFilled.count();
      expect(count).toEqual(8);
    });
  });

  test("A4 - Clicking red reset button should erase any inputs made", async ({
    enterPinUserContext,
  }) => {
    const page = enterPinUserContext.page;
    const viewport = enterPinUserContext.viewport;
    const createOrImport = new CreateOrImportPage(page, viewport);
    const authNewAccount = new AuthNewAccount(page, viewport);
    const loginPinPage = new LoginPinPage(page, viewport);

    await test.step("Click on Create New Account", async () => {
      await createOrImport.clickCreateNewAccount();
    });

    await test.step("Enter Username and Status", async () => {
      await authNewAccount.validateLoadingHeader();
      await authNewAccount.typeOnUsername(username);
      await authNewAccount.typeOnStatus(status);
      await authNewAccount.buttonNewAccountCreate.click();
    });

    await test.step("Enter a PIN and click on red reset button", async () => {
      await loginPinPage.waitUntilPageIsLoaded();
      await loginPinPage.enterPin("12345678");
      await loginPinPage.buttonClearInput.click();
      const count = await loginPinPage.pinDotFilled.count();
      expect(count).toEqual(0);
    });
  });

  test("A5 - Settings dropdown should show option to Scramble numberpad and option to stay unlocked", async ({
    enterPinUserContext,
  }) => {
    const page = enterPinUserContext.page;
    const viewport = enterPinUserContext.viewport;
    const createOrImport = new CreateOrImportPage(page, viewport);
    const authNewAccount = new AuthNewAccount(page, viewport);
    const loginPinPage = new LoginPinPage(page, viewport);

    await test.step("Click on Create New Account", async () => {
      await createOrImport.clickCreateNewAccount();
    });

    await test.step("Enter Username and Status", async () => {
      await authNewAccount.validateLoadingHeader();
      await authNewAccount.typeOnUsername(username);
      await authNewAccount.typeOnStatus(status);
      await authNewAccount.buttonNewAccountCreate.click();
    });

    await test.step("Validate create account settings options", async () => {
      await loginPinPage.waitUntilPageIsLoaded();
      await loginPinPage.goToPinSettings();
      await expect(loginPinPage.scrambleKeypadLabel).toBeVisible();
      await expect(loginPinPage.scrambleKeypadLabel).toHaveText(
        "Scramble keypad?",
      );
      await expect(loginPinPage.stayUnlockedLabel).toBeVisible();
      await expect(loginPinPage.stayUnlockedLabel).toHaveText("Stay unlocked?");
    });
  });

  test("A6, A7 - Scramble Keypad will change the order of pin input buttons", async ({
    enterPinUserContext,
  }) => {
    const page = enterPinUserContext.page;
    const viewport = enterPinUserContext.viewport;
    const createOrImport = new CreateOrImportPage(page, viewport);
    const authNewAccount = new AuthNewAccount(page, viewport);
    const loginPinPage = new LoginPinPage(page, viewport);

    await test.step("Click on Create New Account", async () => {
      await createOrImport.clickCreateNewAccount();
    });

    await test.step("Enter Username and Status", async () => {
      await authNewAccount.validateLoadingHeader();
      await authNewAccount.typeOnUsername(username);
      await authNewAccount.typeOnStatus(status);
      await authNewAccount.buttonNewAccountCreate.click();
    });

    await test.step("Scramble Keypad will change the order of pin input buttons", async () => {
      await loginPinPage.waitUntilPageIsLoaded();
      await expect(loginPinPage.pinKeypad).toHaveAttribute(
        "data-keyorder",
        "1,2,3,4,5,6,7,8,9,0",
      );
      await loginPinPage.goToPinSettings();
      await loginPinPage.clickScrambleKeypadSwitch();
    });

    await test.step("Validate that the order of the buttons has changed", async () => {
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
  });

  test("A8 - If Stay Unlocked is toggled on, user should bypass PIN page when logging in", async ({
    enterPinUserContext,
  }) => {
    const page = enterPinUserContext.page;
    const viewport = enterPinUserContext.viewport;
    const createOrImport = new CreateOrImportPage(page, viewport);
    const authNewAccount = new AuthNewAccount(page, viewport);
    const loginPinPage = new LoginPinPage(page, viewport);
    const saveRecoverySeed = new SaveRecoverySeedPage(page, viewport);
    const chatsMainPage = new ChatsMainPage(page, viewport);

    await test.step("Click on Create New Account", async () => {
      await createOrImport.clickCreateNewAccount();
    });

    await test.step("Enter Username and Status", async () => {
      await authNewAccount.validateLoadingHeader();
      await authNewAccount.typeOnUsername(username);
      await authNewAccount.typeOnStatus(status);
      await authNewAccount.buttonNewAccountCreate.click();
    });

    await test.step("Toggle Stay Unlocked on and enter PIN", async () => {
      await loginPinPage.waitUntilPageIsLoaded();
      await loginPinPage.goToPinSettings();
      await expect(loginPinPage.stayUnlockedCheckbox).toBeChecked();
      await loginPinPage.clickStayUnlockedSwitch();
      await expect(loginPinPage.stayUnlockedCheckbox).not.toBeChecked();
      await loginPinPage.clickStayUnlockedSwitch();
      await expect(loginPinPage.stayUnlockedCheckbox).toBeChecked();
      await loginPinPage.goToPinSettings();
      await loginPinPage.enterPin(pinNumber);
      await loginPinPage.pinButtonConfirm.click();
    });

    await test.step("Click on I Saved It", async () => {
      await saveRecoverySeed.clickOnSavedIt();
    });

    await test.step("Once that user is in Chats page, reload the page. Page will reload without prompting for PIN", async () => {
      await page.waitForURL("/chat");
      await chatsMainPage.reloadPage();
      await page.waitForURL("/chat");
    });
  });

  test("A12 - If incorrect pin is entered, error message should be displayed", async ({
    enterPinUserContext,
  }) => {
    const page = enterPinUserContext.page;
    const viewport = enterPinUserContext.viewport;
    const createOrImport = new CreateOrImportPage(page, viewport);
    const authNewAccount = new AuthNewAccount(page, viewport);
    const loginPinPage = new LoginPinPage(page, viewport);
    const saveRecoverySeed = new SaveRecoverySeedPage(page, viewport);
    const chatsMainPage = new ChatsMainPage(page, viewport);

    await test.step("Click on Create New Account", async () => {
      await createOrImport.clickCreateNewAccount();
    });

    await test.step("Enter Username and Status", async () => {
      await authNewAccount.validateLoadingHeader();
      await authNewAccount.typeOnUsername(username);
      await authNewAccount.typeOnStatus(status);
      await authNewAccount.buttonNewAccountCreate.click();
    });

    await test.step("Toggle Stay Unlocked off and enter PIN", async () => {
      await loginPinPage.waitUntilPageIsLoaded();
      await loginPinPage.goToPinSettings();
      await loginPinPage.clickStayUnlockedSwitch();
      await loginPinPage.enterPin(pinNumber);
      await loginPinPage.pinButtonConfirm.click();
    });

    await test.step("Click on I Saved It", async () => {
      await saveRecoverySeed.clickOnSavedIt();
    });

    await test.step("Once that user is in Chats page, reload the page and validate it prompts for the PIN", async () => {
      await page.waitForURL("/chat");
      await chatsMainPage.visitOtherSite("/auth");
      await page.waitForURL("/auth");
      await loginPinPage.enterWrongPin();
      await loginPinPage.clickConfirmButton();
      await loginPinPage.validateToastPinIsWrong();
    });
  });

  test("A13 - If Stay Unlocked is toggled off, user be redirected to enter PIN when refreshing page", async ({
    enterPinUserContext,
  }) => {
    const page = enterPinUserContext.page;
    const viewport = enterPinUserContext.viewport;
    const createOrImport = new CreateOrImportPage(page, viewport);
    const authNewAccount = new AuthNewAccount(page, viewport);
    const loginPinPage = new LoginPinPage(page, viewport);
    const saveRecoverySeed = new SaveRecoverySeedPage(page, viewport);
    const chatsMainPage = new ChatsMainPage(page, viewport);

    await test.step("Click on Create New Account", async () => {
      await createOrImport.clickCreateNewAccount();
    });

    await test.step("Enter Username and Status", async () => {
      await authNewAccount.validateLoadingHeader();
      await authNewAccount.typeOnUsername(username);
      await authNewAccount.typeOnStatus(status);
      await authNewAccount.buttonNewAccountCreate.click();
    });

    await test.step("Enter a valid PIN", async () => {
      await loginPinPage.waitUntilPageIsLoaded();
      await loginPinPage.enterPin(pinNumber);
      await loginPinPage.pinButtonConfirm.click();
    });

    await test.step("Click on I Saved It", async () => {
      await saveRecoverySeed.clickOnSavedIt();
    });

    await test.step("Once that user is in Chats page, log off", async () => {
      await page.waitForURL("/chat");
      await chatsMainPage.reloadPage();
    });
  });

  test("A14 - If Stay Unlocked is toggled on, user should be redirected to enter PIN after logging off", async ({
    enterPinUserContext,
  }) => {
    const page = enterPinUserContext.page;
    const viewport = enterPinUserContext.viewport;
    const createOrImport = new CreateOrImportPage(page, viewport);
    const authNewAccount = new AuthNewAccount(page, viewport);
    const loginPinPage = new LoginPinPage(page, viewport);
    const saveRecoverySeed = new SaveRecoverySeedPage(page, viewport);
    const chatsMainPage = new ChatsMainPage(page, viewport);

    await test.step("Click on Create New Account", async () => {
      await createOrImport.clickCreateNewAccount();
    });

    await test.step("Enter Username and Status", async () => {
      await authNewAccount.validateLoadingHeader();
      await authNewAccount.typeOnUsername(username);
      await authNewAccount.typeOnStatus(status);
      await authNewAccount.buttonNewAccountCreate.click();
    });

    await test.step("Toggle Stay Unlocked on and enter PIN", async () => {
      await loginPinPage.waitUntilPageIsLoaded();
      await loginPinPage.goToPinSettings();
      await loginPinPage.clickStayUnlockedSwitch();
      await loginPinPage.enterPin(pinNumber);
      await loginPinPage.pinButtonConfirm.click();
    });

    await test.step("Click on I Saved It", async () => {
      await saveRecoverySeed.clickOnSavedIt();
    });

    await test.step("Once that user is in Chats page, log off", async () => {
      await page.waitForURL("/chat");
      await chatsMainPage.goToSettings();
      await page.waitForURL("/settings/profile");
    });
  });

  test("A15 - User can setup a custom profile picture when creating a new account", async ({
    enterPinUserContext,
  }) => {
    const page = enterPinUserContext.page;
    const viewport = enterPinUserContext.viewport;
    const createOrImport = new CreateOrImportPage(page, viewport);
    const authNewAccount = new AuthNewAccount(page, viewport);
    const loginPinPage = new LoginPinPage(page, viewport);
    const saveRecoverySeed = new SaveRecoverySeedPage(page, viewport);
    const chatsMainPage = new ChatsMainPage(page, viewport);
    const settingsProfile = new SettingsProfile(page, viewport);
    let srcImageCreateUser: string;

    await test.step("Click on Create New Account and Enter Username and Status", async () => {
      await createOrImport.clickCreateNewAccount();
      await authNewAccount.validateLoadingHeader();
      await authNewAccount.typeOnUsername(username);
      await authNewAccount.typeOnStatus(status);
    });

    await test.step("Upload custom profile picture", async () => {
      await authNewAccount.uploadProfilePicture("playwright/assets/logo.jpg");
      srcImageCreateUser =
        await authNewAccount.profileImageNewAccount.getAttribute("src");
      await authNewAccount.buttonNewAccountCreate.click();
    });

    await test.step("Login Page Test", async () => {
      await loginPinPage.waitUntilPageIsLoaded();
      await loginPinPage.goToPinSettings();
      await loginPinPage.clickStayUnlockedSwitch();
      await loginPinPage.enterPin(pinNumber);
      await loginPinPage.pinButtonConfirm.click();
    });

    await test.step("Click on I Saved It", async () => {
      await saveRecoverySeed.clickOnSavedIt();
    });

    await test.step("Once that user is in Chats page, log off", async () => {
      await page.waitForURL("/chat");
      await chatsMainPage.goToSettings();
      await page.waitForURL("/settings/profile");
      const srcImageSettingsProfile =
        await settingsProfile.profileImage.getAttribute("src");
      expect(srcImageSettingsProfile).toEqual(srcImageCreateUser);
    });
  });

  test("A16 - Default identicon profile image is assigned to new user if user does not setup a custom profile picture", async ({
    enterPinUserContext,
  }) => {
    const page = enterPinUserContext.page;
    const viewport = enterPinUserContext.viewport;
    const createOrImport = new CreateOrImportPage(page, viewport);
    const authNewAccount = new AuthNewAccount(page, viewport);
    const loginPinPage = new LoginPinPage(page, viewport);
    const saveRecoverySeed = new SaveRecoverySeedPage(page, viewport);
    const chatsMainPage = new ChatsMainPage(page, viewport);
    const settingsProfile = new SettingsProfile(page, viewport);

    await test.step("Click on Create New Account and Enter Username and Status", async () => {
      await createOrImport.clickCreateNewAccount();

      await authNewAccount.validateLoadingHeader();
      await authNewAccount.typeOnUsername(username);
      await authNewAccount.typeOnStatus(status);
    });

    await test.step("Validate identicon image is assigned to user", async () => {
      await expect(authNewAccount.identiconNewAccount).toBeVisible();
      await authNewAccount.buttonNewAccountCreate.click();
    });

    await test.step("Login Page Test", async () => {
      await loginPinPage.waitUntilPageIsLoaded();
      await loginPinPage.goToPinSettings();
      await loginPinPage.clickStayUnlockedSwitch();
      await loginPinPage.enterPin(pinNumber);
      await loginPinPage.pinButtonConfirm.click();
    });

    await test.step("Click on I Saved It", async () => {
      await saveRecoverySeed.clickOnSavedIt();
    });

    await test.step("Once that user is in Chats page, log off", async () => {
      await page.waitForURL("/chat");
      await chatsMainPage.goToSettings();
      await page.waitForURL("/settings/profile");
      await expect(settingsProfile.identiconSettingsProfile).toBeVisible();
    });
  });

  test("A17 - Download seed phrase file", async ({ enterPinUserContext }) => {
    const page = enterPinUserContext.page;
    const viewport = enterPinUserContext.viewport;
    const chatsMainPage = new ChatsMainPage(page, viewport);
    const createOrImport = new CreateOrImportPage(page, viewport);
    const authNewAccount = new AuthNewAccount(page, viewport);
    const loginPinPage = new LoginPinPage(page, viewport);
    const saveRecoverySeed = new SaveRecoverySeedPage(page, viewport);
    const settingsProfile = new SettingsProfile(page, viewport);
    let recoverySeedFile: string[];

    await test.step("Start account creation until Save Recovery Seed Page", async () => {
      await createOrImport.clickCreateNewAccount();

      // Enter Username and Status
      await authNewAccount.validateLoadingHeader();
      await authNewAccount.typeOnUsername(username);
      await authNewAccount.typeOnStatus(status);

      // Validate identicon image is assigned to user
      await expect(authNewAccount.identiconNewAccount).toBeVisible();
      await authNewAccount.buttonNewAccountCreate.click();

      // Login Page Test
      await loginPinPage.waitUntilPageIsLoaded();
      await loginPinPage.goToPinSettings();
      await loginPinPage.clickStayUnlockedSwitch();
      await loginPinPage.enterPin(pinNumber);
      await loginPinPage.pinButtonConfirm.click();
    });

    await test.step("Save Recovery Phrase displayed into a file", async () => {
      // Download Recovery Seed Phrase
      await saveRecoverySeed.saveRecoverySeed();
    });

    await test.step("Compare output from file vs phrase displayed", async () => {
      // Compare recovery seed phrase displayed vs downloaded
      recoverySeedFile = await saveRecoverySeed.readRecoveryPhraseFile(
        "./downloads/seed-phrase.txt",
      );
      const recoverySeedDisplayed = await saveRecoverySeed.getRecoveryPhrase();
      expect(recoverySeedFile).toEqual(recoverySeedDisplayed);
    });

    await test.step("Finish account creation and go to Settings Profile", async () => {
      // Click on I Saved It
      await saveRecoverySeed.clickOnSavedIt();

      // Once that user is in Chats page, go to Settings Profile
      await page.waitForURL("/chat");
      await chatsMainPage.goToSettings();
      await page.waitForURL("/settings/profile");

      // Hide sidebar if viewport is Mobile Chrome
      if (viewport === "mobile-chrome") {
        await chatsMainPage.buttonHideSidebar.click();
      }
    });

    await test.step("In Settings Profile, show Recovery Seed Phrase", async () => {
      // Show Recovery Phrase and ensure phrase displayed matches with phrase shown during account creation
      await settingsProfile.revealPhraseSectionRevealButton.click();
      await settingsProfile.validateRecoveryPhraseIsShown();
      await settingsProfile.revealPhraseSectionButtonCopyPhrase.click();
    });

    await test.step("Compare Recovery Seed Phrase displayed vs downloaded", async () => {
      const settingProfilePhrase = await settingsProfile.getRecoveryPhrase();
      expect(recoverySeedFile).toEqual(settingProfilePhrase);
    });
  });

  test("A18 - Install Banner validations - Download installer", async ({
    enterPinUserContext,
  }) => {
    const page = enterPinUserContext.page;
    const viewport = enterPinUserContext.viewport;
    const createOrImport = new CreateOrImportPage(page, viewport);

    await test.step("Download installer banner contains expected information", async () => {
      await createOrImport.validateInstallBanner();
    });

    await test.step("User can download installer from button and banner is hidden", async () => {
      await createOrImport.validateInstallerIsDownloaded(viewport);
    });
  });

  test("A19 - Install Banner validations - Dismiss banner", async ({
    enterPinUserContext,
  }) => {
    const page = enterPinUserContext.page;
    const viewport = enterPinUserContext.viewport;
    const createOrImport = new CreateOrImportPage(page, viewport);

    await test.step("User can dismiss installer banner and then banner is hidden", async () => {
      await createOrImport.dismissDownloadAlert();
    });
  });
});
