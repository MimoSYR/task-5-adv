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
import Pagination from "../components/Pagination/Pagination";
import { Modal } from "react-bootstrap";

const ProductsPage = () => {
  const products = useLoaderData();
  const navigate = useNavigate();

  const [showNav, setShowNav] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const [modalShow, setModalShow] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);

  const lastPageIndex = currentPage * productsPerPage;
  const firstPageIndex = lastPageIndex - productsPerPage;

  const filteredProducts = useMemo(() => {
    if (!searchInput) {
      return products;
    } else {
      return products.filter((product: ProductItem) =>
        product.name?.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
  }, [searchInput, products]);

  const currentProducts = filteredProducts.slice(firstPageIndex, lastPageIndex);

  const handleShowNav = (show: boolean) => {
    setShowNav(show);
  };

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
    setModalShow(false);
  };

  const handleCloseModal = () => {
    setModalShow(false);
  };
  const handleShowModal = (id: number) => {
    setModalShow(true);
    setSelectedCardId(id);
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
          <button
            onClick={() => handleShowNav(true)}
            className="d-lg-none d-block menu-icon btn btn-warning p-1 ms-2">
            <img className="" src="/menu.png" alt="" />
          </button>
          <Navbar handleShowNav={handleShowNav} />
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
      {/* delete modal */}
      <Modal
        className="delete-modal"
        show={modalShow}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered>
        <Modal.Body className="text-center p-5 rounded-5 text-uppercase text-black">
          <h4>Are you sure you want to delete the product?</h4>
          <div className="d-flex justify-content-between w-50 mt-5 mx-auto">
            <Button
              size="lg"
              className="btn-warning text-white fs-3 px-5 rounded-1"
              onClick={() =>
                selectedCardId !== null && handleDelete(selectedCardId)
              }>
              Yes
            </Button>
            <Button
              size="lg"
              className="btn-warning text-white  fs-3 px-5 rounded-1"
              onClick={() => handleCloseModal()}>
              No
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {/* products list */}
      <Row
        xs={1}
        md={2}
        lg={4}
        className="g-4 justify-content-center text-center">
        {currentProducts.map((product: Product) => (
          <Col key={product.id}>
            <ProductCard product={product} handleShowModal={handleShowModal} />
          </Col>
        ))}
        {/* pagination */}
        <Col>
          <Pagination
            totalProducts={products.length}
            productsPerPage={productsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ProductsPage;
