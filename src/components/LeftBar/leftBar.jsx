import "./leftBar.scss";
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Drawer,Placeholder } from 'rsuite';
import PeopleTwoToneIcon from '@mui/icons-material/PeopleTwoTone';
import Groups2TwoToneIcon from '@mui/icons-material/Groups2TwoTone';
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import SmartDisplayTwoToneIcon from '@mui/icons-material/SmartDisplayTwoTone';
import TimerTwoToneIcon from '@mui/icons-material/TimerTwoTone';
import CelebrationTwoToneIcon from '@mui/icons-material/CelebrationTwoTone';
import SportsEsportsTwoToneIcon from '@mui/icons-material/SportsEsportsTwoTone';
import CollectionsTwoToneIcon from '@mui/icons-material/CollectionsTwoTone';
import VideoCameraFrontTwoToneIcon from '@mui/icons-material/VideoCameraFrontTwoTone';
import ForumTwoToneIcon from '@mui/icons-material/ForumTwoTone';
import VolunteerActivismTwoToneIcon from '@mui/icons-material/VolunteerActivismTwoTone';
import CastForEducationTwoToneIcon from '@mui/icons-material/CastForEducationTwoTone';
import BugReportTwoToneIcon from '@mui/icons-material/BugReportTwoTone';
import BugRprtModal from "../modal/bugRprtModal";

const LeftBar = () => {

  const { currentUser } = useContext(AuthContext);

  const [size, setSize] = useState('xs');
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [placement, setPlacement] = useState();


  const handleOpen = key => {
    setOpen(true);
    setPlacement(key);
  };

  const modalOpen = ()=>{
    setOpenModal(!openModal)
  }

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img
              src={"/upload/" + currentUser?.userWithoutPassword?.proPic}
              alt=""
            />
             <Link
                to={`/profile/${currentUser?.userWithoutPassword?.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span>{currentUser?.userWithoutPassword?.FirstName}</span>
              </Link>
          </div>
          <div className="item" onClick={() => handleOpen('right')}>
            <PeopleTwoToneIcon/>
            <span>Friends</span>
          </div>
          <div className="item">
            <Groups2TwoToneIcon/>
            <span>Groups</span>
          </div>
          <div className="item">
            <StorefrontTwoToneIcon/>
            <span>Marketplace</span>
          </div>
          <div className="item">
            <SmartDisplayTwoToneIcon/>
            <span>Watch</span>
          </div>
          <div className="item">
            <TimerTwoToneIcon/>
            <span>Memories</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your shortcuts</span>
          <div className="item">
            <CelebrationTwoToneIcon/>
            <span>Events</span>
          </div>
          <div className="item">
            <SportsEsportsTwoToneIcon/>
            <span>Gaming</span>
          </div>
          <div className="item">
            <CollectionsTwoToneIcon/>
            <span>Gallery</span>
          </div>
          <div className="item">
            <VideoCameraFrontTwoToneIcon/>
            <span>Videos</span>
          </div>
          <div className="item">
          <ForumTwoToneIcon/>
            <span>Messages</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>
          <div className="item">
            <VolunteerActivismTwoToneIcon/>
            <span>Donation</span>
          </div>
          <div className="item">
            <CastForEducationTwoToneIcon/>
            <span>Education</span>
          </div>
          <div className="item" onClick={()=>modalOpen()}>
            <BugReportTwoToneIcon/>
            <span>Report Bugs</span>
          </div>
        </div>
      </div>

      <Drawer size={size} placement={placement} open={open} onClose={() => setOpen(!open)}>
        <Drawer.Header>
          <Drawer.Title>Friends</Drawer.Title>
          <Drawer.Actions>
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
          <Placeholder.Paragraph rows={30} />
        </Drawer.Body>
      </Drawer>


      <BugRprtModal  open={openModal} onClose={() => setOpenModal(!openModal)}/>
    </div>
  );
};

export default LeftBar;