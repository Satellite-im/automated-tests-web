import MainPage from "./MainPage";
import { expect, type Locator, type Page } from "@playwright/test";

export class AuthNewAccount extends MainPage {
  readonly buttonNewAccountCreate: Locator;
  readonly buttonNewAccountFileUpload: Locator;
  readonly buttonNewAccountGoBack: Locator;
  readonly identiconNewAccount: Locator;
  readonly inputNewAccountFileUpload: Locator;
  readonly inputNewAccountStatus: Locator;
  readonly inputNewAccountUsername: Locator;
  readonly labelNewAccountStatus: Locator;
  readonly labelNewAccountUsername: Locator;
  readonly profileImageNewAccount: Locator;
  readonly profilePictureNewAccount: Locator;
  readonly textNewAccountSecondary: Locator;
  readonly titleNewAccount: Locator;

  constructor(public readonly page: Page) {
    super(page);
    this.buttonNewAccountCreate = this.page.getByTestId(
      "button-new-account-create",
    );
    this.buttonNewAccountFileUpload =
      this.page.getByTestId("button-file-upload");
    this.buttonNewAccountGoBack = this.page.getByTestId(
      "button-new-account-go-back",
    );
    this.identiconNewAccount = this.page.locator(".identicon").locator("img");
    this.inputNewAccountFileUpload = this.page.locator("input[type=file]");
    this.inputNewAccountStatus = this.page
      .getByTestId("input-new-account-status")
      .locator("input");
    this.inputNewAccountUsername = this.page
      .getByTestId("input-new-account-username")
      .locator("input");
    this.labelNewAccountUsername = this.page.getByTestId(
      "label-new-account-username",
    );
    this.labelNewAccountStatus = this.page.getByTestId(
      "label-new-account-status",
    );
    this.profileImageNewAccount = this.page.getByTestId("profile-image");
    this.profilePictureNewAccount = this.page.getByTestId(
      "profile-picture-new-account",
    );
    this.titleNewAccount = this.page.getByTestId("title-new-account");
    this.textNewAccountSecondary = this.page.getByTestId(
      "text-new-account-secondary",
    );
  }

  async clickOnCreateAccount() {
    await this.buttonNewAccountCreate.click();
  }

  async createRandomUser(username: string, status: string) {
    this.validateLoadingHeader();
    this.typeOnUsername(username);
    this.typeOnStatus(status);
    this.buttonNewAccountCreate.click();
  }

  async uploadProfilePicture(file: string) {
    await this.buttonNewAccountFileUpload.click();
    await this.inputNewAccountFileUpload.setInputFiles(file);
  }

  async typeOnStatus(status: string) {
    await this.inputNewAccountStatus.fill(status);
  }

  async typeOnUsername(username: string) {
    await this.inputNewAccountUsername.fill(username);
  }

  async validateLoadingHeader() {
    await expect(this.titleNewAccount).toBeVisible();
    await expect(this.titleNewAccount).toHaveText("Make It Yours");
  }
}
