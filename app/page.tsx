'use client';
import { useEffect, useState } from 'react';
import { Recipe } from './lib/definitions';
import { Kitchen } from './kitchen';
import { getRandomRecipeIngredients } from './lib/ingredients';


export default function Page() {
  const [hintLevel, setHintLevel] = useState(0);
  const [recipe, setRecipe] = useState<Recipe>({
    ingredients: [],
    name: "",
    hints: []
});
  useEffect(() => {
    //createNewRecipe();
  }, [])

  async function createNewRecipe(): Promise<void> {
    let recipeIngredients = getRandomRecipeIngredients();

    const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(recipeIngredients),
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

  function displayHint(): void {
    const result = getNewHint();
    //Do stuff here
  }

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-100 px-6 py-10 md:w-4/12 md:px-20">
          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            I would like a <strong>{ recipe.name }</strong> please!
          </p>
          <div className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-3 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
            onClick={displayHint}
          >
            <span>Hint</span>
          </div>
        </div>
        <Kitchen/>
      </div>
    </main>
  );
}
