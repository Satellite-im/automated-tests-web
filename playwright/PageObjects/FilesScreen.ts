import MainPage from "./MainPage";
import { expect, type Locator, type Page } from "@playwright/test";

export class FilesPage extends MainPage {
  readonly page: Page;
  readonly buttonFilesSync: Locator;
  readonly buttonFilesGiftSpace: Locator;
  readonly buttonFilesRentSpace: Locator;
  readonly buttonFilesCreateNode: Locator;
  readonly contextMenuFile: Locator;
  readonly contextMenuFolder: Locator;
  readonly contextOptionDelete: Locator;
  readonly contextOptionDownload: Locator;
  readonly contextOptionRename: Locator;
  readonly filePreviewImage: Locator;
  readonly freeSpaceLabel: Locator;
  readonly freeSpaceValue: Locator;
  readonly inputFileFolderName: Locator;
  readonly goBackButton: Locator;
  readonly newFolderButton: Locator;
  readonly progressButton: Locator;
  readonly quickActionsLabel: Locator;
  readonly totalSpaceLabel: Locator;
  readonly totalSpaceValue: Locator;
  readonly treeFolder: Locator;
  readonly treeItem: Locator;
  readonly treeNode: Locator;
  readonly uploadFileButton: Locator;
  readonly uploadFileInput: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.buttonFilesSync = page.getByTestId("button-files-sync");
    this.buttonFilesGiftSpace = page.getByTestId("button-files-gift-space");
    this.buttonFilesRentSpace = page.getByTestId("button-files-rent-space");
    this.buttonFilesCreateNode = page.getByTestId("button-files-create-node");
    this.contextMenuFile = page.getByTestId("context-menu-file");
    this.contextMenuFolder = page.getByTestId("context-menu-folder");
    this.contextOptionDelete = page.getByTestId("context-menu-option-Delete");
    this.contextOptionDownload = page.getByTestId(
      "context-menu-option-Download",
    );
    this.contextOptionRename = page.getByTestId("context-menu-option-Rename");
    this.filePreviewImage = page.getByTestId("file-preview-image");
    this.freeSpaceLabel = page.getByTestId("label-files-free-space");
    this.freeSpaceValue = page.getByTestId("text-files-free-space");
    this.inputFileFolderName = page.getByTestId("input-file-folder-name");
    this.goBackButton = page.getByTestId("button-folder-back");
    this.newFolderButton = page.getByTestId("button-new-folder");
    this.progressButton = page.getByTestId("progress-button");
    this.quickActionsLabel = page.getByTestId("label-quick-actions");
    this.totalSpaceLabel = page.getByTestId("label-files-total-space");
    this.totalSpaceValue = page.getByTestId("text-files-total-space");
    this.treeFolder = page.locator('[data-cy^="tree-folder-"]');
    this.treeItem = page.locator('[data-cy^="tree-item-"]');
    this.treeNode = page.locator('[data-cy^="tree-node-"]');
    this.uploadFileButton = page.getByTestId("button-upload-file");
    this.uploadFileInput = page.getByTestId("input=upload-files");
  }

  async createNewFolder(folderName: string) {
    await this.newFolderButton.click();
    await this.inputFileFolderName.waitFor({ state: "attached" });
    await this.inputFileFolderName.fill(folderName);
    await this.page.keyboard.press("Enter");
    await this.page
      .locator(`[data-cy="folder-${folderName}"]`)
      .waitFor({ state: "attached" });
    await this.page
      .locator(`[data-cy="tree-item-${folderName}"]`)
      .waitFor({ state: "attached" });
  }

  async getFileByName(fileName: string) {
    return this.page.locator(`[data-cy="file-${fileName}"]`);
  }

  async getFolderByName(folderName) {
    return this.page.locator(`[data-cy="folder-${folderName}"]`);
  }

  async navigateToFolder(folderName: string) {
    await this.page.locator(`[data-cy="folder-${folderName}"]`).dblclick();
    await this.page
      .locator(`[data-cy="tree-item-${folderName}"]`)
      .waitFor({ state: "detached" });
  }

  async renameFile(fileName: string, newName: string) {
    const file = await this.getFileByName(fileName);
    await file.click();
    await this.contextMenuFile.click();
    await this.contextOptionRename.click();
    await this.inputFileFolderName.fill(newName);
    await this.page.keyboard.press("Enter");
  }

  async renameFolder(folderName: string, newName: string) {
    const folder = await this.getFolderByName(folderName);
    await folder.click();
    await this.contextMenuFolder.click();
    await this.contextOptionRename.click();
    await this.inputFileFolderName.fill(newName);
    await this.page.keyboard.press("Enter");
  }

  async validateNewFolderCreated(
    name: string,
    emptyName: boolean = false,
    folderSize: string = "0 B",
  ) {
    const folderLocator = this.page.locator(`[data-cy="folder-${name}"]`);
    await folderLocator.waitFor({ state: "attached" });
    if (emptyName !== true) {
      const folderName = folderLocator.getByTestId("file-folder-name");
      await expect(folderName).toHaveText(name);
    }
    const folderSizeLocator = folderLocator.getByTestId("file-folder-size");
    await expect(folderSizeLocator).toHaveText(folderSize);
    const folderIcon = folderLocator.locator(".svg-icon");
    await expect(folderIcon).toBeVisible();
  }

  async validateFilesURL() {
    await this.page.waitForURL("/files");
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
    newName: string,
    extension: string,
    expectedSize: string,
  ) {
    const file = await this.getFileByName(oldName);
    expect(file).toBeTruthy();
    const fileName = file.getByTestId("file-folder-name");
    expect(fileName).toHaveText(`${newName}.${extension}`);
    const fileSizeElement = file.getByTestId("file-folder-size");
    expect(fileSizeElement).toHaveText(expectedSize);
    const svgIcon = file.locator(".svg-icon");
    await expect(svgIcon).toBeVisible();
  }

  async validateUploadedFileInfo(
    name: string,
    extension: string,
    expectedSize: string,
  ) {
    const file = await this.getFileByName(name);
    expect(file).toBeTruthy();
    const fileName = file.getByTestId("file-folder-name");
    expect(fileName).toHaveText(`${name}.${extension}`);
    const fileSizeElement = file.getByTestId("file-folder-size");
    expect(fileSizeElement).toHaveText(expectedSize);
    const svgIcon = file.locator(".svg-icon");
    await expect(svgIcon).toBeVisible();
  }

  async validateUploadedImageInfo(
    name: string,
    extension: string,
    expectedSize: string,
  ) {
    const file = await this.getFileByName(name);
    expect(file).toBeTruthy();
    const fileName = file.getByTestId("file-folder-name");
    expect(fileName).toHaveText(`${name}.${extension}`);
    const fileSizeElement = file.getByTestId("file-folder-size");
    expect(fileSizeElement).toHaveText(expectedSize);
    const imagePreview = file.getByTestId("file-preview-image");
    await expect(imagePreview).toBeVisible();
  }

  async uploadFile(filePath: string) {
    await this.uploadFileButton.click();
    await this.uploadFileInput.setInputFiles(filePath);
    const filename = await this.getFileName(filePath);
    await this.page
      .locator(`[data-cy="file-${filename}"]`)
      .waitFor({ state: "attached" });
  }
}
