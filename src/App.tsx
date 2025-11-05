import { useState } from 'react'
import pickaxe from './assets/pickaxe.svg'

type Recipe = number[][]

const initialRecipe: Recipe = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
]

const columns = [0, 0, 0]
const rows = [0, 0, 0]

export const App = () => {
  const [hasCrafted, setHasCrafted] = useState(false)
  const [recipe, setRecipe] = useState<Recipe>(initialRecipe)

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    columnIndex: number,
    rowIndex: number
  ) => {
    setRecipe(currentRecipe => {
      const updatedRecipe = structuredClone(currentRecipe)
      updatedRecipe[rowIndex][columnIndex] = event.target.checked ? 1 : 0
      return updatedRecipe
    })
  }

  const onSubmit = () => {
    if (
      recipe[0][0] &&
      recipe[0][1] &&
      recipe[0][2] &&
      recipe[1][1] &&
      recipe[2][1]
    ) {
      setHasCrafted(true)
      console.log('Recipe is valid')
    } else {
      console.log('Recipe is invalid')
    }
  }

  if (hasCrafted) {
    return (
      <main className='h-screen w-screen flex flex-col items-center p-6 justify-center bg-black text-white gap-6'>
        <img src={pickaxe} alt='' className='h-auto w-200 max-w-full' />
      </main>
    )
  }

  return (
    <main className='h-screen w-screen flex flex-col items-center justify-center bg-black text-white gap-6'>
      <h1 className='text-4xl font-bold'>
        How to Craft a Pickaxe (in JavaScript)
      </h1>
      <section className='grid grid-rows-3 gap-3'>
        {rows.map((_, rowIndex) => (
          <div key={rowIndex} className='grid grid-cols-3 gap-3'>
            {columns.map((_, columnIndex) => (
              <input
                key={columnIndex}
                type='checkbox'
                onChange={event => onChange(event, columnIndex, rowIndex)}
              />
            ))}
          </div>
        ))}
      </section>
      <button onClick={onSubmit}>Craft</button>
    </main>
  )
}
