import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const [totalProducts, totalOrders, revenueResult] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.aggregate({ _sum: { total: true } }),
  ]);

  const totalRevenue = revenueResult._sum.total ?? 0;

  const stats = [
    { label: "Total Products", value: totalProducts.toString(), icon: "💐" },
    { label: "Total Orders", value: totalOrders.toString(), icon: "📦" },
    { label: "Total Revenue", value: formatPrice(totalRevenue), icon: "💷" },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-[#1a1a1a]">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{stat.icon}</span>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-[#1a1a1a]">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
