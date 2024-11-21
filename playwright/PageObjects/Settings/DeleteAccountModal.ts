import MainPage from "../MainPage";
import { expect, type Locator, type Page } from "@playwright/test";

export class DeleteAccountModal extends MainPage {
  readonly buttonClearInput: Locator;
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
  readonly textDeleteAccount: Locator;
  readonly textEnterYourPin: Locator;

  constructor(
    public readonly page: Page,
    public readonly viewport: string,
  ) {
    super(page, viewport);
    this.buttonClearInput = this.page.getByTestId("button-clear-input");
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
    this.textDeleteAccount = this.page.getByTestId(
      "text-delete-account-pin-first-message",
    );
    this.textEnterYourPin = this.page.getByText("Enter your pin to confirm");
  }

  async clickConfirmButton() {
    await this.pinButtonConfirm.click();
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

  async navigateTo() {
    await this.page.goto("/");
  }

  async validateConfirmButtonIsDisabled() {
    await expect(this.pinButtonConfirm).toBeDisabled();
  }
  async validateToastPinIsWrong() {
    await this.toastNotificationText.waitFor({ state: "attached" });
    await expect(this.toastNotificationText).toHaveText(
      "Incorrect PIN. Please try again to delete your account.",
    );
  }

  async waitUntilPageIsLoaded() {
    await expect(this.pinKeypad).toBeVisible();
  }
}
