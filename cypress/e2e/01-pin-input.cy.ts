import { authNewAccount } from "./PageObjects/AuthNewAccount";
import { chatsMainPage } from "./PageObjects/ChatsMain";
import { loginPinPage } from "./PageObjects/LoginPin";
import { faker } from "@faker-js/faker";

describe("Create Account and Login Tests", () => {
  beforeEach(() => {
    loginPinPage.launchApplication();
  });

  it("A1, A9, A11 - Enter valid PIN redirects to Main Page", () => {
    const username = faker.internet.userName();
    const status = faker.lorem.sentence(3);

    loginPinPage.launchApplication();
    loginPinPage.waitUntilPageIsLoaded();
    loginPinPage.enterPin("1234");
    loginPinPage.pinButtonConfirm.click();
    authNewAccount.validateLoadingHeader();
    cy.location("href").should("include", "/auth/new_account");
    authNewAccount.textNewAccountSecondary.should(
      "have.text",
      "Let's setup your new account. Please choose a username below.",
    );
    authNewAccount.labelNewAccountUsername.should("have.text", "Username");
    authNewAccount.labelNewAccountStatus.should("have.text", "Status Message");
    authNewAccount.profilePictureNewAccount.should("be.visible");
    authNewAccount.buttonNewAccountGoBack.should("be.visible");
    authNewAccount.buttonNewAccountCreate.should("be.visible");
    authNewAccount.typeOnUsername(username);
    authNewAccount.typeOnStatus(status);
    authNewAccount.buttonNewAccountCreate.click();
    chatsMainPage.addSomeone.should("exist");
    cy.location("href").should("include", "/chat");
  });

  it("A2 - Pin should have at least 4 digits", () => {
    loginPinPage.launchApplication();
    loginPinPage.waitUntilPageIsLoaded();
    loginPinPage.enterPin("123");
    loginPinPage.validateConfirmButtonIsDisabled();
  });

  it("A3 - Pin cannot have more than 8 digits", () => {
    loginPinPage.launchApplication();
    loginPinPage.waitUntilPageIsLoaded();
    loginPinPage.enterPin("12345678901234");
    loginPinPage.pinDotFilled.should("have.length", 8);
  });

  it("A4 - Clicking red reset button should erase any inputs made", () => {
    loginPinPage.launchApplication();
    loginPinPage.waitUntilPageIsLoaded();
    loginPinPage.enterPin("12345678");
    loginPinPage.clearInputButton.click();
    loginPinPage.pinDotFilled.should("have.length", 0);
  });

  it("A5 - Settings dropdown should show option to Scramble numberpad and option to stay unlocked", () => {
    loginPinPage.launchApplication();
    loginPinPage.waitUntilPageIsLoaded();
    loginPinPage.goToSettings();
    loginPinPage.scrambleKeypadLabel
      .should("exist")
      .and("contain", "Scramble keypad?");
    loginPinPage.stayUnlockedLabel
      .should("exist")
      .and("contain", "Stay unlocked?");
  });

  it("A6, A7 - Scramble Keypad will change the order of pin input buttons", () => {
    loginPinPage.launchApplication();
    loginPinPage.waitUntilPageIsLoaded();
    loginPinPage.goToSettings();
    loginPinPage.clickScrambleKeypadSwitch();
    loginPinPage.pinKeypad.should(
      "have.attr",
      "data-keyorder",
      "1,2,3,4,5,6,7,8,9,0",
    );

    loginPinPage.clickScrambleKeypadSwitch();
    loginPinPage.pinKeypad
      .its("data-keyorder")
      .should("not.eq", "1,2,3,4,5,6,7,8,9,0");
  });

  // Cannot be automated at this moment
  xit("A8 - If Stay Unlocked is toggled on, user should bypass PIN page when logging in", () => {});

  it("A10 - User can see menu to switch to a different profile", () => {
    loginPinPage.launchApplication();
    loginPinPage.waitUntilPageIsLoaded();
    loginPinPage.changeUserButton.click();
    loginPinPage.selectProfileModal.should("be.visible");
    loginPinPage.selectProfileLabel.should("have.text", "Profiles");
    loginPinPage.selectProfileUserName.eq(0).should("have.text", "Space Kev");
    loginPinPage.selectProfileUserName.eq(1).should("have.text", "Sara Saturn");
  });

  // Cannot be automated at this moment
  xit("A12 - If incorrect pin is entered, error message should be displayed", () => {});
});
