import { buttonVariants } from "@/Components/ui/button";
import AdminLayout from "@/Layouts/AdminLayout";
import { PageProps } from "@/types";
import { Head, Link, usePage, router } from "@inertiajs/react";
import { toast } from "sonner";
import { useEffect } from "react";

interface Category {
    id: number;
    name: string;
}

interface FlashMessage {
    success?: string;
    error?: string;
}

interface Props extends PageProps {
    Categories: Category[];
    flash?: FlashMessage; // Tipe flash
}

const ProductCategoryPage = ({ Categories }: Props) => {
    const { flash } = usePage<Props>().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const deleteCategory = (category: Category) => {
        if (!window.confirm("Are you sure you want to delete the category?")) {
            return;
        }

        router.delete(route("categories.destroy", category.id), {
            onSuccess: () => {
                toast.success("Category deleted successfully!");
            },
            onError: () => {
                toast.error("Failed to delete category.");
            },
        });
    };

    return (
        <AdminLayout>
            <Head title="Product Categories" />
            <Link
                href={route("categories.create")}
                className={buttonVariants({ size: "lg" })}
            >
                Add Category
            </Link>
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-4">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Categories.map((category) => (
                            <tr key={category.id}>
                                <td className="border px-4 py-2">
                                    {category.name}
                                </td>
                                <td className="border px-4 py-2">
                                    <Link
                                        href={route(
                                            "categories.edit",
                                            category.id
                                        )}
                                        className="text-blue-500 hover:underline mr-2"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => deleteCategory(category)}
                                        className="text-red-500 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};

export default ProductCategoryPage;
