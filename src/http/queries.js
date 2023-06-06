import {
  getFolder,
  getInternship,
  getInternships,
  getJournal,
  getJournals,
  getLocation,
  getLocations,
  getMajors,
  getRoleMenu,
  getRoles,
  getRootFolder,
  getSchoolClass,
  getSchoolClasses,
  getStatus,
  getUser,
  getUsers,
  profile,
} from "./api";

export const profileQuery = () => ({
  queryKey: ["user"],
  queryFn: () => profile(),
  retry: (failureCount, error) => {
    if (error.response.status === 401) {
      // Don't retry if the response is 401 Unauthorized
      return false;
    }
    // Retry up to 3 times for other types of errors
    return failureCount < 1;
  },
});

export const getRoleMenuQuery = roleId => ({
  queryKey: ["menu"],
  queryFn: () => getRoleMenu(roleId),
  enabled: !!roleId,
});

export const getUsersQuery = () => ({
  queryKey: ["users"],
  queryFn: () => getUsers(),
});

export const getUserQuery = userId => ({
  queryKey: ["user", userId],
  queryFn: () => getUser(userId),
});

export const getRolesQuery = () => ({
  queryKey: ["roles"],
  queryFn: () => getRoles(),
});

export const getLocationsQuery = () => ({
  queryKey: ["locations"],
  queryFn: () => getLocations(),
});

export const getLocationQuery = locationId => ({
  queryKey: ["location", locationId],
  queryFn: () => getLocation(locationId),
});

export const getSchoolClassesQuery = () => ({
  queryKey: ["schoolclasses"],
  queryFn: () => getSchoolClasses(),
});

export const getSchoolClassQuery = schoolClassId => ({
  queryKey: ["schoolclass", schoolClassId],
  queryFn: () => getSchoolClass(schoolClassId),
});

export const getMajorsQuery = () => ({
  queryKey: ["majors"],
  queryFn: () => getMajors(),
});

export const getInternshipsQuery = () => ({
  queryKey: ["internships"],
  queryFn: () => getInternships(),
});

export const getInternshipQuery = internshipId => ({
  queryKey: ["internship", internshipId],
  queryFn: () => getInternship(internshipId),
});

export const getStatusQuery = () => ({
  queryKey: ["status"],
  queryFn: () => getStatus(),
});

export const getJournalsQuery = () => ({
  queryKey: ["journals"],
  queryFn: () => getJournals(),
});

export const getJournalQuery = journalId => ({
  queryKey: ["journal", journalId],
  queryFn: () => getJournal(journalId),
});

export const getRootFilesQuery = () => ({
  queryKey: ["files"],
  queryFn: () => getRootFolder(),
});

export const getFolderQuery = folderId => ({
  queryKey: ["folder", folderId],
  queryFn: () => getFolder(folderId),
});
