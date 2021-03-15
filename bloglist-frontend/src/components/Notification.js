import React from 'react'
import PropTypes from 'prop-types'
import { useSelector} from 'react-redux'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react"

function Notification(props) {

    const message = useSelector(state => state.notification)
    if (!message || (!message?.notification && !message?.error)) return null

    return (
        <Alert status={message?.error ? 'error' : 'info'} {...props} variant="solid" padding="1.5" borderRadius="md">
        <AlertIcon />
        {message?.notification ? message?.notification : message?.error}      
        </Alert>
    )
    
}

export default Notification

Notification.propTypes = {
    className: PropTypes.string,
  }