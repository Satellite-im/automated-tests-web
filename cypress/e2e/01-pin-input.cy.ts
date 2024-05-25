import { chatsMainPage } from "./PageObjects/ChatsMain";
import { loginPinPage } from "./PageObjects/LoginPin";
import { preLoadingPage } from "./PageObjects/PreLoading";

describe("Create Account and Login Tests", () => {
  beforeEach(() => {
    loginPinPage.launchApplication();
  });

  it("Enter valid PIN redirects to Main Page", () => {
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

  it("Pin should have at least 4 digits", () => {
    loginPinPage.launchApplication();
    loginPinPage.waitUntilPageIsLoaded();
    loginPinPage.enterPin("123");
    loginPinPage.validateConfirmButtonIsDisabled();
  });

  it("Pin cannot have more than 8 digits", () => {
    loginPinPage.launchApplication();
    loginPinPage.waitUntilPageIsLoaded();
    loginPinPage.enterPin("12345678901234");
    loginPinPage.pinDotFilled.should("have.length", 8);
  });

  it("Clicking red reset button should erase any inputs made", () => {
    loginPinPage.launchApplication();
    loginPinPage.waitUntilPageIsLoaded();
    loginPinPage.enterPin("12345678");
    loginPinPage.clickClearPin();
    loginPinPage.pinDotFilled.should("have.length", 0);
  });

  it("Settings dropdown should show option to Scramble numberpad and option to stay unlocked", () => {
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

  it("Scramble Keypad will change the order of pin input buttons", () => {
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
