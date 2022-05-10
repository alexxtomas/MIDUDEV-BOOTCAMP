export const ShowCourses = ({courses}) => {
    let totalExercises = [0, 0]
    return (
      <>
      {courses.map((course) => {
        if (course.name === 'Half Stack application development') {
          return (
            <div key={course.id}>
            <h1>{course.name}</h1>
            <ul>
              {course.parts.map((part) => {
                totalExercises[0] += part.exercises
                return <li key={part.id}>Name: {part.name} Exercises: {part.exercises}</li>
              }
              )}
            </ul>
            <p>Total Exercises: {totalExercises[0]}</p>
          </div>
          )
        } else if (course.name === 'Node.js') {
          return (
            <div key={course.id}>
            <h1>{course.name}</h1>
            <ul>
              {course.parts.map((part) => {
                totalExercises[1] += part.exercises
                return <li key={part.id}>Name: {part.name} Exercises: {part.exercises}</li>
              }
              )}
            </ul>
            <p>Total Exercises: {totalExercises[1]}</p>
          </div>
          )
        }
        
      }
      )}
      </>
    )
  }
  
  