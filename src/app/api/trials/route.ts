import { NextResponse } from "next/server";
import { mockTrials } from "../../lib/mockTrials";
import { Trial, SortableTrialKeys, ClinicalTrialRecord } from "./types";

function mapTrial(trial: ClinicalTrialRecord): Trial {
  return {
    id: trial.protocolSection.identificationModule.nctId,
    title: trial.protocolSection.identificationModule.briefTitle,
    sponsor:
      trial.protocolSection.sponsorCollaboratorsModule.leadSponsor?.name ||
      "Unknown",
    status: trial.protocolSection.statusModule.overallStatus,
    startDate: trial.protocolSection.statusModule.startDateStruct?.date,
    completionDate:
      trial.protocolSection.statusModule.completionDateStruct?.date,
    location:
      trial.protocolSection.contactsLocationsModule?.locations?.[0]?.facility ||
      "Not Provided",
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const statusFilter = searchParams.get("status") || "";
  const searchFilter = searchParams.get("search") || "";

  const sortBy = (searchParams.get("sort_by") as SortableTrialKeys) || "id";
  const sortDirection = searchParams.get("sort_direction") || "asc";

  const flatTrials = mockTrials.map(mapTrial);

  const filteredTrials = flatTrials.filter((trial) => {
    const matchesStatus = !statusFilter || trial.status === statusFilter;
    const matchesSearch =
      !searchFilter ||
      trial.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      trial.sponsor.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  filteredTrials.sort((a, b) => {
  const aValue = a[sortBy] ?? "";
  const bValue = b[sortBy] ?? "";

  if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
  if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
  return 0;
});


  const paginatedTrials = filteredTrials.slice(startIndex, endIndex);
  const totalRecords = filteredTrials.length;
  const totalPages = Math.ceil(totalRecords / limit);

  const response = {
    trials: paginatedTrials,
    pagination: {
      totalRecords,
      totalPages,
      currentPage: page,
      limit,
    },
  };

  return NextResponse.json(response);
}
