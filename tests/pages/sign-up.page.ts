import { Page } from "@playwright/test";
import { faker } from "@faker-js/faker";
export class SignUpPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  //Locators
  fullName = '[placeholder="Your full name"]';
  email = '[placeholder="you@company.com"]';
  password = '[placeholder="password"]';
  signUpBtn = 'button:has-text("Sign Up")';
  companyName = "#company";
  companySize = 'select[name="companySize"]';
  continueWelcomeBtn = 'button:has-text("Continue")';
  kindOfWork = 'button[aria-label="Software engineer"]';
  mainGoal = 'button[aria-label="Other"]';
  whereContent = 'button[aria-label="Other"]';
  completeSignUpBtn = 'button:has-text("Complete sign up")';

  //Actions
  public async navigateToSignUpPage() {
    await this.page.goto("/signup", { waitUntil: "load" });
  }

  public async completeSignUp() {
    await this.page.waitForSelector(this.fullName, { state: "visible" });
    await this.page.fill(this.fullName, faker.name.firstName());
    await this.page.fill(this.email, faker.internet.email());
    await this.page.fill(this.password, faker.internet.password(9));
    await this.page.click(this.signUpBtn);
    await this.onboarding();
  }

  public async onboarding() {
    await this.page.waitForSelector(this.companyName, { state: "visible" });
    await this.page.fill(this.companyName, faker.company.companyName());
    await this.page.locator(this.companySize).selectOption("1");
    await this.page.click(this.continueWelcomeBtn);
    await this.page.waitForSelector(this.kindOfWork, { state: "visible" });
    await this.page.click(this.kindOfWork);
    await this.page.click(this.mainGoal);
    await this.page.click(this.whereContent);
    await this.page.click(this.completeSignUpBtn);
    await this.page.waitForSelector("text=Quick start", { state: "visible" });
  }
}
