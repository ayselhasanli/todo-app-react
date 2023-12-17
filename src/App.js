import {Input, Button} from "reactstrap";
import {useState, useEffect} from "react";
import Alert from "./components/Alert";
import List from "./components/List"

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
            showAlert(true, "add", "Item Added To The List")
            const newItem = {id: new Date().getTime().toString(), title: name}
            setTodos([...todos, newItem])
            setName("");
        }
    }

    const showAlert = (show = false, type = "", msg = "") => {
        setAlert({show, type, msg})
    }

    const removeItem = (id) => {
        setAlert(true, "add", "Item Removed")
        setTodos(todos.filter((item) => item.id !== id));
    }

    const editItem = (id) => {
        const editItem = todos.find((item) => item.id === id)
        setIsEditing(true)
        setEditId(id)
        setName(editItem.title)
        setAlert(true, "edit", "Item Changed")
    }

    const clearList = () => {
        setAlert(true, "add", "Empty List")
        setTodos([])
    }

    return (
        <div className="App">
            <section className="todo-card">
                {alert.show && <Alert {...alert} removeAlert={showAlert} list={todos}/>}
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
                            <List items={todos} removeItem={removeItem} editItem={editItem}/>
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
