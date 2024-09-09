import { useState, FormEventHandler } from "react";
import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import Input from "@/Components/ui/Input";
import InputError from "@/Components/ui/InputError";
import Label from "@/Components/ui/Label";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";

export interface ProductCategory {
    id: number;
    name: string;
}
interface Props {
    ProductCategories: ProductCategory[];
}

export default function CreateModal({ ProductCategories }: Props) {
    console.log(ProductCategories);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, reset, errors, processing } = useForm({
        name: "",
        vector_category_id: "",
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

        post(route("vectorCategories.store"), {
            onSuccess: () => {
                toast.success("Vector Category successfully created!");
                closeModal();
            },
            onError: () => {
                toast.warning("Failed to create Vector Category.");
            },
        });
    };

    return (
        <>
            <Button
                onClick={openModal}
                className={buttonVariants({ variant: "default", size: "lg" })}
            >
                Add Vector Category
            </Button>

            <Modal show={isModalOpen} onClose={closeModal}>
                <form onSubmit={submitCategory} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Add Vector Category
                    </h2>

                    {/* Input untuk Name */}
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

                    {/* Dropdown Select untuk Kategori */}
                    <div className="mt-4">
                        <Label htmlFor="vector_category_id">Category</Label>
                        <select
                            id="vector_category_id"
                            value={data.vector_category_id}
                            onChange={(e) =>
                                setData("vector_category_id", e.target.value)
                            }
                            className="mt-1 block w-full"
                            required
                        >
                            <option value="">Select a category</option>
                            {ProductCategories.length > 0 ? (
                                ProductCategories.map((pc) => (
                                    <option key={pc.id} value={pc.id}>
                                        {pc.name}
                                    </option>
                                ))
                            ) : (
                                <option disabled>
                                    No categories available
                                </option>
                            )}
                        </select>
                        <InputError
                            message={errors.vector_category_id}
                            className="mt-2"
                        />
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
