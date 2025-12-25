

import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function Layout({ children }) {
  return (
    <div
      style={{
        maxWidth: "900px", 
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <Header />
      <main style={{ paddingTop: "20px" }}>{children}</main>
      <Footer />
    </div>
  );
}
