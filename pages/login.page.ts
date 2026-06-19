import { Locator, Page } from '@playwright/test'

export class LoginPage {
    readonly page: Page
    readonly userNameInput: Locator
    readonly passwordInput: Locator
    readonly loginButton: Locator
    readonly base_url = "https://qaplayground.com/bank"

    constructor(page: Page) {
        this.page = page
        this.userNameInput = page.getByRole('textbox', { name: 'username' })
        this.passwordInput = page.getByRole('textbox', { name: 'password' })
        this.loginButton = page.getByTestId('login-button')
    }

    async navigate_to_base_url() {
        await this.page.goto(this.base_url)
    }

    async login(userName: string, password: string) {
        await this.userNameInput.fill(userName)
        await this.passwordInput.fill(password)
        await this.loginButton.click()
    }

}