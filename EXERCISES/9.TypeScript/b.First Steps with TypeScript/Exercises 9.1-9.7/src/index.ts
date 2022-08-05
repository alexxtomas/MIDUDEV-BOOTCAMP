import express, { Request, Response } from 'express'

import { BMI, BMICalculator, Error, ReturnedValue } from './type'
import { dataToReturn } from './utils'
// eslint-disable-next-line
interface ReqDictionary{} 
interface ReqQuery { height?: number, weight?: number }

type SomeHandlerRequest = Request<ReqDictionary, ReqQuery>

const app = express()

app.use(express.json())

app.get('/bmi', (req: SomeHandlerRequest, res: Response) => {
  const { height: heightQuery, weight: weightQuery } = req.query

  if (heightQuery === undefined || weightQuery === undefined || isNaN(Number(heightQuery)) || isNaN(Number(weightQuery))) res.status(400).json({ error: 'malformatted parameters' })

  const height: number = Number(heightQuery) / 100
  const weight = Number(weightQuery)

  const bmi: number = Number(weight) / (Number(height) * Number(height))
  let bmiMessage: BMI

  if (bmi < 18.5) bmiMessage = 'Underweight'
  else if (bmi >= 18.5 && bmi <= 24.9) bmiMessage = 'Normal (healthy weight)'
  else if (bmi > 24.9 && bmi <= 29.9) bmiMessage = 'Overweight'
  else bmiMessage = 'Obese'

  const BMICalculator: BMICalculator = {
    height,
    weight,
    bmi: bmiMessage

  }

  res.json(BMICalculator)

  // const {bmi} = BMICalculator
})

app.post('/calculator', (req: Request, res) => {
  const { daily_exercises: dailyExercises, target } = req.body
  const errorMessage: Error = {
    error: ''
  }
  console.log(isNaN(target))

  if (dailyExercises === undefined || target === undefined) {
    errorMessage.error = 'parameters missing'
    res.json(errorMessage)
  } else if (!Array.isArray(dailyExercises) || isNaN(target)) {
    errorMessage.error = 'malformatted parameters'
    res.json(errorMessage)
  }
  const responseObject: ReturnedValue = dataToReturn(dailyExercises, target)

  res.status(200).json({
    ...responseObject
  })
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
