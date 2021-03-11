import React, {useState, forwardRef, useImperativeHandle} from 'react'
import PropTypes from 'prop-types'
import { Button, Box } from '@chakra-ui/react';

const Togglable = forwardRef(({btnText, children}, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

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
            <Button onClick={toggleVisibility} style={showWhenVisible}>
                {btnText}
            </Button>

            <Box style={hideWhenVisible}>
                {children}
                <Button onClick={toggleVisibility} >
                    Cancel
                </Button>
            </Box>
        </>
    )
})

Togglable.displayName = 'Togglable'
export default Togglable

Togglable.propTypes = {
    btnText: PropTypes.string.isRequired,
    children: PropTypes.node,
}