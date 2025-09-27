
export function Button({ className = "", children, ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
