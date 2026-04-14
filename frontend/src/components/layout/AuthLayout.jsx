export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.2),transparent_22%),radial-gradient(circle_at_top_right,rgba(251,191,36,0.18),transparent_20%),linear-gradient(135deg,#fffdf8_0%,#f7fbff_52%,#eaf7ff_100%)] p-4 sm:p-6">
      {children}
    </div>
  );
}
