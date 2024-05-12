import axios from "axios";
import "./ProductList.css";
import { useEffect, useRef, useState } from "react";
import { InfoCircle, Trash, PencilSquare } from "react-bootstrap-icons";
import { Modal, Row, Col, Form } from "react-bootstrap";
import { ChevronDown } from "react-bootstrap-icons";
import Swal from "sweetalert2";
import MyDropzone from "../MyDropzone/MyDropzone";

const ProductList = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [productData, setProductData] = useState([]);
  const [showProductDetailsModal, setShowProductDetailsModal] = useState(false);
  const [showProductUpdateModal, setShowProductUpdateModal] = useState(false);
  const [showUploadImageModal, setShowUploadImageModal] = useState(false);
  const [productDefaultValue, setProductDefaultValue] = useState({
    defaultame: "",
    defaultImage: "",
    defaultCategory: "",
    defaultOldPrice: "",
    defaultNewPrice: "",
    defaultDescription: "",
  });
  const [newProductValue, setNewProductValue] = useState({
    newName: "",
    newImage: "",
    newCategory: "",
    newOldPrice: "",
    newNewPrice: "",
    newDescription: "",
  });
  const [categoryOption, setCategoryOption] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [image, setImage] = useState("");

  const newCategoryRef = useRef([]);

  const selectCategoryOptionHandler = () => {
    categoryOption ? setCategoryOption(false) : setCategoryOption(true);
  };

  const getAllProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/product");
      setAllProducts(response.data.data);
    } catch (error) {
      Swal.fire({
        icon: "warning",
        text: "An Error Occurred",
      });
    }
  };

  const confirmDeleteProduct = (id, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#695cfe",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((res) => {
      if (res.isConfirmed) {
        deleteProduct(id, name);
      }
    });
  };

  const deleteProduct = async (id, name) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/product?id=${id}&name=${name}`
      );
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Successfully Deleted Data",
        }).then(() => {
          getAllProducts();
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "warning",
        text: "An Error Occurred",
      });
    }
  };

  const detailsProduct = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4000/product/${id}`);
      setProductData(response.data.data[0]);
      setProductDefaultValue({
        defaultName: response.data.data[0].name,
        defaultImage: response.data.data[0].image,
        defaultCategory: response.data.data[0].category,
        defaultOldPrice: response.data.data[0].old_price,
        defaultNewPrice: response.data.data[0].new_price,
        defaultDescription: response.data.data[0].description,
      });
      setSelectedCategory(response.data.data[0].category);
    } catch (error) {
      Swal.fire({
        icon: "warning",
        text: "An Error Occurred",
      });
    }
  };

  /* Details Modal Handler */
  const handleProductDetailsModalClose = () =>
    setShowProductDetailsModal(false);
  const handleProductDetailsModalShow = () => setShowProductDetailsModal(true);

  /* Update Modal Handler */
  const handleUpdateProductModalClose = () => setShowProductUpdateModal(false);
  const handleUpdateProductModalShow = () => setShowProductUpdateModal(true);

  /* Upload Image Handler */
  const handleUploadImageModalClose = () => setShowUploadImageModal(false);
  const handleUploadImageModalShow = () => setShowUploadImageModal(true);

  const onChangeHandler = (e) => {
    setNewProductValue({ ...newProductValue, [e.target.name]: e.target.value });
  };

  const newCategoryHandler = (index) => {
    setSelectedCategory(newCategoryRef.current[index].innerText);
    setNewProductValue({
      ...newProductValue,
      ["newCategory"]: newCategoryRef.current[index].innerText,
    });
    categoryOption ? setCategoryOption(false) : setCategoryOption(true);
  };

  const productDetailsModal = (show) => {
    return (
      <Modal
        show={show}
        onHide={handleProductDetailsModalClose}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <div className="product-image-display d-flex justify-content-center">
                <img src={productData.image} alt="Product Display" />
              </div>
            </Col>
            <Col md={6}>
              <div className="product-details">
                <div className="details d-flex flex-column mb-3">
                  <p className="label">Name</p>
                  <p className="value">{productData.name}</p>
                </div>
                <div className="details d-flex flex-column mb-3">
                  <p className="label">Category</p>
                  <p className="value">{productData.category}</p>
                </div>
                <div className="details d-flex flex-column mb-3">
                  <p className="label">Old Price</p>
                  <p className="value">{productData.old_price}</p>
                </div>
                <div className="details d-flex flex-column mb-3">
                  <p className="label">New Price</p>
                  <p className="value">{productData.new_price}</p>
                </div>
                <div className="details d-flex flex-column mb-3">
                  <p className="label">Description</p>
                  <p className="value">{productData.description}</p>
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    );
  };

  const categoryList = [
    {
      name: "Lifestyle",
    },
    {
      name: "Running",
    },
    {
      name: "Sandals & Flip Flops",
    },
  ];

  const updateProductHandler = async () => {
    try {
      const response = await axios.put("http://localhost:4000/product", {
        id: productData.id,
        name:
          newProductValue.newName !== ""
            ? newProductValue.newName
            : productDefaultValue.defaultName,
        image:
          newProductValue.newImage !== ""
            ? newProductValue.newImage
            : productDefaultValue.defaultImage,
        category:
          newProductValue.newCategory !== ""
            ? newProductValue.newCategory
            : productDefaultValue.defaultCategory,
        new_price:
          newProductValue.newNewPrice !== ""
            ? newProductValue.newNewPrice
            : productDefaultValue.defaultNewPrice,
        old_price:
          newProductValue.newOldPrice !== ""
            ? newProductValue.newOldPrice
            : productDefaultValue.defaultOldPrice,
        description:
          newProductValue.newDescription !== ""
            ? newProductValue.newDescription
            : productDefaultValue.defaultDescription,
      });
      if (response.data.success) {
        Swal.fire({
          text: "Product Successfully Updated",
          icon: "success",
        }).then(() => {
          getAllProducts();
          detailsProduct(productData.id);
          handleUpdateProductModalClose();
        });
      } else {
        Swal.fire({
          text: "An Error Occurred 1",
          icon: "warning",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        text: "An Error Occurred 2",
        icon: "warning",
      });
    }
  };

  const updateProductModal = (show) => {
    return (
      <Modal
        show={show}
        onHide={handleUpdateProductModalClose}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={5}>
              <div className="product-image-display d-flex justify-content-center">
                <img src={productData.image} alt="Product Display" />
              </div>
              <div className="changes-image d-flex justify-content-center mt-3">
                <button
                  className="change-image-btn"
                  onClick={() => {
                    handleUploadImageModalShow();
                  }}
                >
                  Change Image
                </button>
              </div>
            </Col>
            <Col md={7}>
              <Form>
                <Form.Group className="mb-3 position-relative">
                  <Form.Control
                    type="text"
                    name="newName"
                    placeholder="Product Name"
                    defaultValue={productDefaultValue.defaultName}
                    className={
                      productDefaultValue.defaultName || newProductValue.newName
                        ? "filled"
                        : ""
                    }
                    onChange={(e) => onChangeHandler(e)}
                  />
                  <Form.Label className="position-absolute">
                    Product Name
                  </Form.Label>
                </Form.Group>
                <Form.Group className="mb-3 position-relative">
                  <div
                    className={
                      selectedCategory
                        ? "category-dropdown d-flex justify-content-between align-items-center p-2 filled"
                        : "category-dropdown d-flex justify-content-between align-items-center p-2"
                    }
                    onClick={selectCategoryOptionHandler}
                    tabIndex="1"
                  >
                    <p className="mb-0 position-absolute form-label-category">
                      Category
                    </p>
                    {selectedCategory !== "" && (
                      <p className="mb-0 ms-1">{selectedCategory}</p>
                    )}
                    <ChevronDown size={12} className="ms-auto" />
                  </div>
                  {categoryOption && (
                    <div className="category-dropdown-option position-absolute">
                      {categoryList.map((item, index) => (
                        <div
                          ref={(element) =>
                            (newCategoryRef.current[index] = element)
                          }
                          className="option"
                          key={index}
                          onClick={() => newCategoryHandler(index)}
                        >
                          {item.name}
                        </div>
                      ))}
                    </div>
                  )}
                </Form.Group>
                <div className="price-wrapper d-flex">
                  <Form.Group className="mb-3 position-relative me-1">
                    <Form.Control
                      type="text"
                      name="newOldPrice"
                      placeholder="Price"
                      defaultValue={productDefaultValue.defaultOldPrice}
                      className={
                        productDefaultValue.defaultOldPrice ||
                        newProductValue.newOldPrice
                          ? "filled"
                          : ""
                      }
                      onChange={(e) => onChangeHandler(e)}
                    />
                    <Form.Label className="position-absolute">Price</Form.Label>
                  </Form.Group>
                  <Form.Group className="mb-3 position-relative ms-1">
                    <Form.Control
                      type="text"
                      name="newNewPrice"
                      placeholder="Offers"
                      defaultValue={productDefaultValue.defaultNewPrice}
                      className={
                        productDefaultValue.defaultNewPrice ||
                        newProductValue.newNewPrice
                          ? "filled"
                          : ""
                      }
                      onChange={(e) => onChangeHandler(e)}
                    />
                    <Form.Label className="position-absolute">
                      Offers
                    </Form.Label>
                  </Form.Group>
                </div>
                <Form.Group className="mb-3 position-relative">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="newDescription"
                    defaultValue={productDefaultValue.defaultDescription}
                    className={
                      productDefaultValue.defaultDescription ||
                      newProductValue.newDescription
                        ? "filled"
                        : ""
                    }
                    onChange={(e) => {
                      onChangeHandler(e);
                    }}
                    placeholder="Description"
                  />
                  <Form.Label className="position-absolute">
                    Description
                  </Form.Label>
                </Form.Group>
              </Form>
            </Col>
            <div className="save-changes mt-4">
              <button onClick={() => updateProductHandler()}>
                Save Changes
              </button>
            </div>
          </Row>
        </Modal.Body>
      </Modal>
    );
  };

  const imageUploadHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/upload",
        {
          product: image[0],
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        setNewProductValue({
          ...newProductValue,
          ["newImage"]: response.data.image_url,
        });
        handleUploadImageModalClose();
      } else {
        Swal.fire({
          text: "An Error Occurred",
          icon: "warning",
        });
      }
    } catch (error) {
      Swal.fire({
        text: "An Error Occurred",
        icon: "warning",
      });
    }
  };

  const uploadImageModal = (show) => {
    return (
      <Modal
        show={show}
        onHide={handleUploadImageModalClose}
        centered
        size="md"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3 position-relative">
              <p className="mb-1 image-label">Product Image</p>
              <MyDropzone setImage={setImage} />
            </Form.Group>
            <div className="save-changes mt-3">
              <button onClick={(e) => imageUploadHandler(e)}>
                Upload Image
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="product-list">
      <div className="product-list-wrapper">
        <div className="product-list-area">
          <div className="product-list-header grid-format">
            <p>Product</p>
            <p>Product Name</p>
            <p>Category</p>
            <p>Action</p>
          </div>
          <hr />
          <div className="product-list-format-wrapper">
            <div className="product-list-format list-grid-format">
              {allProducts.map((product) => {
                return (
                  <>
                    <div className="product-image">
                      <img src={product.image} alt="Product" />
                    </div>
                    <div className="product-name">
                      <p>{product.name}</p>
                    </div>
                    <div className="product-category">
                      <p>{product.category}</p>
                    </div>
                    <div className="product-action">
                      <button
                        className="details mx-1"
                        onClick={() => {
                          detailsProduct(product.id);
                          handleProductDetailsModalShow();
                        }}
                      >
                        <InfoCircle size={17} />
                      </button>
                      <button
                        className="edit mx-1"
                        onClick={() => {
                          detailsProduct(product.id);
                          handleUpdateProductModalShow();
                        }}
                      >
                        <PencilSquare size={17} />
                      </button>
                      <button
                        className="delete mx-1"
                        onClick={() =>
                          confirmDeleteProduct(product.id, product.name)
                        }
                      >
                        <Trash size={17} />
                      </button>
                    </div>
                  </>
                );
              })}
            </div>
            {/* Modal */}
            {productDetailsModal(showProductDetailsModal)}
            {updateProductModal(showProductUpdateModal)}
            {uploadImageModal(showUploadImageModal)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
