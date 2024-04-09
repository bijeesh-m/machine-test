import { Toaster } from "react-hot-toast"
import { Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home"


function App() {

  return (
    <>
      <div>
        <Toaster />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </>
  )
}

export default App
