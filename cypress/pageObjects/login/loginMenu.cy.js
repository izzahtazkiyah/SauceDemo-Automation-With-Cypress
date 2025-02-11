import selectors from './loginSelector.json'

export class login {

    static fillForm (username, password) {
        if (username) cy.get(selectors.usernameField).type(username);
        if (password) cy.get(selectors.passwordField).type(password);
    }

    //valid login
    static login(username, password){
        this.fillForm(username, password)
        cy.get(selectors.loginButton).click();
    }

    //empty username
    static emptyUsername (password) {
        this.fillForm(null, password);
        cy.get(selectors.loginButton).click();
    }

    //empty password
    static emptyPassword (username) {
        this.fillForm(username, null);
        cy.get(selectors.loginButton).click();
    }

    static errorMessages () {
        return cy.get(selectors.errorMessages);
    }
}

export default login;