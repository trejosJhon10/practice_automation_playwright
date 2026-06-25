import { Locator, Page } from '@playwright/test'
import { expect } from '../fixtures/expect.fixture'
import { NEW_ACCOUNT_SUCCESS_MESSAGE } from '../test-data/constants'

export class AccountsPage {
    readonly page: Page;
    readonly newAccountModal: Locator
    readonly accountNameInput: Locator
    readonly accountTypeSelect: Locator
    readonly initialBalanceInput: Locator
    readonly statusActiveRadioBtn: Locator
    readonly statusInactiveRadioBtn: Locator
    readonly overdraftCheckbox: Locator
    readonly newAccountCancelBtn: Locator
    readonly newAccountSaveBtn: Locator
    readonly newAccountSuccessToast: Locator
    readonly accountsTable: Locator
    
    constructor(page: Page) {
        this.page = page
        this.newAccountModal = page.getByTestId('account-modal')
        this.accountNameInput = page.getByTestId('account-name-input')
        this.accountTypeSelect = page.getByTestId('account-type-select')
        this.initialBalanceInput = page.getByTestId('initial-balance-input')
        this.statusActiveRadioBtn = page.getByTestId('status-active-radio')
        this.statusInactiveRadioBtn = page.getByTestId('status-inactive-radio')
        this.overdraftCheckbox = page.getByTestId('overdraft-checkbox')
        this.newAccountCancelBtn = page.getByTestId('cancel-button')
        this.newAccountSaveBtn = page.getByTestId('save-account-button')
        this.newAccountSuccessToast = page.locator('li[data-type="success"]')
        this.accountsTable = page.getByTestId('accounts-table')
    }
    async setAccountName(name:string){
        await this.accountNameInput.fill(name)
    }

    async selectAccountType(option: 'Savings Account'|'Checking Account'|'Credit Card') {
        await this.accountTypeSelect.click();
        await this.page.getByRole('option').getByText(option).click();
    }

    async setInitialAccountBalance(balance:number){
        await this.initialBalanceInput.fill(balance.toString())
    }

    async setAccountStatus(status: 'Active'|'Inactive'){
        await this[`status${status}RadioBtn`].click()
    }

    async toggleOverdraftCheckbox(){
        await this.overdraftCheckbox.check()
    }

    async cancelNewAccount(){
        await this.newAccountCancelBtn.click()
    }

    async saveNewAccount(){
        await this.newAccountSaveBtn.click()
    }
    
    async waitForSuccessToast(){
        await expect(this.newAccountSuccessToast).toBeVisible()
        expect(await this.newAccountSuccessToast.textContent()).toBe(NEW_ACCOUNT_SUCCESS_MESSAGE)
        await expect(this.newAccountSuccessToast).toBeHidden()
    }

    async getAccountsTableRowByValue(text: string){
        const targetRow = this.accountsTable.getByTestId(/^account-row-/).filter({ hasText: text}) //
        return targetRow
    }
}