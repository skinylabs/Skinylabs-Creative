import { useState } from "react";
import { toast } from "sonner";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button, buttonVariants } from "@/components/ui/button";

interface VectorCategory {
    id: number;
    name: string;
}

interface CreatePageProps {
    vectorCategories: VectorCategory[];
}

export default function CreatePage({ vectorCategories }: CreatePageProps) {
    const [data, setData] = useState({
        name: "",
        description: "",
        vector_category_id: [] as number[], // Storing selected categories
        price: "",
        file: null as File | null,
        status: false, // Boolean for status
    });

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
        // Call API to save the data
        toast.success("Vector Assets successfully created!");
    };

    return (
        <AdminLayout>
            <h2>Create Vector Asset</h2>
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
                </div>

                <div className="mt-4">
                    <label htmlFor="vector_category_id">Vector Category</label>
                    <select
                        id="vector_category_id"
                        value=""
                        onChange={(e) => {
                            const selectedCategory = vectorCategories.find(
                                (category) =>
                                    category.id === Number(e.target.value)
                            );
                            if (selectedCategory)
                                handleCategorySelect(selectedCategory);
                        }}
                        className="block w-full mt-1"
                    >
                        <option value="" disabled>
                            Select a category
                        </option>
                        {vectorCategories.map((category) => (
                            <option
                                key={category.id}
                                value={category.id}
                                disabled={selectedCategories.some(
                                    (selected) => selected.id === category.id
                                )}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
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
                </div>

                <div className="mt-4">
                    <label htmlFor="status">Status</label>
                    <input
                        type="checkbox"
                        checked={data.status}
                        onChange={(e) =>
                            setData({ ...data, status: e.target.checked })
                        }
                        className="ml-2"
                    />
                </div>

                <div className="mt-6 flex justify-end">
                    <Button
                        type="submit"
                        className={buttonVariants({ variant: "default" })}
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </AdminLayout>
    );
}
