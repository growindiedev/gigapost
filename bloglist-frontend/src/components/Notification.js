import React from 'react'
import PropTypes from 'prop-types'
import { useSelector} from 'react-redux'


function Notification() {

    const message = useSelector(state => state.notification)
    if (!message || (!message?.notification && !message?.error)) return null

    return (
        <div>
          {message?.notification ? message?.notification : message?.error}
        </div>
    )
    
}

export default Notification

Notification.propTypes = {
    className: PropTypes.string,
  }