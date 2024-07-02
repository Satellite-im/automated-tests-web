import MainPage from "./MainPage";
import { expect, type Locator, type Page } from "@playwright/test";

export class AuthNewAccount extends MainPage {
  readonly page: Page;
  readonly buttonNewAccountGoBack: Locator;
  readonly buttonNewAccountCreate: Locator;
  readonly titleNewAccount: Locator;
  readonly textNewAccountSecondary: Locator;
  readonly profilePictureNewAccount: Locator;
  readonly labelNewAccountUsername: Locator;
  readonly inputNewAccountUsername: Locator;
  readonly labelNewAccountStatus: Locator;
  readonly inputNewAccountStatus: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.buttonNewAccountGoBack = page.getByTestId(
      "button-new-account-go-back",
    );
    this.buttonNewAccountCreate = page.getByTestId("button-new-account-create");
    this.titleNewAccount = page.getByTestId("title-new-account");
    this.textNewAccountSecondary = page.getByTestId(
      "text-new-account-secondary",
    );
    this.profilePictureNewAccount = page.getByTestId(
      "profile-picture-new-account",
    );
    this.labelNewAccountUsername = page.getByTestId(
      "label-new-account-username",
    );
    this.inputNewAccountUsername = page.getByTestId(
      "input-new-account-username",
    );
    this.labelNewAccountStatus = page.getByTestId("label-new-account-status");
    this.inputNewAccountStatus = page.getByTestId("input-new-account-status");
  }

  async clickOnCreateAccount() {
    await this.buttonNewAccountCreate.click();
    await this.page.waitForURL("/chat");
  }

  async createRandomUser(username: string, status: string) {
    this.validateLoadingHeader();
    this.typeOnUsername(username);
    this.typeOnStatus(status);
    this.buttonNewAccountCreate.click();
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
    await this.page.waitForURL("/auth/new_account");
  }
}
