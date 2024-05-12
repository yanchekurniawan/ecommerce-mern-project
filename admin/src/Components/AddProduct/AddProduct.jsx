import { useEffect, useRef, useState } from "react";
import "./AddProduct.css";
import { Form } from "react-bootstrap";
import { ChevronDown } from "react-bootstrap-icons";
import MyDropzone from "../MyDropzone/MyDropzone";
import axios from "axios";
import Swal from "sweetalert2";

const AddProduct = () => {
  const [categoryOption, setCategoryOption] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [nameFilled, setNameFilled] = useState(false);
  const [priceFilled, setPriceFilled] = useState(false);
  const [offersFilled, setOffersFilled] = useState(false);
  const [descriptionFilled, setDescriptionFilled] = useState(false);
  const [allData, setAllData] = useState({
    name: "",
    image: "",
    category: "",
    new_price: "",
    old_price: "",
    description: "",
  });
  const [image, setImage] = useState("");

  const categoryRef = useRef([]);

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

  const selectCategoryOptionHandler = () => {
    categoryOption ? setCategoryOption(false) : setCategoryOption(true);
  };

  const categoryHandler = (index) => {
    setSelectedCategory(categoryRef.current[index].innerText);
    setAllData({
      ...allData,
      ["category"]: categoryRef.current[index].innerText,
    });
    categoryOption ? setCategoryOption(false) : setCategoryOption(true);
  };

  const onChangeHandler = (e) => {
    setAllData({ ...allData, [e.target.name]: e.target.value });
  };

  const addProductHandler = async () => {
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
      let allDataDup = { ...allData };
      allDataDup.image = response.data.image_url;
      const addResponse = await axios.post("http://localhost:4000/product", {
        ...allDataDup,
      });
      if (addResponse.data.success) {
        Swal.fire({
          text: "Product Succesfully Added",
          icon: "success",
        });
      } else {
        Swal.fire({
          text: "An Error Occurred",
          icon: "warning",
        });
      }
    } else {
      Swal.fire({
        text: "An Error Occurred",
        icon: "warning",
      });
    }
  };

  useEffect(() => {
    allData.name === "" && setNameFilled(false);
    allData.new_price === "" && setPriceFilled(false);
    allData.old_price === "" && setOffersFilled(false);
  }, [allData.name, allData.new_price, allData.old_price]);

  return (
    <section className="add-product">
      <div className="form-area-wrapper d-flex justify-content-center">
        <div className="form-area">
          <h1 className="menu-title">Add Product</h1>
          <Form>
            <Form.Group className="mb-3 position-relative">
              <Form.Control
                type="text"
                name="name"
                onChange={(e) => {
                  setNameFilled(true);
                  onChangeHandler(e);
                  console.log(e.target.value);
                }}
                className={nameFilled && "filled"}
                placeholder="Product Name"
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
                      ref={(element) => (categoryRef.current[index] = element)}
                      className="option"
                      key={index}
                      onClick={() => categoryHandler(index)}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              )}
            </Form.Group>
            <div className="product-price-form d-md-flex justify-content-between">
              <Form.Group className="mb-3 position-relative me-md-1">
                <Form.Control
                  type="text"
                  name="old_price"
                  onChange={(e) => {
                    setPriceFilled(true);
                    onChangeHandler(e);
                  }}
                  className={priceFilled && "filled"}
                  placeholder="Price"
                />
                <Form.Label className="position-absolute">Price</Form.Label>
              </Form.Group>
              <Form.Group className="mb-3 position-relative ms-md-1">
                <Form.Control
                  type="text"
                  name="new_price"
                  onChange={(e) => {
                    setOffersFilled(true);
                    onChangeHandler(e);
                  }}
                  className={offersFilled && "filled"}
                  placeholder="Offers"
                />
                <Form.Label className="position-absolute">Offers</Form.Label>
              </Form.Group>
            </div>
            <Form.Group className="mb-3 position-relative">
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                onChange={(e) => {
                  setDescriptionFilled(true);
                  onChangeHandler(e);
                }}
                className={descriptionFilled && "filled"}
                placeholder="Description"
              />
              <Form.Label className="position-absolute">Description</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3 position-relative">
              <p className="mb-1 image-label">Product Image</p>
              <MyDropzone setImage={setImage} />
            </Form.Group>
          </Form>
          <button className="add-btn" onClick={() => addProductHandler()}>
            Add Product
          </button>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
