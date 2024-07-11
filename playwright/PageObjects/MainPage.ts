import { expect, type Locator, type Page } from "@playwright/test";

export default class MainPage {
  readonly page: Page;
  readonly buttonChat: Locator;
  readonly buttonFiles: Locator;
  readonly buttonFriends: Locator;
  readonly buttonHideSidebar: Locator;
  readonly buttonSettings: Locator;
  readonly buttonShowSidebar: Locator;
  readonly buttonSidebarChats: Locator;
  readonly buttonSidebarFiles: Locator;
  readonly buttonWallet: Locator;
  readonly inputSidebarSearch: Locator;
  readonly navigationBar: Locator;
  readonly sidebar: Locator;
  readonly slimbar: Locator;
  readonly toastNotification: Locator;
  readonly toastNotificationButton: Locator;
  readonly toastNotificationText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.buttonChat = page.getByTestId("button-Chat");
    this.buttonFiles = page.getByTestId("button-Files");
    this.buttonFriends = page.getByTestId("button-Friends");
    this.buttonHideSidebar = page.getByTestId("button-hide-sidebar");
    this.buttonSettings = page.getByTestId("button-Settings");
    this.buttonShowSidebar = page.getByTestId("button-show-sidebar");
    this.buttonSidebarChats = page.getByTestId("button-sidebar-chats");
    this.buttonSidebarFiles = page.getByTestId("button-sidebar-files");
    this.buttonWallet = page.getByTestId("button-Wallet");
    this.inputSidebarSearch = page.getByTestId("input-sidebar-search");
    this.navigationBar = page.getByTestId(".navigation");
    this.sidebar = page.getByTestId("sidebar");
    this.slimbar = page.getByTestId("slimbar");
    this.toastNotification = page.getByTestId("toast-notification");
    this.toastNotificationButton = page.getByTestId(
      "toast-notification-button",
    );
    this.toastNotificationText = page.getByTestId("toast-notification-text");
  }

  async assertInputTextSelected(selector: string) {
    // Locate the input field
    const inputField = this.page.locator(selector);

    // Get the value of the input field
    const inputValue = await inputField.inputValue();

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

  async ensureSidebarIsDisplayed() {
    const hasVerticalClass: boolean = await this.navigationBar.evaluate((el) =>
      el.classList.contains("vertical"),
    );

    if (hasVerticalClass) {
      await this.buttonShowSidebar.click();
      await expect(this.sidebar).toBeVisible();
    } else {
      await expect(this.sidebar).toBeVisible();
    }
  }

  async goToChat() {
    await this.buttonChat.click();
  }

  async goToFiles() {
    await this.buttonFiles.click();
  }

  async goToFriends() {
    await this.buttonFriends.click();
    await this.page.waitForURL("/friends");
  }

  async goToSettings() {
    await this.buttonSettings.click();
  }

  async goToWallet() {
    await this.buttonWallet.click();
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
}
