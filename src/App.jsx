import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Wizard from "./pages/Wizard";
import Results from "./pages/Results";


export default function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wizard" element={<Wizard />} />
          <Route path="/results" element={<Results />} />
          
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

// export default function App() {
//   return <h1 style={{ textAlign: "center", marginTop: "50px" }}>Frontend Working!</h1>;
// }

