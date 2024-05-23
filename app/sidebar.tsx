import { Ingredient } from './lib/definitions';
import {Draggable} from './lib/draggable';

export default function IngredientSidebar(ingredients: Ingredient[]) {
    const ingredientCards = Array.from({ length: ingredients.length}).map((_, i) => (
        <Draggable key={i+1} id={i+1}>
            <div title={ingredients[i].name} className="flex justify-center px-2 py-2 mx-1 my-2 ring-1 rounded ring-zinc-400 hover:bg-zinc-100 cursor-pointer text-4xl">
                {ingredients[i].emoji}
            </div>
        </Draggable>
    ))

    return (
        <div className="flex flex-row flex-wrap mt-2 ml-2 h-min w-full justify-left">
            {ingredientCards}
        </div>
    );
}