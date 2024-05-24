export const allIngredients = [
    {emoji: "🥔", name: "Potato"},
    {emoji: "🍄", name: "Mushroom"},
    {emoji: "🧀", name: "Cheese"},
    {emoji: "🦀", name: "Crab"}
]

export function getRandomRecipeIngredients() {
    return [
        {name: 'potato', prep: 'bake'}, 
        {name:'cheese', prep: 'bake'}
    ]
}