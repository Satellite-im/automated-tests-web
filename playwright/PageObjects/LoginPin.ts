import MainPage from "./MainPage";
import { expect, type Locator, type Page } from "@playwright/test";

export class LoginPinPage extends MainPage {
  readonly page: Page;
  readonly buttonChangeUser: Locator;
  readonly buttonClearInput: Locator;
  readonly buttonCreateNewProfile: Locator;
  readonly labelChooseEnterPin: Locator;
  readonly pinButton0: Locator;
  readonly pinButton1: Locator;
  readonly pinButton2: Locator;
  readonly pinButton3: Locator;
  readonly pinButton4: Locator;
  readonly pinButton5: Locator;
  readonly pinButton6: Locator;
  readonly pinButton7: Locator;
  readonly pinButton8: Locator;
  readonly pinButton9: Locator;
  readonly pinButtonConfirm: Locator;
  readonly pinDisplay: Locator;
  readonly pinDot: Locator;
  readonly pinDotFilled: Locator;
  readonly pinKeypad: Locator;
  readonly scrambleKeypadLabel: Locator;
  readonly scrambleKeypadSwitch: Locator;
  readonly selectProfileLabel: Locator;
  readonly selectProfileUser: Locator;
  readonly selectProfileUserImage: Locator;
  readonly selectProfileUserName: Locator;
  readonly selectProfileModal: Locator;
  readonly stayUnlockedLabel: Locator;
  readonly stayUnlockedSwitch: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.buttonChangeUser = page.getByTestId("button-change-user");
    this.buttonClearInput = page.getByTestId("button-clear-input");
    this.buttonCreateNewProfile = page.getByTestId("button-create-new-profile");
    this.labelChooseEnterPin = page.getByTestId("label-choose-enter-pin");
    this.pinButton0 = page.getByTestId("button-pin-0");
    this.pinButton1 = page.getByTestId("button-pin-1");
    this.pinButton2 = page.getByTestId("button-pin-2");
    this.pinButton3 = page.getByTestId("button-pin-3");
    this.pinButton4 = page.getByTestId("button-pin-4");
    this.pinButton5 = page.getByTestId("button-pin-5");
    this.pinButton6 = page.getByTestId("button-pin-6");
    this.pinButton7 = page.getByTestId("button-pin-7");
    this.pinButton8 = page.getByTestId("button-pin-8");
    this.pinButton9 = page.getByTestId("button-pin-9");
    this.pinButtonConfirm = page.getByTestId("button-confirm-pin");
    this.pinDisplay = page.getByTestId("pin-display");
    this.pinDot = page.getByTestId("pin-dot");
    this.pinDotFilled = page.getByTestId("pin-dot-filled");
    this.pinKeypad = page.getByTestId("pin-keypad");
    this.scrambleKeypadLabel = page.getByTestId("label-scramble-keypad");
    this.scrambleKeypadSwitch = page.getByTestId("switch-scramble-keypad");
    this.selectProfileLabel = page.getByTestId("label-select-profile");
    this.selectProfileUser = page.getByTestId("select-profile-user");
    this.selectProfileUserImage = page.getByTestId("select-profile-user-image");
    this.selectProfileUserName = page.getByTestId("select-profile-user-name");
    this.selectProfileModal = page.getByTestId("modal-select-profile");
    this.stayUnlockedLabel = page.getByTestId("label-stay-unlocked");
    this.stayUnlockedSwitch = page.getByTestId("switch-stay-unlocked");
  }

  async clickConfirmButton() {
    await this.pinButtonConfirm.click();
  }

  async clickScrambleKeypadSwitch() {
    const sibling = await this.findSiblingWithClass(
      this.page,
      "[data-cy='switch-scramble-keypad]'",
      ".slider",
    );
    await sibling.click();
  }

  async clickStayUnlockedSwitch() {
    const sibling = await this.findSiblingWithClass(
      this.page,
      "[data-cy='switch-stay-unlocked]'",
      ".slider",
    );
    await sibling.click();
  }

  async enterPin(pin: string) {
    pin.split("").forEach((digit) => {
      this.page.locator(`[data-cy='button-pin-${digit}']`).click();
    });
  }

  async launchApplication() {
    await this.page.goto("http://localhost:5173/");
  }

  async loginWithPin(page: Page, pin: string) {
    const context = page.context();

    // Clear session storage and indexedDB if using Chromium browser
    if (context.browser().browserType().name() === "chrome") {
      await page.evaluate(() => {
        window.sessionStorage.clear();
        window.indexedDB.databases().then((databases) => {
          databases.forEach((db) => {
            window.indexedDB.deleteDatabase(db.name);
          });
        });
      });
    }

    // Clear cookies, local storage, and session storage
    await context.clearCookies();
    await context.clearPermissions();
    await page.evaluate(() => {
      window.localStorage.clear();
      window.sessionStorage.clear();
    });

    // Launch application and perform login actions
    await this.launchApplication();
    await this.waitUntilPageIsLoaded();
    await this.enterPin(pin);
    await this.pinButtonConfirm.click();
  }

  async validateConfirmButtonIsDisabled() {
    await expect(this.pinButtonConfirm).toBeDisabled;
  }

  async waitUntilPageIsLoaded() {
    await expect(this.pinKeypad).toBeVisible();
    await expect(this.page.url()).toContain("/auth/unlock");
  }
}
