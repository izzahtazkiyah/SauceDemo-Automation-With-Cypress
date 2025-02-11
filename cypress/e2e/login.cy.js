import loginMenu from "../pageObjects/login/loginMenu.cy";
import account from "../fixtures/account.json"

describe('Successfully Login', () => {
    beforeEach( () => {
        cy.viewport(1280, 720);
        cy.visit('', 100000);
    })

    it('Succesfully Login', () => {
        loginMenu.login(account.username.standart_user, account.password);
    })
})

describe('Unsuccesfully Login', () => {
    beforeEach( () => {
        cy.viewport(1280, 720);
        cy.visit('', 100000);
    })

    it('Use Locked Out User Account', () => {
        loginMenu.login(account.username.locked_out_user, account.password);
        loginMenu.errorMessages().should('contain', 'Epic sadface: Sorry, this user has been locked out.');
    })

    it('Username is empty', () => {
        loginMenu.emptyUsername(account.password);
        loginMenu.errorMessages().should('contain', 'Epic sadface: Username is required');
    })

    it('Password is empty', () => {
        loginMenu.emptyPassword(account.username.standart_user);
        loginMenu.errorMessages().should('contain', 'Epic sadface: Password is required');
    })
})