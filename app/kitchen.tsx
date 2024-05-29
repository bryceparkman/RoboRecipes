import { useEffect, useState } from 'react';

import { DndContext, DragOverlay, UniqueIdentifier } from '@dnd-kit/core';

import { allIngredients, allKitchenTools, cookedIngredients, rawIngredients } from './lib/kitchenutils';
import {Draggable} from './lib/draggable';
import {KitchenTool} from './lib/kitchentool';
import { ingredientCard, Parents, Timer, Timers } from './lib/definitions';

export function Kitchen() {
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const [parents, setParents] = useState<Parents>({});
    const [timers, setTimers] = useState<Timers>({});
    const msInterval = 10;
    const [isAnyTimerActive, setIsAnyTimerActive] = useState(false)

    //Use one global timer to manage all the kitchen tools. Performance issues arise if each once timed itself.
    useEffect(() => {
        if(!isAnyTimerActive) {
            return;
        }
        const intervalId = setInterval(() =>
            setTimers((prevTimers) => {
                const newTimers: Timers = {}
                let anyActive = false;

                for(const id in prevTimers){
                    const prevTimer = prevTimers[id];

                    if(prevTimer.remaining !== 0){
                        anyActive = true;
                    }

                    let remainingTime = prevTimer.total - (new Date().getTime() - prevTimer.start)
                    if(remainingTime < 0) remainingTime = 0;

                    newTimers[id] = {
                        start: prevTimer.start,
                        total: prevTimer.total,
                        remaining: remainingTime
                    }
                }
                if(!anyActive){ 
                    clearInterval(intervalId);
                    setIsAnyTimerActive(false);
                }
                return newTimers;
            }), msInterval);
    
        return () => clearInterval(intervalId);
      }, [isAnyTimerActive]);

    function getPercentDoneFromTimer(timer: Timer){
        return 100*((timer.total - timer.remaining) / timer.total)
    }

    function getCookTime(foodName: UniqueIdentifier, toolName: UniqueIdentifier): number | undefined {
        return rawIngredients[foodName]['cooked'][toolName]?.time
    }

    //Eventually switch to unlocked ingredients, not all ingredients
    const [ingredientCards] = useState(Object.entries(rawIngredients).map(([foodName, {emoji}], i) => (
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
                    setIsAnyTimerActive(true);
                    setTimers({
                        ...timers,
                        [e.over.id]: {
                            start: new Date().getTime(),
                            total: getCookTime(e.active.id, e.over.id) ?? 0,
                            remaining: getCookTime(e.active.id, e.over.id) ?? 0
                        }
                    });
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
                food={timers[toolName]?.remaining === 0 ? cookedIngredients['Baked mushroom'] : rawIngredients[parents[toolName]]} 
                percentDoneFromTimer={timers[toolName] ? getPercentDoneFromTimer(timers[toolName]) : 0}
                isDragging={activeId === cookedIngredients['Baked mushroom']?.name}/>
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