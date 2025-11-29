import { useNavigate } from "react-router";
import Image from "react-bootstrap/Image";
import type { UserInfo } from "../../types/interfaces";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();

  const navListData = [
    {
      icon: "/productsIcon.png",
      keyName: "Products",
    },
    {
      icon: "/bookmarkIcon.png",
      keyName: "Favorites",
    },
    {
      icon: "/bookmarkIcon.png",
      keyName: "order list",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const userInfoString = localStorage.getItem("userInfo");

  const userInfo: UserInfo =
    userInfoString !== null
      ? JSON.parse(userInfoString)
      : console.log("Error, user info not found!");
  const [currentImageUrl, setCurrentImageUrl] = useState(
    userInfo.profile_image_url
  );

  const handleProfileImageError = () => {
    setCurrentImageUrl("/defaultProfileImage.jpg");
  };

  return (
    <div className="d-lg-none navbar-info-nav d-block z-1 bg-beige py-4 px-5 d-flex flex-column justify-content-between align-items-center">
      <div className="d-flex w-100 flex-column justify-content-between align-items-center">
        {/* logo */}
        <div className="logo border-start border-warning border-5 ps-3 mb-5">
          <img className="w-logo" src="/logo.png" alt="focal x logo" />
        </div>
        {/* user info */}
        <div className="d-flex flex-column justify-content-between align-items-center text-center">
          <div className="clipped-image bg-warning">
            <Image
              className="profile-image"
              src={currentImageUrl}
              alt="User Profile"
              onError={() => handleProfileImageError()}
              roundedCircle
            />
          </div>
          <h5 className="text-capitalize fw-bold mt-3">{userInfo.user_name}</h5>
        </div>
        {/* nav */}
        <ul className="list-group border-0 mt-5 w-100">
          {navListData.map((item) => (
            <li
              key={item.keyName}
              className={`list-group-item mb-4 cursor-pointer d-flex justify-content-center align-items-center ${
                item.keyName === "Products" && "active"
              }`}>
              <img src={item.icon} alt="" />
              <p className="mb-0 ms-3">{item.keyName}</p>
            </li>
          ))}
        </ul>
      </div>
      {/* logout */}
      <div
        className="d-flex flex-row align-items-center justify-content-center cursor-pointer"
        onClick={() => handleLogout()}>
        <p className="mb-0 me-4">Logout</p>
        <img src="/logoutIcon.png" alt="" />
      </div>
      
    </div>
  );
};

export default Navbar;
