import React, {useState, forwardRef, useImperativeHandle} from 'react'
import Proptypes from 'prop-types'
import React from 'react'

const Togglable = forwardRef(({btnText, children}, ref) => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(!visible)
      }
    
      useImperativeHandle(ref, () => {
        return {
          toggleVisibility,
        }
      })


    return (
        <>
            <button onClick={toggleVisibility}>
                {btnText}
            </button>

            <div>
                {children}
                <button onClick={toggleVisibility}>
                    Cancel
                </button>
            </div>
        </>
    )
})

Togglable.displayName = 'Togglable'
export default Togglable

Togglable.propTypes = {
    btnText: PropTypes.string.isRequired,
    children: PropTypes.node,
}