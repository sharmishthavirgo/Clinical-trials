export interface ClinicalTrialRecord {
  protocolSection: ProtocolSection;
  derivedSection?: DerivedSection;
  hasResults: boolean;
}

export interface ProtocolSection {
  identificationModule: IdentificationModule;
  statusModule: StatusModule;
  sponsorCollaboratorsModule: SponsorCollaboratorsModule;
  oversightModule?: OversightModule;
  descriptionModule: DescriptionModule;
  conditionsModule: ConditionsModule;
  designModule?: DesignModule;
  armsInterventionsModule: ArmsInterventionsModule;
  outcomesModule: OutcomesModule;
  eligibilityModule: EligibilityModule;
  contactsLocationsModule: ContactsLocationsModule;
  ipdSharingStatementModule?: IpdSharingStatementModule;
}

export interface IdentificationModule {
  nctId: string;
  orgStudyIdInfo: { id: string };
  organization: { fullName: string; class: string };
  briefTitle: string;
  officialTitle: string;
  acronym?: string;
}

export interface StatusModule {
  statusVerifiedDate: string;
  overallStatus: string;
  expandedAccessInfo: { hasExpandedAccess: boolean };
  startDateStruct: { date: string; type: string };
  primaryCompletionDateStruct: { date: string; type: string };
  completionDateStruct: { date: string; type: string };
  studyFirstSubmitDate: string;
  studyFirstSubmitQcDate: string;
  studyFirstPostDateStruct: { date: string; type: string };
  lastUpdateSubmitDate: string;
  lastUpdatePostDateStruct: { date: string; type: string };
}

export interface SponsorCollaboratorsModule {
  responsibleParty: {
    type: string;
    investigatorFullName: string;
    investigatorTitle?: string;
    investigatorAffiliation?: string;
  };
  leadSponsor: { name: string; class: string };
  collaborators?: { name: string; class: string }[];
}

export interface OversightModule {
  oversightHasDmc?: boolean;
  isFdaRegulatedDrug?: boolean;
  isFdaRegulatedDevice?: boolean;
  isUsExport?: boolean;
}

export interface DescriptionModule {
  briefSummary: string;
}

export interface ConditionsModule {
  conditions: string[];
  keywords?: string[];
}

export interface DesignModule {
  studyType?: string;
  phases?: string[];
  designInfo?: {
    allocation?: string;
    interventionModel?: string;
    primaryPurpose?: string;
    maskingInfo?: { masking: string };
  };
  enrollmentInfo?: { count: number; type: string };
}

export interface ArmsInterventionsModule {
  armGroups: {
    label: string;
    type: string;
    description: string;
    interventionNames: string[];
  }[];
  interventions: {
    type: string;
    name: string;
    description: string;
    armGroupLabels: string[];
  }[];
}

export interface OutcomesModule {
  primaryOutcomes: {
    measure: string;
    description: string;
    timeFrame: string;
  }[];
  secondaryOutcomes?: {
    measure: string;
    description: string;
    timeFrame: string;
  }[];
}

export interface EligibilityModule {
  eligibilityCriteria: string;
  healthyVolunteers: boolean;
  sex: string;
  minimumAge: string;
  stdAges: string[];
}

export interface ContactsLocationsModule {
  centralContacts?: {
    name: string;
    role: string;
    phone?: string;
    email?: string;
  }[];
  overallOfficials?: {
    name: string;
    affiliation: string;
    role: string;
  }[];
  locations?: {
    facility: string;
    status: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    geoPoint?: { lat: number; lon: number };
  }[];
}

export interface IpdSharingStatementModule {
  ipdSharing: string;
  description?: string;
}

export interface DerivedSection {
  miscInfoModule?: { versionHolder: string };
}

export interface Trial {
  id: string;
  title: string;
  sponsor: string;
  status: string;
  startDate?: string;
  completionDate?: string;
  location: string;
}

export type SortableTrialKeys = keyof Pick<
  Trial,
  | "id"
  | "title"
  | "sponsor"
  | "status"
  | "startDate"
  | "completionDate"
  | "location"
>;

export const statusMap: Record<
  string,
  { label: string; color: string }
> = {
  RECRUITING: {
    label: "Recruiting",
    color: "bg-green-100 text-green-800",
  },
  COMPLETED: {
    label: "Completed",
    color: "bg-gray-100 text-gray-800",
  },
  ACTIVE_NOT_RECRUITING: {
    label: "Active, not recruiting",
    color: "bg-yellow-100 text-yellow-800",
  },
  NOT_YET_RECRUITING: {
    label: "Not yet recruiting",
    color: "bg-blue-100 text-blue-800",
  },
  SUSPENDED: {
    label: "Suspended",
    color: "bg-orange-100 text-orange-800",
  },
  TERMINATED: {
    label: "Terminated",
    color: "bg-red-100 text-red-800",
  },
  ENROLLING_BY_INVITATION: {
    label: "Enrolling by Invitation",
    color: "bg-purple-100 text-purple-800",
  },
  WITHHELD: {
    label: "Withheld",
    color: "bg-slate-100 text-slate-800",
  },
};
