import { ListGroup } from 'react-bootstrap'
import SingleComment from './SingleComment'

function CommentList({changed, commentsToShow}){

    return(
       <ListGroup style={{ color: 'black' }} className="mt-2">
    {commentsToShow.map((comment) => (
      <SingleComment comment={comment} key={comment._id} changed={changed} />
    ))}
  </ListGroup>
    )
 
}

export default CommentList
