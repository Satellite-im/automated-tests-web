export default class MainPage {
  constructor() {}

  get buttonChat() {
    return cy.getByTestAttr("button-Chat");
  }

  get buttonFiles() {
    return cy.getByTestAttr("button-Files");
  }

  get buttonFriends() {
    return cy.getByTestAttr("button-Friends");
  }

  get buttonHideSidebar() {
    return cy.getByTestAttr("button-hide-sidebar");
  }

  get buttonSettings() {
    return cy.getByTestAttr("button-Settings");
  }

  get buttonShowSidebar() {
    return cy.getByTestAttr("button-show-sidebar");
  }

  get buttonWallet() {
    return cy.getByTestAttr("button-Wallet");
  }

  get inputSidebarSearch() {
    return cy.getByTestAttr("input-sidebar-search");
  }

  get navigationBar() {
    return cy.get(".navigation");
  }

  get sidebar() {
    return cy.getByTestAttr("sidebar");
  }

  get slimbar() {
    return cy.getByTestAttr("slimbar");
  }

  get toastNotification() {
    return cy.getByTestAttr("toast-notification");
  }

  get toastNotificationButton() {
    return cy.getByTestAttr("toast-notification-button");
  }

  get toastNotificationText() {
    return cy.getByTestAttr("toast-notification-text");
  }

  public ensureSidebarIsDisplayed() {
    this.navigationBar.then(($navBar) => {
      if ($navBar.hasClass("vertical")) {
        this.buttonShowSidebar.click();
        this.sidebar.should("be.visible");
      } else {
        this.sidebar.should("be.visible");
      }
    });
  }

  public goToChat() {
    this.buttonChat.click();
  }

  public goToFiles() {
    this.buttonFiles.click();
  }

  public goToFriends() {
    this.buttonFriends.click();
  }

  public goToSettings() {
    this.buttonSettings.click();
  }

  public goToWallet() {
    this.buttonWallet.click();
  }
}
