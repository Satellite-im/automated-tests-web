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

  get buttonHideSidebar() {
    return cy.getByTestAttr("button-hide-sidebar");
  }

  get buttonMarketplace() {
    return cy.getByTestAttr("button-marketplace");
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

  get createGroupButton() {
    return cy.getByTestAttr("button-create-group");
  }

  get createGroupModal() {
    return cy.getByTestAttr("modal-create-group-chat");
  }

  get createGroupInputGroupName() {
    return cy.getByTestAttr("input-create-group-name");
  }

  get createGroupLabelGroupMembers() {
    return cy.getByTestAttr("label-create-group-members");
  }

  get createGroupLabelGroupName() {
    return cy.getByTestAttr("label-create-group-name");
  }

  get createGroupLabelSelectMembers() {
    return cy.getByTestAttr("label-create-group-select-members");
  }

  get inputSidebarSearch() {
    return cy.getByTestAttr("input-sidebar-search");
  }

  get sectionAddSomeone() {
    return cy.getByTestAttr("section-add-someone");
  }

  get sidebar() {
    return cy.getByTestAttr("sidebar");
  }

  get slimbar() {
    return cy.getByTestAttr("slimbar");
  }

  get topbar() {
    return cy.getByTestAttr("topbar");
  }

  public exitCreateGroup() {
    this.topbar.click();
  }

  public ensureSidebarIsDisplayed() {
    if (!this.sidebar) {
      this.buttonShowSidebar.click();
      this.sidebar.should("be.visible");
    } else {
      this.sidebar.should("be.visible");
    }
  }

  public validateChatsMainPageIsShown() {
    this.addSomeone.should("exist");
    cy.location("href").should("include", "/chat");
  }
}

export const chatsMainPage: ChatsMainPage = new ChatsMainPage();
