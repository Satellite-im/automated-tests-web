import authNewAccount from "./PageObjects/AuthNewAccount";
import chatsMainPage from "./PageObjects/ChatsMain";
import createOrImport from "./PageObjects/CreateOrImport";
import loginPinPage from "./PageObjects/LoginPin";
import { faker } from "@faker-js/faker";
import SettingsProfile from "./PageObjects/Settings/SettingsProfile";
import saveRecoverySeed from "./PageObjects/SaveRecoverySeed";

describe("Create Account and Login Tests", () => {
  const username =
    faker.person.firstName() + faker.number.int({ min: 100, max: 10000 });
  const status = faker.lorem.sentence(3);
  const pinNumber = "1234";

  beforeEach(() => {
    createOrImport.launchCleanApplication();
  });

  it("A1, A9, A11 - Enter valid PIN redirects to Main Page", () => {
    createOrImport.labelCreateTitle.should("have.text", "Account Creation");
    createOrImport.textCreateDescription.should(
      "have.text",
      "We're going to create an account for you. On the next screen, you'll see a set of words. Screenshot this or write it down. This is the only way to backup your account.",
    );
    createOrImport.buttonCreateAccount.click();
    authNewAccount.validateLoadingHeader();
    authNewAccount.textNewAccountSecondary.should(
      "have.text",
      "Let's set up your new account. Please choose a username below.",
    );
    authNewAccount.labelNewAccountUsername.should("have.text", "Username");
    authNewAccount.labelNewAccountStatus.should("have.text", "Status Message");
    authNewAccount.profilePictureNewAccount.should("be.visible");
    authNewAccount.buttonNewAccountGoBack.should("be.visible");
    authNewAccount.buttonNewAccountCreate.should("be.visible");
    authNewAccount.typeOnUsername(username);
    authNewAccount.typeOnStatus(status);
    authNewAccount.buttonNewAccountCreate.click();
    loginPinPage.labelChooseEnterPin.should("have.text", "Choose a new pin.");
    loginPinPage.enterPin(pinNumber);
    loginPinPage.pinButtonConfirm.click();
    saveRecoverySeed.titleRecoveryPage.should("have.text", "Backup your seed!");
    saveRecoverySeed.textRecoveryPageWarning.should(
      "have.text",
      "Please ensure you write down this message with all words recorded in the order they appear. It can be helpful to write down the numbers along with the words.",
    );
    saveRecoverySeed.validateRecoveryPhraseIsShown();
    saveRecoverySeed.buttonSavedPhrase.click();
    chatsMainPage.addSomeone.should("exist");
    cy.location("href").should("include", "/chat");
  });

  it("A2 - Pin should have at least 4 digits", () => {
    createOrImport.buttonCreateAccount.click();
    authNewAccount.validateLoadingHeader();
    authNewAccount.typeOnUsername(username);
    authNewAccount.typeOnStatus(status);
    authNewAccount.buttonNewAccountCreate.click();
    loginPinPage.enterPin("123");
    loginPinPage.validateConfirmButtonIsDisabled();
  });

  it("A3 - Pin cannot have more than 8 digits", () => {
    createOrImport.buttonCreateAccount.click();
    authNewAccount.validateLoadingHeader();
    authNewAccount.typeOnUsername(username);
    authNewAccount.typeOnStatus(status);
    authNewAccount.buttonNewAccountCreate.click();
    loginPinPage.enterPin("12345678901234");
    loginPinPage.pinDotFilled.should("have.length", 8);
  });

  it("A4 - Clicking red reset button should erase any inputs made", () => {
    createOrImport.buttonCreateAccount.click();
    authNewAccount.validateLoadingHeader();
    authNewAccount.typeOnUsername(username);
    authNewAccount.typeOnStatus(status);
    authNewAccount.buttonNewAccountCreate.click();
    loginPinPage.enterPin("12345678");
    loginPinPage.clearInputButton.click();
    loginPinPage.pinDotFilled.should("have.length", 0);
  });

  it("A5 - Settings dropdown should show option to Scramble numberpad and option to stay unlocked", () => {
    createOrImport.buttonCreateAccount.click();
    authNewAccount.validateLoadingHeader();
    authNewAccount.typeOnUsername(username);
    authNewAccount.typeOnStatus(status);
    authNewAccount.buttonNewAccountCreate.click();
    loginPinPage.goToSettings();
    loginPinPage.scrambleKeypadLabel
      .should("exist")
      .and("contain", "Scramble keypad?");
    loginPinPage.stayUnlockedLabel
      .should("exist")
      .and("contain", "Stay unlocked?");
  });

  it("A6, A7 - Scramble Keypad will change the order of pin input buttons", () => {
    createOrImport.buttonCreateAccount.click();
    authNewAccount.validateLoadingHeader();
    authNewAccount.typeOnUsername(username);
    authNewAccount.typeOnStatus(status);
    authNewAccount.buttonNewAccountCreate.click();
    // Scramble keypad is disabled by default
    loginPinPage.pinKeypad.should(
      "have.attr",
      "data-keyorder",
      "1,2,3,4,5,6,7,8,9,0",
    );

    loginPinPage.goToSettings();
    loginPinPage.clickScrambleKeypadSwitch();

    // Validate that the order of the buttons has changed
    loginPinPage.pinKeypad
      .its("data-keyorder")
      .should("not.eq", "1,2,3,4,5,6,7,8,9,0");

    loginPinPage.clickScrambleKeypadSwitch();
    // Scramble keypad is disabled again by the user
    loginPinPage.pinKeypad.should(
      "have.attr",
      "data-keyorder",
      "1,2,3,4,5,6,7,8,9,0",
    );
  });

  it("A8 - If Stay Unlocked is toggled on, user should bypass PIN page when logging in", () => {
    createOrImport.buttonCreateAccount.click();
    authNewAccount.validateLoadingHeader();
    authNewAccount.typeOnUsername(username);
    authNewAccount.typeOnStatus(status);
    authNewAccount.buttonNewAccountCreate.click();
    loginPinPage.goToSettings();
    loginPinPage.clickStayUnlockedSwitch();
    loginPinPage.stayUnlockedCheckbox.should("be.checked");
    loginPinPage.enterPin(pinNumber);
    loginPinPage.pinButtonConfirm.click();
    saveRecoverySeed.validateRecoveryPhraseIsShown();
    saveRecoverySeed.buttonSavedPhrase.click();
    chatsMainPage.addSomeone.should("exist");
    cy.location("href").should("include", "/chat");
    cy.reload();
    cy.location("href").should("include", "/chat");
  });

  // Needs investigation to unskip
  it.skip("A10 - User can see menu to switch to a different profile", () => {
    createOrImport.buttonCreateAccount.click();
    authNewAccount.validateLoadingHeader();
    authNewAccount.typeOnUsername(username);
    authNewAccount.typeOnStatus(status);
    authNewAccount.buttonNewAccountCreate.click();
    loginPinPage.changeUserButton.click();
    loginPinPage.selectProfileModal.should("be.visible");
    loginPinPage.selectProfileLabel.should("have.text", "Profiles");
    loginPinPage.selectProfileUserName.eq(0).should("have.text", "Space Kev");
    loginPinPage.selectProfileUserName.eq(1).should("have.text", "Sara Saturn");
  });

  it.skip("A12 - If incorrect pin is entered, error message should be displayed", () => {
    createOrImport.buttonCreateAccount.click();
    authNewAccount.validateLoadingHeader();
    authNewAccount.typeOnUsername(username);
    authNewAccount.typeOnStatus(status);
    authNewAccount.buttonNewAccountCreate.click();
    loginPinPage.goToSettings();
    loginPinPage.clickStayUnlockedSwitch();
    loginPinPage.enterPin(pinNumber);
    loginPinPage.pinButtonConfirm.click();
    saveRecoverySeed.validateRecoveryPhraseIsShown();
    saveRecoverySeed.buttonSavedPhrase.click();
    cy.url().should("contain", "/chat");
    chatsMainPage.addSomeone.should("exist");
    cy.reload();
    cy.url().should("contain", "/auth");
    loginPinPage.pinKeypad.should("exist");
    loginPinPage.enterPin("9876");
    loginPinPage.pinButtonConfirm.click();
    loginPinPage.toastNotification.should("exist");
    loginPinPage.toastNotificationText.should("have.text", "Pin is wrong!");
  });

  it.skip("A13 - If Stay Unlocked is toggled off, user be redirected to enter PIN when refreshing page", () => {
    createOrImport.buttonCreateAccount.click();
    authNewAccount.validateLoadingHeader();
    authNewAccount.typeOnUsername(username);
    authNewAccount.typeOnStatus(status);
    authNewAccount.buttonNewAccountCreate.click();
    loginPinPage.enterPin(pinNumber);
    loginPinPage.pinButtonConfirm.click();
    saveRecoverySeed.validateRecoveryPhraseIsShown();
    saveRecoverySeed.buttonSavedPhrase.click();
    chatsMainPage.addSomeone.should("exist");
    cy.location("href").should("include", "/chat");
    cy.reload();
    loginPinPage.pinKeypad.should("exist");
  });

  it.skip("A14 - If Stay Unlocked is toggled on, user should be redirected to enter PIN after logging off", () => {
    createOrImport.buttonCreateAccount.click();
    authNewAccount.validateLoadingHeader();
    authNewAccount.typeOnUsername(username);
    authNewAccount.typeOnStatus(status);
    authNewAccount.buttonNewAccountCreate.click();
    loginPinPage.goToSettings();
    loginPinPage.clickStayUnlockedSwitch();
    loginPinPage.enterPin(pinNumber);
    loginPinPage.pinButtonConfirm.click();
    saveRecoverySeed.validateRecoveryPhraseIsShown();
    saveRecoverySeed.buttonSavedPhrase.click();
    chatsMainPage.addSomeone.should("exist");
    cy.location("href").should("include", "/chat");
    chatsMainPage.buttonSettings.click();
    cy.location("href").should("include", "/settings/profile");
    SettingsProfile.logOutSectionButton.click();
    loginPinPage.pinKeypad.should("exist");
  });
});
