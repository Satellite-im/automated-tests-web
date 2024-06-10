export default class SettingsBase {
  constructor() {}

  get buttonAbout() {
    return cy.getByTestAttr("button-About");
  }

  get buttonAccessibility() {
    return cy.getByTestAttr("button-Accessibility");
  }

  get buttonAudioAndVideo() {
    return cy.getByTestAttr("button-Audio & Video");
  }

  get buttonCustomization() {
    return cy.getByTestAttr("button-Customization");
  }

  get buttonExtensions() {
    return cy.getByTestAttr("button-Extensions");
  }

  get buttonInventory() {
    return cy.getByTestAttr("button-Inventory");
  }

  get buttonKeybinds() {
    return cy.getByTestAttr("button-Keybinds");
  }

  get buttonLicenses() {
    return cy.getByTestAttr("button-Licenses");
  }

  get buttonMessages() {
    return cy.getByTestAttr("button-Messages");
  }

  get buttonNotifications() {
    return cy.getByTestAttr("button-Notifications");
  }

  get buttonProfile() {
    return cy.getByTestAttr("button-Profile");
  }
}
