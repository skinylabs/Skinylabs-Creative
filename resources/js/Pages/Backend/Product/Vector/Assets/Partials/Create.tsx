import { useState, FormEventHandler } from "react";
import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import Input from "@/Components/ui/Input";
import InputError from "@/Components/ui/InputError";
import Label from "@/Components/ui/Label";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";

export default function CreateVectorAssetModal({
    vectorCategories,
}: {
    vectorCategories: any[];
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, reset, errors, processing } = useForm({
        name: "",
        description: "",
        vector_category_id: "", // Foreign key ke vector_categories
        file: null,
        price: "",
        status: "active", // default status
    });

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const submitAsset: FormEventHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("vector_category_id", data.vector_category_id);

        // Cek apakah file ada sebelum append
        if (data.file) {
            formData.append("file", data.file);
        }

        formData.append("price", data.price);
        formData.append("status", data.status);

        post(route("vector-assets.store"), {
            data: formData,
            onSuccess: () => {
                toast.success("Vector Asset successfully created!");
                closeModal();
            },
            onError: () => {
                toast.error("Failed to create vector asset.");
            },
        });
    };

    return (
        <>
            <Button
                onClick={openModal}
                className={buttonVariants({ variant: "default", size: "lg" })}
            >
                Add Vector Asset
            </Button>

            <Modal show={isModalOpen} onClose={closeModal}>
                <form
                    onSubmit={submitAsset}
                    encType="multipart/form-data"
                    className="p-6"
                >
                    <h2 className="text-lg font-medium text-gray-900">
                        Add Vector Asset
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

                    <div className="mt-4">
                        <Label htmlFor="vector_category_id">
                            Vector Category
                        </Label>
                        <select
                            id="vector_category_id"
                            value={data.vector_category_id}
                            onChange={(e) =>
                                setData("vector_category_id", e.target.value)
                            }
                            className="mt-1 block w-full"
                            required
                        >
                            <option value="">Select Vector Category</option>
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
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            type="text"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            className="mt-1 block w-full"
                        />
                        <InputError
                            message={errors.description}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="file">File</Label>
                        <Input
                            id="file"
                            type="file"
                            onChange={(e) =>
                                setData("file", e.target.files?.[0])
                            }
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.file} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="price">Price</Label>
                        <Input
                            id="price"
                            type="number"
                            value={data.price}
                            onChange={(e) => setData("price", e.target.value)}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.price} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="status">Status</Label>
                        <select
                            id="status"
                            value={data.status}
                            onChange={(e) => setData("status", e.target.value)}
                            className="mt-1 block w-full"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        <InputError message={errors.status} className="mt-2" />
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
