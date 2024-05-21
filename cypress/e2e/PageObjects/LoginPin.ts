class LoginPinPage {
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

  get pinKeypad() {
    return cy.getByTestAttr("pin-keypad", { timeout: 30000 });
  }

  get scrambleKeypadLabel() {
    return cy.getByTestAttr("label-scramble-keypad");
  }

  get scrambleKeypadSwitch() {
    return cy.getByTestAttr("switch-scramble-keypad");
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

  public clickConfirm() {
    this.pinButtonConfirm.click();
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

  public validateConfirmButtonIsDisabled() {
    this.pinButtonConfirm.should("be.disabled");
  }

  public waitUntilPageIsLoaded() {
    this.pinKeypad.should("exist");
    cy.location("href").should("include", "/auth/unlock");
  }
}

export const loginPinPage: LoginPinPage = new LoginPinPage();
