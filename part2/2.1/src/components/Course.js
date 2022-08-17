const Header = (props) => (
    <>
      <h1>{props.course}</h1>
    </>
  )
  
const Part = ({name, exercises}) => (
  <>
    <p>{name} {exercises}</p>
  </>
)

const Course = ({course}) => (
  <>
    <Header course={course.name} />
    {course.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
    <b>total of {course.parts.reduce((acc, part) => acc + part.exercises, 0)} exercises</b>
  </>
)

export default Course