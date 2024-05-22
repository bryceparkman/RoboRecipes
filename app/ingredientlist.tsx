import { Ingredient } from './lib/definitions';

export default function IngredientList(ingredients: Ingredient[]) {
    const ingredientCards = Array.from({ length: ingredients.length}).map((_, i) => (
        <div key={i} className="flex justify-center px-2 py-1 mx-1 my-2 ring-1 rounded ring-zinc-400 hover:bg-zinc-100 cursor-pointer">
            {ingredients[i].name}
        </div>
    ))

    return (
        <>
            <div className="flex flex-row flex-wrap mt-2 ml-2 h-min w-full justify-left">
                {ingredientCards}
            </div>
        </>
    );
}