import { useState, FormEventHandler } from "react";
import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import Input from "@/Components/ui/Input";
import InputError from "@/Components/ui/InputError";
import Label from "@/Components/ui/Label";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";

interface ProductCategory {
    id: number;
    name: string;
}

interface CreateModalProps {
    productCategories: ProductCategory[];
}

export default function CreateModal({ productCategories }: CreateModalProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, reset, errors, processing } = useForm({
        name: "",
        product_category_id: "",
    });

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const submitVectorCategory: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("vector-categories.store"), {
            onSuccess: () => {
                toast.success("Vector category successfully created!");
                closeModal();
            },
            onError: () => {
                toast.warning("Failed to create vector category.");
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
                <form onSubmit={submitVectorCategory} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Add Vector Category
                    </h2>

                    <div className="mt-4">
                        <Label htmlFor="name">Vector Category Name</Label>
                        <Input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="mt-1 block w-full"
                            isFocused={true}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <Label htmlFor="productCategory">
                            product Category
                        </Label>
                        <select
                            id="product_category_id"
                            value={data.product_category_id}
                            onChange={(e) =>
                                setData("product_category_id", e.target.value)
                            }
                            className="block w-full mt-1"
                            required
                        >
                            <option value="" disabled>
                                Select a product category
                            </option>
                            {productCategories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
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
