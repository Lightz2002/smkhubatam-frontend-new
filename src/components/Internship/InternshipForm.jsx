import React, { useEffect, useState } from "react";
import ModalForm from "../global/ModalForm";
import { Autocomplete, Grid, Input, TextField } from "@mui/material";
import { handleException } from "../../utils/helper";
import { getLocationsQuery, getUsersQuery } from "../../http/queries";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createInternship, getUser, updateInternship } from "../../http/api";
import {
  useActionData,
  useLoaderData,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";

// export const loader =
//   queryClient =>
//   async ({ params }) => {
//     try {
//       const usersQuery = getUsersQuery();
//       const users =
//         queryClient.getQueryData(usersQuery.queryKey) ??
//         queryClient.fetchQuery(usersQuery);

//       const locationsQuery = getLocationsQuery();
//       const locations =
//         queryClient.getQueryData(locationsQuery.queryKey) ??
//         queryClient.fetchQuery(locationsQuery);

//       let internship = {};

//       if (params?.internshipId) {
//         const internshipQuery = getInternshipQuery(params.internshipId);
//         internship =
//           queryClient.getQueryData(internshipQuery.queryKey) ??
//           queryClient.fetchQuery(internshipQuery);
//       }

//       return {
//         users,
//         locations,
//         internship,
//       };
//     } catch (e) {
//       handleException(e);
//       return e;
//     }
//   };

export const action =
  queryClient =>
  async ({ request, params }) => {
    const errors = {};
    try {
      const formData = await request.formData();
      const internships = Object.fromEntries(formData);

      let response = {};
      if (params?.internshipId) {
        response = await updateInternship(params.internshipId, internships);
        queryClient.invalidateQueries("internship", params.internshipId);
      } else {
        response = await createInternship(internships);
      }

      return response;
    } catch (e) {
      handleException(e);
      return errors;
    }
  };

const InternshipForm = () => {
  const actionResponse = useActionData();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useOutletContext();
  const { data: users } = useQuery(getUsersQuery());
  const { data: locations } = useQuery(getLocationsQuery());
  const [student, setStudent] = useState("");
  const [studentInputValue, setStudentInputValue] = useState("");
  const [fieldMentor, setFieldMentor] = useState("");
  const [fieldMentorInputValue, setFieldMentorInputValue] = useState("");
  const [schoolMentor, setSchoolMentor] = useState("");
  const [schoolMentorInputValue, setSchoolMentorInputValue] = useState("");
  const [location, setLocation] = useState("");
  const [locationInputValue, setLocationInputValue] = useState("");
  const [students, setStudents] = useState([]);
  const [fieldMentors, setFieldMentors] = useState([]);
  const [schoolMentors, setSchoolMentors] = useState([]);
  const [comboIsLoading, setComboIsLoading] = useState(true);
  const [year, setYear] = useState();
  const { internship } = useLoaderData();
  const params = useParams();
  let defaultModalData = {
    closeNavigation: "/internship",
    title: "Create Internship",
    formAction: "/internship/add",
  };
  const [modalData, setModalData] = useState(defaultModalData);

  useEffect(() => {
    if (users?.status === 200) {
      const tmpStudents = [];
      const tmpFieldMentors = [];
      const tmpSchoolMentors = [];

      users.data.forEach(user => {
        switch (user?.Role?.Name?.toLowerCase()) {
          case "student":
            tmpStudents.push(user);
            break;
          case "field mentor":
            tmpFieldMentors.push(user);
            break;
          case "school mentor":
            tmpSchoolMentors.push(user);
            break;
          default:
            break;
        }
      });

      if (tmpStudents.length > 0) {
        setStudents(tmpStudents);
      }

      if (tmpFieldMentors.length > 0) {
        setFieldMentors(tmpFieldMentors);
      }

      if (tmpSchoolMentors.length > 0) {
        setSchoolMentors(tmpSchoolMentors);
      }

      setComboIsLoading(false);
    }
  }, [users]);

  useEffect(() => {
    if (actionResponse?.status === 201 || actionResponse?.status === 200) {
      queryClient.invalidateQueries("internships");
      navigate("/internship");
      setOpenAlert(true);
    }
  }, [actionResponse]);

  useEffect(() => {
    async function fillEditData() {
      if (internship?.data) {
        let internData = await internship;
        internData = internData?.data;
        setYear(internData?.Year);
        setStudent(internData?.Student);
        setFieldMentor(internData?.FieldMentor);
        setSchoolMentor(internData?.SchoolMentor);
        setLocation(internData?.Location);
        setModalData({
          closeNavigation: `/internship/${params.internshipId}`,
          formAction: `/internship/${params.internshipId}/edit`,
          title: "Edit Internship",
        });
      }
    }

    fillEditData();
    return () => {
      setYear("");
      setStudent("");
      setFieldMentor("");
      setSchoolMentor("");
      setLocation("");
      setModalData(defaultModalData);
    };
  }, [internship]);

  if (comboIsLoading) {
    return;
  }

  return (
    <ModalForm
      closeNavigation={modalData.closeNavigation}
      title={modalData.title}
      formAction={modalData.formAction}
    >
      <Grid container>
        <Grid item xs={12}>
          <Autocomplete
            value={student}
            name="Student"
            onChange={(event, newValue) => {
              setStudent(newValue);
            }}
            inputValue={studentInputValue}
            onInputChange={(event, newInputValue) => {
              setStudentInputValue(newInputValue);
            }}
            isOptionEqualToValue={option => option.Id === student?.Id}
            id="controllable-states-demo"
            options={students ?? []}
            getOptionLabel={option => option?.Name ?? ""}
            renderInput={params => <TextField {...params} label="Student" />}
            fullWidth
            sx={{
              pt: 1,
            }}
          />
          <Input
            name="Student"
            type="hidden"
            value={student?.Id ?? ""}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            value={fieldMentor}
            name="FieldMentor"
            onChange={(event, newValue) => {
              setFieldMentor(newValue);
            }}
            inputValue={fieldMentorInputValue}
            onInputChange={(event, newInputValue) => {
              setFieldMentorInputValue(newInputValue);
            }}
            isOptionEqualToValue={option => option?.Id === fieldMentor?.Id}
            id="controllable-states-demo"
            options={fieldMentors ?? []}
            getOptionLabel={option => option?.Name ?? ""}
            renderInput={params => (
              <TextField {...params} label="Field Mentor" />
            )}
          />
          <Input
            name="FieldMentor"
            type="hidden"
            value={fieldMentor?.Id ?? ""}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            value={schoolMentor}
            name="SchoolMentor"
            onChange={(event, newValue) => {
              setSchoolMentor(newValue);
            }}
            inputValue={schoolMentorInputValue}
            onInputChange={(event, newInputValue) => {
              setSchoolMentorInputValue(newInputValue);
            }}
            isOptionEqualToValue={option => option?.Id === schoolMentor?.Id}
            id="controllable-states-demo"
            options={schoolMentors ?? []}
            getOptionLabel={option => option?.Name ?? ""}
            renderInput={params => (
              <TextField {...params} label="School Mentor" />
            )}
            fullWidth
          />
          <Input
            name="SchoolMentor"
            type="hidden"
            value={schoolMentor?.Id ?? ""}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            value={location}
            name="Locations"
            onChange={(event, newValue) => {
              setLocation(newValue);
            }}
            inputValue={locationInputValue}
            onInputChange={(event, newInputValue) => {
              setLocationInputValue(newInputValue);
            }}
            isOptionEqualToValue={option => option?.Id === location?.Id}
            id="controllable-states-demo"
            options={locations?.data ?? []}
            getOptionLabel={option => option?.Name ?? ""}
            renderInput={params => <TextField {...params} label="Locations" />}
            fullWidth
          />
          <Input name="Location" type="hidden" value={location?.Id ?? ""} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            margin="dense"
            id="Year"
            label="Year"
            name="Year"
            fullWidth
            variant="outlined"
            type="number"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            onChange={e => setYear(e.target.value)}
            value={year}
          />
        </Grid>
      </Grid>
    </ModalForm>
  );
};

export default InternshipForm;
