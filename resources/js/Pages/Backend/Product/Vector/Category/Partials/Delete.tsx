import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import Modal from "@/Components/Modal";
import { router } from "@inertiajs/react";
import { toast } from "sonner";

interface VectorCategory {
    id: number;
    name: string;
}

interface DeleteVectorCategoryModalProps {
    category: VectorCategory;
}

const DeleteVectorCategoryModal = ({
    category,
}: DeleteVectorCategoryModalProps) => {
    const [showModal, setShowModal] = useState(false);

    const deleteCategory = (
        category: VectorCategory,
        closeModal: () => void
    ) => {
        router.delete(route("vector-categories.destroy", category.id), {
            onSuccess: () => {
                closeModal();
                toast.success(`Vector category "${category.name}" was deleted`);
            },
            onError: () => {
                toast.warning("Failed to delete vector category.");
            },
        });
    };

    const confirmDelete = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleDelete = () => {
        deleteCategory(category, closeModal);
    };

    return (
        <>
            <Button
                className={buttonVariants({ variant: "destructive" })}
                onClick={confirmDelete}
            >
                Delete
            </Button>

            <Modal show={showModal} onClose={closeModal}>
                <div className="p-6">
                    <h2 className="text-lg font-medium">
                        Delete Vector Category
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Are you sure you want to delete the category "
                        {category.name}"? This action cannot be undone.
                    </p>
                    <div className="mt-4 flex justify-end">
                        <Button
                            className={buttonVariants({ variant: "secondary" })}
                            onClick={closeModal}
                        >
                            Cancel
                        </Button>
                        <Button
                            className={buttonVariants({
                                variant: "destructive",
                            })}
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default DeleteVectorCategoryModal;
