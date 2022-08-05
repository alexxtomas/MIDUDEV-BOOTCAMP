import { parseArgs } from './parseArgs'
import { ReturnedValue } from './src/type'
import { dataToReturn } from './src/utils'

const calculateExercises = (dailyExercise: number[], target: number): ReturnedValue => {
//   if (dailyExercise.length !== 7) throw new Error('Daily Exercises should be an array with the number of exercise hours for each day in the training period')
//   const periodLenght: number = dailyExercise.length
//   let trainingDays: number = 0
//   let success: boolean = false
//   let rating: number
//   let ratingDescription: string
//   const average = dailyExercise.reduce((a, b) => a + b, 0) / dailyExercise.length
//   for (const d of dailyExercise) {
//     if (d !== 0) trainingDays += 1
//   }
//   if (trainingDays === 7) success = true

  //   if (average <= 1) rating = 1
  //   else if (average > 1 && average <= 2) rating = 2
  //   else rating = 3

  //   if (rating === 1) ratingDescription = 'too bad, try harder'
  //   else if (rating === 2) ratingDescription = 'not too bad but could be better '
  //   else ratingDescription = 'really well, congratulations'

  //   return { periodLenght, trainingDays, success, rating, ratingDescription, target, average }
  const allData: ReturnedValue = dataToReturn(dailyExercise, target)
  return allData
}

const cleanArgs = parseArgs(process.argv, 'exerciseCalculator')

console.log(calculateExercises(cleanArgs[0], cleanArgs[1]))
