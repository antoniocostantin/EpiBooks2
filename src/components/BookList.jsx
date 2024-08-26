import { Component } from "react";
import SingleBook from "./SingleBook";
import CommentArea from "./CommentArea";
import { Col, Container, Form, Row } from "react-bootstrap";

class BookList extends Component {
  state = {
    searchQuery: "",
    selected: "",
  };

  changeState = (newSelectedValue) => {
    this.setState({
      selected: newSelectedValue, // Uno, Due o Tre
    });
  };

  render() {
    return (
      <>
        <Row className="justify-content-center mt-5">
          <Col xs={12} className="text-center">
            <Form.Group>
              <Form.Control
                type="search"
                placeholder="Cerca un libro"
                value={this.state.searchQuery}
                onChange={(e) => this.setState({ searchQuery: e.target.value })}
              />
            </Form.Group>
          </Col>
        </Row>
        <Container fluid>
          <Row xs={{ cols: 2 }}>
            <Col>
              <Row className="g-2 mt-3">
                {this.props.books
                  .filter((b) =>
                    b.title.toLowerCase().includes(this.state.searchQuery)
                  )
                  .map((b) => (
                    <Col xs={12} md={6} lg={4} key={b.asin}>
                      <SingleBook
                        book={b}
                        selected={this.state.selected}
                        changeState={this.changeState}
                      />
                    </Col>
                  ))}
              </Row>
            </Col>
            <Col className="mt-2">
              <CommentArea asin={this.state.selected} />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default BookList;
