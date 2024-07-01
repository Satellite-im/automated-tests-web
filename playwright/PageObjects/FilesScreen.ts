import MainPage from "./MainPage";
import { expect, type Locator, type Page } from "@playwright/test";

export class FilesPage extends MainPage {
  readonly page: Page;
  readonly contextMenuFile: Locator;
  readonly contextMenuFolder: Locator;
  readonly contextOptionDelete: Locator;
  readonly contextOptionDownload: Locator;
  readonly contextOptionRename: Locator;
  readonly freeSpaceLabel: Locator;
  readonly freeSpaceValue: Locator;
  readonly inputFileFolderName: Locator;
  readonly goBackButton: Locator;
  readonly newFolderButton: Locator;
  readonly progressButton: Locator;
  readonly statsButton: Locator;
  readonly totalSpaceLabel: Locator;
  readonly totalSpaceValue: Locator;
  readonly uploadFileButton: Locator;
  readonly uploadFileInput: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.contextMenuFile = page.getByTestId("context-menu-file");
    this.contextMenuFolder = page.getByTestId("context-menu-folder");
    this.contextOptionDelete = page.getByTestId("context-menu-option-Delete");
    this.contextOptionDownload = page.getByTestId(
      "context-menu-option-Download",
    );
    this.contextOptionRename = page.getByTestId("context-menu-option-Rename");
    this.freeSpaceLabel = this.statsButton.first().locator("label");
    this.freeSpaceValue = this.statsButton.first().locator("p");
    this.inputFileFolderName = page.getByTestId("input-file-folder-name");
    this.goBackButton = page.getByTestId("button-folder-back");
    this.newFolderButton = page.getByTestId("button-new-folder");
    this.progressButton = page.getByTestId("progress-button");
    this.statsButton = page.locator(".stat");
    this.totalSpaceLabel = this.statsButton.last().locator("label");
    this.totalSpaceValue = this.statsButton.last().locator("p");
    this.uploadFileButton = page.getByTestId("button-upload-file");
    this.uploadFileInput = page.getByTestId("input=upload-file");
  }

  async createNewFolder(folderName: string) {
    await this.newFolderButton.click();
    await this.inputFileFolderName.fill(folderName);
    await this.inputFileFolderName.press("Enter");
  }

  async getFileByName(fileName: string) {
    return this.page.locator(`[data-cy="file-${fileName}"]`);
  }

  async getFolderByName(folderName: string) {
    return this.page.locator(`[data-cy="folder-${folderName}"]`);
  }

  async navigateToFolder(folderName: string) {
    await this.getFolderByName(folderName).click();
  }

  async renameFile(fileName: string, newName: string) {
    const file = await this.getFileByName(fileName);
    await file.click();
    await this.contextMenuFile.click();
    await this.contextOptionRename.click();
    await this.inputFileFolderName.fill(newName);
    await this.inputFileFolderName.press("Enter");
  }

  async renameFolder(folderName: string, newName: string) {
    const folder = await this.getFolderByName(folderName);
    await folder.click();
    await this.contextMenuFolder.click();
    await this.contextOptionRename.click();
    await this.inputFileFolderName.fill(newName);
    await this.inputFileFolderName.press("Enter");
  }

  async validateNewFolderCreated(
    folderName: string,
    emptyName: boolean = true,
    folderSize: string = "0 B",
  ) {
    const folder = await this.getFolderByName(folderName);
    await expect(folder).toBeTruthy();
    if (!emptyName) {
      await expect(folder.textContent()).toBe(folderName);
    }
    const folderSizeElement = await folder.locator("[data-cy='folder-size']");
    await expect(folderSizeElement.textContent()).toBe(folderSize);
  }

  async validateFilesURL() {
    await expect(this.page.url()).toContain("/files");
  }

  async validateFreeSpaceInfo(value: string) {
    await expect(this.freeSpaceLabel).toHaveText("Free Space");
    await expect(this.freeSpaceValue).toHaveText(value);
  }

  async validateTotalSpaceInfo(value: string) {
    await expect(this.totalSpaceLabel).toHaveText("Total Space");
    await expect(this.totalSpaceValue).toHaveText(value);
  }

  async validateRenamedFileInfo(
    oldName: string,
    newName: strin,
    extension: string,
    size: string,
  ) {
    const file = await this.getFileByName(newName);
    await expect(file).toBeTruthy();
    await expect(file.textContent()).toBe(`${newName}.${extension}`);
    const fileSizeElement = await file.locator("[data-cy='file-size']");
    await expect(fileSizeElement.textContent()).toBe(size);
  }

  async validateUploadedFileInfo(
    name: string,
    extension: string,
    size: string,
  ) {
    const file = await this.getFileByName(name);
    await expect(file).toBeTruthy();
    await expect(file.textContent()).toBe(`${name}.${extension}`);
    const fileSizeElement = await file.locator("[data-cy='file-size']");
    await expect(fileSizeElement.textContent()).toBe(size);
  }

  async uploadFile(filePath: string) {
    await this.uploadFileButton.click();
    await this.uploadFileInput.setInputFiles(filePath);
  }
}
