import React, { useEffect, useState } from 'react';
import {useDroppable, UniqueIdentifier} from '@dnd-kit/core';
import classNames from 'classnames';

import styles from './Droppable.module.css';
import { getColorFade } from './colorfade';
import { Ingredient, ingredientCard } from './definitions';
import { allKitchenTools } from './kitchenutils';

interface Props {
  id: UniqueIdentifier;
  food: Ingredient;
  percentDone: number;
}

export function KitchenTool({id, food, percentDone}: Props) {
  const {isOver, setNodeRef} = useDroppable({
    id,
  });

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
        {food ?
          <>
            {ingredientCard(food.emoji)}
            <div className={styles.dropped} style={{
              backgroundImage: `conic-gradient(${getColorFade(percentDone)}, ${getColorFade(percentDone)} ${percentDone}%, transparent ${percentDone}%)`
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