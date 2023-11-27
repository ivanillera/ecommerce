import {Navbar} from "./components/Navbar"
import Products from "./components/Products"
import Footer from "./components/Footer"

function App() {
  const currentMonth = new Date().getMonth();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center pt-10">
        Ofertas para el mes {currentMonth}
      </div>
      <div className="flex-grow">
        <Products />
      </div>
      <Footer className="fixed bottom-0" />
    </div>
  );
}

export default App
