import React from "react";
import { Routes, Route, Link, Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { UsernameProvider, useUsername } from "./contexts/user-context";
import Home from "./views/Home";
import RatingsTypesList from "./views/RatingsTypesList";
import RatingsList from "./views/RatingsListView";
import CreateRating from "./views/CreateRating";
import CreateComparison from "./views/CreateComparison";
// import Register from "./views/Register";
import Login from "./views/Login";

export default function App() {
  /* Routes nest inside one another. Nested route paths build upon
      parent route paths, and nested route elements render inside
      parent route elements. See the note about <Outlet> below. */

  return (
    <UsernameProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
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
            <Route path="compare" element={<CreateComparison />} />
          </Route>
          {/* <Route path="/register" element={Register} /> */}
          <Route path="/login" element={<Login />} />

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
    <div>
      <Navbar />

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
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
