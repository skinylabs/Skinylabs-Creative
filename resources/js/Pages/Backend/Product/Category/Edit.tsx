import InputError from "@/Components/ui/InputError";
import AdminLayout from "@/Layouts/AdminLayout";
import { PageProps } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import React from "react";

// Definisikan tipe untuk category
interface Category {
    id: number;
    name: string;
}

interface Props extends PageProps {
    category: Category;
}

const ProductCategoryEditPage = ({ auth, category }: Props) => {
    // Menggunakan useForm untuk form dengan metode PUT
    const { data, setData, put, errors } = useForm({
        name: category.name || "", // Atur default value untuk field name
        _method: "PUT", // Menentukan metode PUT
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Gunakan metode `put` untuk mengupdate kategori
        put(route("categories.update", category.id));
    };

    return (
        <AdminLayout>
            <Head title="Edit Category" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                        </div>
                        <form
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                        >
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Name
                                </label>
                                <input
                                    id="category_name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    autoFocus
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                {/* Tampilkan error jika ada */}
                                <InputError
                                    message={errors.name}
                                    className="mt-2 text-red-500 text-sm"
                                />
                            </div>
                            <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 mt-4">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ProductCategoryEditPage;
