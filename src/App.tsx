import React from "react";
import { Routes, Route, Link, Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { UsernameProvider, useUsername } from "./contexts/user-context";
import Home from "./views/Home";
import RatingsTypesList from "./views/RatingsTypesList";
import RatingsList from "./views/RatingsList";
import CreateRating from "./views/CreateRating";
// import Register from "./views/Register";
import Login from "./views/auth/Login";
import Logout from "./views/auth/Logout";
import Footer from "./components/Footer";

export default function App() {
  /* Routes nest inside one another. Nested route paths build upon
      parent route paths, and nested route elements render inside
      parent route elements. See the note about <Outlet> below. */

  return (
    <UsernameProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<Layout />}>
          <Route
            path="ratings"
            element={
              <RequireAuth>
                <Outlet />
              </RequireAuth>
            }
          >
            <Route index element={<RatingsTypesList />} />
            <Route path=":rating_type" element={<RatingsList />} />
            <Route path="create" element={<CreateRating />} />
          </Route>
          {/* <Route path="/register" element={Register} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </UsernameProvider>
  );
}

function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto p-4 md:p-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let { username } = useUsername();

  if (!username) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
