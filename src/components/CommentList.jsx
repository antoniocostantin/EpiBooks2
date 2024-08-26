import { ListGroup } from 'react-bootstrap'
import SingleComment from './SingleComment'
import { Component } from 'react'

class CommentList extends Component{

  render(){
    return(
       <ListGroup style={{ color: 'black' }} className="mt-2">
    {this.props.commentsToShow.map((comment) => (
      <SingleComment comment={comment} key={comment._id} />
    ))}
  </ListGroup>
    )
  }
 
}

export default CommentList
