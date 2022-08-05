import { ReturnedValue } from './type'

export const dataToReturn = (dailyExercises: number[], target: number): ReturnedValue => {
  const periodLenght: number = dailyExercises.length
  let trainingDays: number = 0
  let success: boolean = false
  let rating: number
  let ratingDescription: string
  const average = dailyExercises.reduce((a: number, b: number) => a + b, 0) / dailyExercises.length
  for (const d of dailyExercises) {
    if (d !== 0) trainingDays += 1
  }
  if (trainingDays === 7) success = true

  if (average <= 1) rating = 1
  else if (average > 1 && average <= 2) rating = 2
  else rating = 3

  if (rating === 1) ratingDescription = 'too bad, try harder'
  else if (rating === 2) ratingDescription = 'not too bad but could be better '
  else ratingDescription = 'really well, congratulations'

  return {
    periodLenght,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}
