import { Ingredient, Tool } from "./definitions"

type IngredientsDict = {
    [foodName: string] : Ingredient
}

type KitchenToolsDict = {
    [toolName: string] : Tool
}

export const unlockedIngredients: IngredientsDict = {
    "Potato": {
        name: "Potato",
        emoji: "🥔",
        cooked: {
            "Oven": {
                time: 20000,
                result: "Baked mushroom"
            }
        }
    },
    "Mushroom": {
        name: "Mushroom",
        emoji: "🍄",
        cooked: {
            "Oven": {
                time: 2000,
                result: "Baked mushroom"
            }
        }
    },
    "Cheese": {
        name: "Cheese",
        emoji: "🧀",
        cooked: {
            "Oven": {
                time: 1000,
                result: "Baked mushroom"
            }
        }
    },
    "Crab": {
        name: "Crab",
        emoji: "🦀",
        cooked: {
            "Oven": {
                time: 5000,
                result: "Baked mushroom"
            }
        }
    }
}

export const allIngredients: IngredientsDict = {
    "Potato": {
        name: "Potato",
        emoji: "🥔",
        cooked: {
            "Oven": {
                time: 20000,
                result: "Baked mushroom"
            }
        }
    },
    "Mushroom": {
        name: "Mushroom",
        emoji: "🍄",
        cooked: {
            "Oven": {
                time: 2000,
                result: "Baked mushroom"
            }
        }
    },
    "Cheese": {
        name: "Cheese",
        emoji: "🧀",
        cooked: {
            "Oven": {
                time: 1000,
                result: "Baked mushroom"
            }
        }
    },
    "Crab": {
        name: "Crab",
        emoji: "🦀",
        cooked: {
            "Oven": {
                time: 5000,
                result: "Baked mushroom"
            }
        }
    },
    "Baked mushroom": {
        name: "Baked mushroom",
        emoji: "🍄",
        cooked: {}
    },
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
    },
    "Frying Pan": {
        name: "Frying Pan",
        function: "Pan fry",
        emoji: "🍳"
    },
    "Steamer": {
        name: "Steamer",
        function: "Steam",
        emoji: "💨"
    },
    "Deep Fryer": {
        name: "Deep Fryer",
        function: "Deep fry",
        emoji: "🇺🇸"
    },
    "Fermentor": {
        name: "Fermentor",
        function: "Age",
        emoji: "⏳"
    },
    "Grill": {
        name: "Grill",
        function: "Grill",
        emoji: "🔥"
    },
    "Smoker": {
        name: "Smoker",
        function: "Smoke",
        emoji: "🌫️"
    },
    "Crusher": {
        name: "Crusher",
        function: "Crush",
        emoji: "🔨"
    },
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