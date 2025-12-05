import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import CardImgOverlay from "react-bootstrap/CardImgOverlay";
import type { ProductCardProps } from "../../types/interfaces";
import { useNavigate } from "react-router";
import { useState } from "react";

const ProductCard = ({ product, handleShowModal }: ProductCardProps) => {
  const navigate = useNavigate();
  const [currentImageUrl, setCurrentImageUrl] = useState(product.image_url);
  const defaultProductImage = "defaultProductImage.png";

  const handleProfileImageError = () => {
    setCurrentImageUrl(defaultProductImage);
  };

  return (
    <Card className="product-card cursor-pointer justify-content-center align-items-center">
      <Card.Img
        className="product-image thumbnail"
        src={currentImageUrl}
        alt="User Profile"
        onError={() => handleProfileImageError()}
      />

      {/* The Overlay Content */}
      <CardImgOverlay className="product-overlay d-flex flex-column align-items-center justify-content-center">
        <h3
          onClick={() => navigate(`/dashboard/product/${product.id}`)}
          className="product-name mb-4 fw-semibold text-capitalize">
          {product.name}
        </h3>

        <Stack direction="horizontal" gap={2}>
          {/* Using flex-fill for same wide size buttons */}
          <Button
            size="sm"
            variant="warning"
            onClick={() => navigate(`/dashboard/edit/${product.id}`)}
            className="flex-fill text-white">
            Edit
          </Button>
          <Button
          
            size="sm"
            variant="danger"
            onClick={() => handleShowModal(product.id)}
            className="flex-fill">
            Delete
          </Button>
        </Stack>
      </CardImgOverlay>
    </Card>
  );
};

export default ProductCard;
