import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Plans from "./pages/Plans";
import Contact from "./pages/Contact";
import EnquirySuccess from "./pages/EnquirySuccess";

import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/AdminDashboard";
import ClientDashboard from "./pages/ClientDashboard";

type WebsiteLayoutProps = {
  children: React.ReactNode;
};

function WebsiteLayout({ children }: WebsiteLayoutProps) {
  return (
    <>
      <Navbar />

      <main>{children}</main>

      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Authentication Routes */}
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          {/* Admin Dashboard */}
          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

          {/* Client Dashboard */}
          <Route
            path="/dashboard"
            element={
              <WebsiteLayout>
                <ClientDashboard />
              </WebsiteLayout>
            }
          />

          <Route
            path="/client-dashboard"
            element={
              <WebsiteLayout>
                <ClientDashboard />
              </WebsiteLayout>
            }
          />

          {/* Main Website */}
          <Route
            path="/"
            element={
              <WebsiteLayout>
                <Home />
              </WebsiteLayout>
            }
          />

          <Route
            path="/about"
            element={
              <WebsiteLayout>
                <About />
              </WebsiteLayout>
            }
          />

          <Route
            path="/services"
            element={
              <WebsiteLayout>
                <Services />
              </WebsiteLayout>
            }
          />

          <Route
            path="/plans"
            element={
              <WebsiteLayout>
                <Plans />
              </WebsiteLayout>
            }
          />

          <Route
            path="/contact"
            element={
              <WebsiteLayout>
                <Contact />
              </WebsiteLayout>
            }
          />

          {/* Enquiry Success */}
          <Route
            path="/enquiry-success/:id"
            element={
              <WebsiteLayout>
                <EnquirySuccess />
              </WebsiteLayout>
            }
          />

          {/* Fallback Route */}
          <Route
            path="*"
            element={
              <WebsiteLayout>
                <Home />
              </WebsiteLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;