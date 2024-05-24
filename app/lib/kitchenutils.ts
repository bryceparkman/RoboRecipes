import { Ingredient, KitchenTool } from "./definitions"

type IngredientsDict = {
    [foodName: string] : Ingredient
}

type KitchenToolsDict = {
    [toolName: string] : KitchenTool
}

export const allIngredients: IngredientsDict = {
    "Potato": {
        name: "Potato",
        emoji: "🥔"
    },
    "Mushroom": {
        name: "Mushroom",
        emoji: "🍄"
    },
    "Cheese": {
        name: "Cheese",
        emoji: "🧀"
    },
    "Crab": {
        name: "Crab",
        emoji: "🦀"
    }
}

export const allKitchenTools: KitchenToolsDict = {
    "Oven": {
        name: "Oven",
        function: "Bake",
        emoji: "♨️"
    },
    "Pot": {
        name: "Pot",
        function: "Boil",
        emoji: "🍲"
    }
}

export function getRandomIngredientNames(): string[] {
    return ['Tomato Sauce', 'Pepperoni', "Cooked Dough"];
}