import { sorting, viewDetail, addProductToCart, removeProductFromCart } from "../pageObjects/products/productMenu.cy";
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

    it('Back to Home Page', () => {
        viewDetail.viewDetailProduct('productName');
        viewDetail.backToHome();
    })
})

describe('Add Product to Cart', () => {
    const products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];
    const removeProduct = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];
    beforeEach( () => {
        cy.viewport(1280, 720);
        cy.visit('', 100000);
        loginMenu.login(account.username.standart_user, account.password);
    })

    it('Add One Product to Cart from Product Page', () => {
        addProductToCart.oneProduct(products[0]);
    })

    it('Add Multiple Product to Cart from Product Page', () => {
        addProductToCart.multipleProduct(products)
    })

    it('Remove One Product After Add One Product from Product Page', () => {
        addProductToCart.oneProduct(products[0]);
        removeProductFromCart.oneProduct(removeProduct[0]);
    })

    it('Remove One Product After Add Multiple Product from Product Page', () => {
        addProductToCart.multipleProduct(products);
        removeProductFromCart.oneProduct(removeProduct[0]);
    })

    it.only('Remove Multiple Product After Add Multiple Product from Product Page', () => {
        addProductToCart.multipleProduct(products);
        // removeProductFromCart.multipleProduct(removeProduct);
        removeProductFromCart.oneProduct(removeProduct[0]);
        removeProductFromCart.oneProduct(removeProduct[1]);
        removeProductFromCart.oneProduct(removeProduct[2]);
    }) 

    it('Add Product After Remove', () => {
        addProductToCart.oneProduct(products[0]);
        removeProductFromCart.oneProduct(products[0]);
        addProductToCart.oneProduct(products[1]);
    })

})