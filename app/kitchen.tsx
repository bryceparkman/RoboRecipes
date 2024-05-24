import { useState } from 'react';

import { DndContext, DragOverlay, UniqueIdentifier } from '@dnd-kit/core';

import { allIngredients, allKitchenTools } from './lib/kitchenutils';
import {Draggable} from './lib/draggable';
import {KitchenTool} from './lib/kitchentool';
import { ingredientCard } from './lib/definitions';

type Parents = {
    [id: UniqueIdentifier] : UniqueIdentifier
}

export function Kitchen() {
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const [parents, setParents] = useState<Parents>({});

    //Eventually switch to unlocked ingredients, not all ingredients
    const [ingredientCards] = useState(Object.entries(allIngredients).map(([foodName, {emoji}], i) => (
        <Draggable key={i} id={foodName}>
            {ingredientCard(emoji, "hover:bg-zinc-100 mx-1 my-2 cursor-pointer", foodName)}
        </Draggable>
    )));
      
    return (
        <DndContext 
            id="DndContext"
            onDragStart={(e) => {
                setActiveId(e.active.id);
            }} 
            onDragEnd={(e) => {
                if(e.over && !parents[e.over.id]){
                    setParents({
                        ...parents,
                        [e.over.id]: e.active.id
                    })
                }
                setActiveId(null);
            }}>

          <div className="flex items-center justify-center p-6 md:w-5/12 md:px-28 md:py-12 select-none">
            {Object.entries(allKitchenTools).map(([toolName, _], i) => (
                <KitchenTool key={i} id={toolName} food={allIngredients[parents[toolName]]}/>
            ))}
          </div>

          <div className="flex text-gray-800 md:w-3/12 outline outline-1 outline-zinc-400">
            <div className="flex flex-row flex-wrap mt-2 ml-2 h-min w-full justify-left select-none">
              {ingredientCards}
            </div>
          </div>
          <DragOverlay dropAnimation={null}>
            {activeId ? (
                ingredientCard(allIngredients[activeId].emoji, "mx-1 my-2 cursor-pointer ")
          ): null}
          </DragOverlay>
        </DndContext>
    )
}