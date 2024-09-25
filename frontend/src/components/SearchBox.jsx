export function SearchBox({ setFilter }) {
  return (
    <div className="flex h-8">
      <input
        type="text"
        className="border rounded-sm pl-2 border-slate-200 w-full"
        placeholder="Search Users..."
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
}
