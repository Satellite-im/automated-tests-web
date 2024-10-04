import MainPage from "./MainPage";
import { type Locator, type Page } from "@playwright/test";

export class CreateOrImportPage extends MainPage {
  readonly buttonCreateAccount: Locator;
  readonly labelCreateTitle: Locator;
  readonly textCreateDescription: Locator;

  constructor(
    public readonly page: Page,
    public readonly viewport: string,
  ) {
    super(page, viewport);
    this.buttonCreateAccount = this.page.getByTestId("button-create-account");
    this.labelCreateTitle = this.page.getByTestId("label-create-title");
    this.textCreateDescription = this.page.getByTestId(
      "text-create-description",
    );
  }

  async clickCreateNewAccount() {
    await this.buttonCreateAccount.click();
  }

  async navigateTo() {
    await this.page.goto("/");
  }
}
