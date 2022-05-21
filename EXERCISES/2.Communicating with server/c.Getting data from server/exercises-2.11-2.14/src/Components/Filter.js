const Filter = ({value, onChange}) => {
    return <div>Find Countries: <input onChange={onChange} value={value}></input></div>
}

export default Filter