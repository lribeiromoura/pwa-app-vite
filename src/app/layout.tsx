import { ToastContainer } from "react-toastify";
import { useIsOnline } from "react-use-is-online";
import { useSync } from "./hooks/useSync";
import { useEffect } from "react";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isOnline } = useIsOnline();
  const { handleSyncData } = useSync();

  const checkConnection = () => {
    if (isOnline) {
      console.log("Online");
    } else {
      console.log("Offline");
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <div className="w-100">
      <div className="flex bg-gray-800 text-white p-4 justify-between">
        <div className="flex">
          <div
            className={`w-8 h-8 rounded-full ${
              isOnline ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
          <h1 className="ml-4 text-2xl font-bold">Connection Status</h1>
        </div>
        <button
          className={`bg-blue-500 text-white p-2 rounded-md w-[195px] ${
            !isOnline && "cursor-not-allowed"
          }`}
          onClick={handleSyncData}
          disabled={!isOnline}
        >
          Sync
        </button>
      </div>
      {children}
      <ToastContainer />
    </div>
  );
}
