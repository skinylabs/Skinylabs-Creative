import AdminHeader from "@/Components/Backend/AdminHeader";
import AdminLayout from "@/Layouts/AdminLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import CreateVectorAssetsModal from "./Partials/Create";
import EditVectorAssetsModal from "./Partials/Edit";
import DeleteVectorAssetsModal from "./Partials/Delete";

interface VectorAsset {
    id: number;
    name: string;
    category: string;
    imageSrc: string;
}

interface Props extends PageProps {
    VectorAssets: VectorAsset[];
}

const VectorAssetsPage = ({ VectorAssets }: Props) => {
    const BreadcrumbItem = [
        { label: "Assets", href: "/" },
        { label: "Vector Assets" },
    ];

    return (
        <AdminLayout>
            <Head title="Vector Assets" />
            <AdminHeader items={BreadcrumbItem} title="Vector Assets" />
            <div className="flex justify-end">
                <CreateVectorAssetsModal />
            </div>

            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-4">
                {VectorAssets.length > 0 ? (
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Category</th>
                                <th className="px-4 py-2">Image</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {VectorAssets.map((asset) => (
                                <tr key={asset.id}>
                                    <td className="px-4 py-2">{asset.name}</td>
                                    <td className="px-4 py-2">
                                        {asset.category}
                                    </td>
                                    <td className="px-4 py-2">
                                        <img
                                            src={asset.imageSrc}
                                            alt={asset.name}
                                            className="w-16 h-16"
                                        />
                                    </td>
                                    <td className="px-4 py-2 flex gap-4">
                                        <EditVectorAssetsModal asset={asset} />
                                        <DeleteVectorAssetsModal
                                            asset={asset}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="p-4 text-center text-gray-500">
                        No assets available.
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default VectorAssetsPage;
