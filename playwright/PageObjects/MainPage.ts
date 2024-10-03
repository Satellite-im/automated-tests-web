import { expect, type Locator, type Page } from "@playwright/test";

export default class MainPage {
  readonly buttonChat: Locator;
  readonly buttonDismissInstallAlert: Locator;
  readonly buttonFiles: Locator;
  readonly buttonFriends: Locator;
  readonly buttonHideSidebar: Locator;
  readonly buttonSettings: Locator;
  readonly buttonShowSidebar: Locator;
  readonly buttonSidebarChats: Locator;
  readonly buttonSidebarFiles: Locator;
  readonly buttonWallet: Locator;
  readonly chatPreview: Locator;
  readonly chatPreviewLastMessage: Locator;
  readonly chatPreviewLastMessageImage: Locator;
  readonly chatPreviewName: Locator;
  readonly chatPreviewPicture: Locator;
  readonly chatPreviewPictureIdenticon: Locator;
  readonly chatPreviewPictureImage: Locator;
  readonly chatPreviewStatusIndicator: Locator;
  readonly chatPreviewTimestamp: Locator;
  readonly favoriteCircle: Locator;
  readonly favoriteProfilePicture: Locator;
  readonly favoriteProfileStatusIndicator: Locator;
  readonly favoritesLabel: Locator;
  readonly installAlert: Locator;
  readonly inputSidebarSearch: Locator;
  readonly inputSidebarSearchContainer: Locator;
  readonly navigationBar: Locator;
  readonly sidebar: Locator;
  readonly sidebarChatPreview: Locator;
  readonly slimbar: Locator;
  readonly slimbarFavorite: Locator;
  readonly toastNotification: Locator;
  readonly toastNotificationButton: Locator;
  readonly toastNotificationText: Locator;

  constructor(public readonly page: Page) {
    this.buttonChat = this.page.getByTestId("button-Chat");
    this.buttonDismissInstallAlert = this.page
      .locator("#install-banner")
      .getByRole("button")
      .first();
    this.buttonFiles = this.page.getByTestId("button-Files");
    this.buttonFriends = this.page.getByTestId("button-Friends");
    this.buttonHideSidebar = this.page.getByTestId("button-hide-sidebar");
    this.buttonSettings = this.page.getByTestId("button-Settings");
    this.buttonShowSidebar = this.page
      .getByTestId("topbar")
      .getByTestId("button-show-sidebar");
    this.buttonSidebarChats = this.page.getByTestId("button-sidebar-chats");
    this.buttonSidebarFiles = this.page.getByTestId("button-sidebar-files");
    this.buttonWallet = this.page.getByTestId("button-Wallet");
    this.chatPreview = this.page.getByTestId("chat-preview");
    this.chatPreviewLastMessage = this.page.getByTestId(
      "chat-preview-last-message",
    );
    this.chatPreviewLastMessageImage =
      this.chatPreviewLastMessage.locator("img");
    this.chatPreviewName = this.page.getByTestId("chat-preview-name");
    this.chatPreviewPicture = this.page.getByTestId("chat-preview-picture");
    this.chatPreviewPictureIdenticon =
      this.chatPreviewPicture.locator(".identicon img");
    this.chatPreviewPictureImage = this.chatPreviewPicture.locator("img");
    this.chatPreviewStatusIndicator =
      this.chatPreview.getByTestId("status-indicator");
    this.chatPreviewTimestamp = this.page.getByTestId("chat-preview-timestamp");
    this.favoriteCircle = this.page.getByTestId("favorite-circle");
    this.favoriteProfilePicture = this.page.getByTestId(
      "favorite-profile-picture",
    );
    this.favoriteProfileStatusIndicator =
      this.favoriteProfilePicture.getByTestId("status-indicator");
    this.favoritesLabel = this.page.getByTestId("label-favorites");
    this.installAlert = this.page.locator("#install-banner");
    this.inputSidebarSearch = this.page.getByTestId("input-sidebar-search");
    this.inputSidebarSearch = this.page
      .getByTestId("input-sidebar-search")
      .locator("input");
    this.inputSidebarSearchContainer = this.page
      .getByTestId("input-sidebar-search")
      .locator(".input-container");
    this.navigationBar = this.page.getByTestId(".navigation");
    this.sidebar = this.page.getByTestId("sidebar");
    this.sidebarChatPreview = this.sidebar.locator(".chat-preview");
    this.slimbar = this.page.getByTestId("slimbar");
    this.slimbarFavorite = this.slimbar.locator(".fave");
    this.toastNotification = this.page.getByTestId("toast-notification");
    this.toastNotificationButton = this.page.getByTestId(
      "toast-notification-button",
    );
    this.toastNotificationText = this.page.getByTestId(
      "toast-notification-text",
    );
  }

  async assertInputTextSelected(selector: string) {
    // Locate the input field
    const inputField = this.page.locator(selector);

    // Get the value of the input field
    await inputField.click();
    const inputValue = await inputField.inputValue();

    // Explicitly select the text in the input field
    await this.page.evaluate((selector) => {
      const input = document.querySelector(selector) as HTMLInputElement;
      input.select();
    }, selector);

    // Evaluate the selection start and end
    const selectionRange = await this.page.evaluate((selector) => {
      const input = document.querySelector(selector) as HTMLInputElement;
      return {
        selectionStart: input.selectionStart,
        selectionEnd: input.selectionEnd,
      };
    }, selector);

    // Assert that the whole text is selected
    expect(selectionRange.selectionStart).toBe(0);
    expect(selectionRange.selectionEnd).toBe(inputValue.length);
  }

