// src/components/PrivateRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ component: Component, allowedRoles, ...rest }) => {
  const { isAuthenticated, user } = useAuth0();

  const userRoles = user && user["https://your-namespace/roles"];

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated) {
          return <Navigate to="/login" replace={true} />;
        }

        if (allowedRoles && userRoles) {
          // Check if the user has at least one of the allowed roles
          const isAuthorized = userRoles.some((role) =>
            allowedRoles.includes(role)
          );

          if (!isAuthorized) {
            return <Navigate to="/unauthorized" replace={true} />;
          }
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
