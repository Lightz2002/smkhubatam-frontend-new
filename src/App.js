import { RouterProvider } from "react-router-dom";
import router, { queryClient } from "./router";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { UserProvider } from "./contexts/UserContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import "react-loading-skeleton/dist/skeleton.css";

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
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
        <ReactQueryDevtools position="bottom-right" />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
