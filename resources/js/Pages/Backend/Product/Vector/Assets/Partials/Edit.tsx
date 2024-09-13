import InputError from "@/Components/ui/InputError";
import { Button, buttonVariants } from "@/components/ui/button";
import Modal from "@/Components/Modal";
import { PageProps } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { toast } from "sonner";

// Definisikan tipe untuk category
interface VectorAssets {
    id: number;
    name: string;
    description: string;
    price: number;
    file: string;
    status: string;
    vector_category_id: number;
    vectorCategory?: {
        id: number;
        name: string;
    };
}

interface VectorCategory {
    id: number;
    name: string;
}

interface EditVectorAssetsProps {
    vectorAssets: VectorAssets;
    vectorCategories: VectorCategory[];
}

const EditPage = ({
    vectorAssets,
    vectorCategories,
}: EditVectorAssetsProps) => {
    // Menggunakan useForm untuk form dengan metode PUT
    const { data, setData, put, errors, processing } = useForm({
        name: vectorAssets.name || "", // Atur default value untuk field name
        description: vectorAssets.description || "",
        price: vectorAssets.price || "", // Atur default value untuk field name
        file: vectorAssets.file || "", // Atur default value untuk field name
        status: vectorAssets.status || "", // Atur default value untuk field name

        _method: "PUT",
    });

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<
        VectorCategory[]
    >([]);

    const handleCategorySelect = (category: VectorCategory) => {
        if (
            !selectedCategories.some((selected) => selected.id === category.id)
        ) {
            setSelectedCategories([...selectedCategories, category]);
            setData({
                ...data,
                vector_category_id: [...data.vector_category_id, category.id],
            });
        }
        setIsDropdownOpen(false); // Close dropdown after selection
    };

    const handleCategoryRemove = (categoryId: number) => {
        setSelectedCategories(
            selectedCategories.filter((category) => category.id !== categoryId)
        );
        setData({
            ...data,
            vector_category_id: data.vector_category_id.filter(
                (id) => id !== categoryId
            ),
        });
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("vector-assets.update", vectorAssets.id), {
            onSuccess: () => {
                toast.success(
                    `Vector Category "${data.name}" updated successfully!`
                );
            },
            onError: () => {
                toast.error("Failed to update vector category.");
            },
        });
    };

    return (
        <>
            <Head title="Edit Vector Category" />
            <div className="p-6 text-gray-900">
                <h2 className="text-lg font-medium">Edit Category</h2>
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
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            autoFocus
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        {/* Tampilkan error jika ada */}
                        <InputError
                            message={errors.name}
                            className="mt-2 text-red-500 text-sm"
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="description">Description</label>
                        <input
                            id="description"
                            type="text"
                            value={data.description}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    description: e.target.value,
                                })
                            }
                            className="mt-1 block w-full"
                            required
                        />
                        {errors.description && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    <div className="mt-4 relative">
                        <label htmlFor="vector_category_id">
                            Vector Category
                        </label>
                        <button
                            type="button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="block w-full mt-1 border border-gray-300 rounded p-2 text-left"
                        >
                            {selectedCategories.length > 0
                                ? selectedCategories
                                      .map((c) => c.name)
                                      .join(", ")
                                : "Select categories"}
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute left-0 mt-2 w-full border border-gray-300 bg-white z-10">
                                <div className="max-h-60 overflow-y-auto">
                                    {vectorCategories.map((category) => (
                                        <div
                                            key={category.id}
                                            className={`p-2 cursor-pointer hover:bg-gray-100 ${
                                                selectedCategories.some(
                                                    (selected) =>
                                                        selected.id ===
                                                        category.id
                                                )
                                                    ? "bg-gray-200"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleCategorySelect(category)
                                            }
                                        >
                                            {category.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-4">
                        <label>Selected Categories</label>
                        <div className="flex flex-wrap gap-2">
                            {selectedCategories.map((category) => (
                                <div
                                    key={category.id}
                                    className="flex items-center space-x-2 bg-gray-200 px-2 py-1 rounded-full"
                                >
                                    <span>{category.name}</span>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleCategoryRemove(category.id)
                                        }
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="price">Price</label>
                        <input
                            id="price"
                            type="number"
                            value={data.price}
                            onChange={(e) =>
                                setData({ ...data, price: e.target.value })
                            }
                            className="mt-1 block w-full"
                            required
                        />
                        {errors.price && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.price}
                            </p>
                        )}
                    </div>

                    <div className="mt-4">
                        <label htmlFor="file">File</label>
                        <input
                            id="file"
                            type="file"
                            onChange={(e) => {
                                if (e.target.files) {
                                    setData({
                                        ...data,
                                        file: e.target.files[0],
                                    });
                                }
                            }}
                            className="mt-1 block w-full"
                            required
                        />
                        {errors.file && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.file}
                            </p>
                        )}
                    </div>

                    <div className="mt-4">
                        <label htmlFor="status">Status</label>
                        <select
                            id="status"
                            value={data.status}
                            onChange={(e) =>
                                setData({ ...data, status: e.target.value })
                            }
                            className="mt-1 block w-full"
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                        {errors.status && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.status}
                            </p>
                        )}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button
                            type="submit"
                            className={`${buttonVariants({
                                variant: "default",
                            })} ms-3`}
                            disabled={processing}
                        >
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditPage;
