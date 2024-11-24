export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-projectBackgroundColor">
      <main>
        <div>{children}</div>
      </main>
    </div>
  );
}
