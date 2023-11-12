import {Navbar} from "./components/Navbar"
import Products from "./components/Products"
import Footer from "./components/Footer"

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Products />
      </div>
      <Footer className="fixed bottom-0" />
    </div>
  );
}

export default App
