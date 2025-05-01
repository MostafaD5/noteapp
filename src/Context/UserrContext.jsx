import { createContext, useState } from "react";

export const UserrContext = createContext(null);

export default function UserProvider({ children }) {
  const [token, settoken] = useState(localStorage.getItem("token") || null);
  const [notesCount, setNotesCount] = useState(0);

  function logOut() {
    settoken(null);
    localStorage.removeItem("token");
  }

  return (
    <UserrContext.Provider
      value={{ token, settoken, logOut, notesCount, setNotesCount }}
    >
      {children}
    </UserrContext.Provider>
  );
}
