export function InputBox({ name, placeholder }) {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">{name}</div>
      <input
        placeholder={placeholder}
        className="w-full px-2 py-1 border rounded border-slate-200"
      />
    </div>
  );
}
