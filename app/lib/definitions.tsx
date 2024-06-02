// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.

import { UniqueIdentifier } from "@dnd-kit/core";

// However, these types are generated automatically if you're using an ORM such as Prisma.
export type Ingredient = {
  name: string;
  emoji: string;
  cooked: {
    [tool: UniqueIdentifier]: {
      time: number,
      result: UniqueIdentifier
    }
  }
}

export type Tool = {
  name: string;
  function: string;
  emoji: string;
}

export type Parents = {
  [id: UniqueIdentifier] : UniqueIdentifier
}

export type Timer = {
  start: number,
  total: number,
  remaining: number
}

export type Timers = {
  [id : UniqueIdentifier]: Timer
}

export type Recipe = {
  ingredientNames: string[]
  name: string,
  hints: string[]
}

export const ingredientCard = (emoji: string, additionalClassNames: string = "", title?: string) => {
  return (
      <div title={title ? title : undefined} className={"flex justify-center px-2 py-2 text-4xl " + additionalClassNames}>
          {emoji}
      </div>
  )
}
