import { useEffect, useState } from "react";
import { SearchBox } from "./SearchBox";
import { User } from "./User";
import axios from "axios";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}/api/v1/user/bulk?filter=` + filter, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setUsers(response.data.users);
      });
  }, [filter]);
  return (
    <div className="flex flex-col mx-4 w-3/4">
      <div className="text-xl font-bold my-2">Friends</div>
      <SearchBox setFilter={setFilter} />
      <div className="mt-4">
        {users.map((user) => (
          <User
            key={user._id}
            firstName={user.firstName}
            lastName={user.lastName}
            userId={user._id}
          />
        ))}
      </div>
    </div>
  );
}
