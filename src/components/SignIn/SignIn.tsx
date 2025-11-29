import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import type { Input, SigninData } from "../../types/interfaces";
import FormInputs from "../FormInputs/FormInputs";
import { Image } from "react-bootstrap";

const SignIn = () => {
  const navigate = useNavigate();

  const inputs : Array<Input> = [
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
  ];

  const formHeader = {
    title: "SIGN IN",
    paragraph: "Enter your credentials to access your account",
  };

  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });

  const dataHandle = (data: SigninData) => {
    setSigninData(data);
  };

  useEffect(() => {
    console.log(signinData);

    if (signinData.email !== "") {
      fetch("https://dashboard-i552.onrender.com/api/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signinData),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userInfo", JSON.stringify(data.user));
          navigate("/dashboard");
        })
        .catch((err) => console.log(err));
    } else {
      console.log("error no data");
    }
  }, [signinData, navigate]);

  return (
    <div>
      <Image className="mb-5" src="/logo.png" />
      <div className="form-head mb-5 text-center">
        <h4 className="fw-semibold text-uppercase">{formHeader.title}</h4>
        <p className="text-gray fs-6">{formHeader.paragraph}</p>
      </div>
      <FormInputs inputs={inputs} formBtn="Sign In" dataHandle={dataHandle} />
      <p className="fs-14">
        don't have an account?
        <span
          className="text-warning fw-semibold text-decoration-underline cursor-pointer ms-1"
          onClick={() => navigate("/signup")}>
          Sign up
        </span>
      </p>
    </div>
  );
};

export default SignIn;
