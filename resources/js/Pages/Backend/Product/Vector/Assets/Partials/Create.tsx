import { useState } from "react";
import { toast } from "sonner";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button, buttonVariants } from "@/components/ui/button";
import { Head, Link, useForm } from "@inertiajs/react";
import AdminHeader from "@/Components/Backend/AdminHeader";

interface VectorCategory {
    id: number;
    name: string;
}

interface CreatePageProps {
    vectorCategories: VectorCategory[];
}

export default function CreatePage({ vectorCategories }: CreatePageProps) {
    const { data, setData, post, reset, errors, processing } = useForm({
        name: "",
        description: "",
        vector_category_id: [] as number[], // Storing selected categories
        price: "",
        file: null as File | null,
        status: "draft",
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

    const submitVectorAssets = (e: React.FormEvent) => {
        e.preventDefault();

        // Create FormData object
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("status", data.status ? "draft" : "published");
        if (data.file) {
            formData.append("file", data.file);
        }
        // Append categories
        data.vector_category_id.forEach((id) =>
            formData.append("vector_category_id[]", id.toString())
        );

        post(route("vector-assets.store"), {
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onSuccess: () => {
                toast.success("Vector assets successfully created!");
                reset();
                setSelectedCategories([]);
            },
            onError: (errors) => {
                console.error("Error creating vector asset:", errors);
                toast.warning(
                    "Failed to create vector asset. Check the console for more details."
                );
            },
        });
    };

    const BreadcrumbItem = [
        { label: "Vector", href: "/vector-assets/" },
        { label: "Assets" },
    ];

    return (
        <AdminLayout>
            <Head title="Create Vector Assets" />
            <div className="flex justify-between items-center">
                <AdminHeader
                    items={BreadcrumbItem}
                    title="Create Vector Assets"
                />
                <Link
                    href="/vector-assets"
                    className={buttonVariants({ variant: "destructive" })}
                >
                    Back
                </Link>
            </div>

            <form onSubmit={submitVectorAssets} className="pt-4">
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) =>
                            setData({ ...data, name: e.target.value })
                        }
                        className="mt-1 block w-full"
                        required
                    />
                    {errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.name}
                        </p>
                    )}
                </div>

                <div className="mt-4">
                    <label htmlFor="description">Description</label>
                    <input
                        id="description"
                        type="text"
                        value={data.description}
                        onChange={(e) =>
                            setData({ ...data, description: e.target.value })
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
                    <label htmlFor="vector_category_id">Vector Category</label>
                    <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="block w-full mt-1 border border-gray-300 rounded p-2 text-left"
                    >
                        {selectedCategories.length > 0
                            ? selectedCategories.map((c) => c.name).join(", ")
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
                                                    selected.id === category.id
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
                                setData({ ...data, file: e.target.files[0] });
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
                        className={buttonVariants({ variant: "default" })}
                        disabled={processing}
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </AdminLayout>
    );
}
