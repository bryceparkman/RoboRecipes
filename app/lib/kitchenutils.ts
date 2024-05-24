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

function shuffleArray(array: any[]) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

export function getRandomIngredientNames(count: number): string[] {
    const shuffled = Object.keys(allIngredients)
    shuffleArray(shuffled);
    return shuffled.slice(0,count);
}