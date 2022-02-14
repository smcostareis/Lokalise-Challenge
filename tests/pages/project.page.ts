import { Page } from "@playwright/test";
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
  public async navigateToLandingPage() {
    await this.page.goto("/projects", { waitUntil: "load" });
  }

  public async navigateToProjectPage() {
    await this.page.click(this.projectNavItem);
  }

  public async createFirstProject() {
    await this.page.click(this.addFirstProjectButton);
    await this.fillNewProjectModal();
  }

  public async createNewProjects() {
    await this.page.click(this.newProjectButton);
    await this.fillNewProjectModal();
  }

  public async createFirstKey() {
    await this.fillKeyModal();
    await this.page.click(this.saveKeyEditorButton);
  }

  public async createPluralKey() {
    await this.fillKeyModal();
    await this.page.click(this.keyAdvancedMenu);
    await this.page.click(this.pluralSwitch);
    await this.page.click(this.customPluralSwitch);
    await this.page.click(this.saveKeyEditorButton);
  }

  public async createTranslation() {
    await this.fillTranslationModal(
      this.enTranslationButton,
      this.translationInput,
      "Hello"
    );
    await this.page.waitForSelector("text=Hello", { state: "visible" });
    await this.fillTranslationModal(
      this.ptTranslationButton,
      this.translationInput,
      "Olá"
    );
    await this.page.waitForSelector("text=Olá", { state: "visible" });
  }

  public async createPluralTranslation() {
    await this.fillTranslationModal(
      this.enPluralOneBtn,
      this.pluralOneInput,
      "Hello"
    );
    await this.page.waitForSelector("text=Hello", { state: "visible" });
    await this.fillTranslationModal(
      this.enPluralOtherBtn,
      this.pluralOtherInput,
      "Hey"
    );
    await this.page.waitForSelector("text=Hey", { state: "visible" });
    await this.fillTranslationModal(
      this.ptPluralOneBtn,
      this.pluralOneInput,
      "Olá"
    );
    await this.page.waitForSelector("text=Olá", { state: "visible" });
    await this.fillTranslationModal(
      this.ptPluralOtherBtn,
      this.pluralOtherInput,
      "Oí"
    );
    await this.page.waitForSelector("text=Oí", { state: "visible" });
  }

  public async fillKeyModal() {
    await this.page.click(this.projectLinkButton);
    await this.page.click(this.addKeyButton);
    await this.page.fill(this.keyName, faker.commerce.productName());
    await this.page.fill(this.platformsInput, "Web");
    await this.page.click(this.platformOption);
  }

  public async fillTranslationModal(
    button: string,
    input: string,
    word: string
  ) {
    await this.page.waitForSelector(button, { state: "visible" });
    await this.page.click(button);
    await this.page.waitForSelector(input, { state: "visible" });
    await this.page.fill(input, word);
    await this.page.click(this.saveTranslationButton);
    await this.page.waitForSelector(this.saveTranslationButton, {
      state: "hidden",
    });
  }

  public async fillNewProjectModal() {
    await this.page.fill(this.projectNameInput, this.projName);
    await this.page.locator(this.targetLangSelect).fill("Portug");
    await this.page.click(this.langOption);
    await this.page.click(this.proceedButton);
  }

  public async waitTranslationsToRender() {
    await this.page.click(this.projectNavItem);
    await this.page.waitForSelector("text=Lokalise", { state: "visible" });
    await this.page.click(this.projectLinkButton);
    await this.page.waitForSelector("text=Olá", { state: "visible" });
    await this.page.click(this.projectNavItem);
  }
}
