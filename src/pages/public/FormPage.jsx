import { useState } from "react";
import axios from "axios";

const FORM_SLUG = "nysc-nin-upload-test-3";
const BASE_URL = "http://localhost:3000";

function App() {
  const [formData, setFormData] = useState({
    fullName: "",
    state: "",
    stateCode: "",
    phoneNumber: "",
    email: "",
    nin: "",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Only PDF, JPG, JPEG, and PNG files are allowed");
      return;
    }
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // strict validation (frontend guard only)
    if (
      !formData.fullName ||
      !formData.stateCode ||
      !formData.phoneNumber ||
      !formData.email ||
      !formData.nin
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (!file) {
      alert("Please upload your NIN document");
      return;
    }

    const data = new FormData();

    data.append("state", formData.state);
    data.append("name", formData.fullName);
    data.append("email", formData.email);
    data.append("phone", formData.phoneNumber);
    data.append("stateCode", formData.stateCode);
    data.append("ninNumber", formData.nin);
    data.append("ninPdf", file);

    console.log([...data.entries()]); // ✅ safe debug log

    setLoading(true);

    try {
      await axios.post(
        `${BASE_URL}/public/forms/${FORM_SLUG}/submit`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Submission successful!");

      setFormData({
        fullName: "",
        stateCode: "",
        phoneNumber: "",
        email: "",
        nin: "",
      });

      setFile(null);
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-500 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-3">
          <img src="/nysc-logo.png" alt="NYSC Logo" className="h-12 w-auto object-contain" />

          <h1 className="text-2xl font-bold text-green-900">
            ONDO NIN Portal
          </h1>
        </div>
      </nav>

      <main className="flex justify-center px-4 py-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-3xl font-bold text-green-900 mb-2">
            NIN Submission portal
          </h2>

          <p className="text-gray-600 mb-10">
            Complete the form below to submit your
            NIN slip.
          </p>

          {/* Personal Information */}
          <div className="mb-10">
            <div className="border-b border-gray-500 pb-2 mb-6">
              <h3 className="text-xl font-semibold text-green-900">
                Personal Information
              </h3>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-900"
                >
                  <option value="">Select State</option>
                  <option value="LAGOS">Lagos</option>
                  <option value="ONDO">Ondo</option>
                </select>
              </div>            
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-900"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  State Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="stateCode"
                  value={formData.stateCode}
                  onChange={handleChange}
                  placeholder="e.g. LA/26B/1234"
                  required
                  className="w-full border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-900"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-900"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-900"
                />
              </div>
            </div>
          </div>

          {/* NIN Submission */}
          <div>
            <div className="border-b border-gray-500 pb-2 mb-6">
              <h3 className="text-xl font-semibold text-green-900">
                NIN Submission
              </h3>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  NIN Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nin"
                  value={formData.nin}
                  onChange={handleChange}
                  placeholder="11 digit number"
                  required
                  className="w-full border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-900"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  NIN Document Upload <span className="text-red-500">*</span>
                </label>

                <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center bg-gray-50">
                  <p className="text-gray-600 mb-4">
                    Drag and drop your file here or click to browse
                  </p>

                  <input
                    type="file"
                    className="hidden"
                    id="file-upload"
                    onChange={handleFileChange}
                  />

                  <label
                    htmlFor="file-upload"
                    className="inline-block bg-green-900 hover:bg-green-950 text-white px-6 py-3 rounded-lg cursor-pointer transition"
                  >
                    Browse Files
                  </label>

                  {file && (
                    <p className="text-sm text-green-900 mt-4 font-medium">
                      Selected: {file.name}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-900 hover:bg-green-950 disabled:bg-gray-400 text-white font-semibold py-4 rounded-lg transition mt-6"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default App;