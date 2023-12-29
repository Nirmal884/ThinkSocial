import Post from "../post/post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Posts = ({userId}) => {
  
  // console.log(userId)
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts?userId="+userId).then((res) => {
      return res.data;
    })
  );

  // console.log(data,"___________dat");

  return (
    <div className="posts">
      {error
        ? <h1>Something Went Wrong You have to login again</h1>
        : isLoading
        ? <span className="loader">Loading</span>
        : data.map((post) => <Post post={post} key={post.id} />)
        }
    </div>
  );
};

export default Posts;