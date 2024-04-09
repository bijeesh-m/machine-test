import axios from "axios";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  interface userInfo {
    email: string;
    password: string;
  }

  let initialState: userInfo = {
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState<userInfo>(initialState);
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
    const toastId = toast.loading(null);
    e.preventDefault();
    axios
      .post("https://reqres.in/api/login", formValues)
      .then(() => {
        toast.success("Login success", { id: toastId });
        navigate("/home");
      })
      .catch((err) => {
        toast.error(err.response.data.error, { id: toastId });
      });
  };

  return (
    <div className=" w-screen h-screen bg-white flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className=" md:w-1/3 h-[400px] bg-blue-700  p-8 space-y-3  rounded-lg  flex flex-col items-center "
      >
        <h1 className=" text-2xl text-center mb-10 font-bold text-white">
          Login
        </h1>
        <div className=" flex w-[300px] space-x-3  justify-between ">
          <label className=" w-1/2 text-white" htmlFor="email">
            Email:
          </label>
          <input
            className=" border border-white focus:outline-none px-2"
            type="email"
            value={formValues.email}
            onChange={(e) =>
              setFormValues({ ...formValues, email: e.target.value })
            }
          />
        </div>
        <div className=" flex w-[300px] space-x-3 ">
          <label className=" w-1/2 text-white " htmlFor="password">
            Password:
          </label>
          <input
            className=" border border-black focus:outline-none px-2 "
            type="password"
            value={formValues.password}
            onChange={(e) =>
              setFormValues({ ...formValues, password: e.target.value })
            }
          />
        </div>
        <div className=" mt-10 ">
          <button className=" bg-black font-bold my-9 py-1 px-4 text-white rounded-sm">
            Login
          </button>
        </div>
        <p className=" flex gap-3 text-white">
          Don't have an account ?{" "}
          <Link className=" text-black underline" to={"/register"}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
