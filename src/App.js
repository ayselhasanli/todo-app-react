import {Input, Button, Row, Col} from "reactstrap";
import React, {useState, useEffect} from "react";
import Alert from "./components/Alert";
import {FaRegEdit} from "react-icons/fa";
import {MdDelete} from "react-icons/md";

const getLocalStorage = () => {
    let list = localStorage.getItem("list")
    if (list) {
        return (list = JSON.parse(localStorage.getItem("list")))
    } else {
        return []
    }
}

function App() {
    const [name, setName] = useState("")
    const [todos, setTodos] = useState(getLocalStorage());
    const [isEditing, setIsEditing] = useState(false)
    const [editId, setEditId] = useState(null)
    const [alert, setAlert] = useState({show: false, msg: "", type: ""})

    useEffect(() => {
        localStorage.setItem("list", JSON.stringify(todos))
    }, [todos])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name) {
            showAlert(true, "error", "Please Enter Value")
        } else if (name && isEditing) {
            setTodos(
                todos.map((item) => {
                    if (item.id === editId) {
                        return {...item, title: name}
                    }
                    return item
                })
            );
            setName("");
            setEditId(null);
            setIsEditing(false)
            showAlert(true, "edit", "Item Changed Successfully")
        } else {
            showAlert(true, "added", "Item Added To The List")
            const newItem = {id: new Date().getTime().toString(), title: name}
            setTodos([...todos, newItem])
            setName("");
        }
    }

    const showAlert = (show = false, type = "", msg = "") => {
        setAlert({show, type, msg})
    }

    const removeItem = (id) => {
        showAlert(true, "remove", "Item Removed")
        setTodos(todos.filter((item) => item.id !== id));
    }

    const editItem = (id) => {
        const editItem = todos.find((item) => item.id === id)
        setIsEditing(true)
        setEditId(id)
        setName(editItem.title)
        showAlert(true, "edit", "Item Changed")
    }

    const clearList = () => {
        showAlert(true, "remove", "All Items Removed")
        setTodos([])
    }

    return (
        <div className="App">
            <section className="todo-card">
                {alert.show ? <Alert {...alert} removeAlert={showAlert} list={todos}/> : <div className={"not-active"}>not active</div> }
                <h1>Todo List</h1>
                <form className="todo-card-input form">
                    <Input
                        type="text"
                        placeholder={"I must do it! :)"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Button onClick={handleSubmit}>
                        {isEditing ? "Edit" : "Submit"}
                    </Button>
                </form>
                {
                    todos.length > 0 && (
                        <div>
                            <div className="todos-container">
                                {
                                    todos.map((todo) => {
                                        const {id, title} = todo
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
                            <div className="clear-section">
                                <button onClick={clearList} id={"clear"}>Clear Items</button>
                            </div>
                        </div>
                    )
                }

            </section>
        </div>
    );
}

export default App;
