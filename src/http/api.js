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
  let response = await client.get("profile", {
    headers: {
      Authorization: getToken(),
    },
  });

  return response;
};

export const login = async credentials => {
  let response = await client.post("auth/login", { ...credentials });

  return response;
};

export const getUser = async userId => {
  let response = await client.get(`/users/${userId}`, {
    headers: {
      Authorization: getToken(),
    },
  });
  return response;
};

export const getUsers = async () => {
  let response = await client.get(`/users`, {
    headers: {
      Authorization: getToken(),
    },
  });
  return response;
};

export const createUser = async credentials => {
  try {
    let response = await client.post(
      "users",
      { ...credentials },
      {
        headers: {
          Authorization: getToken(),
        },
      }
    );
    return response;
  } catch (e) {
    throw e;
  }
};

export const updateUser = async (userId, credentials) => {
  let response = await client.put(
    `users/${userId}`,
    { ...credentials },
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );

  return response;
};

/* Role */

export const getRoles = async () => {
  let response = await client.get(`/roles`, {
    headers: {
      Authorization: getToken(),
    },
  });
  return response;
};

export const getRoleMenu = async roleId => {
  let response = await client.get(`/roles/rolemenu?role=${roleId}`, {
    headers: {
      Authorization: getToken(),
    },
  });
  return response;
};

/* Location */
export const getLocations = async () => {
  let response = await client.get(`/locations`, {
    headers: {
      Authorization: getToken(),
    },
  });
  return response;
};

export const getLocation = async locationId => {
  let response = await client.get(`/locations/${locationId}`, {
    headers: {
      Authorization: getToken(),
    },
  });
  return response;
};

export const createLocation = async credentials => {
  let response = await client.post(
    `/locations`,
    { ...credentials },
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );
  return response;
};

export const updateLocation = async (locationId, credentials) => {
  let response = await client.put(
    `/locations/${locationId}`,
    { ...credentials },
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );
  return response;
};

/* School Class */
export const getSchoolClasses = async () => {
  let response = await client.get(`/schoolclasses`, {
    headers: {
      Authorization: getToken(),
    },
  });
  return response;
};

export const getSchoolClass = async schoolClassId => {
  let response = await client.get(`/schoolclasses/${schoolClassId}`, {
    headers: {
      Authorization: getToken(),
    },
  });
  return response;
};

export const createSchoolClass = async credentials => {
  let response = await client.post(
    `/schoolclasses`,
    { ...credentials },
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );
  return response;
};

export const updateSchoolClass = async (schoolClassId, credentials) => {
  let response = await client.put(
    `/schoolclasses/${schoolClassId}`,
    { ...credentials },
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );
  return response;
};

/* Majors */
export const getMajors = async () => {
  let response = await client.get(`/majors`, {
    headers: {
      Authorization: getToken(),
    },
  });
  return response;
};

export const getMajor = async () => {
  let response = await client.get(`/majors`, {
    headers: {
      Authorization: getToken(),
    },
  });
  return response;
};

export const createMajors = async () => {
  let response = await client.post(`/majors`, {
    headers: {
      Authorization: getToken(),
    },
  });
  return response;
};

/* Internship */
export const getInternships = async () => {
  let response = await client.get(`/internships`, {
    headers: {
      Authorization: getToken(),
    },
  });
  return response;
};

export const getInternship = async internshipId => {
  let response = await client.get(`/internships/${internshipId}`, {
    headers: {
      Authorization: getToken(),
    },
  });
  return response;
};

export const createInternship = async credentials => {
  let response = await client.post(
    `/internships`,
    { ...credentials },
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );
  return response;
};

export const updateInternship = async (internshipId, credentials) => {
  let response = await client.put(
    `/internships/${internshipId}`,
    { ...credentials },
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );
  return response;
};
