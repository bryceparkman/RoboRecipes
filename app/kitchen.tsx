import { useState } from 'react';

import { DndContext, DragOverlay, UniqueIdentifier } from '@dnd-kit/core';

import { allIngredients } from './lib/ingredients';
import {Draggable} from './lib/draggable';
import {Droppable} from './lib/droppable';

type Parents = {
    [id: UniqueIdentifier] : UniqueIdentifier
}

const ingredientCard = (emoji: string, additionalClassNames: string = "", title?: string) => {
    return (
        <div title={title ? title : undefined} className={"flex justify-center px-2 py-2 text-4xl " + additionalClassNames}>
            {emoji}
        </div>
    )
}

export function Kitchen() {
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const [parents, setParents] = useState<Parents>({});
    const [ingredientCards] = useState(Array.from({ length: allIngredients.length}).map((_, i) => (
        <Draggable key={i+1} id={i+1}>
            {ingredientCard(allIngredients[i].emoji, "hover:bg-zinc-100 mx-1 my-2 cursor-pointer", allIngredients[i].name)}
        </Draggable>
    )));
      
    return (
        <DndContext 
            id="DnDContext"
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
            <Droppable id={"oven"}>
                    {parents["oven"] ?
                        ingredientCard(allIngredients[+parents["oven"]-1].emoji)
                    : null}
            </Droppable>
          </div>
          <div className="flex text-gray-800 md:w-3/12 outline outline-1 outline-zinc-400">
            <div className="flex flex-row flex-wrap mt-2 ml-2 h-min w-full justify-left select-none">
              {ingredientCards}
            </div>
          </div>
          <DragOverlay dropAnimation={null}>
            {activeId ? (
                ingredientCard(allIngredients[+activeId-1].emoji, "mx-1 my-2 cursor-pointer ")
          ): null}
          </DragOverlay>
        </DndContext>
    )
}