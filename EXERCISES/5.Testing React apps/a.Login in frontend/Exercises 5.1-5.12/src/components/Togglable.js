import { forwardRef, useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef(({ children, buttonLabel, data }, ref) => {
  const [visible, setVisible] = useState(false)

  const hidenWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  console.log(data)

  if (buttonLabel.length === 2 && data !== undefined) {
    return (
      <div className="title-author">
        <div style={hidenWhenVisible}>
          {data.length === 2 ? `${data[0]} by ${data[1]}` : data}
          <button className="view" onClick={toggleVisibility}>
            {buttonLabel[0]}
          </button>
        </div>

        <div style={showWhenVisible}>
          {children}
          <button className="hide" onClick={toggleVisibility}>
            {buttonLabel[1]}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div style={hidenWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>

      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  children: PropTypes.element.isRequired,
  buttonLabel: PropTypes.oneOfType([
    PropTypes.arrayOf(String).isRequired,
    PropTypes.string.isRequired
  ]),
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(String).isRequired,
    PropTypes.string.isRequired
  ])
}

export default Togglable
