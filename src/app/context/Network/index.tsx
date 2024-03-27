import {
  useContext,
  createContext,
  useEffect,
  useState,
  useCallback,
} from "react";

type childrenType = {
  children: React.ReactNode;
};

type networkStatusContextType = {
  isOnline: boolean;
};

const NetworkContext = createContext<networkStatusContextType | null>(null);

export const NetworkProvider = ({ children }: childrenType) => {
  const [isOnline, setOnline] = useState<boolean>((): boolean => {
    return navigator.onLine;
  });

  const setOnlineToTrue = useCallback((): void => {
    setOnline(true);
  }, []);

  const setOnlineToFalse = useCallback((): void => {
    setOnline(false);
  }, []);

  const checkOnlineStatus = useCallback(async (): Promise<boolean> => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return response.ok;
    } catch (error) {
      return false;
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const result = await checkOnlineStatus();
      result ? setOnlineToTrue() : setOnlineToFalse();
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [checkOnlineStatus, setOnlineToFalse, setOnlineToTrue]);

  return (
    <NetworkContext.Provider value={{ isOnline }}>
      {children}
    </NetworkContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNetworkCheck = () => {
  const context = useContext(NetworkContext);
  if (!context) {
    throw Error("useNetworkCheck must be used inside of NetworkProvider");
  }

  return context;
};
