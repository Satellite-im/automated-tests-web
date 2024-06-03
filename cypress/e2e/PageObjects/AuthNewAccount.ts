import { faker } from "@faker-js/faker";

class AuthNewAccount {
  get buttonNewAccountGoBack() {
    return cy.getByTestAttr("button-new-account-go-back");
  }

  get buttonNewAccountCreate() {
    return cy.getByTestAttr("button-new-account-create");
  }

  get titleNewAccount() {
    return cy.getByTestAttr("title-new-account", { timeout: 60000 });
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

  async createRandomUser() {
    const username: string = faker.internet.userName();
    const status = faker.lorem.sentence(3);
    this.validateLoadingHeader();
    this.typeOnUsername(username);
    this.typeOnStatus(status);
    this.buttonNewAccountCreate.click();
    return username;
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

export const authNewAccount: AuthNewAccount = new AuthNewAccount();
