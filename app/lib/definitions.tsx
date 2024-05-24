// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type Ingredient = {
  name: string;
  emoji: string;
}

export type KitchenTool = {
  name: string;
  function: string;
  emoji: string;
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
