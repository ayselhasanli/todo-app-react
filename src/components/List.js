import React from "react";
import '../App.css';
import {Row, Col} from "reactstrap";
import {FaRegEdit} from "react-icons/fa";
import {MdDelete} from "react-icons/md";

const List = (items, removeItem, editItem) => {
    return(
        <div className="todos-container">
            {
                items.map((item) => {
                    const {id, title} = item
                    return (
                        <div className="todo" key={id}>
                            <Row>
                                <Col xl={10}>
                                    {title}
                                </Col>
                                <Col>
                                    <button id={"edit-todo"}>
                                        <FaRegEdit onClick={() => editItem(id)}/>
                                    </button>
                                    <button id={"delete-todo"}>
                                        <MdDelete onClick={() => removeItem(id)}/>
                                    </button>
                                </Col>
                            </Row>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default List