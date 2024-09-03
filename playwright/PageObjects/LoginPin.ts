import MainPage from "./MainPage";
import { expect, type Locator, type Page } from "@playwright/test";

export class LoginPinPage extends MainPage {
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

  constructor(public readonly page: Page) {
    super(page);
    this.buttonChangeUser = this.page.getByTestId("button-change-user");
    this.buttonClearInput = this.page.getByTestId("button-clear-input");
    this.buttonCreateNewProfile = this.page.getByTestId(
      "button-create-new-profile",
    );
    this.buttonPinSettings = this.page.getByTestId("button-settings");
    this.labelChooseEnterPin = this.page.getByTestId("label-choose-enter-pin");
    this.pinButton0 = this.page.getByTestId("button-pin-0");
    this.pinButton1 = this.page.getByTestId("button-pin-1");
    this.pinButton2 = this.page.getByTestId("button-pin-2");
    this.pinButton3 = this.page.getByTestId("button-pin-3");
    this.pinButton4 = this.page.getByTestId("button-pin-4");
    this.pinButton5 = this.page.getByTestId("button-pin-5");
    this.pinButton6 = this.page.getByTestId("button-pin-6");
    this.pinButton7 = this.page.getByTestId("button-pin-7");
    this.pinButton8 = this.page.getByTestId("button-pin-8");
    this.pinButton9 = this.page.getByTestId("button-pin-9");
    this.pinButtonConfirm = this.page.getByTestId("button-confirm-pin");
    this.pinDisplay = this.page.getByTestId("pin-display");
    this.pinDot = this.page.getByTestId("pin-dot");
    this.pinDotFilled = this.page.getByTestId("pin-dot-filled");
    this.pinKeypad = this.page.getByTestId("pin-keypad");
    this.scrambleKeypadCheckbox = this.page.locator(".slider").first();
    this.scrambleKeypadLabel = this.page.getByTestId("label-scramble-keypad");
    this.scrambleKeypadSwitch = this.page.getByTestId("switch-scramble-keypad");
    this.selectProfileLabel = this.page.getByTestId("label-select-profile");
    this.selectProfileUser = this.page.getByTestId("select-profile-user");
    this.selectProfileUserImage = this.page.getByTestId(
      "select-profile-user-image",
    );
    this.selectProfileUserName = this.page.getByTestId(
      "select-profile-user-name",
    );
    this.selectProfileModal = this.page.getByTestId("modal-select-profile");
    this.stayUnlockedCheckbox = this.page.locator(".slider").last();
    this.stayUnlockedLabel = this.page.getByTestId("label-stay-unlocked");
    this.stayUnlockedSwitch = this.page.getByTestId("switch-stay-unlocked");
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
    await this.page.keyboard.type(pin, { delay: 100 });
  }

  async enterDefaultPin() {
    await this.page.keyboard.type("123456", { delay: 100 });
    await this.pinButtonConfirm.click();
  }

  async enterWrongPin() {
    await this.pinButton9.click();
    await this.pinButton8.click();
    await this.pinButton7.click();
    await this.pinButton6.click();
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
  async validateToastPinIsWrong() {
    await this.toastNotificationText.waitFor({ state: "visible" });
    await expect(this.toastNotificationText).toHaveText("Pin is wrong!");
  }

  async waitUntilPageIsLoaded() {
    await expect(this.pinKeypad).toBeVisible();
  }
}
