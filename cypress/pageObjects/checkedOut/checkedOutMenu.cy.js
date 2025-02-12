import COSelector from "./checkOutSelector.json"

export class titlePage {

    static checkoutPage() {
        cy.get(COSelector.titlePage).should('have text', 'Checkout: Your Information');
    }

    static overviewPage() {
        cy.get(COSelector.titlePage).should('have text', 'Checkout: Overview');
    }

    static completePage() {
        cy.get(COSelector.titlePage).should('have text', 'Checkout: Complete!');
    }
}

export class checkOutAction {
    static fillForm (firstName, lastName, postalCode) {
    
    }
}