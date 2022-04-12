import React, { useState } from 'react';
import { Col, Container, Row, Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../Components/Layout/Layout';
import Input from '../../Components/UI/Input/Input';
import { addProduct, updateProduct, deleteProduct } from '../../actions/Action';
import { getInitialData } from '../../actions/initialData.action';
import NewModal from "../../Components/UI/Modal/NewModal";
import { generatePublicUrl } from '../../urlConfig';
import "./style.css";

const Products = (props) => {

    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [productPictures, setProductPictures] = useState([]);
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");


    const [showProductDetailModal, setShowProductDetailModal] = useState(false);
    const [productDetails, setProductDetails] = useState(null);

    const [idToOperate, setIdToToOperate] = useState("");

    const [showUpdateProductModal, setShowUpdateProductModal] = useState(false);
    const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);


    const auth = useSelector(state => state.auth)
    const category = useSelector(state => state.category)
    const product = useSelector(state => state.product)


    const dispatch = useDispatch();


    //to show the previously added products
    const renderProducts = () => {
        return (
            <Table style={{ fontSize: "16px" }} responsive="sm">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Price</th>
                        {/* <th>Description</th> */}
                        <th>Category</th>
                        <th style={{ textAlign: "center" }}>Operations</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        product.products.length > 0 ?
                            product.products.map((product, index) =>
                                <tr key={product._id}>
                                    <td>{index + 1}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    {/* <td>{product.description}</td> */}
                                    <td>{product.category.name}</td>
                                    <td style={{
                                        display: "flex",
                                        justifyContent: "space-around"
                                    }}>
                                        <Button variant="outline-primary" onClick={() => handleShowProductDetailsModal(product)}>Details</Button>
                                        <Button variant="outline-warning" onClick={() => {
                                            setIdToToOperate(product._id)
                                            handleShowUpdateProductModal(product);
                                        }}>Update</Button>
                                        <Button variant="outline-danger" onClick={() => {
                                            // ;
                                            setProductDetails(product);
                                            handleShowDeleteShowModal();
                                        }}>Delete</Button>
                                    </td>
                                    {/* </> */}
                                </tr>

                            ) : null
                    }


                </tbody>
            </Table>
        )
    }

    const handleShow = () => setShow(true);

    // to close the add product page
    const handleClose = () => {
        setShow(false);
        setName("");
        setCategoryId("");
        setProductPictures([]);
        setPrice("");
        setDescription("");
    };

    //to handle all the product pictures of newly added products
    const handleProductPictures = (e) => {

        setProductPictures([
            ...productPictures,
            e.target.files[0]
        ]);
        console.log(productPictures);
    }

    //create list of categories from the category object through store
    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name })
        }
        return options;
    }

    //to add the new product
    const addNewProduct = () => {

        const form = new FormData();
        form.append("name", name);
        for (let pic of productPictures) {
            form.append("productPicture", pic);
        }
        form.append("price", price);
        form.append("description", description);
        form.append("category", categoryId);


        // done by videos
        // dispatch(addProduct(form));

        // done by me to display added product immediately
        dispatch(addProduct(form, category.categories));


        handleClose();
    }



    //what to show on add product modal
    const renderAddProductModal = () => {
        return (
            <NewModal
                show={show}
                handleClose={handleClose}
                modelTitle={"Add New Product"}
                operation={addNewProduct}
            >
                <Row>
                    <Col>
                        <Input
                            // type={props.type}
                            // label="Product Name"
                            placeholder={"Product Name"}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Input
                            type="number"
                            // label="Product Price"
                            placeholder={"Product Price"}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Input
                            // type={props.type}
                            // label="Product Description"
                            placeholder={"Product Description"}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Col>
                </Row>

                {/* <br /> */}
                <Row>
                    <Col>
                        <select
                            className="form-control form-select"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)} >
                            <option>Select category</option>
                            {
                                createCategoryList(category.categories).map(option =>
                                    <option key={option.value} value={option.value}>{option.name}</option>
                                )
                            }
                        </select>
                    </Col>
                </Row>


                <Row>
                    <Col>
                        <Input
                            type="file"
                            // label="Product Picture"
                            placeholder={"Product Picture"}
                            onChange={handleProductPictures}
                        />
                        {
                            productPictures.length > 0 ?
                                productPictures.map((pic, index) => <div key={index}> {pic.name} </div>) : null
                        }
                    </Col>
                </Row>
            </NewModal>
        )
    }


    // close product detail modal
    const handleCloseProductDetailsModal = () => {
        setShowProductDetailModal(false);
        setProductDetails(null);
    }

    // show the detail of a product
    const handleShowProductDetailsModal = (product) => {
        setProductDetails(product);
        setShowProductDetailModal(true);
    }

    //show detail of a product
    const renderProductDetailsModal = () => {

        if (!productDetails) {
            return null;
        }
        return (
            <NewModal
                show={showProductDetailModal}
                handleClose={handleCloseProductDetailsModal}
                modelTitle={"Product Details"}
                size="lg"
            >
                <Row>
                    <Col md="6">
                        <label className="key">Name</label>
                        <p className="value">{productDetails.name}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <label className="key">Price</label>
                        <p className="value">{productDetails.price}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <label className="key">Category</label>
                        <p className="value">{productDetails.category.name}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <label className="key">Description</label>
                        <p className="value">{productDetails.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label className="key">Product Pictures</label>
                        <div style={{ display: "flex" }}>
                            {productDetails.productPictures.map(picture =>
                                <div className="productImgContainer">
                                    <img src={generatePublicUrl(picture.img)} />
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </NewModal>
        )
    }


    const handleCloseUpdateProductModal = () => {
        setShowUpdateProductModal(false);
        setName("");
        setCategoryId("");
        setProductPictures([]);
        setPrice("");
        setDescription("");
    }

    const handleShowUpdateProductModal = async (product) => {
        console.log("We get product as ",product);
        
        await setName(product.name);
        await setPrice(product.price);
        await setCategoryId(product.category._id)
        await setDescription(product.description);
        await setProductPictures([
            ...product.productPictures
        ]);       
        setShowUpdateProductModal(true);

        console.log("Values after setting in handleUpdateProduct are ", idToOperate, name, price, productPictures, description, categoryId);
    }

    const updateProductFinal = () => {
        const data={
            name:name,
            price:price,
            description:description,
            productPictures:[
                ...productPictures
            ],
            category:categoryId,
            updatedBy:auth.user._id

        }        
        dispatch(updateProduct(data, idToOperate));
        dispatch(getInitialData())
        handleCloseUpdateProductModal();

    }

    const handleProductPicturesUpdated = (e) => {
        // setProductPictures([
        //     ...productPictures,
        //     e.target.files[0]
        // ]);
    }


    const renderUpdateProductModal = () => {
        return (
            <NewModal
                show={showUpdateProductModal}
                handleClose={handleCloseUpdateProductModal}
                modelTitle={"Update Product"}
                operation={updateProductFinal}
            >
                <Row>
                    <Col>
                        <Input
                            // type={props.type}
                            // label="Product Name"
                            placeholder={"Product Name"}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Input
                            type="number"
                            // label="Product Price"
                            placeholder={"Product Price"}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Input
                            // type={props.type}
                            // label="Product Description"
                            placeholder={"Product Description"}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <select
                            className="form-control form-select"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)} >
                            <option>Select category</option>
                            {
                                createCategoryList(category.categories).map(option =>
                                    <option key={option.value} value={option.value}>{option.name}</option>
                                )
                            }
                        </select>
                    </Col>
                </Row>


                <Row>
                    <Col>
                        <Input
                            type="file"
                            // label="Product Picture"
                            placeholder={"Product Picture"}
                            onChange={handleProductPictures}
                        />
                        {
                            productPictures.length > 0 ?
                                productPictures.map((pic, index) => <div key={index}> {pic.name} </div>) : null
                        }
                    </Col>
                </Row>
            </NewModal>
        )

    }


    const handleCloseDeleteShowModal = () => {
        setShowDeleteProductModal(false);
        setProductDetails(null);
        
    }

    const handleShowDeleteShowModal = () => {
        setShowDeleteProductModal(true);
    }

    const deleteProductFinal=()=>{
        console.log("Have to delete product id ",productDetails._id)
        dispatch(deleteProduct(productDetails._id));
        dispatch(getInitialData())
        handleCloseDeleteShowModal();

    }

    const renderDeleteProductModal = () => {
        return (<>
            <NewModal
                show={showDeleteProductModal}
                handleClose={() => handleCloseDeleteShowModal(false)}
                modelTitle={"Are You Sure??"}
                operation={deleteProductFinal}
            >
                <p className="text-danger">Following product will be deleted</p>
                <Row>
                    <Col md="6">
                        <label className="key">Name</label>
                        <p className="value">{productDetails.name}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <label className="key">Price</label>
                        <p className="value">{productDetails.price}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <label className="key">Category</label>
                        <p className="value">{productDetails.category.name}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <label className="key">Description</label>
                        <p className="value">{productDetails.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label className="key">Product Pictures</label>
                        <div style={{ display: "flex" }}>
                            {productDetails.productPictures.map(picture =>
                                <div className="productImgContainer">
                                    <img src={generatePublicUrl(picture.img)} />
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </NewModal>
        </>)
    }








    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Product</h3>
                            <Button variant="success" onClick={handleShow}>Add +</Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {renderProducts()}
                    </Col>
                </Row>
            </Container>
            {renderAddProductModal()}
            {renderProductDetailsModal()}
            {showUpdateProductModal ? renderUpdateProductModal(): null}
            {showDeleteProductModal ? renderDeleteProductModal(): null}
        </Layout>
    )
}

export default Products
