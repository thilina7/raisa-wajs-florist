export default function AnnouncementBar() {
  return (
    <div
      role="banner"
      className="bg-[#4A7C59] text-white text-xs sm:text-sm"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-4 px-4 py-2 sm:justify-between">
        <span className="hidden sm:inline">🌸 Get 10% Off Your First Order</span>
        <span className="sm:hidden">🌸 10% Off First Order</span>

        <span className="hidden md:inline" aria-label="Delivery cutoff time">
          Order Before 2pm For Next Day Delivery
        </span>

        <span className="hidden lg:inline" aria-label="Freshness guarantee">
          7 Day Freshness Guarantee
        </span>
      </div>
    </div>
  );
}
