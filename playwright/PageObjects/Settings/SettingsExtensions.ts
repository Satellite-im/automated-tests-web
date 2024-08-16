import { SettingsBase } from "./SettingsBase";
import { type Locator, type Page } from "@playwright/test";

export class SettingsExtensions extends SettingsBase {
  readonly exploreButton: Locator;
  readonly installedButton: Locator;
  readonly noExtensionsInstalledLabel: Locator;
  readonly settingsButton: Locator;
  readonly underConstructionIndicator: Locator;

  constructor(public readonly page: Page) {
    super(page);
    this.exploreButton = this.page.getByTestId("button-explore");
    this.installedButton = this.page.getByTestId("button-installed");
    this.noExtensionsInstalledLabel = this.page.getByTestId(
      "label-no-extensions-installed",
    );
    this.settingsButton = this.page.getByTestId("button-settings");
    this.underConstructionIndicator =
      this.page.getByTestId("under-construction");
  }
}
