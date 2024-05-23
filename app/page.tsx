'use client';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Recipe, Ingredient } from './lib/definitions';
import IngredientSidebar from './sidebar';
import { allIngredients } from './lib/ingredients';
import { DndContext, DragOverlay } from '@dnd-kit/core';

import {Draggable} from './lib/draggable';
import {Droppable} from './lib/droppable';

export default function Page() {
  const [hintLevel, setHintLevel] = useState(0);
  const [ingredientCards] = useState(Array.from({ length: allIngredients.length}).map((_, i) => (
    <Draggable key={i+1} id={i+1}>
        <div title={allIngredients[i].name} className="flex justify-center px-2 py-2 mx-1 my-2 ring-1 rounded ring-zinc-400 hover:bg-zinc-100 cursor-pointer text-4xl"  style={{opacity: "100% !important"}}>
            {allIngredients[i].emoji}
        </div>
    </Draggable>)));
  const [ingredients, setIngredients] = useState<Ingredient[]>(allIngredients)
  const [activeId, setActiveId] = useState(null);
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

  function handleDragStart(event: { active: { id: any; }; }) {
    setActiveId(event.active.id);
    console.log('a')
  }
  
  function handleDragEnd() {
    setActiveId(null);
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
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="flex items-center justify-center p-6 md:w-5/12 md:px-28 md:py-12">
              
          </div>
          <div className="flex text-gray-800 md:w-3/12 outline outline-1 outline-zinc-400">
            <div className="flex flex-row flex-wrap mt-2 ml-2 h-min w-full justify-left select-none">
              {ingredientCards}
            </div>
          </div>
          <DragOverlay dropAnimation={null}>
            {activeId ? (
            ingredientCards[activeId-1]
          ): null}
          </DragOverlay>
        </DndContext>
      </div>
    </main>
  );
}
