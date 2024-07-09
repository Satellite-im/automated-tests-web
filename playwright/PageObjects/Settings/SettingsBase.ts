import MainPage from "../MainPage";
import { type Locator, type Page } from "@playwright/test";

export class SettingsBase extends MainPage {
  readonly page: Page;
  readonly buttonAbout: Locator;
  readonly buttonAccessibility: Locator;
  readonly buttonAudioAndVideo: Locator;
  readonly buttonCustomization: Locator;
  readonly buttonDeveloper: Locator;
  readonly buttonExtensions: Locator;
  readonly buttonInventory: Locator;
  readonly buttonKeybinds: Locator;
  readonly buttonLicenses: Locator;
  readonly buttonMessages: Locator;
  readonly buttonNotifications: Locator;
  readonly buttonProfile: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.buttonAbout = page.getByTestId("button-About");
    this.buttonAccessibility = page.getByTestId("button-Accessibility");
    this.buttonAudioAndVideo = page.locator("[data-cy='button-Audio & Video']");
    this.buttonCustomization = page.getByTestId("button-Customization");
    this.buttonDeveloper = page.getByTestId("button-Developer");
    this.buttonExtensions = page.getByTestId("button-Extensions");
    this.buttonInventory = page.getByTestId("button-Inventory");
    this.buttonKeybinds = page.getByTestId("button-Keybinds");
    this.buttonLicenses = page.getByTestId("button-Licenses");
    this.buttonMessages = page.getByTestId("button-Messages");
    this.buttonNotifications = page.getByTestId("button-Notifications");
    this.buttonProfile = page.getByTestId("button-Profile");
  }
}
