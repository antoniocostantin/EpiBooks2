import { useEffect, useState } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";
const key =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmM3MmI2OTI4YWI5NjAwMTU2NjRmMGEiLCJpYXQiOjE3MjQzMjg4MDksImV4cCI6MTcyNTUzODQwOX0.wnBh_-sJ2xk_WEUOpVkm7v46qPvgLfKyFzSFbs1YXJg";

function CommentArea (props){
  // state = {
  //   comments: [],
  //   isLoading: true,
  //   isError: false,
  //   asin: this.props.asin,
  //   change: false,
  // };

  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [asin, setAsin] = useState(props.asin)
  const [change, setChange] = useState(false)

  const changed = (() => {
    
    setChange(!change)
  })

  useEffect(() =>{
    fetch(
      "https://striveschool-api.herokuapp.com/api/comments/" +
        props.asin,
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
          setIsLoading(false)
          setIsError(true)
          throw new Error("Errore nella chiamata!!");
        }
      })
      .then((data) => {
        console.log(data)
        setComments(data)
        setIsError(false)
        setAsin(props.asin)
      })
      .catch((err) => {
        setIsError(true)
        setIsLoading(false)
        console.log(err);
      });

  }, [props.asin])

  useEffect(() => {
    fetch(
      "https://striveschool-api.herokuapp.com/api/comments/" +
        props.asin,
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
          setIsError(true)
          setIsLoading(false)
          throw new Error("Errore nella chiamata!!");
        }
      })
      .then((data) => {
        console.log(data)
        setComments(data)
        setIsError(false)
        setIsLoading(false)
        setAsin(props.asin)
      })
      .catch((err) => {
        setIsError(true)
        setIsLoading(false)
        console.log(err);
      });

  }, [change])

useEffect(() => {
  fetch(
    "https://striveschool-api.herokuapp.com/api/comments/" +
      props.asin,
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
        setIsError(true)
        setIsLoading(false)
        throw new Error("Errore nella chiamata!!");
      }
    })
    .then((data) => {
      console.log(data)
      setComments(data)
      setIsError(false)
      setIsLoading(false)
      setAsin(asin)
    })
    .catch((err) => {
      setIsError(true)
      setIsLoading(false)
      console.log(err);
    });

}, [])


    return (
      <div className="text-center">
        {isLoading && <Loading />}
        {isError && <Error />}
        <AddComment asin={asin} changed={changed}/>
        <CommentList commentsToShow={comments} changed={changed}/>
      </div>
    );
  }


export default CommentArea;
