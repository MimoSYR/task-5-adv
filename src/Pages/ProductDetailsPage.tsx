import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router";

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="px-3">
        {/* back button */}
        <div onClick={() => navigate("/dashboard")}>
          <div className="back-btn rounded-circle p-1 border border-black d-flex justify-content-center align-items-center cursor-pointer">
            <Image src="/backArrowIcon.png" alt="back" />
          </div>
        </div>
        {/* title */}
        <h1 className="py-5 fw-semibold text-uppercase">title</h1>
        {/* Item Details */}

        <div className="details">price</div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
