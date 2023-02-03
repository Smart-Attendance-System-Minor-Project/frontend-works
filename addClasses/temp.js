var Mobile = function() {

}//prototype Method
Mobile.prototype.getModel = function() { return this.model; }

//subclass 1(constructor)
var Samsung = function(model, price){
    this.model = model;
    this.price = price;
}


//sublcass2
var Lenevo = function(model,price){
    this.model = model;
    
}


//Inheritance
Samsung.prototype = Object.create(Mobile.prototype);
Samsung.prototype.constructor = Samsung;
Samsung.prototype.getPrice = function() { return this.price; }

Lenevo.prototype = Object.create(Mobile.prototype);
Lenevo.prototype.constructor = Lenevo;



//instantiating objects from subclass
var galaxy = new Samsung('galaxy', 25000)
console.log(galaxy.getModel());
console.log(galaxy.getPrice());   //my problem here????


var phab2 = new Lenevo('phab 2')
console.log(phab2.getModel())