"use client";
import React, { useState } from "react";
import Image from "next/image";
import * as Yup from "yup";
import { Resolver, useForm } from "react-hook-form";
import ErrorMsg from "../common/error-msg";
import icon from "@/assets/images/icon/icon_60.svg";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { adminLogin } from "@/redux/features/user/api";
import { useAppSelector } from "@/redux/hook";
import Loader from "@/ui/loader";
import { notifyError } from "@/utils/toast";

// form data type
type IFormData = {
  //   name: string;
  email: string;
  password: string;
};

// schema
const schema = Yup.object().shape({
  //   name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});
// resolver
const resolver: Resolver<IFormData> = async (values) => {
  return {
    values: values.password ? values : {},
    errors: !values.password
      ? {
          //   name: {
          //     type: "required",
          //     message: "Name is required.",
          //   },
          email: {
            type: "required",
            message: "Email is required.",
          },
          password: {
            type: "required",
            message: "Password is required.",
          },
        }
      : {},
  };
};

const RegisterForm = ({ role }: { role: string }) => {
  const dispatch = useDispatch();
  const { loading } = useAppSelector((state) => state.persistedReducer.user);
  const router = useRouter();
  const [showPass, setShowPass] = useState<boolean>(false);
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormData>({ resolver });
  // on submit
  const onSubmit = async (formData: IFormData) => {
    // const isAdminLoggedIn = await adminLogin(dispatch, formData);
    // if (isAdminLoggedIn) {

    // }
    // reset();
    try {
      await adminLogin(dispatch, formData);
      router.push("/dashboard/admin-dashboard");
    } catch (error) {
      notifyError("error while login try again");
      console.log(error);
    }
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        {/* <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>Name*</label>
            <input
              type="text"
              placeholder="James Brower"
              {...register("name", { required: `Name is required!` })}
              name="name"
            />
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.name?.message!} />
            </div>
          </div>
        </div> */}
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>Email*</label>
            <input
              type="email"
              placeholder="james@example.com"
              {...register("email", { required: `Email is required!` })}
              name="email"
            />
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.email?.message!} />
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-20">
            <label>Password*</label>
            <input
              type={`${showPass ? "text" : "password"}`}
              placeholder="Enter Password"
              className="pass_log_id"
              {...register("password", { required: `Password is required!` })}
              name="password"
            />
            <span
              className="placeholder_icon"
              onClick={() => setShowPass(!showPass)}
            >
              <span className={`passVicon ${showPass ? "eye-slash" : ""}`}>
                <Image src={icon} alt="pass-icon" />
              </span>
            </span>
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.password?.message!} />
            </div>
          </div>
        </div>
        {/* <div className="col-12">
          <div className="agreement-checkbox d-flex justify-content-between align-items-center">
            <div>
              <input type="checkbox" name="remember" />
              <label htmlFor="remember">
                By hitting the Register button, you agree to the{" "}
                <a href="#">Terms conditions</a> &{" "}
                <a href="#">Privacy Policy</a>
              </label>
            </div>
          </div>
        </div> */}
        <div className="col-12">
          <button
            type="submit"
            className="btn-eleven fw-500 tran3s d-block mt-20"
          >
            {loading ? <Loader /> : "Login"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
