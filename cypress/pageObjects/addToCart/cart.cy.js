import cartSelector from "./cartSelector.json"

export class cartPage {
    static yourCartPage() {
        cy.get(COSelector.titlePage).should('have text', 'Your Chart');
    }
}
