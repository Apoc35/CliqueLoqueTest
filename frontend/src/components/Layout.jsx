export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="rounded-lg bg-white p-6 shadow-md">{children}</div>
      </main>
    </div>
  );
}
