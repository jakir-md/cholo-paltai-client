import { useContext } from "react";
import { useForm } from "react-hook-form";
import "./form.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../Providers/AuthContext";

export function RegisterPage() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const { createUserWithEmailAndPass , updateUserInfo} = useContext(AuthContext);
  return (
    <div className="formclass md:w-1/2 w-full mx-auto shadow-2xl px-10 py-10">
      <h1 className="text-center text-2xl font-bold mb-5">Registration</h1>
      <form
        onSubmit={handleSubmit((data) => {
          const email = data.email;
          const password = data.password;
          const name = data.name;
          const photourl = data.photourl;
          
          createUserWithEmailAndPass(email, password)
          .then((result) => {
            console.log(result);
            const creationTime = result.user?.metadata?.creationTime;
            const lastSignInTime = result.user?.metadata?.lastSignInTime;
            const user = {name, email, photourl, creationTime, lastSignInTime};
            fetch(`http://localhost:5000/user`, {
              method: "put",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(user),
            }).then(res => res.json())
            .then((error) => {
              console.log(error);
            })
            
            updateUserInfo({displayName: name, photoURL: photourl})
            .then(() => {
              
            }).catch(()=>{

            })

            navigate(location?.state ? location.state : '/');
          })
          .catch(() => {
            
          });
        })}
      >
        <label>Name</label>
        <input {...register("name", { required: true })} placeholder="Name" />
        <label>Email</label>
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
        />
        <label>PhotoURL</label>
        <input
          {...register("photourl", { required: true })}
          placeholder="PhotoURL"
        />
        <label>Password</label>
        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Password"
        />
        <input type="submit" value="Register" />
      </form>
      <p>
        Already Have an account?{" "}
        <Link to="/auth/login">
          <span className="hover:border-b-2 hover:border-b-red-500 hover:cursor-pointer text-red-500 font-bold">
            Login
          </span>
        </Link>
      </p>
    </div>
  );
}