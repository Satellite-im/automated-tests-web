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

  get inputFileFolderName() {
    return cy.getByTestAttr("input-file-folder-name");
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
    return cy.get(".stat");
  }

  get totalSpaceLabel() {
    return this.statsButton.eq(1).find("label");
  }
  get totalSpaceValue() {
    return this.statsButton.eq(1).find("p");
  }

  get uploadFileButton() {
    return cy.getByTestAttr("button-upload-file");
  }

  get uploadFileInput() {
    return cy.get('[data-cy="input=upload-files"]');
  }

  public createNewFolder(name: string) {
    this.newFolderButton.click();
    this.inputFileFolderName.type(name + "{Enter}");
  }

  public getFileByName(name: string) {
    return cy.get(`[data-cy='file-${name}']`);
  }

  public getFolderByName(name: string) {
    return cy.get(`[data-cy='folder-${name}']`);
  }

  public navigateToFolder(name: string) {
    this.getFolderByName(name).then(($folder) => {
      cy.wrap($folder).should("exist").dblclick();
    });
  }

  public renameFile(previousName: string, newName: string) {
    this.getFileByName(previousName).then(($file) => {
      cy.wrap($file).rightclick();
      this.contextMenuFile.should("be.visible");
      this.contextOptionRename.click();
      this.inputFileFolderName.type(newName + "{Enter}");
    });
  }

  public renameFolder(previousName: string, newName: string) {
    this.getFolderByName(previousName).then(($folder) => {
      cy.wrap($folder).rightclick();
      this.contextMenuFolder.should("be.visible");
      this.contextOptionRename.click().then(() => {
        this.inputFileFolderName.should("exist").type(newName + "{Enter}");
      });
    });
  }

  public validateNewFolderCreated(
    name: string,
    emptyName: boolean = false,
    folderSize: string = "0 B",
  ) {
    this.getFolderByName(name).then(($folder) => {
      if (emptyName === true) {
        cy.wrap($folder)
          .should("exist")
          .find("[data-cy='file-folder-name']")
          .should("have.text", "undefined");
      } else {
        cy.wrap($folder)
          .should("exist")
          .find("[data-cy='file-folder-name']")
          .should("have.text", name);
      }
      cy.wrap($folder)
        .find("[data-cy='file-folder-size']")
        .should("have.text", folderSize);
      cy.wrap($folder).find(".svg-icon").should("be.visible");
    });
  }

  public validateFilesURL() {
    cy.url().should("include", "/files");
  }

  public validateFreeSpaceInfo(value: string) {
    this.freeSpaceLabel.should("have.text", "Free Space");
    this.freeSpaceValue.should("have.text", value);
  }

  public validateTotalSpaceInfo(value: string) {
    this.totalSpaceLabel.should("have.text", "Total Space");
    this.totalSpaceValue.should("have.text", value);
  }

  public validateRenamedFileInfo(
    oldName: string,
    newName: string,
    extension: string,
    size: string,
  ) {
    this.getFileByName(oldName).then(($file) => {
      cy.wrap($file)
        .should("exist")
        .find("[data-cy='file-folder-name']")
        .should("have.text", newName + "." + extension);
      cy.wrap($file)
        .find("[data-cy='file-folder-size']")
        .should("have.text", size);
      cy.wrap($file).find(".svg-icon").should("be.visible");
    });
  }

  public validateUploadedFileInfo(
    name: string,
    extension: string,
    size: string,
  ) {
    this.getFileByName(name).then(($file) => {
      cy.wrap($file)
        .should("exist")
        .find("[data-cy='file-folder-name']")
        .should("have.text", name + "." + extension);
      cy.wrap($file)
        .find("[data-cy='file-folder-size']")
        .should("have.text", size);
      cy.wrap($file).find(".svg-icon").should("be.visible");
    });
  }

  public uploadFile(file: string) {
    this.uploadFileInput.selectFile(file, {
      force: true,
    });
  }
}

export default new FilesPage();
