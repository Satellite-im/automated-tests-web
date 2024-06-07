class LoginPinPage {
  get changeUserButton() {
    return cy.getByTestAttr("button-change-user");
  }

  get clearInputButton() {
    return cy.getByTestAttr("button-clear-input");
  }

  get createNewProfileButton() {
    return cy.getByTestAttr("button-create-new-profile");
  }

  get labelChooseEnterPin() {
    return cy.getByTestAttr("label-choose-enter-pin");
  }

  get pinButton0() {
    return cy.getByTestAttr("button-pin-0");
  }

  get pinButton1() {
    return cy.getByTestAttr("button-pin-1");
  }

  get pinButton2() {
    return cy.getByTestAttr("button-pin-2");
  }

  get pinButton3() {
    return cy.getByTestAttr("button-pin-3");
  }

  get pinButton4() {
    return cy.getByTestAttr("button-pin-4");
  }

  get pinButton5() {
    return cy.getByTestAttr("button-pin-5");
  }

  get pinButton6() {
    return cy.getByTestAttr("button-pin-6");
  }

  get pinButton7() {
    return cy.getByTestAttr("button-pin-7");
  }

  get pinButton8() {
    return cy.getByTestAttr("button-pin-8");
  }

  get pinButton9() {
    return cy.getByTestAttr("button-pin-9");
  }

  get pinButtonConfirm() {
    return cy.getByTestAttr("button-confirm-pin");
  }

  get pinDisplay() {
    return cy.getByTestAttr("pin-display");
  }

  get pinDot() {
    return cy.getByTestAttr("pin-dot-filled");
  }

  get pinDotFilled() {
    return cy.getByTestAttr("pin-dot-filled");
  }

  get pinKeypad() {
    return cy.getByTestAttr("pin-keypad", { timeout: 30000 });
  }

  get scrambleKeypadLabel() {
    return cy.getByTestAttr("label-scramble-keypad");
  }

  get scrambleKeypadSwitch() {
    return cy.getByTestAttr("switch-scramble-keypad");
  }

  get selectProfileLabel() {
    return cy.getByTestAttr("label-select-profile");
  }

  get selectProfileUser() {
    return cy.getByTestAttr("select-profile-user");
  }

  get selectProfileUserImage() {
    return cy.getByTestAttr("select-profile-user-image");
  }

  get selectProfileUserName() {
    return cy.getByTestAttr("select-profile-user-name");
  }

  get selectProfileModal() {
    return cy.getByTestAttr("modal-select-profile");
  }

  get stayUnlockedLabel() {
    return cy.getByTestAttr("label-stay-unlocked");
  }

  get stayUnlockedSwitch() {
    return cy.getByTestAttr("switch-stay-unlocked");
  }

  get settingsButton() {
    return cy.getByTestAttr("button-settings");
  }

  public clickScrambleKeypadSwitch() {
    this.scrambleKeypadSwitch.siblings(".slider").click();
  }

  public clickStayUnlockedSwitch() {
    this.stayUnlockedSwitch.siblings(".slider").click();
  }

  public enterPin(pin: string) {
    pin.split("").forEach((digit) => {
      cy.getByTestAttr(`button-pin-${digit}`).click();
    });
  }

  public goToSettings() {
    this.settingsButton.click();
  }

  public launchApplication() {
    cy.visit("/");
  }

  public loginWithPin(pin: string) {
    if (Cypress.browser.name === "chrome") {
      cy.window().then((win) => {
        win.sessionStorage.clear();
        win.indexedDB.databases().then((r) => {
          for (var i = 0; i < r.length; i++)
            win.indexedDB.deleteDatabase(r[i].name);
        });
      });
    }
    cy.clearAllSessionStorage();
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    this.launchApplication();
    this.waitUntilPageIsLoaded();
    this.enterPin(pin);
    this.pinButtonConfirm.click();
  }

  public validateConfirmButtonIsDisabled() {
    this.pinButtonConfirm.should("be.disabled");
  }

  public waitUntilPageIsLoaded() {
    this.pinKeypad.should("exist");
    cy.location("href").should("include", "/auth/unlock");
  }
}

export const loginPinPage: LoginPinPage = new LoginPinPage();
