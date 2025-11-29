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
      className={`container-fluid py-4 bg-yellow d-flex align-items-center justify-content-center text-center h-100 bg-yellow`}>
      <div className="form-card">
        <Outlet />
      </div>
    </div>
  );
};

export default Authorization;