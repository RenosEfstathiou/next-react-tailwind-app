import React from 'react'

import { Ingredients } from '../types'

const IngredientsList: React.FC<{ ingredients: Ingredients[] }> = ({ ingredients }) => {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200l">
        {ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            <div className="flex items-center px-4 py-4 sm:px-6">
              <div className="flex min-w-0 flex-1 items-center">
                <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                  <div>
                    <p className="truncate text-sm font-medium text-indigo-600">{ingredient.name}</p>
                  </div>

                  <div className="">
                    <div>
                      <p className="text-sm text-gray-900">
                        {ingredient.measure}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <input
                  id={`${ingredient.id}`}
                  aria-describedby="ingredient-checkbox"
                  name="ingredients"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default IngredientsList