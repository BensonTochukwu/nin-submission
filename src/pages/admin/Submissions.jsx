import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BASE_URL = "http://localhost:3000";
const FORM_ID = "cmqsd0pn40003cl1394rhpb9k";

function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${BASE_URL}/forms/${FORM_ID}/submissions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSubmissions(response.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-900 to-green-700 text-white px-6 py-8 shadow-lg">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/admin/dashboard"
            className="text-green-200 text-sm"
          >
            ← Back to Dashboard
          </Link>

          <h1 className="text-3xl font-bold mt-3">
            Submissions
          </h1>

          <p className="mt-2 text-green-100">
            {submissions.length} submission{submissions.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-6">
        {loading ? (
          <div className="text-center py-16 text-gray-500">
            Loading submissions...
          </div>
        ) : submissions.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-500">
            No submissions found.
          </div>
        ) : (
          <div className="space-y-5">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="bg-white rounded-3xl shadow-md p-5 border border-gray-100"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-green-900">
                      {submission.fullName}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      {submission.stateCode}
                    </p>
                  </div>

                  <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {submission.status}
                  </span>
                </div>

                <div className="mt-5 space-y-2 text-gray-700">
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {submission.email}
                  </p>

                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    {submission.phone}
                  </p>

                  <p>
                    <span className="font-semibold">State:</span>{" "}
                    {submission.data?.state}
                  </p>

                  <p>
                    <span className="font-semibold">NIN:</span>{" "}
                    {submission.data?.ninNumber}
                  </p>
                </div>

                {submission.uploadedFiles?.length > 0 && (
                  <div className="mt-5">
                    <p className="font-semibold mb-2">
                      Uploaded File
                    </p>

                    <div className="bg-gray-50 rounded-xl p-3 border">
                      <p className="text-sm text-gray-700">
                        {submission.uploadedFiles[0].originalFilename}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        {submission.uploadedFiles[0].mimeType}
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-5 text-sm text-gray-500">
                  Submitted on{" "}
                  {new Date(
                    submission.submittedAt
                  ).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Submissions;