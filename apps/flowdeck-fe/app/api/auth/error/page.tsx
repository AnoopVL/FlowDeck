export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-red-100 text-red-700 p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-semibold mb-2">Authentication Error</h1>
        <p>Something went wrong during sign-in. Please try again.</p>
      </div>
    </div>
  );
}
