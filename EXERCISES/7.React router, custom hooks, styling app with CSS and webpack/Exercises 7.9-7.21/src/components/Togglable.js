import { forwardRef, useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
const Togglable = forwardRef(({ children, buttonLabel, data }, ref) => {
  const [visible, setVisible] = useState(false)

  const hidenWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  const inlineStyle = {
    margin: 12,
    marginTop: 5
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  if (buttonLabel.length === 2 && data !== undefined) {
    return (
      <div className="title-author">
        <div style={hidenWhenVisible}>
          {data.length === 2 ? `${data[0]} by ${data[1]}` : data}
          <Button className="view" onClick={toggleVisibility}>
            {buttonLabel[0]}
          </Button>
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
        <Button
          variant="outline-danger"
          size="sm"
          onClick={toggleVisibility}
          style={inlineStyle}
        >
          Cancel
        </Button>
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
