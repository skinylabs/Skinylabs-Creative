// resources/js/Pages/Partials/Delete.tsx
import { useState, FormEventHandler } from "react";
import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";

interface Props {
    category: {
        id: number;
        name: string;
    };
}

export default function DeleteVectorCategoryModal({ category }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { delete: destroy, processing } = useForm();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const submitCategory: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("vector-categories.destroy", category.id), {
            onSuccess: () => {
                toast.success("Vector Category deleted successfully!");
                closeModal();
            },
            onError: () => {
                toast.warning("Failed to delete Vector Category.");
            },
        });
    };

    return (
        <>
            <Button
                onClick={openModal}
                className={buttonVariants({
                    variant: "destructive",
                    size: "sm",
                })}
            >
                Delete
            </Button>

            <Modal show={isModalOpen} onClose={closeModal}>
                <form onSubmit={submitCategory} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Delete Vector Category
                    </h2>

                    <p className="mt-2 text-sm text-gray-600">
                        Are you sure you want to delete this vector category?
                        This action cannot be undone.
                    </p>

                    <div className="mt-6 flex justify-end">
                        <Button
                            className={`${buttonVariants({
                                variant: "default",
                            })}`}
                            onClick={closeModal}
                            disabled={processing}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className={`${buttonVariants({
                                variant: "destructive",
                            })} ms-3`}
                            disabled={processing}
                        >
                            Delete
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
