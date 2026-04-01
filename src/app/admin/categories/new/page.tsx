import CategoryForm from "@/components/admin/CategoryForm";

export default function NewCategoryPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-[#1a1a1a]">
        Create Category
      </h1>
      <CategoryForm />
    </div>
  );
}
