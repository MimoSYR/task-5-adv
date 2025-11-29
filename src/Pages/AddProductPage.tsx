import { useEffect, useState } from "react";
import Image from "react-bootstrap/Image";
import { Link, useNavigate } from "react-router";
import AddEditForm from "../components/AddEditForm/AddEditForm";
import type { AddProduct, Input } from "../types/interfaces";
import axios from "axios";
// import FormInputs from "../components/FormInputs/FormInputs";

const AddProductPage = () => {
  const navigate = useNavigate();

  const [newProduct, setNewProduct] = useState<AddProduct>({
    name: "",
    price: "",
    image: null,
  });

  const inputs: Array<Input> = [
    {
      keyName: "name",
      label: "name",
      type: "text",
      placeholder: "Enter the product name",
    },
    {
      keyName: "price",
      label: "price",
      type: "number",
      placeholder: "Enter the product price",
    },
    {
      keyName: "image",
      label: "image",
      type: "File",
    },
  ];

  const dataHandle = (data: AddProduct) => {
    setNewProduct(data);
  };

  useEffect(() => {
    if (newProduct.name) {
      axios
        .post("https://dashboard-i552.onrender.com/api/items", newProduct, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
            "Accept": "application/json",
          },
        })
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
        <h1 className="py-5 fw-semibold text-uppercase">add new item</h1>
        {/* Add Item */}
        {/* <FormInputs inputs={inputs} dataHandle={dataHandle} formBtn="save" /> */}
        <AddEditForm inputs={inputs} dataHandle={dataHandle} />
      </div>
    </div>
  );
};

export default AddProductPage;
