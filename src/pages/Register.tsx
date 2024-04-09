import axios from "axios";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

    interface userInfo {
        email: string,
        password: string
    }

    let initialState: userInfo = {
        email: "",
        password: ""
    }

    const [formValues, setFormValues] = useState<userInfo>(initialState);

    const navigate = useNavigate()
    const handleRegister = (e: FormEvent) => {
        const toastId = toast.loading(null)
        e.preventDefault();
        axios
            .post("https://reqres.in/api/register", formValues)
            .then((res) => {
                toast.success("Register success", { id: toastId })
                navigate('/home')
            })
            .catch((err) => {
                toast.error(err.response.data.error, { id: toastId });
            });
    };

    return (
        <div className=" w-screen h-screen bg-black flex justify-center items-center">
            <form
                onSubmit={handleRegister}
                className=" md:w-1/3 h-[400px] bg-white p-8 space-y-3 items-center  rounded-lg  flex flex-col  "
            >
                <h1 className=" text-2xl text-center mb-10 font-bold">Register</h1>
                <div className=" flex w-[300px] space-x-3   justify-between ">
                    <label className=" w-1/2" htmlFor="email">
                        Email:
                    </label>
                    <input
                        className=" border border-black focus:outline-none px-2"
                        type="email"
                        value={formValues.email}
                        onChange={(e) =>
                            setFormValues({ ...formValues, email: e.target.value })
                        }
                    />
                </div>
                <div className=" flex w-[300px] space-x-3 ">
                    <label className=" w-1/2 " htmlFor="password">
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
                    <button className=" bg-black my-9  py-1 px-4 text-white rounded-sm">
                        Register
                    </button>
                </div>
                <p className=" flex gap-3">Already have an account ? <Link className=" text-blue-500 underline" to={'/login'}>Login</Link></p>
            </form>
        </div>
    );
};

export default Register;
