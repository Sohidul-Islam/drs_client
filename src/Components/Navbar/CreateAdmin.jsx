import React, { useState } from "react";
import axios from "axios";

const CreateAdmin = () => {
  const [response, setResponse] = useState(null);

  const postData = async () => {
    const url = "https://dra-server.onrender.com/api/admin/default";

    try {
      const res = await axios.post(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setResponse(res.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log("Create Temp Admin",response)

  return (
    <div>
      <button onClick={postData} className="text-green-500 bg-black hover:bg-red-700 px-2 py-1 hover:text-white">Create Admin</button>
    </div>
  );
};

export default CreateAdmin;
