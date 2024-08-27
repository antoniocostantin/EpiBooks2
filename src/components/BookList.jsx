import { useState } from "react";
import SingleBook from "./SingleBook";
import CommentArea from "./CommentArea";
import { Col, Container, Form, Row } from "react-bootstrap";

function BookList({books}){
  

  const [searchQuery, setSearchQuery] = useState('')
  const [selected, setSelected] = useState('')
  const changeState = (newSelectedValue) => {
    
    setSelected(newSelectedValue)
  };

    return (
      <>
        <Row className="justify-content-center mt-5">
          <Col xs={12} className="text-center">
            <Form.Group>
              <Form.Control
                type="search"
                placeholder="Cerca un libro"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Container fluid>
          <Row xs={{ cols: 2 }}>
            <Col>
              <Row className="g-2 mt-3">
                {books
                  .filter((b) =>
                    b.title.toLowerCase().includes(searchQuery)
                  )
                  .map((b) => (
                    <Col xs={12} md={6} lg={4} key={b.asin}>
                      <SingleBook
                        book={b}
                        selected={selected}
                        changeState={changeState}
                      />
                    </Col>
                  ))}
              </Row>
            </Col>
            <Col className="mt-2">
              <CommentArea asin={selected} />
            </Col>
          </Row>
        </Container>
      </>
    );
  }


export default BookList;
