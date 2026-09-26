import { Outlet, Link, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen poppins-regular bg-gray-100">
      {/* Simple Header */}
      <header className="bg-white shadow p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
          <div className="text-sm text-gray-600">Legal Firm Management</div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto py-6 px-4">
        {/* Simple Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b">
            <Link
              to="add-client"
              className={`px-6 py-3 font-medium ${
                location.pathname.includes("add-client")
                  ? "text-primary-600 border-b-2 border-primary-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Add Client
            </Link>
            <Link
              to="upload-order"
              className={`px-6 py-3 font-medium ${
                location.pathname.includes("upload-order")
                  ? "text-primary-600 border-b-2 border-primary-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Upload Order
            </Link>
            <Link
              to="upload-judgment"
              className={`px-6 py-3 font-medium ${
                location.pathname.includes("upload-judgment")
                  ? "text-primary-600 border-b-2 border-primary-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Upload Judgment
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;