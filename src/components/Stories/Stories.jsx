import { useContext } from "react";
import "./stories.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);

  // const { isLoading, error, data } = useQuery(["stories"], () =>
  //   makeRequest.get("/stories").then((res) => {
  //     return res.data;
  //   })
  // );

  const stories = [
    {
      id: 1,
      name: "John Doe",
      img: "https://images.pexels.com/photos/954713/pexels-photo-954713.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    {
      id: 2,
      name: "Alfin James",
      img: "https://images.pexels.com/photos/931018/pexels-photo-931018.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1&lazy=load",
    },
    {
      id: 3,
      name: "Natali Coner",
      img: "https://images.pexels.com/photos/18528278/pexels-photo-18528278/free-photo-of-model-posing-on-street-in-black-and-white.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    {
      id: 4,
      name: "Brutton Butch",
      img: "https://images.pexels.com/photos/17792493/pexels-photo-17792493/free-photo-of-black-and-white-photo-of-elegantly-dressed-bride-and-groom-standing-on-a-street.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1&lazy=load",
    },
  ];

  //TODO Add story using react-query mutations and use upload function.

  return (
    <div className="stories">
      <div className="story">
        <img src={"/upload/" + currentUser?.userWithoutPassword?.proPic} alt="" />
        <span>{currentUser?.userWithoutPassword?.FirstName}</span>
        <button>+</button>
      </div>
      {stories.map((story) => (
            <div className="story" key={story.id}>
              <img src={story.img} alt="" />
              <span>{story.name}</span>
            </div>
          ))}
    </div>
  );
};

export default Stories;