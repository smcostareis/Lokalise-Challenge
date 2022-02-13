//This PO is not being used

import { Page } from "@playwright/test";

export class SignInPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page
  }

  //Locators
  eleEmail = '[placeholder="user\@company\.com"]'
  elePassword = '[placeholder="password"]'
  eleSignInBtn = 'button:has-text("Log in")'

  //Actions
  public async signIn(email: string, password: string) {
    await this.enterEmail(email)
    await this.enterPassword(password)
    await this.clickSignInBtn()
  }

  public async enterEmail(email: string) {
    await this.page.fill(this.eleEmail, email);
  }

  public async enterPassword(password: string) {
    await this.page.fill(this.elePassword, password);
  }

  public async clickSignInBtn() {
    await this.page.click(this.eleSignInBtn);
  }
}