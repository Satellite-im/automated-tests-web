import { SettingsBase } from "./SettingsBase";
import { type Locator, type Page } from "@playwright/test";

export class SettingsRealms extends SettingsBase {
  readonly page: Page;
  readonly labelSettingsRealms: Locator;
  readonly textSettingsRealmsDescriptionOne: Locator;
  readonly textSettingsRealmsDescriptionTwo: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.labelSettingsRealms = page.getByTestId("label-settings-realms");
    this.textSettingsRealmsDescriptionOne = page.getByTestId(
      "text-settings-realms-description-1",
    );
    this.textSettingsRealmsDescriptionTwo = page.getByTestId(
      "text-settings-realms-description-2",
    );
  }
}
