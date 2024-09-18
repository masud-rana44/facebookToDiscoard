import { useState, useEffect } from "react";
import axios from "axios";

function GroupList() {
  const [groups, setGroups] = useState([]);
  const [newGroupId, setNewGroupId] = useState("");

  useEffect(() => {
    // fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get("/api/groups");
      setGroups(response.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const addGroup = async () => {
    if (!newGroupId) return;

    try {
      const response = await axios.post("/api/groups", { groupId: newGroupId });
      setGroups([...groups, response.data]);
      setNewGroupId("");
    } catch (error) {
      console.error("Error adding group:", error);
    }
  };

  const removeGroup = async (groupId) => {
    try {
      await axios.delete(`/api/groups/${groupId}`);
      setGroups(groups.filter((group) => group._id !== groupId));
    } catch (error) {
      console.error("Error removing group:", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Manage Facebook Groups
      </h2>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          value={newGroupId}
          onChange={(e) => setNewGroupId(e.target.value)}
          placeholder="Enter Facebook Group ID"
          className="flex-1 border border-gray-300 rounded px-4 py-2 h-[45px] bg-gray-200 text-gray-800"
        />
        <button
          onClick={addGroup}
          className="bg-indigo-500 px-4 py-2 rounded hover:bg-indigo-600 text-white transition duration-200 ease-in-out"
        >
          Add Group
        </button>
      </div>
      <ul className="space-y-2">
        {groups.map((group) => (
          <li
            key={group._id}
            className="flex justify-between items-center p-2 border border-gray-200 rounded"
          >
            <span className="text-gray-600">{group.groupId}</span>
            <button
              onClick={() => removeGroup(group._id)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroupList;
