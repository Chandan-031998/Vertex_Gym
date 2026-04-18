export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(124,92,255,0.12),transparent_20%),radial-gradient(circle_at_top_right,rgba(91,140,255,0.14),transparent_18%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.12),transparent_24%),linear-gradient(180deg,#f7f8fc_0%,#eef5ff_100%)] px-4 py-8 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
