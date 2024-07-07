import MainPage from "./MainPage";

class CreateOrImportPage extends MainPage {
  constructor() {
    super();
  }

  get buttonCreateAccount() {
    return cy.getByTestAttr("button-create-account");
  }

  get buttonImportAccount() {
    return cy.getByTestAttr("button-import-account");
  }

  get labelCreateTitle() {
    return cy.getByTestAttr("label-create-title");
  }

  get textCreateDescription() {
    return cy.getByTestAttr("text-create-description");
  }

  public launchCleanApplication() {
    if (Cypress.browser.name === "chrome") {
      cy.window().then((win) => {
        win.sessionStorage.clear();
        win.indexedDB.databases().then((r) => {
          for (var i = 0; i < r.length; i++)
            win.indexedDB.deleteDatabase(r[i].name);
        });
      });
    }
    cy.clearAllSessionStorage();
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    this.launchApplication();
  }

  public clickCreateNewAccount() {
    this.buttonCreateAccount.click();
  }
}

export default new CreateOrImportPage();
