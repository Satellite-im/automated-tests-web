import { chatsMainPage } from "./PageObjects/ChatsMain";
import { loginPinPage } from "./PageObjects/LoginPin";
import { preLoadingPage } from "./PageObjects/PreLoading";

describe("Create Account and Login", () => {
  beforeEach(() => {
    loginPinPage.launchApplication();
  });

  it("Create Account and Login - Enter valid PIN redirects to Main Page", () => {
    loginPinPage.launchApplication();
    loginPinPage.waitUntilPageIsLoaded();
    loginPinPage.enterPin("1234");
    loginPinPage.clickConfirm();
    preLoadingPage.validateLoadingHeader();
    preLoadingPage.validateLoadingMessage();
    preLoadingPage.validateURL();
    chatsMainPage.validateAddSomeoneIsShown();
    chatsMainPage.validateURL();
  });

  it("Create Account and Login - Pin should have at least 4 digits", () => {
    loginPinPage.launchApplication();
    loginPinPage.waitUntilPageIsLoaded();
    loginPinPage.enterPin("123");
    loginPinPage.validateConfirmButtonIsDisabled();
  });

  it("Create Account and Login - Pin cannot have more than 8 digits", () => {
    loginPinPage.launchApplication();
    loginPinPage.waitUntilPageIsLoaded();
    loginPinPage.enterPin("12345678901234");
    loginPinPage.pinDotFilled.should("have.length", 8);
  });

  it("Create Account and Login - Clicking red reset button should erase any inputs made", () => {
    loginPinPage.launchApplication();
    loginPinPage.waitUntilPageIsLoaded();
    loginPinPage.enterPin("12345678");
    loginPinPage.clickClearPin();
    loginPinPage.pinDotFilled.should("have.length", 0);
  });

  it("Enter Pin Screen - Scramble Keypad", () => {
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
});
