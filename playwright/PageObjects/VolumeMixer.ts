import MainPage from "./MainPage";
import { expect, type Locator, type Page } from "@playwright/test";

export class VolumeMixer extends MainPage {
  constructor(public readonly page: Page) {
    super(page);
  }
}
