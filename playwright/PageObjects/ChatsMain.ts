import MainPage from "./MainPage";
import { expect, type Locator, type Page } from "@playwright/test";

export class ChatsMainPage extends MainPage {
  readonly page: Page;
  readonly addSomeone: Locator;
  readonly buttonAddFriends: Locator;
  readonly buttonCreateGroupChat: Locator;
  readonly buttonMarketplace: Locator;
  readonly createGroupButton: Locator;
  readonly createGroupModal: Locator;
  readonly createGroupInputGroupName: Locator;
  readonly createGroupLabelGroupMembers: Locator;
  readonly createGroupLabelGroupName: Locator;
  readonly createGroupLabelSelectMembers: Locator;
  readonly sectionAddSomeone: Locator;
  readonly topbar: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.addSomeone = page.locator(".add-someone");
    this.buttonAddFriends = page.getByTestId("button-add-friends");
    this.buttonCreateGroupChat = page.getByTestId("button-create-group-chat");
    this.buttonMarketplace = page.getByTestId("button-marketplace");
    this.createGroupButton = page.getByTestId("button-create-group");
    this.createGroupModal = page.getByTestId("modal-create-group-chat");
    this.createGroupInputGroupName = page.getByTestId(
      "input-create-group-name",
    );
    this.createGroupLabelGroupMembers = page.getByTestId(
      "label-create-group-members",
    );
    this.createGroupLabelGroupName = page.getByTestId(
      "label-create-group-name",
    );
    this.createGroupLabelSelectMembers = page.getByTestId(
      "label-create-group-select-members",
    );
    this.sectionAddSomeone = page.getByTestId("section-add-someone");
    this.topbar = page.getByTestId("topbar");
  }

  async exitCreateGroup() {
    await this.topbar.click();
  }

  async validateChatsMainPageIsShown() {
    await expect(this.addSomeone).toBeVisible();
    await expect(this.page.url()).toContain("/chat");
  }
}
