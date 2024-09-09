import { Link } from "@inertiajs/react"; // Pastikan InertiaJS diimport jika diperlukan

const Pagination = ({
    current_page,
    last_page,
}: {
    current_page: number;
    last_page: number;
}) => {
    return (
        <div className="flex justify-between mt-4">
            {/* Previous Page */}
            <Link
                href={`?page=${current_page - 1}`}
                className={`px-4 py-2 border rounded ${
                    current_page === 1
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white"
                }`}
                disabled={current_page === 1}
            >
                Previous
            </Link>

            {/* Page Info */}
            <span className="px-4 py-2 text-gray-700">
                Page {current_page} of {last_page}
            </span>

            {/* Next Page */}
            <Link
                href={`?page=${current_page + 1}`}
                className={`px-4 py-2 border rounded ${
                    current_page === last_page
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white"
                }`}
                disabled={current_page === last_page}
            >
                Next
            </Link>
        </div>
    );
};

export default Pagination;
