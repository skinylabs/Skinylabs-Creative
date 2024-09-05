import AdminHeader from "@/Components/Backend/AdminHeader";
import Input from "@/Components/ui/Input";
import InputError from "@/Components/ui/InputError";
import Label from "@/Components/ui/Label";
import AdminLayout from "@/Layouts/AdminLayout";
import { PageProps } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { Button, buttonVariants } from "@/Components/ui/button";
import { toast } from "sonner";

const ProductCategoryCreatePage = ({ auth }: PageProps) => {
    const { data, setData, post, errors, reset } = useForm({
        name: "",
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("categories.store"), {
            onSuccess: () => {
                toast.success;
            },
            onError: () => {
                toast.error;
            },
        });
    };

    const BreadcrumbItem = [
        { label: "Main", href: "/" },
        { label: "Product", href: "/" },
        { label: "Category", href: "/categories" },
        { label: "Create" },
    ];

    return (
        <AdminLayout>
            <Head title="Create Category" />
            <AdminHeader items={BreadcrumbItem} title="Create Category" />
            <div className="p-4 flex flex-col gap-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <form onSubmit={onSubmit}>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors.name} className="mt-2" />
                    <div className="flex justify-end">
                        <Button className={`${buttonVariants({ size: "lg" })}`}>
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default ProductCategoryCreatePage;
