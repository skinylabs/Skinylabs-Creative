// resources/js/Pages/Partials/Edit.tsx
import { useState, FormEventHandler } from "react";
import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import Input from "@/Components/ui/Input";
import InputError from "@/Components/ui/InputError";
import Label from "@/Components/ui/Label";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";

interface Props {
    category: {
        id: number;
        name: string;
    };
}

export default function EditVectorCategoryModal({ category }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, put, reset, errors, processing } = useForm({
        name: category.name,
    });

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const submitCategory: FormEventHandler = (e) => {
        e.preventDefault();

        put(route("vector-categories.update", category.id), {
            onSuccess: () => {
                toast.success("Vector Category updated successfully!");
                closeModal();
            },
            onError: () => {
                toast.warning("Failed to update Vector Category.");
            },
        });
    };

    return (
        <>
            <Button
                onClick={openModal}
                className={buttonVariants({ variant: "default", size: "sm" })}
            >
                Edit
            </Button>

            <Modal show={isModalOpen} onClose={closeModal}>
                <form onSubmit={submitCategory} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Edit Vector Category
                    </h2>

                    <div className="mt-4">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="mt-1 block w-full"
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button
                            className={`${buttonVariants({
                                variant: "destructive",
                            })}`}
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
                            Submit
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
