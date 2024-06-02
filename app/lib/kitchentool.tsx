import React, { useEffect, useState } from 'react';
import {useDroppable, UniqueIdentifier} from '@dnd-kit/core';
import classNames from 'classnames';

import styles from './Droppable.module.css';
import { getColorFade } from './colorfade';
import { Ingredient, ingredientCard } from './definitions';
import { allKitchenTools } from './kitchenutils';
import { Draggable } from './draggable';

interface Props {
  id: UniqueIdentifier;
  food: Ingredient | null;
  percentDoneFromTimer: number;
  isDragging: boolean
}

export function KitchenTool({id, food, percentDoneFromTimer, isDragging}: Props) {
  const {isOver, setNodeRef} = useDroppable({
    id,
  });

  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if(percentDoneFromTimer >= 100 || isDone){     
      setIsDone(true);
    }
  },[percentDoneFromTimer]);
  
  function getPercentDone(): number {
    return isDone ? 100 : percentDoneFromTimer
  }

  function getFoodCard(){
    if(isDone && !isDragging){
      return (
        <Draggable id={`${food!!.name}_tools`}>
          {ingredientCard(food!!.emoji)}
        </Draggable>
      )
    }
    else if(isDone && isDragging){
      return <></>;
    }
    else {
      return ingredientCard(food!!.emoji)
    }
  }

  return (
    <div className='flex flex-col h-fit my-1'>
      <div
        ref={setNodeRef}
        className={classNames(
          styles.Droppable,
          !food && isOver && styles.over,
        )}
        aria-label="Droppable region"
      >
        {food && !isDragging ?
          <>
            {getFoodCard()}
            <div className={styles.dropped} style={{
              backgroundImage: `conic-gradient(${getColorFade(getPercentDone())}, ${getColorFade(getPercentDone())} ${getPercentDone()}%, transparent ${getPercentDone()}%)`
            }}></div>
          </>
          :
          <div className="flex justify-center px-2 py-2 text-4xl opacity-25">
            {allKitchenTools[id].emoji}
          </div>
        }
      </div>
      <div className="text-center">
        {allKitchenTools[id].function}
      </div>
    </div>
  );
}