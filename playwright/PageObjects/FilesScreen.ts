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
    this.freeSpaceLabel = page.locator(".stat").first().locator("label");
    this.freeSpaceValue = page.locator(".stat").first().locator("p");
    this.inputFileFolderName = page.getByTestId("input-file-folder-name");
    this.goBackButton = page.getByTestId("button-folder-back");
    this.newFolderButton = page.getByTestId("button-new-folder");
    this.progressButton = page.getByTestId("progress-button");
    this.totalSpaceLabel = page.locator(".stat").last().locator("label");
    this.totalSpaceValue = page.locator(".stat").last().locator("p");
    this.uploadFileButton = page.getByTestId("button-upload-file");
    this.uploadFileInput = page.getByTestId("input=upload-files");
  }

  async createNewFolder(folderName: string) {
    await this.newFolderButton.click();
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
    await folder.click();
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

  async uploadFile(filePath: string) {
    await this.uploadFileButton.click();
    await this.uploadFileInput.setInputFiles(filePath);
    const filename = await this.getFileName(filePath);
    await this.page
      .locator(`[data-cy="file-${filename}"]`)
      .waitFor({ state: "attached" });
  }
}
