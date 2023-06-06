import axios from "axios";
import { redirect } from "react-router-dom";

function getToken() {
  return localStorage.getItem("token")
    ? "Bearer " + localStorage.getItem("token")
    : null;
}

const client = axios.create({
  baseURL: "http://localhost:3030",
});

export const profile = async () => {
  return await client.get("profile", {
    headers: {
      Authorization: getToken(),
    },
  });
};

export const login = async credentials => {
  return await client.post("auth/login", { ...credentials });
};

export const getUser = async userId => {
  return await client.get(`/users/${userId}`, {
    headers: {
      Authorization: getToken(),
    },
  });
};

export const getUsers = async () => {
  return await client.get(`/users`, {
    headers: {
      Authorization: getToken(),
    },
  });
};

export const createUser = async credentials => {
  try {
    return await client.post(
      "users",
      { ...credentials },
      {
        headers: {
          Authorization: getToken(),
        },
      }
    );
  } catch (e) {
    throw e;
  }
};

export const updateUser = async (userId, credentials) => {
  return await client.put(
    `users/${userId}`,
    { ...credentials },
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );
};

/* Role */

export const getRoles = async () => {
  return await client.get(`/roles`, {
    headers: {
      Authorization: getToken(),
    },
  });
};

export const getRoleMenu = async roleId => {
  return await client.get(`/roles/rolemenu?role=${roleId}`, {
    headers: {
      Authorization: getToken(),
    },
  });
};

/* Location */
export const getLocations = async () => {
  return await client.get(`/locations`, {
    headers: {
      Authorization: getToken(),
    },
  });
};

export const getLocation = async locationId => {
  return await client.get(`/locations/${locationId}`, {
    headers: {
      Authorization: getToken(),
    },
  });
};

export const createLocation = async credentials => {
  return await client.post(
    `/locations`,
    { ...credentials },
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );
};

export const updateLocation = async (locationId, credentials) => {
  return await client.put(
    `/locations/${locationId}`,
    { ...credentials },
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );
};

/* School Class */
export const getSchoolClasses = async () => {
  return await client.get(`/schoolclasses`, {
    headers: {
      Authorization: getToken(),
    },
  });
};

export const getSchoolClass = async schoolClassId => {
  return await client.get(`/schoolclasses/${schoolClassId}`, {
    headers: {
      Authorization: getToken(),
    },
  });
};

export const createSchoolClass = async credentials => {
  return await client.post(
    `/schoolclasses`,
    { ...credentials },
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );
};

export const updateSchoolClass = async (schoolClassId, credentials) => {
  return await client.put(
    `/schoolclasses/${schoolClassId}`,
    { ...credentials },
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );
};

/* Majors */
export const getMajors = async () => {
  return await client.get(`/majors`, {
    headers: {
      Authorization: getToken(),
    },
  });
};

export const getMajor = async () => {
  return await client.get(`/majors`, {
    headers: {
      Authorization: getToken(),
    },
  });
};

export const createMajors = async () => {
  return await client.post(`/majors`, {
    headers: {
      Authorization: getToken(),
    },
  });
};

/* Status */
export const getStatus = async () => {
  return await client.get(`/status`, {
    headers: {
      Authorization: getToken(),
    },
  });
};

/* Internship */
export const getInternships = async () => {
  return await client.get(`/internships`, {
    headers: {
      Authorization: getToken(),
    },
  });
};

export const getInternship = async internshipId => {
  return await client.get(`/internships/${internshipId}`, {
    headers: {
      Authorization: getToken(),
    },
  });
};

export const createInternship = async credentials => {
  return await client.post(
    `/internships`,
    { ...credentials },
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );
};

export const updateInternship = async (internshipId, credentials) => {
  return await client.put(
    `/internships/${internshipId}`,
    { ...credentials },
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );
};

export const updateInternshipStatus = async (internshipId, credentials) => {
  return await client.put(
    `/internships/${internshipId}/status`,
    { ...credentials },
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );
};

/* Journal */
export const getJournals = async () => {
  return await client.get(`/journals`, {
    headers: {
      Authorization: getToken(),
    },
  });
};

export const getJournal = async journalId => {
  return await client.get(`/journals/${journalId}`, {
    headers: {
      Authorization: getToken(),
    },
  });
};

export const createJournal = async credentials => {
  return await client.post(
    `/journals`,
    { ...credentials },
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );
};

export const updateJournal = async (journalId, credentials) => {
  return await client.put(
    `/journals/${journalId}`,
    { ...credentials },
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );
};

export const updateJournalStatus = async (journalId, credentials) => {
  return await client.put(
    `/journals/${journalId}/status`,
    { ...credentials },
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );
};

/* Files */
export const getRootFolder = async () => {
  return await client.get(`/folder/root`, {
    headers: {
      Authorization: getToken(),
    },
  });
};

export const getFolder = async folderId => {
  return await client.get(`/folder/${folderId}`, {
    headers: {
      Authorization: getToken(),
    },
  });
};

export const createFolder = async credentials => {
  return await client.post(
    `/folder`,
    { ...credentials },
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );
};
