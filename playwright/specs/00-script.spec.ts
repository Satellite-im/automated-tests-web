import { ChatsMainPage } from "playwright/PageObjects/ChatsMain";
import { test } from "../fixtures/setup";
import { FriendsScreen } from "playwright/PageObjects/FriendsScreen";
import { chromium } from "@playwright/test";
import { CreateOrImportPage } from "playwright/PageObjects/CreateOrImport";
import { AuthNewAccount } from "playwright/PageObjects/AuthNewAccount";
import { LoginPinPage } from "playwright/PageObjects/LoginPin";
import { SaveRecoverySeedPage } from "playwright/PageObjects/SaveRecoverySeed";
import { SettingsProfile } from "playwright/PageObjects/Settings/SettingsProfile";

const userToAdd: string =
  "did:key:z6MkiNPVXR1C3XKUZpKUUHZqaD52E5dkKP7icVLgsHxkYNWr";
const userData = [
  {
    username: "Luis",
    pictureLocation: "playwright/assets/logo.jpg",
  },
  {
    username: "Sara",
    pictureLocation: "playwright/assets/logo.jpg",
  },
  {
    username: "Phill",
    pictureLocation: "playwright/assets/logo.jpg",
  },
  {
    username: "Matt",
    pictureLocation: "playwright/assets/logo.jpg",
  },
  {
    username: "Kevin",
    pictureLocation: "playwright/assets/logo.jpg",
  },
  {
    username: "Sheldon",
    pictureLocation: "playwright/assets/logo.jpg",
  },
  {
    username: "Wendy",
    pictureLocation: "playwright/assets/logo.jpg",
  },
  {
    username: "Lucas",
    pictureLocation: "playwright/assets/logo.jpg",
  },
  {
    username: "Hugo",
    pictureLocation: "playwright/assets/logo.jpg",
  },
  {
    username: "Jeff",
    pictureLocation: "playwright/assets/logo.jpg",
  },
];

const status = "fixed status";

test.describe("Friends tests", () => {
  for (let i = 0; i < userData.length; i++) {
    test("Create one account for " + userData[i].username, async ({}) => {
      // Declare all constants required for the precondition steps
      const browser = await chromium.launch();
      const context = await browser.newContext();
      const page = await context.newPage();
      const createOrImport = new CreateOrImportPage(page);
      const authNewAccount = new AuthNewAccount(page);
      const loginPinPage = new LoginPinPage(page);
      const saveRecoverySeed = new SaveRecoverySeedPage(page);
      const chatsMainPage = new ChatsMainPage(page);
      const friendsScreen = new FriendsScreen(page);
      const settingsProfile = new SettingsProfile(page);

      // Start browser
      await createOrImport.navigateTo();

      // Click on Create New Account
      await createOrImport.clickCreateNewAccount();

      // Enter username and Status and click on create account
      await authNewAccount.validateLoadingHeader();
      await authNewAccount.typeOnUsername(userData[i].username);
      await authNewAccount.typeOnStatus(status);
      await authNewAccount.clickOnCreateAccount();

      // Enter Pin
      await loginPinPage.waitUntilPageIsLoaded();
      await loginPinPage.enterDefaultPin();

      // Click on I Saved It
      await saveRecoverySeed.clickOnSavedIt();

      await chatsMainPage.addSomeone.waitFor({ state: "visible" });
      await page.waitForURL("/chat");
      await chatsMainPage.goToSettings();
      await page.waitForURL("/settings/profile");
      await settingsProfile.uploadProfilePicture(userData[i].pictureLocation);

      await settingsProfile.goToFriends();
      await page.waitForURL("/friends");
      await friendsScreen.typeOnAddFriendInput(userToAdd);

      // Click on Add button
      await friendsScreen.buttonAddFriend.click();

      // Validate Toast Notification with Request Sent appears
      await friendsScreen.validateToastRequestSent();
      await friendsScreen.waitForToastNotificationToDisappear();
      await friendsScreen.goToBlockedList();
      await friendsScreen.goToRequestList();
      await page.waitForTimeout(60000);
      await context.close();
    });
  }
});