  async closeToastNotification() {
    await this.toastNotificationButton.click();
  }

  async dismissDownloadAlert() {
    await this.buttonDismissInstallAlert.click();
    await this.installAlert.waitFor({ state: "detached" });
  }

  async expectElementToHaveClass(selector: string, className: string) {
    const element = this.page.locator(selector);
    const hasClass = await element.evaluate(
      (el, className) => el.classList.contains(className),
      className,
    );
    expect(hasClass).toBe(true);
  }

  async getFileName(filePath: string) {
    // Extract the file name without the extension
    const match = filePath.match(/([^\/]+)(?=\.\w+$)/);
    return match ? match[0] : null;
  }

  async getClipboardContent() {
    let handle = await this.page.evaluateHandle(() =>
      navigator.clipboard.readText(),
    );
    let clipboardContent = await handle.jsonValue();
    return clipboardContent;
  }

  async goToChat() {
    await this.buttonChat.first().click();
  }

  async goToFiles() {
    await this.buttonFiles.first().click();
    await this.page.waitForURL("/files");
  }

  async goToFriends() {
    await this.buttonFriends.first().click();
    await this.page.waitForURL("/friends");
  }

  async goToSettings() {
    await this.buttonSettings.first().click();
  }

  async goToWallet() {
    await this.buttonWallet.first().click();
  }

  async normalizeSvg(svgString: string) {
    return svgString.replace(/(width|height)="\d+"/g, "");
  }

  async visitOtherSite(url: string) {
    await this.page.goto(url);
  }

  async reloadPage() {
    await this.page.goto("");
  }

  async validateToastNotification(toastText: string) {
    await expect(this.toastNotification).toBeVisible();
    await expect(this.toastNotificationText).toHaveText(toastText);
  }

  async readClipboard() {
    return await this.page.evaluate(async () => {
      return await navigator.clipboard.readText();
    });
  }

  async validateNoFavoritesAreVisible() {
    await this.favoriteCircle.waitFor({ state: "detached" });
  }

  async validatePseudoElementContent(
    selector: string,
    expectedContent: string,
  ) {
    // Hover over the element to trigger the pseudo-element
    await this.page.hover(selector);

    // Evaluate the content of the ::after pseudo-element
    const content = await this.page.evaluate((selector) => {
      const element = document.querySelector(selector);
      if (element) {
        const style = window.getComputedStyle(element, "::after");
        return style.content;
      }
      return null;
    }, selector);

    // Validate the content
    expect(content).toBe(`"${expectedContent}"`);
  }

  async validateTooltipAttribute(
    selector: string,
    expectedTooltipText: string,
  ) {
    // Locate the element that should have the data-tooltip attribute
    const element = this.page.locator(selector);

    // Get the value of the data-tooltip attribute
    const tooltipText = await element.getAttribute("data-tooltip");

    // Validate that the data-tooltip attribute has the expected value
    expect(tooltipText).toBe(expectedTooltipText);
  }

  async waitForToastNotificationToDisappear() {
    await this.toastNotification.waitFor({ state: "detached" });
  }

  // Chat Preview Methods
  async openContextMenuOnChatPreview(chatName: string) {
    await this.page
      .getByTestId("chat-preview-name")
      .filter({ hasText: chatName })
      .click({ button: "right" });
  }

  async validateChatPreviewMessageImage(
    chatName: string,
    expectedAltText: string,
  ) {
    const chatPreviewLocator = this.page
      .getByTestId("chat-preview-name")
      .filter({ hasText: chatName })
      .locator("xpath=../../..");
    const imagePreview = chatPreviewLocator
      .getByTestId("chat-preview-last-message")
      .locator("img");
    const altText = await imagePreview.getAttribute("alt");
    const timestamp = await chatPreviewLocator
      .getByTestId("chat-preview-timestamp")
      .textContent();
    const statusIndicator = chatPreviewLocator.getByTestId("status-indicator");
    await expect(imagePreview).toBeVisible();
    expect(altText).toEqual(expectedAltText);
    expect(timestamp).toEqual("just now");
    expect(statusIndicator).toHaveClass(/.*\bonline\b.*/);
  }

  async validateChatPreviewMessageText(chatName: string, expectedText: string) {
    const chatPreviewLocator = this.page
      .getByTestId("chat-preview-name")
      .filter({ hasText: chatName })
      .locator("xpath=../../..");
    const text = await chatPreviewLocator
      .getByTestId("chat-preview-last-message")
      .textContent();
    const timestamp = await chatPreviewLocator
      .getByTestId("chat-preview-timestamp")
      .textContent();
    const statusIndicator = chatPreviewLocator.getByTestId("status-indicator");
    expect(text).toEqual(expectedText);
    expect(timestamp).toEqual("just now");
    expect(statusIndicator).toHaveClass(/.*\bonline\b.*/);
  }
}
