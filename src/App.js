import React from "react";
import { WithingsProvider } from "./contexts/WithingsContext";

import Auth from "./pages/Auth";
import Router from "./Router";

import useAuth from "./hooks/useAuth";

import Theme from "./Theme";

function App() {
  const isAuthenticated = useAuth();

  return (
    <Theme>
      {isAuthenticated ? (
        <WithingsProvider>
          <Router />
        </WithingsProvider>
      ) : (
        <Auth />
      )}
    </Theme>
  );
}

export default App;
