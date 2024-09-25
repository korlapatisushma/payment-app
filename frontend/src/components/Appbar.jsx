export function Appbar({ user }) {
  // TODO - Dynamically get the user info and display in the icon...
  return (
    <div className="flex h-14 justify-between border">
      <div className="flex flex-col text-xl justify-center h-full ml-4 font-bold">
        Payment App
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">
          Hello, {user}
        </div>
        <div className="rounded-full h-10 w-10 bg-slate-200 flex mt-2 mr-4 justify-center">
          <div className="flex flex-col justify-center font-semibold text-2xl">
            {user[0]}
          </div>
        </div>
      </div>
    </div>
  );
}
