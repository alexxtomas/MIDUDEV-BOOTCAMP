import './App.css';
import Message from './Message.js'


const WhiteSpace = () => {
  return <br />
}

const Description = () => {
  return <p>This is my first page with React</p>
}

const App = () => {
  return (
    <div className="App">
      <Message color='red' message='FIRST MESSAGE' text='this is the color red'/>
      <Message color='green' message='SECOND MESSAGE' text="this is the color green"/>
      <Message color='blue' message='THIRD MESSAGE' text="this is the color blue"/>
      <WhiteSpace />
      <Description />
    </div>
  );
}

export default App;
