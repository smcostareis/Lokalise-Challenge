import { test, expect, Page } from "@playwright/test";
import { ProjectPage } from "../pages/project.page";
import { SignUpPage } from "../pages/sign-up.page";

let page: Page;
test.describe.configure({ mode: "serial" });

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  const signUp = new SignUpPage(page);
  const project = new ProjectPage(page);

  await signUp.navigateToSignUpPage();
  await signUp.completeSignUp();
  await project.navigateToLandingPage();
  await project.createFirstProject();

  await project.navigateToProjectPage();
  await expect(page.locator(project.sidebarProjects)).toHaveCount(1);
});

test.afterAll(async () => {
  await page.close();
});

test.describe("Case 3: Add first key", () => {
  test("Add key with just required fields", async () => {
    const project = new ProjectPage(page);
    await project.createFirstKey();

    await expect(page.locator(project.projectHearder)).toBeVisible();
    await expect(page.locator(project.projectKeyCount)).toHaveCount(1);
  });
});
