import InputError from "@/Components/ui/InputError";
import { Button, buttonVariants } from "@/components/ui/button";
import Modal from "@/Components/Modal";
import { PageProps } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { toast } from "sonner";

interface VectorCategory {
    id: number;
    name: string;
}

interface EditVectorCategoryModalProps {
    category: VectorCategory;
}

const EditVectorCategoryModal = ({
    category,
}: EditVectorCategoryModalProps) => {
    const [showModal, setShowModal] = useState(false);

    const { data, setData, put, errors } = useForm({
        name: category.name || "",
        _method: "PUT",
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("vector-categories.update", category.id), {
            onSuccess: () => {
                setShowModal(false);
                toast.success(
                    `Vector category "${category.name}" updated successfully!`
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
                Edit Category
            </Button>

            <Modal show={showModal} onClose={closeModal}>
                <Head title="Edit Vector Category" />
                <div className="p-6 text-gray-900">
                    <h2 className="text-lg font-medium">
                        Edit Vector Category
                    </h2>
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
                                value={data.name}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2 text-red-500 text-sm"
                            />
                        </div>
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
                                className={buttonVariants({
                                    variant: "default",
                                })}
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

export default EditVectorCategoryModal;
