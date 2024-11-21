//import { useNavigate } from "react-router-dom";
import { useState } from "react";
import bg from '../assets/img/bg.png'
import GetStarted from '../components/login/get-started';
import GetStartedAuth from '../components/login/get-started-auth';
import SignIn from "../components/login/sign-in";


function LoginLayout() {
    /* const navigate = useNavigate();
  
    const handleLogin = () => {
      onLogin(); // Simula autenticación.
      navigate("/"); // Redirige al layout principal.
    }; */

    const [variable, setVariable] = useState("SignIn");

    let content;

    if (variable === "GetSarted") {
        content = <GetStarted onChange={() => setVariable("SignIn")}/>
    } else if (variable === "GetSartedAuth") {
        content = <GetStartedAuth onChange={() => setVariable("GetSarted")}/>
    } else if (variable === "SignIn"){
        content = <SignIn onChange={() => setVariable("GetSarted")}/>
    } else {
        content = <div>Loading...</div>;
    }
  
    return (
        <div className='bg-gray-100 flex justify-center items-center h-screen font-inter'>
            <div className="w-1/2 h-full px-40">
                { content }
            </div>
            <div className= "p-8 w-1/2">
                <img src={bg} alt="" className="w-11/12"/>
            </div>
        </div>
    );
  }
  
  export default LoginLayout;