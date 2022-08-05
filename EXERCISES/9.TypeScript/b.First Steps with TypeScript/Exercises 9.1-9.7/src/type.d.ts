
export type BMI = 'Underweight' | 'Normal (healthy weight)' | 'Overweight' | 'Obese'
export interface BMICalculator {
  height: number
  weight: number
  bmi: BMI
}

export type QueryParameters = Omit<BMICalculator, 'bmi'>

export interface ReturnedValue {
  periodLenght: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

export interface Error {
  error: string
}
