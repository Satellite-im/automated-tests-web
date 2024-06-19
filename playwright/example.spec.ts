import { test, expect } from "@playwright/test";
import { AuthNewAccount } from "./PageObjects/AuthNewAccount";
import { ChatsMainPage } from "./PageObjects/ChatsMain";
import { LoginPinPage } from "./PageObjects/LoginPin";
import { faker } from "@faker-js/faker";

test.describe("Create Account and Login Tests", () => {
  test.beforeEach(async ({ page }) => {
    const loginPinPage = new LoginPinPage(page);

    // Navigate to main page
    await loginPinPage.launchApplication();
    await loginPinPage.waitUntilPageIsLoaded();
  });

  test("A1, A9, A11 - Enter valid PIN redirects to Main Page", async ({
    page,
    context,
  }) => {
    const loginPinPage = new LoginPinPage(page);
    const authNewAccount = new AuthNewAccount(page);
    const chatsMainPage = new ChatsMainPage(page);
    const username = faker.internet.userName();
    const status = faker.lorem.sentence(3);

    await loginPinPage.pinButton1.click();
    await loginPinPage.pinButton2.click();
    await loginPinPage.pinButton3.click();
    await loginPinPage.pinButton4.click();
    await loginPinPage.clickConfirmButton();
    await authNewAccount.validateLoadingHeader();
    //await expect(page.url()).toContain("/auth/new_account");
    await expect(authNewAccount.textNewAccountSecondary).toHaveText(
      "Let's set up your new account. Please choose a username below.",
    );
    await expect(authNewAccount.labelNewAccountUsername).toHaveText("Username");
    await expect(authNewAccount.labelNewAccountStatus).toHaveText(
      "Status Message",
    );
    await expect(authNewAccount.profilePictureNewAccount).toBeVisible();
    await expect(authNewAccount.buttonNewAccountGoBack).toBeVisible();
    await expect(authNewAccount.buttonNewAccountCreate).toBeVisible();
    await authNewAccount.typeOnUsername(username);
    await authNewAccount.typeOnStatus(status);
    await authNewAccount.buttonNewAccountCreate.click();
    await expect(chatsMainPage.addSomeone).toBeVisible();
    //await expect(page.url()).toContain("/chat");
  });

  test("A2 - Pin should have at least 4 digits", async ({ page }) => {
    const loginPinPage = new LoginPinPage(page);
    await loginPinPage.enterPin("123");
    await loginPinPage.validateConfirmButtonIsDisabled();
  });

  test("A3 - Pin cannot have more than 8 digits", async ({ page }) => {
    const loginPinPage = new LoginPinPage(page);
    await loginPinPage.enterPin("12345678901234");

    const pitDotFilled = await loginPinPage.pinDotFilled;
    await expect(pitDotFilled).toHaveCount(8);
  });

  /*test("A4 - Clicking red reset button should erase any inputs made", async ({
    page,
  }) => {
    const loginPinPage = new LoginPinPage(page);
    await loginPinPage.enterPin("12345678");
    await loginPinPage.clearInputButton.click();
    await loginPinPage.pinDotFilled.should("have.length", 0);
  });

  test("A5 - Settings dropdown should show option to Scramble numberpad and option to stay unlocked", async ({
    page,
  }) => {
    const loginPinPage = new LoginPinPage(page);
    await loginPinPage.goToSettings();
    await loginPinPage.scrambleKeypadLabel
      .should("exist")
      .and("contain", "Scramble keypad?");
    await loginPinPage.stayUnlockedLabel
      .should("exist")
      .and("contain", "Stay unlocked?");
  });

  test("A6, A7 - Scramble Keypad will change the order of pin input buttons", async ({
    page,
  }) => {
    const loginPinPage = new LoginPinPage(page);
    await loginPinPage.goToSettings();
    await loginPinPage.clickScrambleKeypadSwitch();
    await loginPinPage.pinKeypad.should(
      "have.attr",
      "data-keyorder",
      "1,2,3,4,5,6,7,8,9,0",
    );

    await loginPinPage.clickScrambleKeypadSwitch();
    await loginPinPage.pinKeypad
      .its("data-keyorder")
      .should("not.eq", "1,2,3,4,5,6,7,8,9,0");
  });

  // Cannot be automated at this moment
  test.skip("A8 - If Stay Unlocked is toggled on, user should bypass PIN page when logging in", async ({
    page,
  }) => {});

  test("A10 - User can see menu to switch to a different profile", async ({
    page,
  }) => {
    const loginPinPage = new LoginPinPage(page);
    await loginPinPage.changeUserButton.click();
    await loginPinPage.selectProfileModal.should("be.visible");
    await loginPinPage.selectProfileLabel.should("have.text", "Profiles");
    await loginPinPage.selectProfileUserName
      .eq(0)
      .should("have.text", "Space Kev");
    await loginPinPage.selectProfileUserName
      .eq(1)
      .should("have.text", "Sara Saturn");
  });

  // Cannot be automated at this moment
  test.skip("A12 - If incorrect pin is entered, error message should be displayed", async ({
    page,
  }) => {});*/
});
