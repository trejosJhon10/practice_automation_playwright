import { Locator, Page, expect } from '@playwright/test'
import { confirm_dialog, dismiss_dialog } from '../utils/utility'
import { LOGOUT_MESSAGE_DIALOG } from '../constants'

export class DashBoardPage {
    readonly page: Page
    readonly totalBalanceCard: Locator
    readonly activeAccountsCard: Locator
    readonly totalTransactionsCard: Locator
    readonly logOutBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.totalBalanceCard = page.getByTestId('total-balance-card')
        this.activeAccountsCard = page.getByTestId('accounts-count-card')
        this.totalTransactionsCard = page.getByTestId('transactions-count-card')
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

}