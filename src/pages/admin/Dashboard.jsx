import { Link } from "react-router-dom";

function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-green-900 text-white px-6 py-8 rounded-b-3xl shadow-lg">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <p className="mt-2 text-green-100">
          Manage submissions and monitor uploaded documents.
        </p>
      </div>

      <div className="p-5 space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-gray-500 text-sm">Total Submissions</p>

            <h2 className="text-3xl font-bold text-green-900 mt-2">
              --
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-gray-500 text-sm">Forms Active</p>

            <h2 className="text-3xl font-bold text-green-900 mt-2">
              1
            </h2>
          </div>
        </div>

        {/* Menu */}
        <div className="space-y-4 mt-8">
          <Link
            to="/admin/submissions"
            className="block bg-white rounded-2xl shadow p-5 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  View Submissions
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Review all submitted NIN documents
                </p>
              </div>

              <span className="text-2xl text-green-900">→</span>
            </div>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full bg-white rounded-2xl shadow p-5 text-left hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-red-600">
                  Logout
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Sign out of the admin portal
                </p>
              </div>

              <span className="text-2xl text-red-600">↩</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;