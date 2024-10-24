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

  test("A1, A9, A11 - Enter valid PIN redirects to Main Page", async ({
    enterPinUserContext,
  }) => {
    const page = enterPinUserContext.page;
    const viewport = enterPinUserContext.viewport;
    const createOrImport = new CreateOrImportPage(page, viewport);
    const authNewAccount = new AuthNewAccount(page, viewport);
    const loginPinPage = new LoginPinPage(page, viewport);
    const saveRecoverySeed = new SaveRecoverySeedPage(page, viewport);

    // Validate Create or Import Page and then click on Create New Account
    await createOrImport.labelCreateTitle.waitFor({ state: "attached" });
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

    // Validate Create New User/Status page, enter valid data and continue
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
    await expect(authNewAccount.labelNewAccountUsername).toHaveText("Username");
    await expect(authNewAccount.labelNewAccountStatus).toHaveText(
      "Status Message",
    );
    await expect(authNewAccount.profilePictureNewAccount).toBeVisible();
    await expect(authNewAccount.buttonNewAccountGoBack).toBeVisible();
    await expect(authNewAccount.buttonNewAccountCreate).toBeVisible();
    await authNewAccount.typeOnUsername(username);
    await authNewAccount.typeOnStatus(status);
    await authNewAccount.buttonNewAccountCreate.click();
    await loginPinPage.waitUntilPageIsLoaded();
    await loginPinPage.enterDefaultPin();

    // Click on I Saved It
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

  test("A2 - Pin should have at least 4 digits", async ({
    enterPinUserContext,
  }) => {
    const page = enterPinUserContext.page;
    const viewport = enterPinUserContext.viewport;
    const createOrImport = new CreateOrImportPage(page, viewport);
    const authNewAccount = new AuthNewAccount(page, viewport);
    const loginPinPage = new LoginPinPage(page, viewport);

    // Click on Create New Account
    await createOrImport.clickCreateNewAccount();

    // Enter Username and Status
    await authNewAccount.validateLoadingHeader();
    await authNewAccount.typeOnUsername(username);
    await authNewAccount.typeOnStatus(status);
    await authNewAccount.buttonNewAccountCreate.click();

    // Login Page Test
    await loginPinPage.waitUntilPageIsLoaded();
    await loginPinPage.enterPin("123");
    await loginPinPage.validateConfirmButtonIsDisabled();
  });

  test("A3 - Pin cannot have more than 8 digits", async ({
    enterPinUserContext,
  }) => {
    const page = enterPinUserContext.page;
    const viewport = enterPinUserContext.viewport;
    const createOrImport = new CreateOrImportPage(page, viewport);
    const authNewAccount = new AuthNewAccount(page, viewport);
    const loginPinPage = new LoginPinPage(page, viewport);

    // Click on Create New Account
    await createOrImport.clickCreateNewAccount();

    // Enter Username and Status
    await authNewAccount.validateLoadingHeader();
    await authNewAccount.typeOnUsername(username);
    await authNewAccount.typeOnStatus(status);
    await authNewAccount.buttonNewAccountCreate.click();

    // Login Page Test
    await loginPinPage.waitUntilPageIsLoaded();
    await loginPinPage.enterPin("12345678901234");
    const count = await loginPinPage.pinDotFilled.count();
    expect(count).toEqual(8);
  });

  test("A4 - Clicking red reset button should erase any inputs made", async ({
    enterPinUserContext,
  }) => {
    const page = enterPinUserContext.page;
    const viewport = enterPinUserContext.viewport;
    const createOrImport = new CreateOrImportPage(page, viewport);
    const authNewAccount = new AuthNewAccount(page, viewport);
    const loginPinPage = new LoginPinPage(page, viewport);

    // Click on Create New Account
    await createOrImport.clickCreateNewAccount();

    // Enter Username and Status
    await authNewAccount.validateLoadingHeader();
    await authNewAccount.typeOnUsername(username);
    await authNewAccount.typeOnStatus(status);
    await authNewAccount.buttonNewAccountCreate.click();

    // Login Page Test
    await loginPinPage.waitUntilPageIsLoaded();
    await loginPinPage.enterPin("12345678");
    await loginPinPage.buttonClearInput.click();
    const count = await loginPinPage.pinDotFilled.count();
    expect(count).toEqual(0);
  });

  test("A5 - Settings dropdown should show option to Scramble numberpad and option to stay unlocked", async ({
    enterPinUserContext,
  }) => {
    const page = enterPinUserContext.page;
    const viewport = enterPinUserContext.viewport;
    const createOrImport = new CreateOrImportPage(page, viewport);
    const authNewAccount = new AuthNewAccount(page, viewport);
    const loginPinPage = new LoginPinPage(page, viewport);

    // Click on Create New Account
    await createOrImport.clickCreateNewAccount();

    // Enter Username and Status
    await authNewAccount.validateLoadingHeader();
    await authNewAccount.typeOnUsername(username);
    await authNewAccount.typeOnStatus(status);
    await authNewAccount.buttonNewAccountCreate.click();

    // Login Page Test
    await loginPinPage.waitUntilPageIsLoaded();
    await loginPinPage.goToPinSettings();
    await expect(loginPinPage.scrambleKeypadLabel).toBeVisible();
    await expect(loginPinPage.scrambleKeypadLabel).toHaveText(
      "Scramble keypad?",
    );
    await expect(loginPinPage.stayUnlockedLabel).toBeVisible();
    await expect(loginPinPage.stayUnlockedLabel).toHaveText("Stay unlocked?");
  });

  test("A6, A7 - Scramble Keypad will change the order of pin input buttons", async ({
    enterPinUserContext,
  }) => {
    const page = enterPinUserContext.page;
    const viewport = enterPinUserContext.viewport;
    const createOrImport = new CreateOrImportPage(page, viewport);
    const authNewAccount = new AuthNewAccount(page, viewport);
    const loginPinPage = new LoginPinPage(page, viewport);

    // Click on Create New Account
    await createOrImport.clickCreateNewAccount();

    // Enter Username and Status
    await authNewAccount.validateLoadingHeader();
    await authNewAccount.typeOnUsername(username);
    await authNewAccount.typeOnStatus(status);
    await authNewAccount.buttonNewAccountCreate.click();

    // Login Page Test
    await loginPinPage.waitUntilPageIsLoaded();
    await expect(loginPinPage.pinKeypad).toHaveAttribute(
      "data-keyorder",
      "1,2,3,4,5,6,7,8,9,0",
    );

    await loginPinPage.goToPinSettings();
    await loginPinPage.clickScrambleKeypadSwitch();

    // Validate that the order of the buttons has changed
    const newKeyOrder =
      await loginPinPage.pinKeypad.getAttribute("data-keyorder");
    expect(newKeyOrder).not.toEqual("1,2,3,4,5,6,7,8,9,0");

    // Scramble keypad is disabled again by the user
    await loginPinPage.clickScrambleKeypadSwitch();
    await expect(loginPinPage.pinKeypad).toHaveAttribute(
      "data-keyorder",
      "1,2,3,4,5,6,7,8,9,0",
    );
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

    // Click on Create New Account
    await createOrImport.clickCreateNewAccount();

    // Enter Username and Status
    await authNewAccount.validateLoadingHeader();
    await authNewAccount.typeOnUsername(username);
    await authNewAccount.typeOnStatus(status);
    await authNewAccount.buttonNewAccountCreate.click();

    // Login Page Test
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

    // Click on I Saved It
    await saveRecoverySeed.clickOnSavedIt();

    // Once that user is in Chats page, reload the page
    await page.waitForURL("/chat");
    await chatsMainPage.reloadPage();
    await page.waitForURL("/chat");
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

    // Click on Create New Account
    await createOrImport.clickCreateNewAccount();

    // Enter Username and Status
    await authNewAccount.validateLoadingHeader();
    await authNewAccount.typeOnUsername(username);
    await authNewAccount.typeOnStatus(status);
    await authNewAccount.buttonNewAccountCreate.click();

    // Login Page Test
    await loginPinPage.waitUntilPageIsLoaded();
    await loginPinPage.goToPinSettings();
    await loginPinPage.clickStayUnlockedSwitch();
    await loginPinPage.enterPin(pinNumber);
    await loginPinPage.pinButtonConfirm.click();

    // Click on I Saved It
    await saveRecoverySeed.clickOnSavedIt();

    // Once that user is in Chats page, reload the page
    await page.waitForURL("/chat");
    await chatsMainPage.visitOtherSite("/auth");
    await page.waitForURL("/auth");
    await loginPinPage.enterWrongPin();
    await loginPinPage.clickConfirmButton();
    await loginPinPage.validateToastPinIsWrong();
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

    // Click on Create New Account
    await createOrImport.clickCreateNewAccount();

    // Enter Username and Status
    await authNewAccount.validateLoadingHeader();
    await authNewAccount.typeOnUsername(username);
    await authNewAccount.typeOnStatus(status);
    await authNewAccount.buttonNewAccountCreate.click();

    // Login Page Test
    await loginPinPage.waitUntilPageIsLoaded();
    await loginPinPage.enterPin(pinNumber);
    await loginPinPage.pinButtonConfirm.click();

    // Click on I Saved It
    await saveRecoverySeed.clickOnSavedIt();

    // Once that user is in Chats page, reload the page
    await page.waitForURL("/chat");
    await chatsMainPage.reloadPage();
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

    // Click on Create New Account
    await createOrImport.clickCreateNewAccount();

    // Enter Username and Status
    await authNewAccount.validateLoadingHeader();
    await authNewAccount.typeOnUsername(username);
    await authNewAccount.typeOnStatus(status);
    await authNewAccount.buttonNewAccountCreate.click();

    // Login Page Test
    await loginPinPage.waitUntilPageIsLoaded();
    await loginPinPage.goToPinSettings();
    await loginPinPage.clickStayUnlockedSwitch();
    await loginPinPage.enterPin(pinNumber);
    await loginPinPage.pinButtonConfirm.click();

    // Click on I Saved It
    await saveRecoverySeed.clickOnSavedIt();

    // Once that user is in Chats page, log off
    await page.waitForURL("/chat");
    await chatsMainPage.goToSettings();
    await page.waitForURL("/settings/profile");
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

    // Click on Create New Account
    await createOrImport.clickCreateNewAccount();

    // Enter Username and Status
    await authNewAccount.validateLoadingHeader();
    await authNewAccount.typeOnUsername(username);
    await authNewAccount.typeOnStatus(status);

    // Upload custom profile picture
    await authNewAccount.uploadProfilePicture("playwright/assets/logo.jpg");
    const srcImageCreateUser =
      await authNewAccount.profileImageNewAccount.getAttribute("src");
    await authNewAccount.buttonNewAccountCreate.click();

    // Login Page Test
    await loginPinPage.waitUntilPageIsLoaded();
    await loginPinPage.goToPinSettings();
    await loginPinPage.clickStayUnlockedSwitch();
    await loginPinPage.enterPin(pinNumber);
    await loginPinPage.pinButtonConfirm.click();

    // Click on I Saved It
    await saveRecoverySeed.clickOnSavedIt();

    // Once that user is in Chats page, log off
    await page.waitForURL("/chat");
    await chatsMainPage.goToSettings();
    await page.waitForURL("/settings/profile");
    const srcImageSettingsProfile =
      await settingsProfile.profileImage.getAttribute("src");
    expect(srcImageSettingsProfile).toEqual(srcImageCreateUser);
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

    // Click on Create New Account
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

    // Click on I Saved It
    await saveRecoverySeed.clickOnSavedIt();

    // Once that user is in Chats page, log off
    await page.waitForURL("/chat");
    await chatsMainPage.goToSettings();
    await page.waitForURL("/settings/profile");
    await expect(settingsProfile.identiconSettingsProfile).toBeVisible();
  });
});
