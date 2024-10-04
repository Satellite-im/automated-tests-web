import MainPage from "../MainPage";
import { type Locator, type Page } from "@playwright/test";

export class SettingsBase extends MainPage {
  readonly buttonAbout: Locator;
  readonly buttonAccessibility: Locator;
  readonly buttonAudioAndVideo: Locator;
  readonly buttonCustomization: Locator;
  readonly buttonDeveloper: Locator;
  readonly buttonExtensions: Locator;
  readonly buttonGamepad: Locator;
  readonly buttonInventory: Locator;
  readonly buttonKeybinds: Locator;
  readonly buttonLicenses: Locator;
  readonly buttonMessages: Locator;
  readonly buttonNetwork: Locator;
  readonly buttonNotifications: Locator;
  readonly buttonProfile: Locator;
  readonly buttonRealms: Locator;

  constructor(
    public readonly page: Page,
    public readonly viewport: string,
  ) {
    super(page, viewport);
    this.buttonAbout = this.page.getByTestId("button-About");
    this.buttonAccessibility = this.page.getByTestId("button-Accessibility");
    this.buttonAudioAndVideo = this.page.locator(
      "[data-cy='button-Audio & Video']",
    );
    this.buttonCustomization = this.page.getByTestId("button-Customization");
    this.buttonDeveloper = this.page.getByTestId("button-Developer");
    this.buttonExtensions = this.page.getByTestId("button-Extensions");
    this.buttonGamepad = this.page.getByTestId("button-Gamepad");
    this.buttonInventory = this.page.getByTestId("button-Inventory");
    this.buttonKeybinds = this.page.getByTestId("button-Keybinds");
    this.buttonLicenses = this.page.getByTestId("button-Licenses");
    this.buttonMessages = this.page.getByTestId("button-Messages");
    this.buttonNetwork = this.page.getByTestId("button-Network");
    this.buttonNotifications = this.page.getByTestId("button-Notifications");
    this.buttonProfile = this.page.getByTestId("button-Profile");
    this.buttonRealms = this.page.getByTestId("button-Realms");
  }
}
