import { useState, useEffect } from "react";
import axios from "axios";

function BotStatus() {
  const [status, setStatus] = useState("Loading...");
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // fetchStatus();
    // fetchLogs();
  }, []);

  const fetchStatus = async () => {
    try {
      const response = await axios.get("/api/bot/status");
      setStatus(response.data.status);
    } catch (error) {
      console.error("Error fetching bot status:", error);
      setStatus("Error fetching status");
    }
  };

  const fetchLogs = async () => {
    try {
      const response = await axios.get("/api/bot/logs");
      setLogs(response.data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Bot Status</h2>
      <p className="text-gray-600 mb-4">
        Status: <span className="font-bold">{status}</span>
      </p>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        Activity Logs
      </h3>
      <ul className="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded p-2">
        {logs.map((log, index) => (
          <li key={index} className="text-gray-600 text-sm">
            {log}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BotStatus;
