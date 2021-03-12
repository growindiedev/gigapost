import React from 'react'
import {Alert} from '@chakra-ui/react'

const Comment = (props) => {
  const items = ["blue", "cyan", "gray", "green", "orange", "pink", "purple", "red", "teal", "yellow", "blackAlpha", "linkedin", "facebook", "messenger", "whatsapp", "twitter", "telegram"]

  return <Alert {...props} colorScheme={items[Math.floor(Math.random() * items.length)]}>{props.comment.title || props.comment}</Alert>
}

export default Comment