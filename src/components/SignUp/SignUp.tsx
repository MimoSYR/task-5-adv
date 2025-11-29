import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import type { Input, SignupData } from "../../types/interfaces";
import axios from "axios";
import FormInputs from "../FormInputs/FormInputs";
import { Image } from "react-bootstrap";

const SignUp = () => {
  const navigate = useNavigate();

  const inputs : Array<Input> = [
    {
      keyName: "first_name",
      label: "first name",
      type: "text",
      placeholder: "first name",
    },
    {
      keyName: "last_name",
      label: "last name",
      type: "text",
      placeholder: "last name",
    },
    {
      keyName: "user_name",
      label: "user name",
      type: "text",
      placeholder: "user name",
    },
    {
      keyName: "email",
      label: "email",
      type: "email",
      placeholder: "example@gmail.com",
    },
    {
      keyName: "password",
      label: "password",
      type: "password",
      placeholder: "********",
    },
    {
      keyName: "password_confirmation",
      label: "password confirmation",
      type: "password",
      placeholder: "********",
    },
    {
      keyName: "profile_image",
      label: "profile image",
      type: "File",
    },
  ];

  const formHeader = {
    title: "SIGN UP",
    paragraph: "Fill in the following fields to create an account.",
  };

  const [signupData, setSignupData] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    profile_image: {},
  });

  const dataHandle = (data: SignupData) => {
    setSignupData(data);
  };

  useEffect(() => {
    console.log(signupData);

    if (signupData.email !== "") {
      axios
        .post("https://dashboard-i552.onrender.com/api/register", signupData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          const result = res.data.data;
          // const signUpMessage = result.message;
          // const signUpStatus = result.status;
          // const userLoggedInfo = result.user;
          localStorage.setItem("token", result.token);
          localStorage.setItem("userInfo", JSON.stringify(result.user));
          navigate("/dashboard");
        })
        .catch((err) => console.log(err));
    }
  }, [signupData, navigate]);

  return (
    <div>
      <Image className="mb-5" src="/logo.png" />
      <div className="form-head mb-5 text-center">
        <h4 className="fw-semibold text-uppercase">{formHeader.title}</h4>
        <p className="text-gray fs-6">{formHeader.paragraph}</p>
      </div>
      <FormInputs
        inputs={inputs}
        formBtn="Sign Up"
        dataHandle={dataHandle}
      />
      <p className="fs-14">
        have an account?
        <span
          className="text-warning fw-semibold text-decoration-underline cursor-pointer ms-1"
          onClick={() => navigate("/")}>
          Sign in
        </span>
      </p>
    </div>
  );
};

export default SignUp;
