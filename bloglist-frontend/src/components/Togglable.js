import React, {useState, forwardRef, useImperativeHandle} from 'react'
import PropTypes from 'prop-types'
import { Button, Box, VStack } from '@chakra-ui/react';

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
        <VStack>
            <Button onClick={toggleVisibility}
            size="sm" 
            _hover={{ boxShadow: 'md' }}
            _active={{ boxShadow: 'lg' }}
            borderRadius="sm"
             width="20"
            style={hideWhenVisible} >
                {btnText}
            </Button>

            <Box style={showWhenVisible} >
                {children}
                <Button
                onClick={toggleVisibility}
                 size="sm" 
                 _hover={{ boxShadow: 'md' }}
				_active={{ boxShadow: 'lg' }}
                borderRadius="sm"
          		width="20"
                
                  >
                Cancel
                </Button>
            </Box>
        </VStack>
    )
})

Togglable.displayName = 'Togglable'
export default Togglable

Togglable.propTypes = {
    btnText: PropTypes.string.isRequired,
    children: PropTypes.node,
}