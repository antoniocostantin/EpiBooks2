import { Card } from 'react-bootstrap'

function SingleBook ({book, selected, changeState}) {
  // state = {
  //   selected: false,
  // }

  const checkSelected = (value) => (value === selected ? 'selected' : '')

    return (
      <>
        <Card
          onClick={() => changeState(book.asin)
          }
          style={{ border: checkSelected(book.asin) ? '3px solid red' : 'none' }}
        >
          <Card.Img variant="top" src={book.img} />
          <Card.Body>
            <Card.Title style={{ color: 'black' }}>
              {book.title}
            </Card.Title>
          </Card.Body>
        </Card>
      </>
    )
  
}

export default SingleBook
