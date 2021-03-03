import blogService from '../services/blogs'



export const createComment = (id, content) => {
    // return async (dispatch) => {
    //     const newComment = await blogService.addComment(id, content)
    //     console.log('createComment', newComment)
    //     dispatch({
    //         type: "ADDCOMMENT",
    //         payload: newComment
    //     })
    // }
    return async (dispatch) => {
        const postId = id
        let newComment = await blogService.addComment(id, content)
        newComment = { ...newComment, postId }
    
        dispatch({
          type: 'ADDCOMMENT',
          data: newComment,
        })
      }
}

const reducer = (state = [], action) => {
        
    switch(action.type) {
        case "INIT": 
            return action.payload
        case "ADDCOMMENT":{
            const { id } = action.payload
            const { postId } = action.payload
            const { title } = action.payload

            const blog = state.find((blog) => blog.id === postId)
            const newComment = { title, id }

            const updatedBlog = {
                ...blog,
                comments: [...blog.comments, newComment],
            }
            return state.map((blog) => (blog.id !== postId ? blog : updatedBlog))
        }
            
        default:
            return state
        }
}

export default reducer