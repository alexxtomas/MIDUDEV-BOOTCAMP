import ReactDOM from 'react-dom/client';
import { useState } from "react";
import "./styles.css"

const root = ReactDOM.createRoot(document.getElementById('root'));


const Buttons = () => {
    const [clicks, setClicks] = useState({
        left: 0,
        right: 0,
        last: 0
    })
    const handleClick = event => {
        console.log(event.target.childNodes[0].data)
        if (event.target.childNodes[0].data === 'Left') {
            setClicks({
                ...clicks,
                left: clicks.left + 1,
                last: true
            })
        } else  {
            setClicks({
                ...clicks,
                right: clicks.right + 1,
                last: false
            })
        }
    }
    const WhoHasMoreClicks = () => {
        let data;
        if(clicks.left > clicks.right) data = <p>Left has {clicks.left - clicks.right} more clicks</p>
        else if (clicks.right > clicks.left)  data = <p>Right has {clicks.right - clicks.left } more clicks</p>
        else data = <p>Both have the same clicks</p>
        return data;
    }

    const resetClicks = async () => {
        let confirm = window.confirm('Do you really want to reset all clicks?')
        await (confirm) ? setClicks({
            left: clicks.left = 0,
            right: clicks.right = 0
        }) : alert('Clicks were not deleted')
    }

    const lastClick = () => {
        if (clicks.last) return 'Left'
        else if (clicks.last === false) return 'Right'
        else return 'Never clicked'
    }
    


    
    return (
        <div className="container">
            <div className='left-right'>
                <section className="left">
                    <button onClick={handleClick}>Left</button>
                    <p>Left Clicks: {clicks.left}</p>
                </section>
                <section className='right'>
                    <button onClick={handleClick}>Right</button>
                    <p>Right Clicks: {clicks.right}</p>
                </section>
            </div>
            <section className='general'>
                <p>Last Click: {lastClick()}</p>
                <p>Total Clicks: {clicks.left + clicks.right}</p>
                <WhoHasMoreClicks />
                <button onClick={resetClicks}>Reset Clicks</button>
            </section>
        </div>
    )

}


const App = () => {
    return (
        <>
            <Buttons />
            
        </>
        
    )

}
root.render(<App />)