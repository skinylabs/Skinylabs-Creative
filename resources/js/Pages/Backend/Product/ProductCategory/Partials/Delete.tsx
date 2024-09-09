import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import Modal from "@/Components/Modal";
import { router } from "@inertiajs/react";
import { toast } from "sonner";

interface ProductCategories {
    id: number;
    name: string;
}

interface DeleteCategoryModalProps {
    ProductCategories: ProductCategories;
}

const DeleteModal = ({ ProductCategories }: DeleteCategoryModalProps) => {
    const [showModal, setShowModal] = useState(false);

    const deleteProductCategory = (
        ProductCategories: ProductCategories,
        closeModal: () => void
    ) => {
        router.delete(
            route("product-categories.destroy", ProductCategories.id),
            {
                onSuccess: () => {
                    closeModal();
                    toast.error(
                        `Product Category "${ProductCategories.name}" was deleted`
                    );
                },
                onError: () => {
                    toast.warning("Failed to delete Product Category.");
                },
            }
        );
    };

    const confirmDelete = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleDelete = () => {
        deleteProductCategory(ProductCategories, closeModal); // Panggil deleteCategory dengan closeModal
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
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete the category "
                        {ProductCategories.name}"?
                    </h2>
                    <div className="mt-6 flex justify-end">
                        <Button
                            className={`${buttonVariants({
                                variant: "secondary",
                            })} ms-4`}
                            onClick={closeModal}
                        >
                            Cancel
                        </Button>
                        <Button
                            className={`${buttonVariants({
                                variant: "destructive",
                            })} ms-3`}
                            onClick={handleDelete} // Panggil fungsi handleDelete untuk hapus
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default DeleteModal;
