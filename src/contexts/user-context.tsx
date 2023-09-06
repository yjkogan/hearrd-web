import React from "react";

const UsernameContext = React.createContext<
  | {
      username?: string;
      setUsername: (username: string) => void;
    }
  | undefined
>(undefined);

function UsernameProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = React.useState<string | undefined>(
    "trogdorburns"
  );
  const value = {
    username,
    setUsername,
  };
  return (
    <UsernameContext.Provider value={value}>
      {children}
    </UsernameContext.Provider>
  );
}

function useUsername() {
  const context = React.useContext(UsernameContext);
  if (context === undefined) {
    throw new Error("useUsername must be used within a UsernameProvider");
  }
  return context;
}

export { UsernameProvider, useUsername };
