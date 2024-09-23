import MainPage from "../MainPage";
import { type Locator, type Page } from "@playwright/test";

export class GifPicker extends MainPage {
  readonly combinedSelector: Locator;

  constructor(public readonly page: Page) {
    super(page);
    this.combinedSelector = this.page.getByTestId("combined-selector");
  }
}
