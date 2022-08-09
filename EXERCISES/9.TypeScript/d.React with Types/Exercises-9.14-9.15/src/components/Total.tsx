import { CoursePart } from "../types"

type Data = CoursePart

interface Prop {
    courseParts: Data[]
}

const Total = ({courseParts}: Prop ) => {
    return (<p className="numberOfExercises">
    Number of exercises{" "}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>)
}

export default Total