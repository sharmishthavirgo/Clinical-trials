"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { statusMap } from "../api/trials/types";

interface ClinicalTrial {
  id: string;
  nctId: string;
  title: string;
  status:
    | "Recruiting"
    | "Not yet recruiting"
    | "Active, not recruiting"
    | "Completed";
  studyType: string;
  sponsor: string;
  locations: string[];
  startDate: string;
}

interface Pagination {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export default function DashboardPage() {
  const [trials, setTrials] = useState<ClinicalTrial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const [pagination, setPagination] = useState<Pagination | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        search,
        status: statusFilter,
        sort_by: sortBy,
        sort_direction: sortDirection,
      });

      try {
        const response = await fetch(`/api/trials?${params.toString()}`);
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        setTrials(data.trials);
        setPagination(data.pagination);
      } catch (err) {
        setError("Could not fetch data. Please check the API.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, search, statusFilter, sortBy, sortDirection]);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  if (trials.length === 0 && loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg animate-pulse">Loading trials...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Clinical Trials Research Tool
      </h1>

      <div className="flex flex-wrap items-center gap-4 mb-6 justify-center">
        <input
          type="text"
          placeholder="Search by title, sponsor, or keyword..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          onKeyDown={(e) => e.key === "Enter" && setPage(1)}
          className="w-80 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <select
          value={statusFilter}
          onChange={(e) => {
            setPage(1);
            setStatusFilter(e.target.value);
          }}
          className="px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">All Statuses</option>
          <option value="RECRUITING">Recruiting</option>
          <option value="COMPLETED">Completed</option>
          <option value="ACTIVE_NOT_RECRUITING">Active, not recruiting</option>
          <option value="NOT_YET_RECRUITING">Not yet recruiting</option>
          <option value="SUSPENDED">Suspended</option>
          <option value="TERMINATED">Terminated</option>
          <option value="ENROLLING_BY_INVITATION">
            Enrolling by Invitation
          </option>
          <option value="WITHHELD">Withheld</option>
        </select>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-2xl">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700 text-sm">
              {["nctId", "title", "status", "sponsor", "startDate"].map(
                (col) => (
                  <th
                    key={col}
                    onClick={() => handleSort(col)}
                    className="px-4 py-3 cursor-pointer hover:text-blue-600 transition"
                  >
                    {col === "nctId" && "NCT ID"}
                    {col === "title" && "Title"}
                    {col === "status" && "Status"}
                    {col === "sponsor" && "Sponsor"}
                    {col === "startDate" && "Start Date"}
                    {sortBy === col && (sortDirection === "asc" ? " ↑" : " ↓")}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {trials.length > 0 ? (
              trials.map((trial, i) => (
                <tr
                  key={trial.id}
                  className={`${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50 transition`}
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`https://clinicaltrials.gov/study/${trial.id}`}
                      className="text-blue-600 hover:underline hover:text-blue-800"
                    >
                      {trial.id}
                    </Link>
                  </td>
                  <td
                    className="px-4 py-3 max-w-xs truncate"
                    title={trial.title}
                  >
                    {trial.title}
                  </td>
                  <td className="px-4 py-3">
                    {trial.status ? (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          statusMap[trial.status]?.color ||
                          "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {statusMap[trial.status]?.label || trial.status}
                      </span>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td
                    className="px-4 py-3 max-w-xs truncate"
                    title={trial.sponsor}
                  >
                    {trial.sponsor}
                  </td>
                  <td className="px-4 py-3">{trial.startDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                  No trials found. Try adjusting your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex justify-between items-center mt-6">
          <span className="text-gray-600 text-sm">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === pagination.totalPages}
              className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
