import { SettingsBase } from "./SettingsBase";
import { type Locator, type Page } from "@playwright/test";

export class SettingsExtensions extends SettingsBase {
  readonly page: Page;
  readonly exploreButton: Locator;
  readonly installedButton: Locator;
  readonly noExtensionsInstalledLabel: Locator;
  readonly settingsButton: Locator;
  readonly underConstructionIndicator: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.exploreButton = page.getByTestId("button-explore");
    this.installedButton = page.getByTestId("button-installed");
    this.noExtensionsInstalledLabel = page.getByTestId(
      "label-no-extensions-installed",
    );
    this.settingsButton = page.getByTestId("button-settings");
    this.underConstructionIndicator = page.getByTestId("under-construction");
  }
}
