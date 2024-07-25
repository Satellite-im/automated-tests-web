import { test, expect } from "../fixtures/setup";
import { faker } from "@faker-js/faker";

test.describe("Friends tests", () => {
  const username: string = "ChatUserA";
  const usernameTwo: string = "ChatUserB";
  const usernameThree: string = "ChatUserC";
  const status: string = faker.lorem.sentence(3);
  const statusTwo: string = faker.lorem.sentence(3);
  const statusThree: string = faker.lorem.sentence(3);

  test.beforeEach(
    async ({
      authNewAccountFirst,
      authNewAccountSecond,
      authNewAccountThird,
      chatsMainPageFirst,
      chatsMainPageSecond,
      chatsMainPageThird,
      createOrImportFirst,
      createOrImportSecond,
      createOrImportThird,
      loginPinPageFirst,
      loginPinPageSecond,
      loginPinPageThird,
      saveRecoverySeedFirst,
      saveRecoverySeedSecond,
      saveRecoverySeedThird,
    }) => {
      // Start browser one
      await createOrImportFirst.navigateTo();

      // Start browser two
      await createOrImportSecond.navigateTo();

      // Start browser three
      await createOrImportThird.navigateTo();

      // Click on Create New Account
      await createOrImportFirst.clickCreateNewAccount();

      // Enter username and Status and click on create account
      await authNewAccountFirst.validateLoadingHeader();
      await authNewAccountFirst.typeOnUsername(username);
      await authNewAccountFirst.typeOnStatus(status);
      await authNewAccountFirst.clickOnCreateAccount();

      // Enter Pin
      await loginPinPageFirst.waitUntilPageIsLoaded();
      await loginPinPageFirst.enterDefaultPin();

      // Click on I Saved It
      await saveRecoverySeedFirst.clickOnSavedIt();

      // Go to Friends
      await chatsMainPageFirst.goToFriends();

      // Now with the second user, click on Create New Account
      await createOrImportSecond.clickCreateNewAccount();

      // Enter username, status and click on create account
      await authNewAccountSecond.validateLoadingHeader();
      await authNewAccountSecond.typeOnUsername(usernameTwo);
      await authNewAccountSecond.typeOnStatus(statusTwo);
      await authNewAccountSecond.clickOnCreateAccount();

      // Enter a valid pin
      await loginPinPageSecond.waitUntilPageIsLoaded();
      await loginPinPageSecond.enterDefaultPin();

      // Click on I Saved It
      await saveRecoverySeedSecond.clickOnSavedIt();

      // Go to Friends
      await chatsMainPageSecond.goToFriends();

      // Now with the third user, click on Create New Account
      await createOrImportThird.clickCreateNewAccount();

      // Enter username, status and click on create account
      await authNewAccountThird.validateLoadingHeader();
      await authNewAccountThird.typeOnUsername(usernameThree);
      await authNewAccountThird.typeOnStatus(statusThree);
      await authNewAccountThird.clickOnCreateAccount();

      // Enter a valid pin
      await loginPinPageThird.waitUntilPageIsLoaded();
      await loginPinPageThird.enterDefaultPin();

      // Click on I Saved It
      await saveRecoverySeedThird.clickOnSavedIt();

      // Go to Friends
      await chatsMainPageThird.goToFriends();
    },
  );

  test.skip("H9 - Search Friends tests", async ({
    friendsScreenFirst,
    friendsScreenSecond,
    friendsScreenThird,
  }) => {
    // H9 - Highlighted border should appear when clicking into the Search Friends input box
  });

  test.skip("H11, H12, H13, H14 - Friend Lists are sorted alphabetically", async ({
    friendsScreenFirst,
    friendsScreenSecond,
    friendsScreenThird,
  }) => {
    // H11 - Friends should be listed in alphabetical order
    // H12 - Incoming friend requests should be listed by Newest to Oldest
    // H13 - Outgoing friend requests should be listed by last sent
    // H14 - Blocked users should be displayed alphabetically
  });

  test.afterAll(async ({ page1, page2, page3 }) => {
    await page1.close();
    await page2.close();
    await page3.close();
  });
});
