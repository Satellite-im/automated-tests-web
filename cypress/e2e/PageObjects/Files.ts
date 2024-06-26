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

  get createNodeButton() {
    return cy.getByTestAttr("button-create-node");
  }

  get giftSpaceButton() {
    return cy.getByTestAttr("button-gift-space");
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

  get quickActionsLabel() {
    return cy.getByTestAttr("label-quick-actions");
  }

  get rentSpaceButton() {
    return cy.getByTestAttr("button-rent-space");
  }

  get statsButton() {
    return cy.get("button .stat");
  }

  get syncButton() {
    return cy.getByTestAttr("button-sync");
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
