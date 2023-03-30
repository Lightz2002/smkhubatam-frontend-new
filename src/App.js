import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { UserProvider } from "./contexts/UserContext";

function App() {
  const theme = createTheme({
    palette: {
      bg: {
        main: "#f1f7fd",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <RouterProvider router={router}></RouterProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
