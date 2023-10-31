class Pizza {
    constructor(size, crust, sauce) {
        this.size = size;
        this.crust = crust;
        this.sauce = sauce;
        this.toppings = [];
    }
    prepare() { console.log('Preparing...') }
    bake() { console.log('Baking...') }
    ready() { console.log('Ready!') }
}

class Salad {
    constructor(size, dressing) {
        this.size = size;
        this.dressing = dressing
    }
    prepare() { console.log('Preparing...') }
    toss() { console.log('Tossing...') }
    ready() { console.log('Ready!') }
}

class stuffedCrustPizza extends Pizza {
    stuff() { console.log('Stuffing the crust...') }
}

class butteredCrustPizza extends Pizza {
    butter() { console.log('Buttering the crust...') }
}

// Problem: Repeats methods from above - Not D.R.Y.
class stuffedButteredCrustPizza extends Pizza {
    stuff() { console.log('Stuffing the crust...') }
    butter() { console.log('Buttering the crust...') }
}

const myPizza = new stuffedButteredCrustPizza();
myPizza.stuff();
myPizza.butter();


// And now here's a BETTER way with composition below: 

// Create all of the methods as separate functions
const prepare = () => {
    return {
        prepare: () => console.log('Preparing...')
    }
}

const bake = () => {
    return {
        bake: () => { console.log('Baking...'); return [1, 2, 3] }
    }
}

const toss = () => {
    return {
        toss: () => console.log('Tossing...')
    }
}

const ready = () => {
    return {
        ready: () => console.log('Ready!')
    }
}

const stuff = () => {
    return {
        stuff() { console.log('Stuffing the crust...') }
    }
}

const butter = () => {
    return {
        butter() { console.log('Buttering the crust...') }
    }
}

// Use composition to add the methods to the objects 

// You are never defining the same method twice!

const createPizza = (size, crust, sauce) => {
    const pizza = {
        size: size,
        crust: crust,
        sauce: sauce,
        toppings: []
    }

    return {
        ...pizza,
        ...prepare(),
        ...bake(),
        ...ready()
    }
}

const createSalad = (size, dressing) => {
    return {
        size: size,
        dressing: dressing,
        ...prepare(),
        ...toss(),
        ...ready()
    }
}

// compare to ES6 Class syntax with extends and super()
const createStuffedButteredCrustPizza = (pizza) => {
    return {
        ...pizza,
        ...stuff(),
        ...butter()
    }
}

const anotherPizza = createPizza("medium", "thin", "original");
const somebodysPizza = createStuffedButteredCrustPizza(anotherPizza);
// OR
const davesPizza =
    createStuffedButteredCrustPizza(createPizza("medium", "thin", "original"));

const davesSalad = createSalad("side", "ranch");

davesPizza.bake();
console.log(davesPizza.bake().reverse()); //chaining
davesPizza.stuff();
davesSalad.prepare();
console.log(davesPizza);
console.log(davesSalad);

const addTopping = (pizza, topping) => { 
    pizza.toppings.push(topping); 
    return pizza; 
}

const jimsPizza = createPizza("medium", "thin", "original"); 
console.log(jimsPizza); 
console.log(addTopping(jimsPizza, "pepperoni"));
console.log(jimsPizza); //mutation 

//clone the pizza object
// const shallowPizzaClone = (fn) => {
//     return (obj,array) => { 
//         const newObj = { ...obj }; 
//         return fn(newObj,array); 
//     }
// }

const shallowPizzaClone = (fn) => (obj, array) => fn({ ...obj}, array);

let addToppings = (pizza,toppings) => { 
    pizza.toppings = [...pizza.toppings, ...toppings]; 
    return pizza;      

}

//decorate the addToppings function with shallowPizzaClone
addToppings = shallowPizzaClone(addToppings); 

const timsPizza = createPizza("medium", "thin", "original"); 
const timsPizzaWithToppings = addToppings(timsPIzza, ["olives", "cheese", "pepperoni"]);
console.log(timsPizzaWithToppings)
console.log(timsPizza);
console.log(timsPizzaWithToppings === timsPizza);