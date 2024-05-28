class ChatsMainPage {
  get addSomeone() {
    return cy.get(".add-someone", { timeout: 30000 });
  }

  get buttonAddFriends() {
    return cy.getByTestAttr("button-add-friends");
  }

  get buttonChat() {
    return cy.getByTestAttr("button-Chat");
  }

  get buttonCreateGroupChat() {
    return cy.getByTestAttr("button-create-group-chat");
  }

  get buttonFiles() {
    return cy.getByTestAttr("button-Files");
  }

  get buttonFriends() {
    return cy.getByTestAttr("button-Friends");
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

  get sectionAddSomeone() {
    return cy.getByTestAttr("section-add-someone");
  }

  get slimbar() {
    return cy.getByTestAttr("slimbar");
  }

  get topbar() {
    return cy.getByTestAttr("topbar");
  }

  public clickAddFriends() {
    this.buttonAddFriends.click();
  }

  public clickChat() {
    this.buttonChat.click();
  }

  public clickCreateGroupChat() {
    this.buttonCreateGroupChat.click();
  }

  public clickFiles() {
    this.buttonFiles.click();
  }

  public clickFriends() {
    this.buttonFriends.click();
  }

  public clickSettings() {
    this.buttonSettings.click();
  }

  public clickShowSidebar() {
    this.buttonShowSidebar.click();
  }

  public clickWallet() {
    this.buttonWallet.click();
  }

  public hoverChatsButton() {
    this.buttonChat.realHover();
  }

  public hoverCreateGroupChatButton() {
    this.buttonCreateGroupChat.realHover();
  }

  public hoverFilesButton() {
    this.buttonFiles.realHover();
  }

  public hoverFriendsButton() {
    this.buttonFriends.realHover();
  }

  public hoverSettingsButton() {
    this.buttonSettings.realHover();
  }

  public hoverWalletButton() {
    this.buttonWallet.realHover();
  }

  public validateAddSomeoneIsShown() {
    this.addSomeone.should("exist");
  }

  public validateChatsMainPageIsShown() {
    this.validateAddSomeoneIsShown();
    this.validateURL();
  }

  public validateURL() {
    cy.location("href").should("include", "/chat");
  }
}

export const chatsMainPage: ChatsMainPage = new ChatsMainPage();
