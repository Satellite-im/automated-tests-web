import { chatsMainPage } from "./PageObjects/ChatsMain";
import { loginPinPage } from "./PageObjects/LoginPin";
import { preLoadingPage } from "./PageObjects/PreLoading";

describe("Pin Screen", () => {
  beforeEach(() => {
    loginPinPage.launchApplication();
  });

  it("Enter Pin Screen - Enter valid PIN", () => {
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

  it("Enter Pin Screen - Enter PIN with 3 digits", () => {
    loginPinPage.launchApplication();
    loginPinPage.waitUntilPageIsLoaded();
    loginPinPage.enterPin("123");
    loginPinPage.validateConfirmButtonIsDisabled();
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
