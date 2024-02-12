import AppHeader from "@/app/components/molecules/AppHeader";
import { createContext, useState } from "react";

export const HeaderContext = createContext();

export function UserProvider() {
  const [userData, setUserData] = useState({
    user: null,
    isOrganizer: false,
    loading: true,
  });

  return (
    <HeaderContext.Provider value={{ userData, setUserData }}>
      <AppHeader key="Header"></AppHeader>
    </HeaderContext.Provider>
  );
}
