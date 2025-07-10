export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 pb-12">
      <div className="max-w-md w-full space-y-8">
        {children}
      </div>
    </div>
  );
} 