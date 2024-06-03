// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.

import { UniqueIdentifier } from "@dnd-kit/core";

// However, these types are generated automatically if you're using an ORM such as Prisma.
export type Ingredient = {
  name: string;
  emoji: string;
  emblem?: string;
  cooked?: {
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

export type ToolData = {
  food: Ingredient | null,
  percentDone: number,
  cooked: boolean
}

export type ToolsData = {
  [id: UniqueIdentifier]: ToolData
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

export const ingredientCard = (ingredient: Ingredient, additionalClassNames: string = "") => {
  return (
      <div title={ingredient.name} className={"flex justify-center px-2 py-2 text-4xl " + additionalClassNames + (ingredient.emblem ? " ml-7" : "")}>
          {ingredient.emoji}
          {ingredient.emblem ? 
            <div className="flex relative text-xl top-5 right-6">
              {ingredient.emblem}
            </div> : null
          }
      </div>  
  )
}
