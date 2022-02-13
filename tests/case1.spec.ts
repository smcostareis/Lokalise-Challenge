import { test, expect, Page } from '@playwright/test';
import { ProjectPage } from '../pages/project.page';
import { SignUpPage } from '../pages/sign-up.page';

let page: Page;
test.describe.configure({ mode: 'serial' });

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  const signUp = new SignUpPage(page)

  await page.goto('/signup', { waitUntil: 'load' });
  await signUp.signUp()
  await expect(page).toHaveURL('/projects');
});

test.afterAll(async () => {
  await page.close();
});

test.describe('Case 1: Add first project', () => {

  test('Add project with just required fields', async () => {
    const project = new ProjectPage(page);

    await project.addFirstProject()
    
    await expect(page.locator(project.projectEditorview)).toBeVisible();
    await page.goto('/projects', { waitUntil: 'load' })
    await expect(page.locator(project.sidebarProjects)).toHaveCount(1);
  });
});