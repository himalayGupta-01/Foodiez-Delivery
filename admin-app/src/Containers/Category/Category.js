import React, { useState } from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory, addCategory, deleteCategory, updateCategory } from '../../actions/Action'
import { getInitialData } from '../../actions/initialData.action'
import Layout from '../../Components/Layout/Layout'
import Input from '../../Components/UI/Input/Input'
import NewModal from "../../Components/UI/Modal/NewModal"
import "./style.css"

const Category = (props) => {

    const category = useSelector(state => state.category);
    const [show, setShow] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [idToOperate, setIdToOperate] = useState("");
    const [nameToOperate, setNametoOperate] = useState("");
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getAllCategory())
    // }, [])

    //to close add category modal 
    const handleClose = () => {
        setShow(false)
        setCategoryName("");
    };

    // to add new category main request
    const addNewCategory = () => {
        dispatch(addCategory(categoryName));
        handleClose();
    }

    // to open add category modal
    const handleShow = () => setShow(true);

    //to update category and close update category page
    const updateCategory1 = () => {
        dispatch(updateCategory(categoryName, idToOperate))
        dispatch(getInitialData())
        setShowUpdateModal(false);
    }

    //to delete category and close delete category page
    const deleteCategory1 = () => {
        dispatch(deleteCategory(idToOperate));
        dispatch(getAllCategory())      // after deleting the deleted category is also shown on this so to avoid it
        dispatch(getInitialData())
        setShowDeleteModal(false);
    }


    // to render all the categories
    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                <div key={category.name} style={{ display: "flex", margin: "12px 0", justifyContent: "space-around" }}>
                    <li style={{ width: "25%" }} key={category.name}>
                        {category.name}
                    </li>
                    <Button variant="outline-warning" onClick={() => {
                        setShowUpdateModal(true)
                        setCategoryName(category.name);
                        setIdToOperate(category._id);
                    }}>Update</Button>
                    <Button variant="outline-danger" onClick={() => {
                        setShowDeleteModal(true)
                        setIdToOperate(category._id);
                        setNametoOperate(category.name);
                    }}>Delete</Button>

                </div>
            );
        }
        return myCategories;
    }

    // add category page data
    const renderAddCategory = () => {
        return (<>
            <NewModal
                show={show}
                handleClose={handleClose}
                modelTitle={"Add New Category"}
                operation={addNewCategory}
            >
                <Row>
                    <Col>
                        <Input
                            type={props.type}
                            placeholder={"Category Name"}
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                    </Col>
                </Row>

            </NewModal>
        </>)
    }

    const renderUpdateCategory = () => {
        return (<>
            <NewModal
                show={showUpdateModal}
                handleClose={() => setShowUpdateModal(false)}
                modelTitle={`Update ${nameToOperate}  Category`}
                operation={updateCategory1}
            >
                <Input
                    type={props.type}
                    placeholder={"Category Name"}
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
            </NewModal>
        </>)

    }

    const renderDeleteCategory = () => {
        return (<>
            <NewModal
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                modelTitle={"Are You Sure??"}
                operation={deleteCategory1}
            >
                <p className="text-danger">All Products under <u><b>{nameToOperate}</b></u> category will also be Deleted</p>
            </NewModal>
        </>)
    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <Button variant="success" onClick={handleShow}>Add +</Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <ul >
                            {renderCategories(category.categories)}
                        </ul>
                    </Col>
                </Row>
            </Container>

            {renderAddCategory()}
            {renderUpdateCategory()}
            {renderDeleteCategory()}

        </Layout>
    )
}

export default Category
