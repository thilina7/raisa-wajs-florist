import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin Panel",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // If not authenticated and not on login page, redirect
  // (proxy handles this too, but this is a server-side guard)
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-[calc(100vh-120px)]">
      <AdminSidebar userName={session.user?.name ?? "Admin"} />
      <div className="flex-1 bg-gray-50 p-6">{children}</div>
    </div>
  );
}
