import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

const Authorization = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div
      className={`container-fluid bg-yellow d-flex align-items-center justify-content-center text-center`}>
      <div className="z-n1 h-full "></div>
      <div className="form-card my-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Authorization;
