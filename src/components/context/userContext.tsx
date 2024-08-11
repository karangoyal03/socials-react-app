import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ContextInterface{
    user: any;
    setUser: any;
    loading: boolean;
    fetchUser : () => void;
}

export const UserContext = createContext<ContextInterface>({
    user: null,
    setUser : null,
    loading: true,
    fetchUser : () => {},
});
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const USER_API = `${REMOTE_SERVER}/api/users`;
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const fetchUser = ()  => {
    axios.post(`${USER_API}/profile`).then((res) => {
        setUser(res.data);
        setLoading(false);
      });
  }

  useEffect(() => {
    // if (!user) {
     fetchUser();
    // }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser , fetchUser , loading }}>
      {children}
    </UserContext.Provider>
  );
};