import { Locator, Page } from '@playwright/test'
import { waitForStableText } from '../utils/utility'

export class DashBoardPage {
    readonly page: Page
    readonly totalBalanceCard: Locator
    readonly totalBalanceValue: Locator 
    readonly activeAccountsCard: Locator
    readonly totalTransactionsCard: Locator
    readonly addAccountBtn: Locator
    readonly newTransactionBtn: Locator
    readonly logOutBtn: Locator
    readonly pageContainer: Locator
    readonly navigationHeader: Locator
    readonly summarySection: Locator
    readonly quickActionsSection: Locator
    readonly quickStatsSection: Locator
    readonly pinnedAccountSection: Locator
    readonly recentTransactionSection: Locator
    readonly accountsOverviewSection: Locator

    constructor(page: Page) {
        this.page = page
        this.totalBalanceCard = page.getByTestId('total-balance-card')
        this.totalBalanceValue = this.totalBalanceCard.getByTestId('total-balance')
        this.activeAccountsCard = page.getByTestId('accounts-count-card')
        this.totalTransactionsCard = page.getByTestId('transactions-count-card')
        this.addAccountBtn = page.getByTestId('quick-add-account')
        this.newTransactionBtn = page.getByTestId('quick-new-transaction')
        this.pageContainer = page.locator('#dashboard-page-container')
        this.logOutBtn = page.getByRole('button', { name: 'Logout' });
        this.navigationHeader = page.getByTestId('main-navbar')
        this.summarySection = page.locator('#summary-section')
        this.quickActionsSection = page.locator('#quick-actions')
        this.quickStatsSection = page.locator('#quick-stats-section')
        this.pinnedAccountSection = page.locator('#pinned-accounts-section')
        this.recentTransactionSection = page.locator('#recent-transactions-section')
        this.accountsOverviewSection = page.locator('#accounts-overview')
    }

    async clickAddAccountBtn() {
        await this.addAccountBtn.click()
    }

    async clicNewTransaction() {
        await this.newTransactionBtn.click()
    }

    async obtainTotalBalance(){
        await waitForStableText(this.totalBalanceValue);
        const rawText = await this.totalBalanceValue.innerText()
        return parseFloat(rawText.replace(/[^0-9.]/g,''))
    }
}