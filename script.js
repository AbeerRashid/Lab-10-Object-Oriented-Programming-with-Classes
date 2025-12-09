//Part 1: Setting Up Classes
class ProductProperties {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    getTotalValue() {
        return parseFloat((this.price * this.quantity).toFixed(2));
    }

    toString() {
    return `ProductProperties(Name: ${this.name}, Price: $${this.price.toFixed(2)}, Quantity: ${this.quantity})`;
    }
};

//Part 2: Adding Inheritance
function PerishableProduct(name, price, quantity, expirationDate) {
    ProductProperties.call(this, name, price, quantity);
    this.expirationDate = expirationDate;
}

PerishableProduct.prototype = Object.create(ProductProperties.prototype);
PerishableProduct.prototype.constructor = PerishableProduct;
PerishableProduct.prototype.toString = function() {
var parentString = ProductProperties.prototype.toString.call(this);
    return parentString + ", Expiration Date: " + this.expirationDate;
};


//Part 3: Static Methods and Properties
ProductProperties.applyDiscount = function(Product, discount) {
    console.log("\n--- Applying " + (discount * 100) + "% Discount ---");
    for (var i = 0; i < products.length; i++) { var product = products[i];
        var originalPrice = Product.price;
        // Update the price directly
        Product.price = Product.price * (1 - discount);
        console.log(Product.name + ": Original Price $" + originalPrice.toFixed(2) + " -> New Price $" + Product.price.toFixed(2));
    }
    console.log("--- Discount Applied Successfully ---\n");
};
//Part 4: Store Management
function Store() {
    this.products = [];
}
Store.prototype.addProduct = function(product) {
    this.products.push(product);
    console.log("Added product: " + product.name);
};
Store.prototype.getTotalValue = function() {
    var total = 0;
    for (var i = 0; i < this.products.length; i++) {
        total += this.products[i].getTotalValue();
    }  
    return parseFloat(total.toFixed(2));
};
Store.prototype.findProductByName = function(name) {
    for (var i = 0; i < this.products.length; i++) {
        if (this.products[i].name.toLowerCase() === name.toLowerCase()){
            return this.products[i];
        }
    }
    return null;
}
//Part 5: Testing the System
// 1. Create Prductions
var apple = new ProductProperties ('Apple', 2.50, 50);
var chips = new ProductProperties ('Potato Chips', 3.99, 30);
var soda = new ProductProperties ('Coke Soda (12-pack)', 7.50, 25);
var milk = new PerishableProduct('Milk', 4.50, 15, '2024-12-15');
var lettuce = new PerishableProduct('Romaine Lettuce', 1.99, 20, '2024-12-05');

// 2. Add products to Store
var myStore = new Store();
myStore.addProduct(apple);
myStore.addProduct(chips);
myStore.addProduct(soda);
myStore.addProduct(milk);
myStore.addProduct(lettuce);

// Get value before discount
var totalValueBefore = myStore.getTotalValue();

// 3. Apply 15% discount using the static method
var DISCOUNT_RATE = 0.15;
ProductProperties.applyDiscount(myStore.products, DISCOUNT_RATE);

// Get value after discount
var totalValueAfter = myStore.getTotalValue();
console.log("Total Store Value Before Discount: $" + totalValueBefore.toFixed(2));
console.log("Total Store Value After Discount: $" + totalValueAfter.toFixed(2));

// 4. Find and print product details
var searchProductName = 'Milk';
var foundProduct = myStore.findProductByName(searchProductName);

console.log("\n--- Searching for Product: " + searchProductName + " ---");
var searchOutput = 'Product not found.';
if (foundProduct) {
    searchOutput = foundProduct.toString();
} else {
    searchOutput = 'Product not found.';
}
console.log(searchOutput);
console.log("--- Search Completed ---\n");