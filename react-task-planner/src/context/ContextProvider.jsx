import { createContext, useContext, useState } from "react";

const stateContext = createContext({
  currentUser: null,
  token: null,
  sideBar: false,
  projects: [],
  loading: false,
  projectsUrl: '/project',
  setUser: () => {},
  setToken: () => {},
  setSideBar: () => {},
  setProjects: () => {},
  setLoading: () => {},
  setProjectsUrl: () => {}
})

export const ContextProvider = ({children}) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const [sideBar, setSideBar] = useState(false);
  

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  }

  return (
    <stateContext.Provider value={{
      user,
      token,
      sideBar,
      setUser,
      setToken,
      setSideBar
    }}>
      { children }
    </stateContext.Provider>
  )
}

export const useStateContext = () => useContext(stateContext);