import MainPage from "./MainPage";

class AuthNewAccount extends MainPage {
  constructor() {
    super();
  }

  get buttonNewAccountGoBack() {
    return cy.getByTestAttr("button-new-account-go-back");
  }

  get buttonNewAccountCreate() {
    return cy.getByTestAttr("button-new-account-create");
  }

  get titleNewAccount() {
    return cy.getByTestAttr("title-new-account", { timeout: 120000 });
  }

  get textNewAccountSecondary() {
    return cy.getByTestAttr("text-new-account-secondary");
  }

  get profilePictureNewAccount() {
    return cy.getByTestAttr("profile-picture-new-account");
  }

  get labelNewAccountUsername() {
    return cy.getByTestAttr("label-new-account-username");
  }

  get inputNewAccountUsername() {
    return cy.getByTestAttr("input-new-account-username");
  }

  get labelNewAccountStatus() {
    return cy.getByTestAttr("label-new-account-status");
  }

  get inputNewAccountStatus() {
    return cy.getByTestAttr("input-new-account-status");
  }

  async createRandomUser(username: string, status: string) {
    this.validateLoadingHeader();
    this.typeOnUsername(username);
    this.typeOnStatus(status);
    this.buttonNewAccountCreate.click();
  }

  async typeOnStatus(status: string) {
    this.inputNewAccountStatus.clear().type(status);
  }

  async typeOnUsername(username: string) {
    this.inputNewAccountUsername.clear().type(username);
  }

  async validateLoadingHeader() {
    this.titleNewAccount.should("exist").and("have.text", "Make It Yours");
  }
}

export default new AuthNewAccount();
