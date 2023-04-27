import { purple, red, green, pink, blue } from "@mui/material/colors";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DangerousOutlinedIcon from "@mui/icons-material/DangerousOutlined";
import ApprovalOutlinedIcon from "@mui/icons-material/ApprovalOutlined";
import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function getRandomColor() {
  const randomInt = getRandomInt(5);
  const colorObj = {
    0: purple,
    1: red,
    2: green,
    3: pink,
    4: blue,
  };

  return colorObj[randomInt][500];
}

export function handleException(e) {
  if (e?.code === "ERR_NETWORK") {
    throw new Error("Network error");
  }
}

export function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
export function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

export function getStatusStyle(name) {
  const chipData = {
    icon: "",
    name,
    color: "",
  };

  switch (chipData.name?.toLowerCase()) {
    case "entry":
      chipData.color = "secondary";
      chipData.icon = <AssignmentIndOutlinedIcon />;
      break;
    case "verifying":
      chipData.color = "info";
      chipData.icon = <ApprovalOutlinedIcon />;
      break;
    case "ongoing":
      chipData.color = "warning";
      chipData.icon = <HourglassBottomOutlinedIcon />;
      break;
    case "completed":
      chipData.color = "success";
      chipData.icon = <CheckCircleOutlineIcon />;
      break;
    case "rejected":
      chipData.color = "error";
      chipData.icon = <DangerousOutlinedIcon />;
      break;
    default:
      chipData.color = "error";
      chipData.icon = <DangerousOutlinedIcon />;
      break;
  }

  return chipData;
}
