import axios from "axios";
import { useEffect, useState } from "react";
import Image from "react-bootstrap/Image";
import { Link, useNavigate, useParams } from "react-router";
import type { AddProduct, Input, Product } from "../types/interfaces";
import AddEditForm from "../components/AddEditForm/AddEditForm";

const EditProductPage = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product>();
  const [newProduct, setNewProduct] = useState<AddProduct>();

  const params = useParams();

  const inputs: Array<Input> = [
    {
      keyName: "name",
      label: "name",
      type: "text",
      placeholder: "Enter the product name",
      value: product?.name,
    },
    {
      keyName: "price",
      label: "price",
      type: "number",
      placeholder: "Enter the product price",
      value: product?.price,
    },
    {
      keyName: "image",
      label: "image",
      type: "File",
      value: product?.image_url,
    },
  ];

  const dataHandle = (data: AddProduct) => {
    console.log(data);
    
    setNewProduct(data);
  };

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

  useEffect(() => {
    if (newProduct) {
      axios
        .post(
          `https://dashboard-i552.onrender.com/api/items/${params.id}`,
          { ...newProduct, _method: "PUT" },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          console.log(response);
          navigate("/dashboard");
        })
        .catch((error) => console.log(error));
    }
  }, [newProduct]);

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
        <h1 className="py-5 fw-semibold text-uppercase">edit item</h1>
        {/* Edit Item */}
        <AddEditForm inputs={inputs} dataHandle={dataHandle} />
      </div>
    </div>
  );
};

export default EditProductPage;
