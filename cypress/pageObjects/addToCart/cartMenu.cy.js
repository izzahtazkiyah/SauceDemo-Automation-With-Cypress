import cartSelector from "./cartSelector.json"

export class cartPage {
    static yourCartPage() {
        cy.get(cartSelector.cartIcon).click();
        // cy.get(cartSelector.titlePage).should('have text', 'Your Chart');
    }

    static validationCart(product) {
        cy.contains(cartSelector.inventoryName, product).should('exist');
    }

    static validationCartForMultiItem (products) {
        products.forEach((product) => {
            cy.contains(cartSelector.inventoryName, product).should('exist');
        })
    }
}

export class numberOfShopingCart {
    static cartCountBefore = 0;

    static cartBadgeStart () {
        cy.get('body').then(($body) => {
            if($body.find(cartSelector.numberOfProduct).length > 0){
                cy.get(cartSelector.numberOfProduct).invoke('text').then((cartCountBefore) => {
                    const count = parseInt(cartCountBefore) || 0;
                    Cypress.env('cartCountBefore', count);
                })
            } else {
                Cypress.env('cartCountBefore', 0)
            }
        })
    }

    static verifyCartBadgeAfterAdd () {
        cy.get('body').then(($body) => {
            if($body.find(cartSelector.numberOfProduct).length > 0) {
                cy.get(cartSelector.numberOfProduct)
                .should('be.visible')
                .invoke('text')
                .then((cartcountAfter) => {
                    const countAfter = parseInt(cartcountAfter) || 0;
                    const countBefore = Cypress.env('cartCountBefore') || 0;
                    expect(countAfter).to.equal(countBefore + 1);
                    Cypress.env('cartCountBefore', countAfter);
                })
            } else {
                expect(Cypress.env('cartCountBefore')).to.equal(0);
            }
        })
    }

    static verifyCartBadgeAfterRemove () {
        cy.get('body').then(($body) => {
            if($body.find(cartSelector.numberOfProduct).length > 0) {
                cy.get(cartSelector.numberOfProduct)
                .should('be.visible')
                .invoke('text')
                .then((cartCountAfterRemove) => {
                    const countAfterRemove = parseInt(cartCountAfterRemove) || 0;
                    const countBefore = Cypress.env('cartCountBefore') || 0;
                    expect(countAfterRemove).to.equal(countBefore - 1);
                    Cypress.env('cartCountBefore', countAfterRemove);
                })
            } else {
                cy.get(cartSelector.numberOfProduct).should('not.exist');
                Cypress.env('cartCountBefore', 0);
            }
        })
    }
}

export class removeItem {

    static removeOneItem (product) {
        numberOfShopingCart.cartBadgeStart();
        cy.contains(cartSelector.inventoryName, product)
        .parents(cartSelector.cartItem)
        .find(cartSelector.removeButton)
        .should('be.visible').click();

        this.verifyButtonRemove(product);

        numberOfShopingCart.verifyCartBadgeAfterRemove();

    }

    static removeMultipleItem (products) {
        products.forEach((product) => {
            numberOfShopingCart.cartBadgeStart();
            cy.contains(cartSelector.inventoryName, product)
            .parents(cartSelector.cartItem)
            .find(cartSelector.removeButton)
            .should('be.visible').click();

            this.verifyButtonRemove(products);

            numberOfShopingCart.verifyCartBadgeAfterRemove();

        })
    }

    static verifyButtonRemove (product) {
        cy.contains(cartSelector.inventoryName, product).should('not.exist');
    }
}

export class continueShopping {

}

export class checkOutAction {

}

export default {cartPage, numberOfShopingCart, removeItem, continueShopping, checkOutAction}