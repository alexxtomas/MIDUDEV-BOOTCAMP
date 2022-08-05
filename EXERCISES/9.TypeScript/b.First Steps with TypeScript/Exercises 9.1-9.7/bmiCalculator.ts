import { parseArgs } from './parseArgs'

const calculateBmi = (height: number, weight: number): string => {
  height = height / 100
  height *= height
  const bmi: number = weight / height

  console.log(bmi)

  if (bmi < 18.5) return 'Underweight'
  else if (bmi >= 18.5 && bmi <= 24.9) return 'Normal (healthy weight)'
  else if (bmi > 24.9 && bmi <= 29.9) return 'Overweight'
  return 'Obese'
}

const cleanArgs = parseArgs(process.argv, 'bmiCalculator')

console.log(calculateBmi(cleanArgs[0], cleanArgs[1]))
