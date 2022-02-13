import { expect, Page } from "@playwright/test";
import { faker } from "@faker-js/faker";

export class ProjectPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  projName = `Lokalise ${faker.commerce.productName()}`;

  //Locators
  projectNavItem = '[class="nav-item nav-item--first"]';
  projectLinkButton = 'a:has-text("Lokalise")';
  proceedButton = 'button:has-text("Proceed")';
  addFirstProjectButton = '[data-target="#addproject"]';
  newProjectButton = '[data-action="add-project"]';
  projectNameInput = '[name="name"]';
  targetLangSelect = 'div[class*="Select__value-container--is-multi"]';
  langOption = "#react-select-3-option-340";
  projectEditorview = 'div[class*="editor-result"]';
  sidebarProjects = '[data-name="project-sidebar"]';
  lastProjectAdded =
    "project-list > div > div > div:nth-child(2) > div:nth-child(2) > div > div> div > a";
  projectHearder = '[class="project-header-adapter"]';
  addKeyButton = '[aria-label="Add first key"]';
  keyName = "#keyName";
  platformsInput = "#s2id_autogen6";
  platformOption = 'div[role="option"]:has-text("Web")';
  saveKeyEditorButton = "#btn_addkey";
  projectKeyCount = '[class*="edit-key"]';
  enTranslationButton = '[data-lang-id="640"] [class="highlight-wrapper"] div';
  ptTranslationButton = '[data-lang-id="1057"] [class="highlight-wrapper"] div';
  enPluralOneBtn = '[data-lang-id="640"] [data-lokalise-editor-plural="one"]';
  enPluralOtherBtn =
    '[data-lang-id="640"] [data-lokalise-editor-plural="other"]';
  ptPluralOneBtn = '[data-lang-id="1057"] [data-lokalise-editor-plural="one"]';
  ptPluralOtherBtn =
    '[data-lang-id="1057"] [data-lokalise-editor-plural="other"]';
  translationInput = "textarea";
  pluralOneInput = '[data-lokalise-editor-plural="one"] textarea';
  pluralOtherInput = '[data-lokalise-editor-plural="other"] textarea';
  saveTranslationButton = 'button[class*="save"]';
  translationDone = 'span:has-text("100%")';
  keyAdvancedMenu = "#advanced_tab";
  pluralSwitch = 'div[class*="bootstrap-switch-id-theplural_switch"]';
  customPluralSwitch = 'div[class*="bootstrap-switch-id-theplural_key_switch"]';

  //Actions
  public async addFirstProject() {
    await this.page.click(this.addFirstProjectButton);
    await this.fillAddProjectModal();
  }

  public async addNewProjects() {
    await this.page.click(this.newProjectButton);
    await this.fillAddProjectModal();
  }

  public async fillAddProjectModal() {
    await this.page.fill(this.projectNameInput, this.projName);
    await this.page.locator(this.targetLangSelect).fill("Portug");
    await this.page.click(this.langOption);
    await this.page.click(this.proceedButton);
  }

  public async addFirstKey() {
    await this.page.click(this.projectLinkButton);
    await this.page.click(this.addKeyButton);
    await this.page.fill(this.keyName, faker.commerce.productName());
    await this.page.fill(this.platformsInput, "Web");
    await this.page.click(this.platformOption);
    await this.page.click(this.saveKeyEditorButton);
  }

  public async addPluralKey() {
    await this.page.click(this.projectLinkButton);
    await this.page.click(this.addKeyButton);
    await this.page.fill(this.keyName, faker.commerce.productName());
    await this.page.fill(this.platformsInput, "Web");
    await this.page.click(this.platformOption);
    await this.page.click(this.keyAdvancedMenu);
    await this.page.click(this.pluralSwitch);
    await this.page.click(this.customPluralSwitch);
    await this.page.click(this.saveKeyEditorButton);
  }

  public async addTranslation() {
    await this.page.click(this.enTranslationButton);
    await this.page.fill(this.translationInput, "Hello");
    await this.page.click(this.saveTranslationButton);
    await this.page.waitForSelector(this.saveTranslationButton, {
      state: "hidden",
    });
    await this.page.waitForSelector("text=Hello", { state: "visible" });

    await this.page.click(this.ptTranslationButton);
    await this.page.fill(this.translationInput, "Olá");
    await this.page.click(this.saveTranslationButton);
    await this.page.waitForSelector(this.saveTranslationButton, {
      state: "hidden",
    });
    await this.page.waitForSelector("text=Olá", { state: "visible" });
  }

  public async addPluralTranslation() {
    await this.page.click(this.enPluralOneBtn);
    await this.page.fill(this.pluralOneInput, "Hello");
    await this.page.click(this.saveTranslationButton);

    await this.page.click(this.enPluralOtherBtn);
    await this.page.fill(this.pluralOtherInput, "Hey");
    await this.page.click(this.saveTranslationButton);

    await this.page.click(this.ptPluralOneBtn);
    await this.page.fill(this.pluralOneInput, "Olá");
    await this.page.click(this.saveTranslationButton);

    await this.page.click(this.ptPluralOtherBtn);
    await this.page.fill(this.pluralOtherInput, "Oi");
    await this.page.click(this.saveTranslationButton);

    await this.page.waitForSelector(this.saveTranslationButton, {
      state: "hidden",
    });
  }

  public async waitProjectPageLoadTranslations() {
    await this.goToProjectsPage();
    await this.goToProject();
    await this.page.waitForSelector(this.enTranslationButton, {
      state: "visible",
    });
    // await expect(this.page.locator(this.enTranslationButton)).toHaveText('Hello');
    // await expect(this.page.locator(this.ptTranslationButton)).toHaveText('Olá');
    await this.goToProjectsPage();
  }

  public async goToProjectsPage() {
    await this.page.click(this.projectNavItem);
    await this.page.waitForSelector("text=Lokalise", { state: "visible" });
    await this.page.click(this.projectLinkButton);
    await this.page.waitForSelector("text=Olá", { state: "visible" });
    await this.page.click(this.projectNavItem);
  }
  public async goToProject() {
    await this.page.click(this.projectLinkButton);
  }
}
