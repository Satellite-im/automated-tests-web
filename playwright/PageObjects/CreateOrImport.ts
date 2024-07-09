import MainPage from "./MainPage";
import { type Locator, type Page } from "@playwright/test";

export class CreateOrImportPage extends MainPage {
  readonly page: Page;
  readonly buttonCreateAccount: Locator;
  readonly buttonImportAccount: Locator;
  readonly labelCreateTitle: Locator;
  readonly textCreateDescription: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.buttonCreateAccount = page.getByTestId("button-create-account");
    this.buttonImportAccount = page.getByTestId("button-import-account");
    this.labelCreateTitle = page.getByTestId("label-create-title");
    this.textCreateDescription = page.getByTestId("text-create-description");
  }

  async clickCreateNewAccount() {
    await this.buttonCreateAccount.click();
  }

  async navigateTo() {
    await this.page.goto("/");
  }
}
