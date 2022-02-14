import { Page } from "@playwright/test";
import { faker } from "@faker-js/faker";
export class SignUpPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  //Locators
  eleFullName = '[placeholder="Your full name"]';
  eleEmail = '[placeholder="you@company.com"]';
  elePassword = '[placeholder="password"]';
  eleSignUpBtn = 'button:has-text("Sign Up")';
  eleCompanyName = '[id="company"]';
  eleCompanySize = 'select[name="companySize"]';
  eleContinueWelcomeBtn = 'button:has-text("Continue")';
  eleKindOfWork = 'button[aria-label="Software engineer"]';
  eleMainGoal = 'button[aria-label="Other"]';
  eleWhereContent = 'button[aria-label="Other"]';
  eleCompleteSignUpBtn = 'button:has-text("Complete sign up")';

  //Actions
  public async navigateToSignPage() {
    await this.page.goto("/signup", { waitUntil: "load" });
  }

  public async completeSignUp() {
    await this.page.waitForSelector(this.eleFullName, { state: "visible" });
    await this.page.fill(this.eleFullName, faker.name.firstName());
    await this.page.fill(this.eleEmail, faker.internet.email());
    await this.page.fill(this.elePassword, faker.internet.password(9));
    await this.page.click(this.eleSignUpBtn);
    await this.onboarding();
  }

  public async onboarding() {
    await this.page.fill(this.eleCompanyName, faker.company.companyName());
    await this.page.locator(this.eleCompanySize).selectOption("1");
    await this.page.click(this.eleContinueWelcomeBtn);
    await this.page.click(this.eleKindOfWork);
    await this.page.click(this.eleMainGoal);
    await this.page.click(this.eleWhereContent);
    await this.page.click(this.eleCompleteSignUpBtn);
    await this.page.waitForSelector("text=Quick start", { state: "visible" });
  }
}
