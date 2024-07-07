import MainPage from "./MainPage";

class SaveRecoverySeedPage extends MainPage {
  constructor() {
    super();
  }

  get buttonDownloadPhrase() {
    return cy.getByTestAttr("button-download-phrase");
  }

  get buttonSavedPhrase() {
    return cy.getByTestAttr("button-save-phrase");
  }

  get textRecoveryPageWarning() {
    return cy.getByTestAttr("text-recovery-page-warning");
  }

  get titleRecoveryPage() {
    return cy.getByTestAttr("title-recovery-page");
  }

  public clickOnSavedIt() {
    this.validateRecoveryPhraseIsShown();
    this.buttonSavedPhrase.click();
  }

  public getRecoveryPhrase() {
    let phrase = [];
    for (let i = 1; i <= 12; i++) {
      cy.getByTestAttr(`ordered-phrase-number-${i}`).should("exist");
      cy.getByTestAttr(`ordered-phrase-word-${i}`).should("exist");
      cy.getByTestAttr(`ordered-phrase-word-${i}`)
        .find("p")
        .invoke("text")
        .then((text) => {
          phrase.push(text);
        });
    }
    return phrase;
  }

  public validateRecoveryPhraseIsShown() {
    for (let i = 1; i <= 12; i++) {
      cy.getByTestAttr(`ordered-phrase-number-${i}`).should("exist");
      cy.getByTestAttr(`ordered-phrase-word-${i}`).should("exist");
    }
  }
}

export default new SaveRecoverySeedPage();
