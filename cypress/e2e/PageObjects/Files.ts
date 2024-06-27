import MainPage from "./MainPage";

class FilesPage extends MainPage {
  constructor() {
    super();
  }

  get contextMenuFile() {
    return cy.getByTestAttr("context-menu-file");
  }

  get contextMenuFolder() {
    return cy.getByTestAttr("context-menu-folder");
  }

  get contextOptionDelete() {
    return cy.getByTestAttr("context-menu-option-Delete");
  }

  get contextOptionDownload() {
    return cy.getByTestAttr("context-menu-option-Download");
  }

  get contextOptionRename() {
    return cy.getByTestAttr("context-menu-option-Rename");
  }

  get freeSpaceLabel() {
    return this.statsButton.eq(0).find("label");
  }
  get freeSpaceValue() {
    return this.statsButton.eq(0).find("p");
  }

  get goBackButton() {
    return cy.getByTestAttr("button-folder-back");
  }

  get newFolderButton() {
    return cy.getByTestAttr("button-new-folder");
  }

  get progressButton() {
    return cy.getByTestAttr("progress-button");
  }

  get statsButton() {
    return cy.get("button .stat");
  }

  get totalSpaceLabel() {
    return this.statsButton.eq(0).find("label");
  }
  get totalSpaceValue() {
    return this.statsButton.eq(0).find("p");
  }

  get uploadFileButton() {
    return cy.getByTestAttr("button-upload-file");
  }

  get uploadFileInput() {
    return cy.getByTestAttr("input=upload-files");
  }

  public getFileByName(name: string) {
    return cy.getByTestAttr(`file-${name}`);
  }

  public getFolderByName(name: string) {
    return cy.getByTestAttr(`folder-${name}`);
  }
}

export default new FilesPage();
