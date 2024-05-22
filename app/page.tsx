'use client';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Recipe, Ingredient } from './lib/definitions';
import IngredientList from './ingredientlist';

export default function Page() {
  const [hintLevel, setHintLevel] = useState(0);
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    {name: "🥔 Potato"},
    {name: "🍄 Mushroom"},
    {name: "🧀 Cheese"},
    {name: "🦀 Crab"}
])
  const [recipe, setRecipe] = useState<Recipe>({
    ingredients: [],
    name: "",
    hints: []
});
  useEffect(() => {
    //createNewRecipe();
  }, [])

  async function createNewRecipe(): Promise<void> {
    let recipeIngredients = [
        {name: 'potato', prep: 'bake'}, 
        {name:'cheese', prep: 'bake'}
    ]

    const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ingredients),
    })
    const message = await res.json();
    const answers = message.split('\n\n');

    setRecipe({
        ingredients: recipeIngredients,
        name: answers[0],
        hints: [
            answers[1],
            answers[2]
        ]
    })
  }

  function getNewHint(): string {
    if(hintLevel == 2) {
      return "";
    }
    setHintLevel(hintLevel + 1);
    return recipe.hints[hintLevel - 1];
  }

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-100 px-6 py-10 md:w-4/12 md:px-20">
          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            I would like a <strong>{ recipe.name }</strong> please!
          </p>
          <div
            onClick={async () => {
                const result = getNewHint();
                console.log(result);
              }
            }
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-3 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Hint</span>
          </div>
        </div>
        <div className="flex items-center justify-center p-6 md:w-5/12 md:px-28 md:py-12">
            
        </div>
        <div className="flex text-gray-800 md:w-3/12 outline outline-1 outline-zinc-400">
          {IngredientList(ingredients)}
        </div>
      </div>
    </main>
  );
}
