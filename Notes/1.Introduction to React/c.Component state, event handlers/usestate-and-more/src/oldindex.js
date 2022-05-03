// import { useState } from 'react';
// import ReactDOM from 'react-dom/client';

// const root = ReactDOM.createRoot(document.getElementById('root'));

// const Counter = ({number}) => {
//     return <h1>{number}</h1>
// }


// const App = () => {
//   let [counter, setCounter] = useState(0);
 
//   const handleClick = (event) => {
//     if (counter > 0) {
//       if(event.target.childNodes[0].data === 'Incremetar' ) setCounter(counter + 1)
//       else setCounter(counter - 1)
//     }else if (counter === 0) {
//         if(event.target.childNodes[0].data === 'Decrementar' ) setCounter(0)
//         else setCounter(counter + 1)
//     }
      
   
      
//   }
//   const handleClickReset = () => {
//     return setCounter(0)
//   }

  
// const isEven = counter % 2 === 0

//   return (
//     <div>
//       <Counter number={counter} />
//       <button onClick={handleClick}>Incremetar</button>
//       <button onClick={handleClick}>Decrementar</button>
//       <button onClick={handleClickReset}>Reset</button>
//       <br/>
//       <br/>
//       <small>{(isEven) ? `${counter} is even`
//                        : `${counter} is odd`}
//       </small>

      
//     </div>
//   )
// }









// root.render(<App />)


