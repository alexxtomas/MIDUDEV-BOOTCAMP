const Filter = ({setNewFilter}) => {
    const handleFilter = event => {
      setNewFilter(event.target.value)
    }
    return <div>filter shown with <input onChange={handleFilter}></input></div>
  }

export default Filter