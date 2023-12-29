import Stories from "../../components/Stories/Stories"
import Posts from "../../components/Posts/posts"
import Share from "../../components/Share/share"
import "./home.scss"

const Home = () => {
  return (
    <div className="home">
      <Stories/>
      <Share/>
      <Posts/>
    </div>
  )
}

export default Home