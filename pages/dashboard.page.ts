import { Locator, Page, expect } from '@playwright/test'
import { confirm_dialog, dismiss_dialog } from '../utils/utility'
import { LOGOUT_MESSAGE_DIALOG } from '../constants'

export class DashBoardPage {
    readonly page: Page
    readonly totalBalanceCard: Locator
    readonly totalBalanceValue: Locator 
    readonly activeAccountsCard: Locator
    readonly totalTransactionsCard: Locator
    readonly addAccountBtn: Locator
    readonly logOutBtn: Locator
    readonly pageContainer: Locator

    constructor(page: Page) {
        this.page = page
        this.totalBalanceCard = page.getByTestId('total-balance-card')
        this.totalBalanceValue = this.totalBalanceCard.getByTestId('total-balance')
        this.activeAccountsCard = page.getByTestId('accounts-count-card')
        this.totalTransactionsCard = page.getByTestId('transactions-count-card')
        this.addAccountBtn = page.getByTestId('quick-add-account')
        this.pageContainer = page.locator('#dashboard-page-container')
        this.logOutBtn = page.getByRole('button', { name: 'Logout' });
    }

    async logout() {
        confirm_dialog(this.page, LOGOUT_MESSAGE_DIALOG)
        await this.logOutBtn.click()
    }

    async cancelLogOut(){
        dismiss_dialog(this.page, LOGOUT_MESSAGE_DIALOG)
        await this.logOutBtn.click()
    }

    async clickAddAccountBtn() {
        await this.addAccountBtn.click()
    }
    async obtainTotalBalance(){
        await this.page.waitForTimeout(3000)
        const rawText = await this.totalBalanceValue.innerText()
        return parseFloat(rawText.replace(/[^0-9.]/g,''))
    }
}