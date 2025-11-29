import { Link, useLoaderData, useNavigate } from "react-router";
import type { Product, ProductItem } from "../types/interfaces";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import ProductCard from "../components/ProductCard/ProductCard";
import { useMemo, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";

const ProductsPage = () => {
  const products = useLoaderData();
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");

  const filteredProducts = useMemo(() => {
    if (!searchInput) {
      return products;
    } else {
      return products.filter((product: ProductItem) =>
        product.name?.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
  }, [searchInput, products]);

  const handleDelete = (id: number) => {
    axios
      .delete(`https://dashboard-i552.onrender.com/api/items/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        navigate("/dashboard");
      });
  };

  return (
    <div>
      {/* search by name */}
      <div className="d-flex align-items-center justify-content-center">
        <nav className="navbar">
          <InputGroup className="w-search-input mx-auto">
            <Form.Control
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              type="search"
              placeholder="Search product by name"
            />
            <InputGroup.Text>
              <Image src="searchIcon.png" alt="search icon" />
            </InputGroup.Text>
          </InputGroup>
        </nav>
        <div className="navbar-info postion-relative">
          <button className="d-lg-none d-block menu-icon btn btn-warning p-1 ms-2">
            <img className="" src="/menu.png" alt="" />
          </button>
          <Navbar />
        </div>
      </div>
      {/* add new product */}
      <div className="w-100 text-end my-4">
        <Link to={"/dashboard/add"}>
          <Button variant="warning" className="text-white btn-sm px-4 py-2">
            Add New Product
          </Button>
        </Link>
      </div>
      {/* products list */}
      <Row
        xs={1}
        md={2}
        lg={4}
        className="g-4 justify-content-center text-center">
        {filteredProducts?.map((product: Product) => (
          <Col key={product.id}>
            <ProductCard product={product} handleDelete={handleDelete} />
          </Col>
        ))}
      </Row>
      {/* pagination */}
    </div>
  );
};

export default ProductsPage;
