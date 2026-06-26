import { Locator, Page } from '@playwright/test'
import { extractNumberFromString, waitForStableText } from '../utils/utility'

export class DashBoardPage {
    readonly page: Page
    readonly totalBalanceCard: Locator
    readonly totalBalanceValue: Locator 
    readonly activeAccountsCard: Locator
    readonly totalTransactionsCard: Locator
    readonly addAccountBtn: Locator
    readonly newTransactionBtn: Locator
    readonly viewAllAccountsBtn: Locator
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
        this.viewAllAccountsBtn = page.getByTestId('quick-view-accounts')
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

    async clickNewTransaction() {
        await this.newTransactionBtn.click()
    }

    async clickViewAllAccountsBtn(){
        await this.viewAllAccountsBtn.click()
    }

    async obtainTotalBalance(){
        await waitForStableText(this.totalBalanceValue);
        return extractNumberFromString(await this.totalBalanceValue.innerText())
    }

    async getNumberOfActiveAccounts(){
        await waitForStableText(this.totalBalanceValue);
        return Number(await this.activeAccountsCard.getByTestId('accounts-count').innerText())
    }

    async getNumberOfPinnedAccounts(){
        await waitForStableText(this.totalBalanceValue)
        await this.pinnedAccountSection.scrollIntoViewIfNeeded()
        
        return await this.pinnedAccountSection.getByTestId(/^draggable-account-id/).count()
    }

    async getNumberOfAccountsOverView(){
        await waitForStableText(this.totalBalanceValue)
        await this.accountsOverviewSection.scrollIntoViewIfNeeded()
        
        return await this.accountsOverviewSection.locator('div.bg-card').count()
    }

    async getPinnedAccountInfo(accountName: string){
        await this.pinnedAccountSection.scrollIntoViewIfNeeded()

        const pinnedAccountCard = this.pinnedAccountSection.getByTestId(/^draggable-account-id/).filter({ hasText: accountName})

        const accountNameDisplayed = await pinnedAccountCard.locator('[id^="pinned-account-name-id"]').innerText()
        const accountBalance = await pinnedAccountCard.locator('[id^="pinned-account-balance-id"]').innerText()
        const accountDetails = await pinnedAccountCard.locator('div>p:last-of-type').innerText()
        const accountType = accountDetails.split('•')[0].trim()
        const accountNumber = accountDetails.split('•')[1].trim()
        
        return {accountNameDisplayed, accountBalance, accountType, accountNumber}
    }

    async getAccountsoverviewAccountInfo(accountName: string){
        await this.accountsOverviewSection.scrollIntoViewIfNeeded()

        const accountOverviewCard = this.accountsOverviewSection.locator('div.bg-card').filter({ hasText: accountName})

        const accountStatus = await accountOverviewCard.locator('div>div.inline-flex').innerText()
        const accountNameDisplayed = await accountOverviewCard.locator('[id^="account-name-id"]').innerText()
        const accountBalance = await accountOverviewCard.locator('[id^="account-balance-id"]').innerText()
        const accountDetails = await accountOverviewCard.locator('[id^="account-details-id"]').innerText()
        const accountType = accountDetails.split('•')[0].trim()
        const accountNumber = accountDetails.split('•')[1].trim()

        return {accountStatus, accountNameDisplayed, accountBalance, accountType, accountNumber}
    }
}