import { useState, FormEventHandler } from "react";
import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import Input from "@/Components/ui/Input";
import InputError from "@/Components/ui/InputError";
import Label from "@/Components/ui/Label";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";
import ToggleRoundSwitcher from "@/Components/ui/Toggle";

export default function CreateModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState<string>("inactive");

    const { data, setData, post, reset, errors, processing } = useForm({
        name: "",
        description: "",
        vector_category_id: "",
        file: null as File | null,
        status: "inactive",
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

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("vector_category_id", data.vector_category_id);

        if (data.file) {
            formData.append("file", data.file);
        }

        formData.append("status", status);

        post(route("vector-assets.store"), {
            data: formData,
            onSuccess: () => {
                toast.success("Category successfully created!");
                closeModal();
            },
            onError: () => {
                console.error(errors);
                toast.warning("Failed to create category.");
            },
        });
    };

    return (
        <>
            <Button
                onClick={openModal}
                className={buttonVariants({ variant: "default", size: "lg" })}
            >
                Add Product Category
            </Button>

            <Modal show={isModalOpen} onClose={closeModal}>
                <form onSubmit={submitCategory} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Add Product Category
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
                            {/* Map categories here */}
                            <option value="1">Category 1</option>
                            <option value="2">Category 2</option>
                        </select>
                        <InputError
                            message={errors.vector_category_id}
                            className="mt-2"
                        />
                    </div>
                    <div className="mt-4">
                        <Label htmlFor="file">File</Label>
                        <Input
                            id="file"
                            type="file"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setData("file", e.target.files[0]);
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
                            checked={status === "active"}
                            onChange={() =>
                                setStatus(
                                    status === "active" ? "inactive" : "active"
                                )
                            }
                        />
                        <InputError message={errors.status} className="mt-2" />
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
                            className={
                                buttonVariants({ variant: "default" }) + " ms-3"
                            }
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
