import { ClinicalTrialRecord } from "../api/trials/types";

export function mapClinicalRecord(record: ClinicalTrialRecord) {
  const idModule = record.protocolSection.identificationModule;
  const statusModule = record.protocolSection.statusModule;

  return {
    id: idModule.orgStudyIdInfo?.id || idModule.nctId,
    nctId: idModule.nctId,
    title: idModule.briefTitle,
    status: statusModule.overallStatus,
    studyType: record.protocolSection?.designModule?.studyType,
    sponsor: idModule.organization?.fullName || "Unknown",
    locations:
      record.protocolSection.contactsLocationsModule?.locations?.map(
        (loc) => loc.facility
      ) || [],
    startDate: statusModule.startDateStruct?.date || "",
  };
}
