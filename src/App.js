import {Row, Col, InputGroup, Input, Button} from "reactstrap";
import {useState, useEffect} from "react";
import Alert from "./components/Alert";
import List from "./components/List"

function App() {
    const [name, setName] = useState("")
    const [list, setList] = useState([]);
    const [isEditing, setIsEditing] = useState(false)
    const [editId, setEditId] = useState(null)
    const [alert, setAlert] = useState({show: false, msg: "", type: ""})

    function handleSubmit() {

    }
    function showAlert() {

    }
    function removeItem() {

    }
    function editItem() {

    }
    function clearList() {

    }
    return (
        <div className="App">
            <section className="todo-card">
                <h1>Todo List</h1>
                <form className="todo-card-input form" action="" onSubmit={handleSubmit}>
                    {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
                    <InputGroup>
                        <Input
                            type="text"
                            placeholder={"I must do it! :)"}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Button type={"submit"} id={"submit"}>
                            {isEditing ? "Edit" : "Submit"}
                        </Button>
                    </InputGroup>
                </form>
                {
                    list.length > 0 && (
                        <div>
                            <List items={list} removeItem={removeItem} editItem={editItem}/>
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
