import { SearchBox } from "./SearchBox";
import { User } from "./User";

export function Users() {
  const users = [
    {
      firstName: "Samrat",
      lastName: "Malisetti",
      _id: 1,
    },
    {
      firstName: "Rohitha",
      lastName: "Gundarapu",
      _id: 2,
    },
    {
      firstName: "Rithvick",
      lastName: "Karasala",
      _id: 3,
    },
  ];
  return (
    <div className="flex flex-col mx-4">
      <div className="text-xl font-bold my-2">Users</div>
      <SearchBox />
      <div className="mt-4">
        {users.map((user) => (
          <User firstName={user.firstName} lastName={user.lastName} />
        ))}
      </div>
    </div>
  );
}
