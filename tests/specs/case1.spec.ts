import { test, expect, Page } from "@playwright/test";
import { ProjectPage } from "../pages/project.page";
import { SignUpPage } from "../pages/sign-up.page";

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  const signUp = new SignUpPage(page);
  const project = new ProjectPage(page);

  await signUp.navigateToSignPage();
  await signUp.completeSignUp();
  await project.navigateToLandingPage();
  await expect(page).toHaveURL("/projects");
});

test("Case 1: Add first project", async () => {
  const project = new ProjectPage(page);

  await project.createFirstProject();
  await expect(page.locator(project.projectEditorview)).toBeVisible();
  await project.navigateToLandingPage();
  await expect(page.locator(project.sidebarProjects)).toHaveCount(1);
});

test.afterAll(async () => {
  await page.close();
});
