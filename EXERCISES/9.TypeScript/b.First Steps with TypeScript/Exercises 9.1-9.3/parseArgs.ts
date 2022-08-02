export const parseArgs = (args: Array<string>, useFor: string): any => {
    if (useFor === 'bmiCalculator') {
        if (args.length !== 4 || isNaN(Number(args[2])) || isNaN(Number(args[3]))) throw new Error('Usage example:  npm run calculateBmi 190 88')
        return [Number(args[2]), Number(args[3])]
    }
    else if(useFor === 'exerciseCalculator') {
       const arg2ToArray = args[2].split(',').map(n => {
        if(isNaN(Number(n))) throw new Error('Usage example : npm run "3, 0, 2, 4.5, 0, 3, 1" 2 ')
        return Number(n)
       })
       if(arg2ToArray.length !== 7 || isNaN(Number(args[3]))) throw new Error('Usage example : npm run "3, 0, 2, 4.5, 0, 3, 1" 2 ')
       return [arg2ToArray, Number(args[3])]

    }
  
}