import MainPage from "./MainPage";

class ChatsMainPage extends MainPage {
  constructor() {
    super();
  }

  get addSomeone() {
    return cy.get(".add-someone", { timeout: 30000 });
  }

  get buttonAddFriends() {
    return cy.getByTestAttr("button-add-friends");
  }

  get buttonCreateGroupChat() {
    return cy.getByTestAttr("button-create-group-chat");
  }

  get buttonMarketplace() {
    return cy.getByTestAttr("button-marketplace");
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

  get sectionAddSomeone() {
    return cy.getByTestAttr("section-add-someone");
  }

  get topbar() {
    return cy.getByTestAttr("topbar");
  }

  public exitCreateGroup() {
    this.topbar.click();
  }

  public validateChatsMainPageIsShown() {
    this.addSomeone.should("exist");
    cy.location("href").should("include", "/chat");
  }
}

export default new ChatsMainPage();
