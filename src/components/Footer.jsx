import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-4">
          <div className="container mx-auto text-center">
            <p className="text-sm">&copy; 2023 Tu Empresa. Todos los derechos reservados.</p>
            <div className="mt-2">
              {/* Agrega enlaces sociales u otros elementos del pie de página aquí */}
              <a href="#" className="text-gray-300 hover:text-white mx-2">Facebook</a>
              <a href="#" className="text-gray-300 hover:text-white mx-2">Twitter</a>
              <a href="#" className="text-gray-300 hover:text-white mx-2">Instagram</a>
            </div>
          </div>
        </footer>
      );
}

export default Footer