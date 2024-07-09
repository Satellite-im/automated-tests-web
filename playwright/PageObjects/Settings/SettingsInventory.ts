import { SettingsBase } from "./SettingsBase";
import { type Locator, type Page } from "@playwright/test";

export class SettingsInventory extends SettingsBase {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
  }
}
