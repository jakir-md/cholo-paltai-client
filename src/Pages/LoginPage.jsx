import React, { useContext } from "react";
import AuthContext from "../Providers/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { createUserWithGoogle, user, signInUserWithEmailAndPass } =
    useContext(AuthContext);

    console.log(user);

  const location = useLocation();
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signInUserWithEmailAndPass(email, password)
      .then((result) => {
        const lastSignInTime = result.user?.metadata?.lastSignInTime;
        const updatedItem = { email, lastSignInTime };
        navigate(location?.state ? location.state : "/");

        fetch("http://localhost:5000/userupdate", {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(updatedItem),
        })
          .then((res) => res.json())
          .then(() => {
            
          });
      })
      .catch(() => {
        
      });
  };

  const handleLoginWithGoogle = () => {
    createUserWithGoogle()
      .then((result) => {
        const email = result.user.email;
        const name = result.user.displayName;
        const photoURL = result.user.photoURL;
        const creationTime = result.user?.metadata?.creationTime;
        const lastSignInTime = result.user?.metadata?.lastSignInTime;
        const user = {name, photoURL, email, creationTime, lastSignInTime };
        navigate(location?.state ? location.state : "/");

        fetch(`http://localhost:5000/user`, {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ email }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              console.log("inside update", data);
              fetch("http://localhost:5000/userupdate", {
                method: "post",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify({ email, lastSignInTime }),
              })
                .then((res) => res.json())
                .then(() => {});
            }
          })
          .catch((error) => {
            if(error){
              console.log('user');
              fetch(`http://localhost:5000/user`, {
                method: "put",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(user),
              });
            }
          });
      })
      .catch(() => {
        
      });
  };

  return (
    <div>
      <div className="hero bg-base-200 max-w-screen min-h-screen">
        <div className="card bg-base-100 w-screen max-w-sm shrink-0 rounded-none md:rounded-lg shadow-2xl">
          <div className="card-body">
          <h1 className="text-center text-2xl font-bold mb-5">Login</h1>
            <form className="fieldset" onSubmit={handleFormSubmit}>
              <label className="fieldset-label">Email</label>
              <input
                type="email"
                className="input"
                name="email"
                placeholder="Email"
              />
              <label className="fieldset-label">Password</label>
              <input
                type="password"
                className="input"
                name="password"
                placeholder="Password"
              />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Login</button>
            </form>

            <p>
              Don't Have an account?{" "}
              <Link to="/auth/register">
                <span className="hover:border-b-2 hover:border-b-red-500 hover:cursor-pointer text-red-500 font-bold">
                  Register
                </span>
              </Link>
            </p>

            {/* login with google  */}
            <div>
              <div className="grid grid-cols-3 mb-3 mt-0">
                <div className="border-t-gray-300 border-t-2 my-3"></div>
                <p className="text-center text-gray-500">or Sign In With</p>
                <div className="border-t-gray-300 border-t-2 my-3"></div>
              </div>
              <button
                className="font-bold text-xl px-3 py-2 flex gap-3 justify-center items-center text-center border rounded-lg hover:cursor-pointer hover:bg-gray-100"
                onClick={handleLoginWithGoogle}
              >
                <FcGoogle className="text-2xl" /> Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;