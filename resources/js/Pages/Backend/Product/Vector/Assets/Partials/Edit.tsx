// resources/js/Pages/Backend/Product/VectorAsset/Partials/Edit.tsx
import InputError from "@/Components/ui/InputError";
import { Button, buttonVariants } from "@/components/ui/button";
import Modal from "@/Components/Modal";
import { PageProps } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { toast } from "sonner";

// Definisikan tipe untuk vector asset
interface VectorAsset {
    id: number;
    name: string;
    // Tambahkan field lain sesuai kebutuhan
}

interface EditVectorAssetModalProps {
    asset: VectorAsset;
}

const EditVectorAssetsModal = ({ asset }: EditVectorAssetModalProps) => {
    const [showModal, setShowModal] = useState(false);

    const { data, setData, put, errors } = useForm({
        name: asset.name || "",
        _method: "PUT",
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("vector-assets.update", asset.id), {
            onSuccess: () => {
                setShowModal(false);
                toast.success(
                    `Vector Asset "${asset.name}" updated successfully!`
                );
            },
            onError: () => {
                toast.error("Failed to update vector asset.");
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
                Edit Asset
            </Button>

            <Modal show={showModal} onClose={closeModal}>
                <Head title="Edit Vector Asset" />
                <div className="p-6 text-gray-900">
                    <h2 className="text-lg font-medium">Edit Vector Asset</h2>
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
                                id="asset_name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                autoFocus
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2 text-red-500 text-sm"
                            />
                        </div>
                        {/* Tambahkan field lain sesuai kebutuhan */}
                        <div className="mt-4 flex justify-end">
                            <Button
                                className={buttonVariants({
                                    variant: "secondary",
                                })}
                                onClick={closeModal}
                            >
                                Cancel
                            </Button>
                            <Button
                                className={`${buttonVariants({
                                    variant: "default",
                                })} ms-3`}
                                type="submit"
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

export default EditVectorAssetsModal;
