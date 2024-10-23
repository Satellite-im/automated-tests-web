import MainPage from "../MainPage";
import { type Locator, type Page, expect } from "@playwright/test";

export class CreateGroupModal extends MainPage {
  readonly createGroupButton: Locator;
  readonly createGroupModal: Locator;
  readonly createGroupInputGroupName: Locator;
  readonly createGroupLabelGroupMembers: Locator;
  readonly createGroupLabelGroupName: Locator;
  readonly createGroupLabelSelectMembers: Locator;
  readonly createGroupUsersList: Locator;
  readonly errorNameCreateGroupModal: Locator;
  readonly errorUsersCreateGroupModal: Locator;
  readonly singleUser: Locator;
  readonly singleUserProfilePicture: Locator;
  readonly singleUserProfilePictureIdenticon: Locator;
  readonly singleUserProfilePictureImage: Locator;
  readonly singleUserStatusIndicator: Locator;
  readonly singleUserUserInfo: Locator;
  readonly singleUserName: Locator;
  readonly singleUserKey: Locator;
  readonly singleUserCheckbox: Locator;

  constructor(
    public readonly page: Page,
    public readonly viewport: string,
  ) {
    super(page, viewport);
    this.createGroupModal = this.page.getByTestId("modal-create-group-chat");
    this.createGroupButton = this.createGroupModal.getByTestId(
      "button-create-group",
    );
    this.createGroupInputGroupName = this.createGroupModal
      .getByTestId("input-create-group-name")
      .getByRole("textbox");
    this.createGroupLabelGroupMembers = this.createGroupModal.getByTestId(
      "label-create-group-members",
    );
    this.createGroupLabelGroupName = this.createGroupModal.getByTestId(
      "label-create-group-name",
    );
    this.createGroupLabelSelectMembers = this.createGroupModal.getByTestId(
      "label-create-group-select-members",
    );
    this.createGroupUsersList = this.createGroupModal.getByTestId(
      "create-group-users-list",
    );
    this.errorNameCreateGroupModal = this.createGroupModal
      .locator(".error-message")
      .locator("p");
    this.errorUsersCreateGroupModal = this.createGroupModal.getByTestId(
      "text-error-create-group",
    );
    this.singleUser = this.createGroupUsersList.getByTestId("single-user");
    this.singleUserProfilePicture;
    this.singleUserProfilePictureIdenticon;
    this.singleUserProfilePictureImage;
    this.singleUserStatusIndicator;
    this.singleUserUserInfo;
    this.singleUserName;
    this.singleUserKey;
    this.singleUserCheckbox;
  }

  async createGroupChat(name: string, users: string[]) {
    await this.createGroupModal.waitFor({ state: "attached" });
    await this.createGroupInputGroupName.fill(name);
    await this.selectUser(users);
    await this.createGroupButton.click();
  }

  async exitCreateGroup(): Promise<void> {
    await this.page.mouse.click(0, 0);
  }

  async selectUser(users: string[]) {
    for (const user of users) {
      const userCheckbox = this.page
        .locator(`[data-cy="single-user-name"]`)
        .filter({ hasText: user })
        .locator("xpath=..")
        .locator("xpath=..")
        .getByTestId("single-user-checkbox");
      await userCheckbox.click();
    }
  }
}
