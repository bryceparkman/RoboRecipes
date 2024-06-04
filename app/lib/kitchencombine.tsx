import React, { useEffect, useState } from 'react';
import {useDroppable, UniqueIdentifier} from '@dnd-kit/core';
import classNames from 'classnames';

import styles from './Droppable.module.css';
import { Ingredient, ingredientCard } from './definitions';
import { Draggable } from './draggable';

interface Props {
  id: UniqueIdentifier;
  food: Ingredient | null;
}

export function KitchenCombine({id, food}: Props) {
  const {isOver, setNodeRef} = useDroppable({
    id,
  });

  function getFoodCard(){
    return ingredientCard(food!!)
  }

  return (
    <div className='flex flex-col h-fit my-1'>
      <div
        ref={setNodeRef}
        className={classNames(
          styles.CombinerDroppable,
          !food && isOver && styles.over,
        )}
        aria-label="Droppable region"
      >
        {food ?
          <>
            {getFoodCard()}
          </>
          :
          <div className="flex justify-center px-2 py-2 text-4xl opacity-25">
            👨‍🍳
          </div>
        }
      </div>
    </div>
  );
}