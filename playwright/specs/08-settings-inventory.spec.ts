import { test, expect } from "../fixtures/setup";

test.describe("Settings Inventory Tests", () => {
  const username = "test123";
  const status = "fixed status";

  test.beforeEach(
    async ({
      createOrImport,
      authNewAccount,
      loginPinPage,
      saveRecoverySeed,
      chatsMainPage,
      settingsProfile,
      page,
    }) => {
      // Select Create Account
      await createOrImport.navigateTo();
      await createOrImport.clickCreateNewAccount();

      // Enter Username and Status
      await authNewAccount.validateLoadingHeader();
      await authNewAccount.typeOnUsername(username);
      await authNewAccount.typeOnStatus(status);
      await authNewAccount.buttonNewAccountCreate.click();

      // Enter PIN
      await loginPinPage.waitUntilPageIsLoaded();
      await loginPinPage.enterDefaultPin();

      // Click on I Saved It
      await saveRecoverySeed.buttonSavedPhrase.waitFor({ state: "attached" });
      await saveRecoverySeed.clickOnSavedIt();
      await chatsMainPage.addSomeone.waitFor({ state: "visible" });
      await page.waitForURL("/chat");

      await chatsMainPage.goToSettings();
      await page.waitForURL("/settings/profile");

      await settingsProfile.buttonInventory.click();
      await page.waitForURL("/settings/inventory");
    },
  );

  test("J1 - Page should display items purchased from Marketplace", async ({
    settingsInventory,
  }) => {
    const expectedFrames = [
      { name: "Moon", type: "Profile Picture Frame" },
      { name: "Skull Dance", type: "Profile Picture Frame" },
      { name: "Kitsune", type: "Profile Picture Frame" },
      { name: "Gamer Headset", type: "Profile Picture Frame" },
      { name: "Doom", type: "Profile Picture Frame" },
      { name: "Ice", type: "Profile Picture Frame" },
      { name: "Elegant", type: "Profile Picture Frame" },
      { name: "Foxy", type: "Profile Picture Frame" },
      { name: "Cat Ears", type: "Profile Picture Frame" },
      { name: "Gems", type: "Profile Picture Frame" },
      { name: "Dragonborn", type: "Profile Picture Frame" },
      { name: "Scale Friends", type: "Profile Picture Frame" },
      { name: "Magma", type: "Profile Picture Frame" },
      { name: "Marble", type: "Profile Picture Frame" },
      { name: "Nature", type: "Profile Picture Frame" },
      { name: "Quaint", type: "Profile Picture Frame" },
      { name: "Robot", type: "Profile Picture Frame" },
      { name: "Stone", type: "Profile Picture Frame" },
    ];

    await settingsInventory.validateInventoryFrames(expectedFrames);
  });

  test("J2 - After user selects Profile Picture Frame it should be properly displayed everywhere in the app where the user's profile picture appears", async ({
    settingsInventory,
    settingsProfile,
  }) => {
    // Equip Quaint inventory frame
    await settingsInventory.equipFrame("Quaint");

    // Validate the frame is equipped and displayed correctly
    await settingsInventory.validateEquippedFrame("Quaint");

    // Navigate to Profile page and verify frame is displayed
    await settingsInventory.buttonProfile.click();

    await expect(settingsProfile.profileImageFrame).toHaveAttribute(
      "src",
      "https://cdn.deepspaceshipping.co/frames/quaint.png",
    );

    // Navigate back to Inventory and unequip the frame
    await settingsProfile.buttonInventory.click();
    await settingsInventory.unequipFrame("Quaint");

    // Validate the frame is unequipped
    await settingsInventory.buttonProfile.click();
    await settingsProfile.profileImageFrame.waitFor({ state: "detached" });
  });

  test("J3, J4, J5, J6 - Equipping and unequipping inventory item", async ({
    settingsInventory,
  }) => {
    // Equip Quaint inventory frame
    await settingsInventory.equipFrame("Quaint");

    // Validate equipped frame
    await expect(settingsInventory.inventoryFrameEquippedButton).toHaveCSS(
      "background-color",
      "rgb(77, 77, 255)",
    );
    await expect(settingsInventory.inventoryFrameEquippedButton).toHaveText(
      "Equipped",
    );

    await expect(settingsInventory.profilePictureFrameName).toHaveText(
      "Quaint",
    );
    await expect(settingsInventory.profilePictureFrameType).toHaveText(
      "Profile Picture Frame",
    );

    // Unequip the frame
    await settingsInventory.unequipFrame("Quaint");
  });
});
