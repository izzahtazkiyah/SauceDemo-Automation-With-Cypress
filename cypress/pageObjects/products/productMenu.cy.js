import productSelector from "./productSelector.json"

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

    static verifySortingByName(order){
        this.getProductNames().then($items => {
            const names = [...$items].map(item => item.innerText); // Mengambil teks nama product
            const sortedNames = [...names].sort();      //Mengurutkan dari A-Z (Otomatis)
            if(order == 'desc') sortedNames.reverse();  //Mengurutkan dari Z-A

            //Membandingkan hasil UI dengan kode
            expect(names).to.deep.equal(sortedNames);

        })
    }

    static verifySortingByPrice(order){
        this.getProductPrice().then($items => {
            const prices = [...$items].map(item => parseFloat(item.innerText.replace('$', ''))); // Mengambil harga dalam bentuk angka
            const sortedPrices = [...prices].sort((a,b) => a - b);
            if(order=='desc') sortedPrices.reverse();

            expect(prices).to.deep.equal(sortedPrices);
        })
    }
}

export default sorting;