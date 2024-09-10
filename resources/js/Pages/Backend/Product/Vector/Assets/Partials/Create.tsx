import { useState, FormEventHandler } from "react";
import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import Input from "@/Components/ui/Input";
import InputError from "@/Components/ui/InputError";
import Label from "@/Components/ui/Label";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";
import ToggleRoundSwitcher from "@/Components/ui/Toggle";

interface VectorCategory {
    id: number;
    name: string;
}

interface CreateModalProps {
    vectorCategories: VectorCategory[];
}

export default function CreateModal({ vectorCategories }: CreateModalProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, reset, errors, processing } = useForm({
        name: "",
        description: "",
        vector_category_id: [] as number[], // Accepting multiple IDs
        price: "",
        file: null as File | null,
        status: false, // Boolean for status
    });

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const submitVectorAssets: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("vector-assets.store"), {
            onSuccess: () => {
                toast.success("Vector Assets successfully created!");
                closeModal();
            },
            onError: () => {
                toast.warning("Failed to create vector Assets.");
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
                <form onSubmit={submitVectorAssets} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Add Vector Category2
                    </h2>

                    <div className="mt-4">
                        <Label htmlFor="name">Name</Label>
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
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            type="text"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            className="mt-1 block w-full"
                            isFocused={true}
                            required
                        />
                        <InputError
                            message={errors.description}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="vector_category_id">
                            Vector Category
                        </Label>
                        <select
                            id="vector_category_id"
                            multiple
                            value={data.vector_category_id.map(String)} // Ensure it's a string array
                            onChange={(e) => {
                                const selectedOptions = Array.from(
                                    e.target.selectedOptions,
                                    (option) => Number(option.value)
                                );
                                setData("vector_category_id", selectedOptions);
                            }}
                            className="block w-full mt-1"
                            required
                        >
                            {vectorCategories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <InputError
                            message={errors.vector_category_id}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="price">Price</Label>
                        <Input
                            id="price"
                            type="number"
                            value={data.price}
                            onChange={(e) => setData("price", e.target.value)}
                            className="mt-1 block w-full"
                            required
                        />
                        <InputError message={errors.price} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="file">File</Label>
                        <Input
                            id="file"
                            type="file"
                            onChange={(e) => {
                                if (e.target.files) {
                                    const file = e.target.files[0];
                                    console.log("File selected:", file);
                                    setData("file", file);
                                }
                            }}
                            className="mt-1 block w-full"
                            required
                        />
                        <InputError message={errors.file} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="status">Status</Label>
                        <ToggleRoundSwitcher
                            checked={data.status}
                            onChange={(checked) => setData("status", checked)}
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button
                            className={buttonVariants({
                                variant: "destructive",
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
                            Submit
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
