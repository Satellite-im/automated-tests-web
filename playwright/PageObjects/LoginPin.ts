import MainPage from "./MainPage";
import { expect, type Locator, type Page } from "@playwright/test";

export class LoginPinPage extends MainPage {
  readonly page: Page;
  readonly buttonChangeUser: Locator;
  readonly buttonClearInput: Locator;
  readonly buttonCreateNewProfile: Locator;
  readonly buttonPinSettings: Locator;
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
  readonly scrambleKeypadCheckbox: Locator;
  readonly scrambleKeypadLabel: Locator;
  readonly scrambleKeypadSwitch: Locator;
  readonly selectProfileLabel: Locator;
  readonly selectProfileUser: Locator;
  readonly selectProfileUserImage: Locator;
  readonly selectProfileUserName: Locator;
  readonly selectProfileModal: Locator;
  readonly stayUnlockedCheckbox: Locator;
  readonly stayUnlockedLabel: Locator;
  readonly stayUnlockedSwitch: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.buttonChangeUser = page.getByTestId("button-change-user");
    this.buttonClearInput = page.getByTestId("button-clear-input");
    this.buttonCreateNewProfile = page.getByTestId("button-create-new-profile");
    this.buttonPinSettings = page.getByTestId("button-settings");
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
    this.scrambleKeypadCheckbox = page.locator(".slider").first();
    this.scrambleKeypadLabel = page.getByTestId("label-scramble-keypad");
    this.scrambleKeypadSwitch = page.getByTestId("switch-scramble-keypad");
    this.selectProfileLabel = page.getByTestId("label-select-profile");
    this.selectProfileUser = page.getByTestId("select-profile-user");
    this.selectProfileUserImage = page.getByTestId("select-profile-user-image");
    this.selectProfileUserName = page.getByTestId("select-profile-user-name");
    this.selectProfileModal = page.getByTestId("modal-select-profile");
    this.stayUnlockedCheckbox = page.locator(".slider").last();
    this.stayUnlockedLabel = page.getByTestId("label-stay-unlocked");
    this.stayUnlockedSwitch = page.getByTestId("switch-stay-unlocked");
  }

  async clickConfirmButton() {
    await this.pinButtonConfirm.click();
  }

  async clickScrambleKeypadSwitch() {
    await this.scrambleKeypadCheckbox.click();
  }

  async clickStayUnlockedSwitch() {
    await this.stayUnlockedCheckbox.click();
  }

  async enterPin(pin: string) {
    for (const digit of pin.split("")) {
      await this.page.locator(`[data-cy='button-pin-${digit}']`).click();
    }
  }

  async goToPinSettings() {
    await this.buttonPinSettings.click();
  }

  async navigateTo() {
    await this.page.goto("/");
  }

  async validateConfirmButtonIsDisabled() {
    await expect(this.pinButtonConfirm).toBeDisabled();
  }

  async waitUntilPageIsLoaded() {
    await expect(this.pinKeypad).toBeVisible();
  }
}
