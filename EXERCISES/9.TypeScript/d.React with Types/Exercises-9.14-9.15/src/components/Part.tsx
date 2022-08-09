import {CoursePart} from '../types'
type Data = CoursePart

interface Prop {
    coursePart: Data
}

const Part  = ({coursePart}: Prop): JSX.Element  => {
    switch (coursePart.type) {
        case "groupProject":
            return (
                <>
                    <h4>{coursePart.name} {coursePart.exerciseCount}</h4>
                         project exercises {coursePart.groupProjectCount}         
                </>
            )
        case "normal":
            return (
                <>
                <h4>{coursePart.name} {coursePart.exerciseCount}</h4>
                    {coursePart.description}
                </>
            )
        case "submission":
            return (
                <>
                <h4>{coursePart.name} {coursePart.exerciseCount}</h4>
                <p>{coursePart.description}</p>
                submit to {coursePart.exerciseSubmissionLink}
                </>

            )
        case "special": 
            return (
                <>
                <h4>{coursePart.name} {coursePart.exerciseCount}</h4>
                <p>{coursePart.description}</p>
                required skills:  {coursePart.requirements.map(r => r).join(', ')}
                </>
            )
        default:
            return <></>

    }
}

export default Part