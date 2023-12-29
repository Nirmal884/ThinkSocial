import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/Posts/posts";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/update";
import { useState } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const userId = parseInt(useLocation().pathname.split("/").pop());

  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + userId).then((res) => {
      return res.data;
    })
  );

  // console.log(data,"______________!@");

  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationship"],
    () =>
      makeRequest.get("/relations?followedUserId=" + userId).then((res) => {
        return res.data;
      })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete("/relations?userId=" + userId);
      return makeRequest.post("/relations", { userId });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.userWithoutPassword.id));
  };


  return (
    <div className="profile">
      {/* {isLoading ? (
        "loading"
      ) : ( */}
        <>
          <div className="images">
          {isLoading ? (
              <Skeleton width={"100%"} height={300}  baseColor="#d7d7d7"/> 
            ) : (
              <img src={"/upload/" + data.coverPic} alt="" className="cover" />
              
            )}

            {isLoading ? (
              <Skeleton  circle={true} className="profilePic"  baseColor="#d7d7d7"/> 
            ) : (
              <img src={"/upload/" + data.proPic} alt="" className="profilePic" />
              
            )}
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="left">
                <a href="http://facebook.com">
                  <FacebookTwoToneIcon fontSize="large" />
                </a>
                <a href="http://instagram.com">
                  <InstagramIcon fontSize="large" />
                </a>
                <a href="http://x.com">
                  <TwitterIcon fontSize="large" />
                </a>
                <a href="http://linkedin.com">
                  <LinkedInIcon fontSize="large" />
                </a>
              </div>
              <div className="center">
              {isLoading ? (
                <Skeleton width={100}  baseColor="#d7d7d7"/> 
              ) : (
                <span>{data.FirstName}</span>
              )}
                <div className="info">
                  <div className="item">
                    <PlaceIcon />
                    {isLoading ? (
                      <Skeleton width={60}  baseColor="#d7d7d7"/> 
                    ) : (
                      <span>{data.city}</span>
                    )}
                  </div>
                  <div className="item">
                    <LanguageIcon />
                    {isLoading ? (
                      <Skeleton width={100}  baseColor="#d7d7d7"/> 
                    ) : (
                      <span>{data.website}</span>
                    )}
                  </div>
                </div>
                {rIsLoading ? (
                  <Skeleton width={90}  baseColor="#d7d7d7"/>
                ) : userId === currentUser.userWithoutPassword.id ? (
                  <button onClick={() => setOpenUpdate(true)}>update</button>
                ) : (
                  <button onClick={handleFollow}>
                    {relationshipData.includes(currentUser.userWithoutPassword.id)
                      ? "Following"
                      : "Follow"}
                  </button>
                )}
              </div>
              <div className="right">
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>
            </div>
            <Posts userId={currentUser.userWithoutPassword.id} />
          </div>
        </>
      
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};

export default Profile;