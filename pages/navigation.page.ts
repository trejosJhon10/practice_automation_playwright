import { Locator, Page} from '@playwright/test'

export class NavigationPage {
    readonly page: Page
    readonly dashboardBtn: Locator
    readonly accountsBtn: Locator
    readonly transactionsBtn: Locator
    readonly usernameInfo: Locator
    readonly logOutBtn: Locator
    constructor(page: Page) {
        this.page = page
        this.dashboardBtn = page.getByTestId('nav-dashboard');
        this.accountsBtn = page.getByTestId('nav-accounts');
        this.transactionsBtn = page.getByTestId('nav-transactions');
        this.usernameInfo = page.getByTestId('user-info').locator('#username-display');
        this.logOutBtn = page.getByRole('button', { name: 'Logout' });
    }
    async gotoDashboard(){
        await this.dashboardBtn.click()
    }
    async gotoAccounts(){
        await this.accountsBtn.click()
    }
    async gotoTransactions(){
        await this.transactionsBtn.click()
    }
}