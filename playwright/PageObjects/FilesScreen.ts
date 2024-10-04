import MainPage from "./MainPage";
import { expect, type Locator, type Page } from "@playwright/test";

export class FilesPage extends MainPage {
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

  constructor(
    public readonly page: Page,
    public readonly viewport: string,
  ) {
    super(page, viewport);
    this.buttonFilesSync = this.page.getByTestId("button-files-sync");
    this.buttonFilesGiftSpace = this.page.getByTestId(
      "button-files-gift-space",
    );
    this.buttonFilesRentSpace = this.page.getByTestId(
      "button-files-rent-space",
    );
    this.buttonFilesCreateNode = this.page.getByTestId(
      "button-files-create-node",
    );
    this.contextMenuFile = this.page.getByTestId("context-menu-file");
    this.contextMenuFolder = this.page.getByTestId("context-menu-folder");
    this.contextOptionDelete = this.page.getByTestId(
      "context-menu-option-Delete",
    );
    this.contextOptionDownload = this.page.getByTestId(
      "context-menu-option-Download",
    );
    this.contextOptionRename = this.page.getByTestId(
      "context-menu-option-Rename",
    );
    this.filePreviewImage = this.page.getByTestId("file-preview-image");
    this.freeSpaceLabel = this.page.getByTestId("label-files-free-space");
    this.freeSpaceValue = this.page.getByTestId("text-files-free-space");
    this.inputFileFolderName = this.page.getByTestId("input-file-folder-name");
    this.goBackButton = this.page.getByTestId("button-folder-back");
    this.newFolderButton = this.page.getByTestId("button-new-folder");
    this.progressButton = this.page.getByTestId("progress-button");
    this.quickActionsLabel = this.page.getByTestId("label-quick-actions");
    this.totalSpaceLabel = this.page.getByTestId("label-files-total-space");
    this.totalSpaceValue = this.page.getByTestId("text-files-total-space");
    this.treeFolder = this.page.locator('[data-cy^="tree-folder-"]');
    this.treeItem = this.page.locator('[data-cy^="tree-item-"]');
    this.treeNode = this.page.locator('[data-cy^="tree-node-"]');
    this.uploadFileButton = this.page.getByTestId("button-upload-file");
    this.uploadFileInput = this.page.getByTestId("input=upload-files");
  }

  async createNewFolder(folderName: string) {
    await this.newFolderButton.click();
    await this.inputFileFolderName.waitFor({ state: "attached" });
    await this.inputFileFolderName.fill(folderName);
    await this.page.keyboard.press("Enter");
    await this.page
      .locator(`[data-cy="folder-${folderName}"]`)
      .waitFor({ state: "attached" });
  }

  async getFileByName(fileName: string) {
    return this.page.locator(`[data-cy="file-${fileName}"]`);
  }

  async getFolderByName(folderName) {
    return this.page.locator(`[data-cy="folder-${folderName}"]`);
  }

  async navigateToFolder(folderName: string) {
    const folder = await this.getFolderByName(folderName);
    const svgIcon = folder.locator(".svg-icon");
    await svgIcon.dblclick();
    await folder.waitFor({ state: "detached" });
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
    await this.page
      .locator(`[data-cy="folder-${name}"]`)
      .waitFor({ state: "attached" });
    if (emptyName === true) {
      await expect(
        this.page
          .locator(`[data-cy="folder-${name}"]`)
          .getByTestId("file-folder-name"),
      ).toHaveText("");
    } else {
      await expect(
        this.page
          .locator(`[data-cy="folder-${name}"]`)
          .getByTestId("file-folder-name"),
      ).toHaveText(name);
    }
    await expect(
      this.page
        .locator(`[data-cy="folder-${name}"]`)
        .getByTestId("file-folder-size"),
    ).toHaveText(folderSize);
    await expect(
      this.page.locator(`[data-cy="folder-${name}"]`).locator(".svg-icon"),
    ).toBeVisible();
  }

  async validateFilesURL() {
    expect(this.page.url()).toContain("/files");
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
