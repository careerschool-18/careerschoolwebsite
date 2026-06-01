import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Applications() {
  const router = useRouter();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/applications"
        );

        const data = await response.json();

        setApplications(data);
      } catch (error) {
        console.error(
          "Error fetching applications:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
        Loading applications...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-green-700">
          Applied Candidates
        </h1>

        <button
          onClick={() => router.push("/hr-portal")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
        >
          Back to HR Portal
        </button>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-green-700">
            Applications
          </h2>

          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
            {applications.length} Applications
          </span>
        </div>

        {applications.length === 0 ? (
          <div className="text-center py-10 text-gray-500 text-lg">
            No applications found.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="px-4 py-4 whitespace-nowrap">
                    Job Title
                  </th>

                  <th className="px-4 py-4 whitespace-nowrap">
                    Full Name
                  </th>

                  <th className="px-4 py-4 whitespace-nowrap">
                    Phone
                  </th>

                  <th className="px-4 py-4 whitespace-nowrap">
                    Email
                  </th>

                  <th className="px-4 py-4 whitespace-nowrap">
                    Location
                  </th>

                  <th className="px-4 py-4 whitespace-nowrap">
                    Education
                  </th>

                  <th className="px-4 py-4 whitespace-nowrap">
                    College
                  </th>

                  <th className="px-4 py-4 whitespace-nowrap">
                    Stream
                  </th>

                  <th className="px-4 py-4 whitespace-nowrap">
                    Year
                  </th>

                  <th className="px-4 py-4 whitespace-nowrap">
                    Experience
                  </th>

                  <th className="px-4 py-4 whitespace-nowrap">
                    Source
                  </th>
                </tr>
              </thead>

              <tbody>
                {applications.map((app, index) => (
                  <tr
                    key={app.id}
                    className={`border-b ${
                      index % 2 === 0
                        ? "bg-gray-50"
                        : "bg-white"
                    } hover:bg-green-50 transition`}
                  >
                    <td className="px-4 py-4 whitespace-nowrap font-semibold">
                      {app.jobTitle}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {app.fullName}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {app.phone}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {app.email}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {app.location}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {app.highestEducation}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {app.collegeName}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {app.stream}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {app.yearOfPassing}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {app.experience}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {app.source}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}