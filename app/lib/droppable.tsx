import React, { useEffect, useState } from 'react';
import {useDroppable, UniqueIdentifier} from '@dnd-kit/core';
import classNames from 'classnames';

import styles from './Droppable.module.css';
import { getColorFade } from './colorfade';

interface Props {
  children: React.ReactNode;
  id: UniqueIdentifier;
}

export function Droppable({children, id}: Props) {
  const {isOver, setNodeRef} = useDroppable({
    id,
  });

  const totalTimeMs = 5000;

  const [timeLeft, setTimeLeft] = useState<number>(totalTimeMs);
  
  const percentDone = 100*((totalTimeMs - timeLeft) / totalTimeMs)

  

  useEffect(() => {
    if(timeLeft === 0){
       console.log("TIME LEFT IS 0");
       setTimeLeft(-1)
    }

    if (timeLeft === -1 || children === null) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 10);
    }, 10);

    return () => clearInterval(intervalId);
  }, [timeLeft, children]);

  return (
    <div
      ref={setNodeRef}
      className={classNames(
        styles.Droppable,
        !children && isOver && styles.over,
      )}
      aria-label="Droppable region"
    >
      {children ?
        <>
          {children}
          <div className={styles.dropped} style={{
            backgroundImage: `conic-gradient(${getColorFade(percentDone)}, ${getColorFade(percentDone)} ${percentDone}%, transparent ${100*((totalTimeMs - timeLeft) / totalTimeMs)}%)`
          }}></div>
        </>
        :
        <div className="flex justify-center px-2 py-2 text-4xl opacity-25">
          ♨️
        </div>
      }
    </div>
  );
}