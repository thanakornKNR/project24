import Link from "next/link";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex h-screen">
        <aside className="w-64 h-full bg-blue-950 text-white p-4">
          <h2 className="text-2xl font-bold mb-4">
            <a href="/admin">Admin Dashboard</a>
          </h2>
          <nav>
            <ul>
              <li className="mb-2">
                <Link href="/admin/product" className="hover:underline">
                  Products
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/admin/users" className="hover:underline">
                  Users
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/admin/orders" className="hover:underline">
                  Orders
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/admin/reports" className="hover:underline">
                  Reports
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </section>
  );
}
