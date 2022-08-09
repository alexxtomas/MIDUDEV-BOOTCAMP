import {CoursePart} from '../types'
import Part from './Part'
type Data = CoursePart

interface Prop {
    courseParts: Data[]
}


const Content = ({courseParts}: Prop ) => {
    return (
        <>
            {
                // courseParts.map(p => (<p key={p.name}>{p.name} {p.exerciseCount}</p>))
                courseParts.map(p => <Part key={p.name} coursePart={p} />)
            }
        </>
    )
}

export default Content