import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");

  // TODO: signup
  /** Example of a function that sends credentials to an API and receives a token */
  async function signup() {
    try {
      const response = await fetch(API + "/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "lincoln",
        }),
      });
      const result = await response.json();
      console.log(result, "\n");

      //set location to tablet once the API call comes back successfully
      if (result.token) {
        console.log(result.token);
        setToken(result.token);
        setLocation("TABLET");
      }
      // This will depend on the API you're actually working with
      return result.token;
    } catch (e) {
      console.error("oh no ;(");
    }
  }

  // TODO: authenticate

  const value = { location };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
