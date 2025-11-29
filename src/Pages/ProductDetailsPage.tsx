import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Link, useParams } from "react-router";
import type { Product, ProductDetail } from "../types/interfaces";
import axios from "axios";

const ProductDetailsPage = () => {
  const [product, setProduct] = useState<Product>();
  const params = useParams();

  useEffect(() => {
    axios
      .get(`https://dashboard-i552.onrender.com/api/items/${params.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      })
      .then((response) => setProduct(response.data))
      .catch((error) => console.log(error));
  }, []);

  const formatDateString = (isoString: string): string => {
    const date = new Date(isoString);

    // Get day, month, and year
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  };

  const details = [
    { name: "price", value: product?.price },
    {
      name: "added at",
      value: product ? formatDateString(product.created_at) : "",
    },
    {
      name: "updated at",
      value: product ? formatDateString(product.updated_at) : "",
    },
  ];
  return (
    <div>
      <div className="px-3">
        {/* back button */}
        <Link to={"/dashboard"}>
          <div className="back-btn rounded-circle p-1 border border-black d-flex justify-content-center align-items-center cursor-pointer">
            <Image src="/backArrowIcon.png" alt="back" />
          </div>
        </Link>
        {/* title */}
        <h1 className="py-5 fw-semibold text-capitalize">{product?.name}</h1>
        {/* Item Details */}

        <div className="details">
          <Row className=" text-center  mb-4">
            <Image className="mx-auto" src={product?.image_url} />
          </Row>
          <Row lg={2} sm={1} className="d-flex justify-content-center">
            {details.map((detail: ProductDetail) => (
              <Col className="d-flex align-items-center justify-content-sm-center mb-4">
                <h3 className="me-2 fw-semibold fs-60 text-capitalize">
                  {detail.name}:
                </h3>
                <p className="m-0 fs-3 fw-medium text-gray">
                  {detail.value}
                  {detail.name === "price" && "$"}
                </p>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
