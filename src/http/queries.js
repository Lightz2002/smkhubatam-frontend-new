import {
  getInternship,
  getInternships,
  getLocation,
  getLocations,
  getMajors,
  getRoleMenu,
  getRoles,
  getSchoolClass,
  getSchoolClasses,
  getUser,
  getUsers,
  profile,
} from "./api";

export const profileQuery = () => ({
  queryKey: ["user"],
  queryFn: () => profile(),
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
