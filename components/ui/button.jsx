
export function Button({ className = "", variant = "default", size = "default", children, disabled, ...props }) {
  const baseClasses = "inline-flex items-center justify-center font-medium transition rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variantClasses = {
    default: "bg-indigo-600 hover:bg-indigo-700 text-white",
    outline: "border border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-900",
    ghost: "hover:bg-zinc-100 text-zinc-900"
  };
  const sizeClasses = {
    default: "px-4 py-2 text-sm",
    sm: "px-3 py-1.5 text-xs"
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.default} ${sizeClasses[size] || sizeClasses.default} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
