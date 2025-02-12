import productSelector from "./productSelector.json"

export class titlePage {

    static productPage() {
        cy.get(productSelector.productTitle).should('have.text', 'Products');
    }

}

export class sorting {

    static selectSortOption(option){
        cy.get(productSelector.sortingFilter).select(option);
    }

    static getProductNames() {
        return cy.get(productSelector.inventoryName);
    }    

    static getProductPrice(){
        return cy.get(productSelector.inventoryPrice);
    }

    //sorting by Name
    static verifySortingByName(order){
        this.getProductNames().then($items => {
            const names = [...$items].map(item => item.innerText); // Mengambil teks nama product
            const sortedNames = [...names].sort();      //Mengurutkan dari A-Z (Otomatis)
            if(order == 'desc') sortedNames.reverse();  //Mengurutkan dari Z-A

            //Membandingkan hasil UI dengan kode
            expect(names).to.deep.equal(sortedNames);

        })
    }

    //sorting by Price
    static verifySortingByPrice(order){
        this.getProductPrice().then($items => {
            const prices = [...$items].map(item => parseFloat(item.innerText.replace('$', ''))); // Mengambil harga dalam bentuk angka
            const sortedPrices = [...prices].sort((a,b) => a - b);
            if(order=='desc') sortedPrices.reverse();

            expect(prices).to.deep.equal(sortedPrices);
        })
    }
}

export class viewDetail {
    static viewDetailProduct(byClick) {
        if(byClick === 'productName') {
            cy.get(productSelector.inventoryName).first().click();
        } else {
            cy.get(productSelector.inventoryImage).first().click();
        }

        cy.get(productSelector.backButton).should('exist')
    }

    static backToHome(){
        cy.get(productSelector.backButton).click();
        titlePage.productPage();
    }
}

export class addProductToCart {

    static oneProduct (product) {
        numberOfShopingCart.cartBadgeStart();
        cy.contains(productSelector.inventoryName, product)
            .parents(productSelector.inventoryItem)
            .find(productSelector.addCartButton)
            .should("be.visible").click();

        //verify button Add to Cart -> Remove
        this.verifyButton(product);
        numberOfShopingCart.verifyCartBadgeAfterAdd();
    }

    static multipleProduct(products) {

        products.forEach((product) => {
            numberOfShopingCart.cartBadgeStart();

            cy.contains(productSelector.inventoryName, product)
                .parents(productSelector.inventoryItem)
                .find(productSelector.addCartButton)
                .should("be.visible").click();
            

            //verify button Add to Cart -> Remove
            this.verifyButton(product);
            
        });

        numberOfShopingCart.verifyCartBadgeAfterAdd();
            
    }
    
    static verifyButton (product) {
        cy.contains(productSelector.inventoryName, product)
        .parents(productSelector.inventoryItem)
        .find(productSelector.removeButton)
        .should('contain', 'Remove');
    }
}

export class removeProductFromCart{
    static oneProduct (product) {
        numberOfShopingCart.cartBadgeStart();
        cy.contains(productSelector.inventoryName, product)
            .parents(productSelector.inventoryItem)
            .find(productSelector.removeButton)
            .should('be.visible').click();
        this.verifyButton(product);
        numberOfShopingCart.verifyCartBadgeAfterRemove();
    }

    static multipleProduct (products) {
        products.forEach((product) => {
            numberOfShopingCart.cartBadgeStart();
            cy.contains(productSelector.inventoryName, product)
                .parents(productSelector.inventoryItem)
                .find(productSelector.removeButton)
                .should('be.visible').click();
        })
        this.verifyButton(product);
        numberOfShopingCart.verifyCartBadgeAfterRemove();
    }

    static verifyButton (product) {
        cy.contains(productSelector.inventoryName, product)
            .parents(productSelector.inventoryItem)
            .find(productSelector.addCartButton)
            .should('contain', 'Add to cart');
    }
}

export class numberOfShopingCart {

    static cartCountBefore = 0; // inisialisasi bahwa cartCountBefore = 0

    static cartBadgeStart () {
        cy.get('body').then(($body) => {
            // Mencari informasi apakah productSelector.numberOfProduct ada
            if($body.find(productSelector.numberOfProduct).length > 0) {
                cy.get(productSelector.numberOfProduct).invoke('text').then((cartCountBefore) => {
                    const count = parseInt(cartCountBefore) || 0;
                    // this.cartCountBefore = parseInt(cartCountBefore) || 0;
                    Cypress.env('cartCountBefore', count);
                })
            } else {
                // Menentukan bahwa productSelector.numberOfProduct jika tidak ada di body, maka => 0
                Cypress.env('cartCountBefore', 0);
            }
        })
    }

    static verifyCartBadgeAfterAdd () {
        cy.get('body').then(($body) => {
            if($body.find(productSelector.numberOfProduct).length > 0) {
                cy.get(productSelector.numberOfProduct)
                .should('be.visible')
                .invoke('text')
                .then((cartCountAfter) => {
                    const countAfter = parseInt(cartCountAfter) || 0;
                    const countBefore = Cypress.env('cartCountBefore') || 0;
                    expect(countAfter).to.equal( countBefore + 1);
                    Cypress.env('cartCountBefore', countAfter);
                })
            } else {
                expect(Cypress.env('cartCountBefore')).to.equal(0);
            }
        })
    }

    static verifyCartBadgeAfterRemove () {
        cy.get('body').then(($body) => {
            if($body.find(productSelector.numberOfProduct).length > 0) {
                cy.get(productSelector.numberOfProduct)
                    .should('be.visible')
                    .invoke('text')
                    .then((cartCountAfterRemove) => {
                    const countAfterRemove = parseInt(cartCountAfterRemove) || 0;
                    const countBefore = Cypress.env('cartCountBefore') || 1;
                    expect(countAfterRemove).to.equal(countBefore - 1);
                    Cypress.env('carCountBefore', countAfterRemove);
                })
            } else {
                cy.get(productSelector.numberOfProduct).should('not.exist');
                Cypress.env('cartCountBefore', 0);
            }
        })
        
    }
}

export default { titlePage , sorting, viewDetail, addProductToCart, removeProductFromCart, numberOfShopingCart };