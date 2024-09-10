import InputError from "@/Components/ui/InputError";
import { Button, buttonVariants } from "@/components/ui/button";
import Modal from "@/Components/Modal";
import { PageProps } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { toast } from "sonner";

// Definisikan tipe untuk category
interface VectorCategory {
    id: number;
    name: string;
    product_category_id: number;
    productCategory?: {
        id: number;
        name: string;
    };
}

interface ProductCategory {
    id: number;
    name: string;
}

interface EditVectorCategoryModalProps {
    vectorCategory: VectorCategory;
    productCategories: ProductCategory[];
    auth: {
        user: {
            id: number;
            name: string;
        };
    };
}

const EditModal = ({
    vectorCategory,
    productCategories,
    auth,
}: EditVectorCategoryModalProps) => {
    const [showModal, setShowModal] = useState(false); // State untuk mengontrol modal

    // Menggunakan useForm untuk form dengan metode PUT
    const { data, setData, put, errors, processing } = useForm({
        name: vectorCategory.name || "", // Atur default value untuk field name
        product_category_id: vectorCategory.product_category_id || "", // Atur default value untuk product category
        _method: "PUT", // Menentukan metode PUT
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("vector-categories.update", vectorCategory.id), {
            onSuccess: () => {
                setShowModal(false); // Tutup modal setelah update berhasil
                toast.success(
                    `Vector Category "${data.name}" updated successfully!`
                );
            },
            onError: () => {
                toast.error("Failed to update vector category.");
            },
        });
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <Button
                className={buttonVariants({ variant: "default" })}
                onClick={openModal}
            >
                Edit Vector Category
            </Button>

            <Modal show={showModal} onClose={closeModal}>
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
                        <div className="mt-4">
                            <label
                                htmlFor="product_category_id"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Product Category
                            </label>
                            <select
                                id="product_category_id"
                                value={data.product_category_id}
                                onChange={(e) =>
                                    setData(
                                        "product_category_id",
                                        e.target.value
                                    )
                                }
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                            >
                                <option value="" disabled>
                                    Select a product category
                                </option>
                                {productCategories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {/* Tampilkan error jika ada */}
                            <InputError
                                message={errors.product_category_id}
                                className="mt-2 text-red-500 text-sm"
                            />
                        </div>
                        <div className="mt-6 flex justify-end">
                            <Button
                                className={buttonVariants({
                                    variant: "secondary",
                                })}
                                onClick={closeModal}
                                disabled={processing}
                            >
                                Cancel
                            </Button>
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
            </Modal>
        </>
    );
};

export default EditModal;
