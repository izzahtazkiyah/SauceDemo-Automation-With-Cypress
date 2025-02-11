import { sorting, viewDetail } from "../pageObjects/products/productMenu.cy";
import loginMenu from "../pageObjects/login/loginMenu.cy";
import account from "../fixtures/account.json";

describe('Sorting Products', () => {
    beforeEach( () => {
        cy.viewport(1280, 720);
        cy.visit('', 100000);
        loginMenu.login(account.username.standart_user, account.password);
    })

    it('Sorting by Name A to Z', () => {
        sorting.selectSortOption('Name (A to Z)');
        sorting.verifySortingByName('asc');
    })

    it('Sorting by Name Z to A', () => {
        sorting.selectSortOption('Name (Z to A)');
        sorting.verifySortingByName('desc');
    })

    it('Sorting by Price (low to high)', () => {
        sorting.selectSortOption('Price (low to high)');
        sorting.verifySortingByPrice('asc');
    })

    it('Sorting by Price (high to low)', () => {
        sorting.selectSortOption('Price (high to low)');
        sorting.verifySortingByPrice('desc');
    })
})

describe('View Detail', () => {
    beforeEach( () => {
        cy.viewport(1280, 720);
        cy.visit('', 100000);
        loginMenu.login(account.username.standart_user, account.password);
    })

    it('View Detail by Click Product Name', () => {
        viewDetail.viewDetailProduct('productName');      
    })

    it('View Detail by Click Product Image', () => {
        viewDetail.viewDetailProduct('productImage');
    })
})