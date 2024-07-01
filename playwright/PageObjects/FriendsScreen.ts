import MainPage from "./MainPage";
import { type Locator, type Page } from "@playwright/test";

export class FriendsScreen extends MainPage {
  readonly page: Page;
  readonly buttonAddFriend: Locator;
  readonly buttonCopyID: Locator;
  readonly contextMenuCopyID: Locator;
  readonly contextOptionCopyDid: Locator;
  readonly contextOptionCopyID: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.buttonAddFriend = page.getByTestId("button-add-friend");
    this.buttonCopyID = page.getByTestId("button-copy-id");
    this.contextMenuCopyID = page.getByTestId("context-menu-copy-id");
    this.contextOptionCopyDid = this.contextMenuCopyID.getByTestId("copy-did");
    this.contextOptionCopyID = this.contextMenuCopyID.getByTestId("copy-id");
  }
}
