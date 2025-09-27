
export function Card({ className = "", children }) {
  return <div className={`rounded-2xl border border-zinc-200 bg-white shadow-sm ${className}`}>{children}</div>;
}
export function CardHeader({ children }) { return <div className="p-6 border-b border-zinc-200">{children}</div>; }
export function CardTitle({ children, className = "" }) { return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>; }
export function CardContent({ children }) { return <div className="p-6">{children}</div>; }
