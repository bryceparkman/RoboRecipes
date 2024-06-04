'use client';
import { useEffect, useState } from 'react';
import { Recipe } from './lib/definitions';
import { Kitchen } from './kitchen';
import { getRandomIngredientNames } from './lib/kitchenutils';


export default function Page() {
  const [hintLevel, setHintLevel] = useState(0);
  const [recipe, setRecipe] = useState<Recipe>({
    ingredientNames: ["Baked potato"],
    name: "Baked Potato",
    hints: []
});
  useEffect(() => {
    //createNewRecipe();
  }, [])

  async function createNewRecipe(): Promise<void> {
    const ingredientNames: string[] = getRandomIngredientNames(2);

    const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ingredientNames),
    })
    const message = await res.json();
    const answers = message.split('\n\n');

    setRecipe({
        ingredientNames,
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
    const hint = recipe.hints[hintLevel]
    setHintLevel(hintLevel + 1);
    return hint;
  }

  function displayHint(): void {
    const result = getNewHint();
    console.log(result)
    //Do stuff here
  }

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex grow flex-col md:flex-row">
        <Kitchen recipe={recipe}/>
      </div>
    </main>
  );
}
