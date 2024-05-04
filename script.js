class PizzaType {
    static Margarita = {
        name: "Маргарита",
        price: 500,
        calories: 200
    }

    static Pepperoni = {
        name: "Пепперони",
        price: 800,
        calories: 400
    }

    static Bavarian = {
        name: "Баварская",
        price: 700,
        calories: 450
    }
}

class PizzaSize {
    static Big = {
        id: "Big",
        name: "Большая",
        price: 200,
        calories: 200
    }

    static Small = {
        id: "Small",
        name: "Маленькая",
        price: 100,
        calories: 100
    }
}

class PizzaToppings {
    static CreamyMozzarella = {
        name: "Cливочная моцарелла",
        size: {
            Big: {
                price: 100,
                calories: 50
            },
            Small: {
                price: 50,
                calories: 25
            }
        }
    }

    static CheeseBoard = {
        name: "Сырный борт",
        size: {
            Big: {
                price: 300,
                calories: 100
            },
            Small: {
                price: 150,
                calories: 50
            }
        }
    }

    static CheddarAndParmesan = {
        name: "Чеддер и пармезан",
        size: {
            Big: {
                price: 300,
                calories: 100
            },
            Small: {
                price: 150,
                calories: 50
            }
        }
    }
}

class Pizza {
    #type;
    #size;
    #toppings;

    constructor(type, size, toppings) {
        this.#type = type;
        this.#size = size;
        this.#toppings = toppings;
    }

    addTopping(topping) {
        if(this.#toppings.includes(topping))
                throw new Error("Такой доп. ингредиент уже добавлен!");
            else
                this.#toppings.push(topping);
    }

    removeTopping(topping) {
        if(!this.#toppings.includes(topping))
                throw new Error("Такого доп. ингредиента нет!");
            else {
                this.#toppings = this.#toppings.filter((top) => top != topping);
            }
    }

    getToppings() {
        return this.#toppings;
    }

    getSize() {
        return this.#size;
    }

    getStuffing() {
        return this.#type;
    }

    calculatePrice() {
        return [this.#type, this.#size].reduce((accumulator, currentValue) => accumulator + currentValue.price, 0) 
            + [...this.#toppings].reduce((accumulator, currentValue) => accumulator + currentValue.size[this.#size.id].price, 0)
    }

    calculateCalories() {
        return [this.#type, this.#size].reduce((accumulator, currentValue) => accumulator + currentValue.calories, 0) 
            + [...this.#toppings].reduce((accumulator, currentValue) => accumulator + currentValue.size[this.#size.id].calories, 0)
    }
}

let pizza = new Pizza(PizzaType.Margarita, PizzaSize.Small, []);

pizza.addTopping(PizzaToppings.CheeseBoard);

pizza.addTopping(PizzaToppings.CheddarAndParmesan);

console.log(pizza.calculatePrice());

console.log(pizza.calculateCalories());

console.log(pizza.getStuffing());

console.log(pizza.getSize());

let arr = pizza.getToppings();
arr.forEach(element => {
    console.log(element);
});