import { Locator, Page } from '@playwright/test'

export class TransactionsPage {

    readonly page: Page
    readonly newTransactionModal: Locator
    readonly newTransactionCancelBtn: Locator
    readonly newTransactionSaveBtn: Locator

    constructor(page: Page){
        this.page = page
        this.newTransactionModal = page.getByTestId('transaction-modal')
        this.newTransactionCancelBtn = page.getByTestId('cancel-transaction-button')
        this.newTransactionSaveBtn = page.getByRole('button', {name: 'Submit Transaction'})
    }

    async cancelNewAccount(){
        await this.newTransactionCancelBtn.click()
    }

    async saveNewAccount(){
        await this.newTransactionSaveBtn.click()
    }
}