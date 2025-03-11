import { createContext, useState } from "react";

export const UserrContext = createContext("");
export default function UserProvider({ children }) {
  let [token, settoken] = useState(localStorage.getItem("token"));
  const [notesCount, setNotesCount] = useState(0);
  function logOut() {
    settoken(null);
    localStorage.removeItem("token");
  }
  return (
    <>
      <UserrContext.Provider
        value={{ token, settoken, logOut, notesCount, setNotesCount }}
      >
        {children}
      </UserrContext.Provider>
    </>
  );
}
