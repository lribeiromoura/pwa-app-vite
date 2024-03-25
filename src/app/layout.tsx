/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNetworkCheck } from "./context/Network";
import { clearAllData, getAllFormData } from "./utils/indexedDB";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isOnline } = useNetworkCheck();

  const [syncData, setSyncData] = useState<any[]>([]);

  const handleSync = async () => {
    if (syncData.length === 0) {
      return;
    }
    try {
      syncData.map(async (data) => {
        const response = await fetch("http://localhost:3001/firstform", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data.data),
        });

        if (response.ok) {
          console.log("Data synced successfully");
          await clearAllData("firstForm");
          setSyncData([]);
        } else {
          console.error("Error syncing data");
        }
      });
    } catch (error) {
      console.error("Error syncing data", error);
    }
  };

  useEffect(() => {
    console.log("dsajidsjadj");
    const getData = async () => {
      const data = await getAllFormData("firstForm");
      setSyncData(data.result);
    };
    getData();
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
          onClick={handleSync}
          disabled={!isOnline}
        >
          Sync
        </button>
      </div>
      {children}
    </div>
  );
}
