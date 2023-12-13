import './App.css';
import {Row, Col} from "reactstrap";
import {FaRegEdit} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import {useState} from "react";

function App() {
    const [active, setActive] = useState(false)
    const [value, setValue] = useState("")

    const holdInputValue = event =>{
        setValue(event.target.value)
        console.log(value)
    }

    function valueError () {
        console.log()
        setActive(!active)
    }

    return (
        <div className="App">
            <div className="todo-card">
                <div className={active ? "error-inner" : "error-inner not-active"}>
                    Please enter value
                </div>
                <h1>Todo List</h1>
                <div className="todo-card-input">
                    <Row>
                        <Col xs={12} sm={6} md={8} xl={10}>
                            <input onChange={holdInputValue} placeholder={"I must do it! :)"} type="text"/>
                        </Col>
                        <Col xs={12} sm={6} md={4} xl={2}>
                            <button onClick={valueError} id={"submit"}>Submit</button>
                        </Col>
                    </Row>
                </div>
                <div className="todos-container">
                    <div className="todo">
                        <Row>
                            <Col xl={10}>
                                Todo
                            </Col>
                            <Col>
                                <button id={"edit-todo"}>
                                    <FaRegEdit/>
                                </button>
                                <button id={"delete-todo"}>
                                    <MdDelete/>
                                </button>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="clear-section">
                    <button id={"clear"}>Clear Items</button>
                </div>
            </div>
        </div>
    );
}

export default App;
