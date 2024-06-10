import React, { useState } from "react";
import axios from "axios";

const CreateAdmin = () => {
  const [response, setResponse] = useState(null);

  const postData = async () => {
    const url = "https://dra-server.onrender.com/api/admin/default";

    try {
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setResponse(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <button onClick={postData}>Create Admin</button>
    </div>
  );
};

export default CreateAdmin;
