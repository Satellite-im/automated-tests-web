import { SettingsBase } from "./SettingsBase";
import { type Locator, type Page } from "@playwright/test";

export class SettingsRealms extends SettingsBase {
  readonly labelSettingsRealms: Locator;
  readonly textSettingsRealmsDescriptionOne: Locator;
  readonly textSettingsRealmsDescriptionTwo: Locator;

  constructor(public readonly page: Page) {
    super(page);
    this.labelSettingsRealms = this.page.getByTestId("label-settings-realms");
    this.textSettingsRealmsDescriptionOne = this.page.getByTestId(
      "text-settings-realms-description-1",
    );
    this.textSettingsRealmsDescriptionTwo = this.page.getByTestId(
      "text-settings-realms-description-2",
    );
  }
}
