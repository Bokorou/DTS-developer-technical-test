import {Routes, Route} from "react-router-dom";
import TaskPage from "./TaskPage";
import Login from "./Login/Login";

function App () {

return(
    <Routes>
        <Route path = "/" element= {<Login/>}/>
        <Route path="/Task" element={<TaskPage/>}/>
    </Routes>
)

    
}

export default App