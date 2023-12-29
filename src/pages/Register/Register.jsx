import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeRequest } from "../../axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    FirstName: "",
    LastName:"",
    email: "",
    password: "",
    cpassword: "",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await makeRequest.post("/signup", inputs).then((res)=>{
        // console.log(res,"_________!");
        if(res?.status === 200){
          toast.success("Register successfully !", {
            position: toast.POSITION.TOP_RIGHT
          });
          setTimeout(() => {
            navigate("/login")
          }, 3000);
          
        }else{
          toast.error("Some Error Occurred !", {
            position: toast.POSITION.TOP_RIGHT
          });
        }
      });
    } catch (err) {
      setErr(err.response.data);
    }
  };

  console.log(err)

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Think Social</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"  
          />
          <form>
            <input
              type="text"
              placeholder="FirstName"
              name="FirstName"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="LastName"
              name="LastName"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Confrim Password"
              name="cpassword"
              onChange={handleChange}
            />
            {err && err}
            <button onClick={handleClick}>Register</button>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default Register;