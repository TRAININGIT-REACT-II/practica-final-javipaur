import { createContext } from "react";

const User = createContext({
  signedIn: false,
  updateUser: () => {},
});

export default User;
