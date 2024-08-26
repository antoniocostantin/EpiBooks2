import { Component } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";
const key =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmM3MmI2OTI4YWI5NjAwMTU2NjRmMGEiLCJpYXQiOjE3MjQzMjg4MDksImV4cCI6MTcyNTUzODQwOX0.wnBh_-sJ2xk_WEUOpVkm7v46qPvgLfKyFzSFbs1YXJg";

class CommentArea extends Component {
  state = {
    comments: [],
    isLoading: true,
    isError: false,
    asin: this.props.asin,
    change: false,
  };


  changed = (() => {
    this.setState({
      change: !this.state.change,
    })
  })
  componentDidUpdate = (prevPrps, prevState) => {
    if (prevPrps.asin !== this.props.asin) {
      fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" +
          this.props.asin,
        {
          headers: {
            Authorization: key,
          },
        }
      )
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          } else {
            this.setState({ isLoading: false, isError: true });
            throw new Error("Errore nella chiamata!!");
          }
        })
        .then((data) => {
          console.log(data)
          this.setState({
            comments: data,
            isLoading: false,
            isError: false,
            asin: this.props.asin,
          });
        })
        .catch((err) => {
          this.setState({
            isError: true,
            isLoading: false,
          });
          console.log(err);
        });
    }

    if(prevState.change !== this.state.change){
      fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" +
          this.props.asin,
        {
          headers: {
            Authorization: key,
          },
        }
      )
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          } else {
            this.setState({ isLoading: false, isError: true });
            throw new Error("Errore nella chiamata!!");
          }
        })
        .then((data) => {
          console.log(data)
          this.setState({
            comments: data,
            isLoading: false,
            isError: false,
            asin: this.props.asin,
          });
        })
        .catch((err) => {
          this.setState({
            isError: true,
            isLoading: false,
          });
          console.log(err);
        });
    }
  };

  componentDidMount = async () => {
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" +
          this.props.asin,
        {
          headers: {
            Authorization: key,
          },
        }
      );
      console.log(response);
      if (response.ok) {
        let comments = await response.json();
        this.setState({ comments: comments, isLoading: false, isError: false });
      } else {
        this.setState({ isLoading: false, isError: true });
      }
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false, isError: true });
    }
  };

  render() {
    return (
      <div className="text-center">
        {this.state.isLoading && <Loading />}
        {this.state.isError && <Error />}
        <AddComment asin={this.state.asin} changed={this.changed}/>
        <CommentList commentsToShow={this.state.comments} changed={this.changed}/>
      </div>
    );
  }
}

export default CommentArea;
