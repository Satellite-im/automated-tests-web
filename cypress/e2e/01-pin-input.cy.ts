import { chatsMainPage } from "./PageObjects/ChatsMain";
import { loginPinPage } from "./PageObjects/LoginPin";
import { preLoadingPage } from "./PageObjects/PreLoading";

describe("Pin Screen", () => {
  beforeEach(() => {
    loginPinPage.launchApplication();
  });

  it("Enter Pin Screen - Enter valid PIN", () => {
    loginPinPage.waitUntilPageIsLoaded();
    loginPinPage.enterPin("1234");
    loginPinPage.clickConfirm();
    preLoadingPage.validateURL();
    chatsMainPage.validateURL();
  });

  it("Enter Pin Screen - Enter PIN with 3 digits", () => {
    loginPinPage.waitUntilPageIsLoaded();
    loginPinPage.enterPin("123");
    loginPinPage.validateConfirmButtonIsDisabled();
  });
});
