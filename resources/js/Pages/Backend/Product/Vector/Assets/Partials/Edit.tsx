import AdminHeader from "@/Components/Backend/AdminHeader";
import { Button, buttonVariants } from "@/components/ui/button";
import InputError from "@/Components/ui/InputError";
import AdminLayout from "@/Layouts/AdminLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { toast } from "sonner";
import React, { useState } from "react";

interface VectorAssets {
    id: number;
    name: string;
    description: string;
    price: number;
    file: string;
    status: string;
    vector_category_id: number;
    vector_category?: {
        id: number;
        name: string;
    };
}

interface VectorCategory {
    id: number;
    name: string;
}

interface EditPageProps extends PageProps {
    vectorAsset: VectorAssets;
    vectorCategories: VectorCategory[];
}

const EditPage = ({ vectorAsset, vectorCategories }: EditPageProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [data, setData] = useState({
        name: vectorAsset.name || "",
        description: vectorAsset.description || "",
        price: vectorAsset.price || "",
        status: vectorAsset.status || "draft", // Ensure default value is a string
        vector_category_id: vectorAsset.vector_category_id || "",
        _method: "PUT",
    });
    const [errors, setErrors] = useState<any>({});
    const [processing, setProcessing] = useState(false);

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
        }
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price.toString());
        formData.append("status", data.status); // Send status as string
        formData.append(
            "vector_category_id",
            data.vector_category_id.toString()
        );
        formData.append("_method", "PUT");
        if (file) {
            formData.append("file", file);
        }

        try {
            const response = await fetch(
                route("vector-assets.update", vectorAsset.id),
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        "X-CSRF-TOKEN":
                            document
                                .querySelector('meta[name="csrf-token"]')
                                ?.getAttribute("content") || "",
                    },
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                setErrors(errorData.errors || {});
                toast.error("Failed to update vector asset.");
                return;
            }

            toast.success(`Vector Asset "${data.name}" updated successfully!`);
            window.location.href = "/vector-assets/index"; // Redirect to the desired route
        } catch (error) {
            toast.error("Failed to update vector asset.");
        } finally {
            setProcessing(false);
        }
    };

    const BreadcrumbItem = [
        { label: "Vector", href: "/" },
        { label: "Category" },
    ];

    return (
        <AdminLayout>
            <AdminHeader items={BreadcrumbItem} title="Edit Vector Asset" />
            <div>
                <Head title="Edit Vector Asset" />
                <form
                    onSubmit={onSubmit}
                    className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                >
                    {/* Name Field */}
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
                            onChange={(e) =>
                                setData({ ...data, name: e.target.value })
                            }
                        />
                        <InputError
                            message={errors.name}
                            className="mt-2 text-red-500 text-sm"
                        />
                    </div>

                    {/* Description Field */}
                    <div className="mt-4">
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={data.description}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    description: e.target.value,
                                })
                            }
                        />
                        <InputError
                            message={errors.description}
                            className="mt-2 text-red-500 text-sm"
                        />
                    </div>

                    {/* Price Field */}
                    <div className="mt-4">
                        <label
                            htmlFor="price"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Price
                        </label>
                        <input
                            id="price"
                            type="number"
                            name="price"
                            value={data.price}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            onChange={(e) =>
                                setData({ ...data, price: e.target.value })
                            }
                        />
                        <InputError
                            message={errors.price}
                            className="mt-2 text-red-500 text-sm"
                        />
                    </div>

                    {/* File Field */}
                    <div className="mt-4">
                        <label
                            htmlFor="file"
                            className="block text-sm font-medium text-gray-700"
                        >
                            File
                        </label>
                        <input
                            id="file"
                            type="file"
                            name="file"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            onChange={onFileChange}
                        />
                        <InputError
                            message={errors.file}
                            className="mt-2 text-red-500 text-sm"
                        />
                    </div>

                    {/* Status Field */}
                    <div className="mt-4">
                        <label
                            htmlFor="status"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Status
                        </label>
                        <div className="mt-4">
                            <label htmlFor="status">Status</label>
                            <input
                                type="checkbox"
                                checked={data.status}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        status: e.target.checked,
                                    })
                                }
                                className="ml-2"
                            />
                        </div>
                        <InputError
                            message={errors.status}
                            className="mt-2 text-red-500 text-sm"
                        />
                    </div>

                    {/* Vector Category Field */}
                    <div className="mt-4">
                        <label
                            htmlFor="vector_category_id"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Vector Category
                        </label>
                        <select
                            id="vector_category_id"
                            value={data.vector_category_id}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    vector_category_id: e.target.value,
                                })
                            }
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                        >
                            <option value="" disabled>
                                Select a vector category
                            </option>
                            {vectorCategories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <InputError
                            message={errors.vector_category_id}
                            className="mt-2 text-red-500 text-sm"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6 flex justify-end">
                        <Button
                            type="submit"
                            className={buttonVariants({ variant: "default" })}
                            disabled={processing}
                        >
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default EditPage;
