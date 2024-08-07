import MainPage from "./MainPage";
import { expect, type Locator, type Page } from "@playwright/test";

export class AuthNewAccount extends MainPage {
  readonly page: Page;
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

  constructor(page: Page) {
    super(page);
    this.page = page;

    this.buttonNewAccountCreate = page.getByTestId("button-new-account-create");
    this.buttonNewAccountFileUpload = page.getByTestId("button-file-upload");
    this.buttonNewAccountGoBack = page.getByTestId(
      "button-new-account-go-back",
    );
    this.identiconNewAccount = page.locator(".identicon").locator("img");
    this.inputNewAccountFileUpload = page.locator("input[type=file]");
    this.inputNewAccountStatus = page.getByTestId("input-new-account-status");
    this.inputNewAccountUsername = page.getByTestId(
      "input-new-account-username",
    );
    this.labelNewAccountUsername = page.getByTestId(
      "label-new-account-username",
    );
    this.labelNewAccountStatus = page.getByTestId("label-new-account-status");
    this.profileImageNewAccount = page.getByTestId("profile-image");
    this.profilePictureNewAccount = page.getByTestId(
      "profile-picture-new-account",
    );
    this.titleNewAccount = page.getByTestId("title-new-account");
    this.textNewAccountSecondary = page.getByTestId(
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
