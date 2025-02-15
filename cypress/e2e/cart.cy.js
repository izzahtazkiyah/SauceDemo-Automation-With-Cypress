import account from "../fixtures/account.json";
import loginMenu from "../pageObjects/login/loginMenu.cy";
import { viewDetail, addProductToCart } from "../pageObjects/products/productMenu.cy";
import { cartPage, removeItem, continueShopping, checkOutAction} from '../pageObjects/addToCart/cartMenu.cy'

const products      = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];

describe('Test', () => {
    beforeEach( () => {
        cy.viewport(1280, 720);
        cy.visit('', 100000);
        loginMenu.login(account.username.standart_user, account.password);
    })

    it.only('one item', () => {
        addProductToCart.oneProduct(products[0]);
        cartPage.yourCartPage();
        cartPage.validationCart(products[0]);
        removeItem.removeOneItem(products[0]);
    })

    it.only('multiple item', () => {
        addProductToCart.multipleProduct(products);
        cartPage.yourCartPage();
        cartPage.validationCartForMultiItem(products);
        removeItem.removeMultipleItem(products);
    })
})

