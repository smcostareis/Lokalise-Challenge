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
  await project.createPluralKey();

  await expect(page.locator(project.projectHearder)).toBeVisible();
  await expect(page.locator(project.projectKeyCount)).toHaveCount(2);
});

test.afterAll(async () => {
  await page.close();
});

test.describe("Case 5: Add translation for plural key", () => {
  test("Add translation for plural key", async () => {
    const project = new ProjectPage(page);

    await project.createPluralTranslation();
    await expect(page.locator(project.enPluralOneBtn)).toHaveText("Hello");
    await expect(page.locator(project.ptPluralOneBtn)).toHaveText("Olá");
    await expect(page.locator(project.enPluralOtherBtn)).toHaveText("Hey");
    await expect(page.locator(project.ptPluralOtherBtn)).toHaveText("Oí");
    await project.waitTranslationsToRender();
    await expect(page.locator(project.translationDone)).toHaveCount(3);
  });
});
