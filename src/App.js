import Login from "./components/Login";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./components/Home";
import { useState } from "react";
import Register from "./components/Register";
import Protected from "./components/Protected";
import CreatePost from "./components/CreatePost";
import Loader from "./components/Loader";
import EditPost from "./components/EditPost";

function App() {

  const [userexists,setuserexists]=useState(false)
  const [loading,setloading]=useState(false)
  const [isedit,setisedit]=useState(false)

  
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>{userexists ?<Login setuserexists= {setuserexists} setloading={setloading} loading={loading}/> : <Register setuserexists= {setuserexists}/>}</>}/>        
        <Route path="/home" element={<Protected><Home loading={loading} setisedit={setisedit} /></Protected>}/>
        <Route path="/createpost" element={<Protected><CreatePost /></Protected>}/>
        <Route path="/editpost/:id" element={<Protected><EditPost /></Protected>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
