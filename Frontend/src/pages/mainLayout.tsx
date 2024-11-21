import { Link, Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="h-screen flex flex-col">
      {/* Barra de Navegación */}
      <nav className="bg-gray-800 text-white p-4">
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/profile">Profile</Link>
      </nav>

      {/* Contenido dinámico */}
      <div className="flex-grow p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;