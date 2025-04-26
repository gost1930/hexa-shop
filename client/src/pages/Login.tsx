import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Inputs } from "../components";
import { Button } from "../admin/components";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { LuKeyRound } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import useFetch from "../hooks/useFetch";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [triggerFetch, setTriggerFetch] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm();


  const { data: resData, loading, error } = useFetch(
    triggerFetch ? "user/login" : "",
    "POST",
    userData
  );
  console.log(resData?.user.id)

  const onSubmit = (data: any) => {
    // console.log(data);
    setUserData(data);
    setTriggerFetch(true);
  };
  useEffect(() => {
    if (resData) {
      setErrorMessage("");
      setTriggerFetch(false);
      window.localStorage.setItem("userId", resData?.user.id);
      <Navigate to="/" />
    }
    if (error) {
      setErrorMessage(error.message || "Login failed, please try again.");
      setTriggerFetch(false);
    }
  }, [resData, error]);
  if (resData?.token) return <Navigate to="/admin" />
  return (
    <div className="min-h-screen grid place-content-center">
      <div className="shadow-xl rounded-md dark:bg-gray-900 p-10 min-w-[30rem] -translate-y-20">
        <div className="flex justify-center mb-10">
          <h1 className="text-3xl font-semibold dark:text-gray-100">Login Form</h1>
        </div>
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-5">
            <Inputs
              type="email"
              placeholder="Enter email"
              icon={<FaRegUser />}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

            <Inputs
              type="password"
              placeholder="Enter your password"
              icon={<LuKeyRound />}
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <Button
            className="mt-12 border rounded-full w-full justify-center hover:bg-black/90 hover:text-white dark:text-white dark:hover:bg-gray-600"
            title={loading ? "Logging in..." : "Login"}
            icon={<AiOutlineShoppingCart />}
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
