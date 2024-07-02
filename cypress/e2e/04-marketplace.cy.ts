import { faker } from "@faker-js/faker";
import chatsMainPage from "./PageObjects/ChatsMain";
import loginPinPage from "./PageObjects/LoginPin";
import authNewAccount from "./PageObjects/AuthNewAccount";

describe("Marketplace Tests", () => {
  const username =
    faker.person.firstName() + faker.number.int({ min: 100, max: 10000 });
  const status = faker.lorem.sentence(3);

  beforeEach(() => {
    loginPinPage.loginWithPin("1234");
    authNewAccount.createRandomUser(username, status);
    chatsMainPage.validateChatsMainPageIsShown();
  });

  // Marketplace section is gone from the app
  it.skip("D1 - Marketplace modal should appear when user clicks Marketplace", () => {
    chatsMainPage.buttonMarketplace.click();
    cy.contains("Uplink Marketplace").should("exist");
  });

  it.skip("D2 - Clicking Blundles & Packs should navigate you to said page", () => {
    // Test code for D2
  });

  it.skip("D3 - Clicking Staff Picks should navigate you to said page", () => {
    // Test code for D3
  });

  it.skip("D4 - Clicking Recently Updated should navigate you to said page", () => {
    // Test code for D4
  });

  it.skip("D5 - Clicking Most Downloaded should navigate you to said page", () => {
    // Test code for D5
  });

  it.skip("D6 - Clicking Newly Added should navigate you to said page", () => {
    // Test code for D6
  });

  it.skip("D7 - Clicking Community Upgrades should navigate you to said page", () => {
    // Test code for D7
  });

  it.skip("D8 - Clicking Extensions should navigate you to said page", () => {
    // Test code for D8
  });

  it.skip("D9 - Clicking Themes should navigate you to said page", () => {
    // Test code for D9
  });

  it.skip("D10 - Clicking Stickers & Emotes should navigate you to said page", () => {
    // Test code for D10
  });
});
