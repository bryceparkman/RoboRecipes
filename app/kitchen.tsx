import { useEffect, useState } from 'react';

import { DndContext, DragOverlay, UniqueIdentifier } from '@dnd-kit/core';

import { allIngredients, allKitchenTools } from './lib/kitchenutils';
import {Draggable} from './lib/draggable';
import {KitchenTool} from './lib/kitchentool';
import { ingredientCard } from './lib/definitions';

type Parents = {
    [id: UniqueIdentifier] : UniqueIdentifier
}

type Timer = {
    msTotal: number,
    msRemaining: number
}

type Timers = {
    [id : UniqueIdentifier]: Timer
}

export function Kitchen() {
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const [parents, setParents] = useState<Parents>({});
    const [totalTimeLeft, setTotalTimeLeft] = useState(0);
    const [timers, setTimers] = useState<Timers>({});

    useEffect(() => {
        const length = Object.keys(timers).length
        if (totalTimeLeft === 0 || length === 0) return;
    
        const intervalId = setInterval(() => {
            for(const id in timers){
                if(timers[id].msRemaining === 0) {
                    delete timers[id]
                } 
                else {
                    timers[id].msRemaining -= 10;
                }
            }
            setTotalTimeLeft(totalTimeLeft - 10);
        }, 10);
    
        return () => clearInterval(intervalId);
      }, [totalTimeLeft]);

    function addTimer(id: UniqueIdentifier, timer: Timer){
        setTimers({
            ...timers,
            [id]: timer
        });
        setTotalTimeLeft(totalTimeLeft + timer.msTotal);
    }

    function getPercentDoneFromTimer(timer: Timer){
        return 100*((timer.msTotal - timer.msRemaining) / timer.msTotal)
    }

    function getFoodCookingByTool(toolName: string){
        return allIngredients[parents[toolName]];
    }

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
                    addTimer(e.over.id,
                        {
                            msTotal: 5000,
                            msRemaining: 5000
                        }      
                    )
                    setParents({
                        ...parents,
                        [e.over.id]: e.active.id
                    })
                }
                setActiveId(null);
            }}>

          <div className="flex flex-wrap justify-center content-start md:w-5/12 md:py-4 select-none">
            {Object.entries(allKitchenTools).map(([toolName, _], i) => (
                <KitchenTool 
                key={i} 
                id={toolName} 
                food={getFoodCookingByTool(toolName)} 
                percentDone={timers[toolName] ? getPercentDoneFromTimer(timers[toolName]) : 0}/>
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