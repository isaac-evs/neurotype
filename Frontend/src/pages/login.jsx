import { useNavigate } from "react-router-dom";

function LoginPage({ onLogin }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    onLogin(); // Simula autenticación.
    navigate("/"); // Redirige al layout principal.
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <button
        onClick={handleLogin}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Login
      </button>
    </div>
  );
}

export default LoginPage;