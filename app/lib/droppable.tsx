import React from 'react';
import {useDroppable, UniqueIdentifier} from '@dnd-kit/core';
import classNames from 'classnames';

import styles from './Droppable.module.css';

interface Props {
  children: React.ReactNode;
  dragging: boolean;
  id: UniqueIdentifier;
}

export function Droppable({children, id}: Props) {
  const {isOver, setNodeRef} = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={classNames(
        styles.Droppable,
        isOver && styles.over,
        children && styles.dropped
      )}
      aria-label="Droppable region"
    >
      {children ? children :
        <div className="flex justify-center px-2 py-2 text-4xl opacity-25">
          ♨️
        </div>
      }
    </div>
  );
}