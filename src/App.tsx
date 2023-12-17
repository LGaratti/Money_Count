import { ChakraProvider } from "@chakra-ui/react";
import { I18nextProvider } from "react-i18next";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import i18n from "./locales/i18n";
import DemoPage from "./pages/DemoPage";
import ErrorPage from "./pages/ErrorPage";
import Homepage from "./pages/Homepage";
import theme from "./styles/theme";
import '@fontsource-variable/outfit';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/demo",
        element: <DemoPage />,
      },
    ],
  },
]);

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </I18nextProvider>
  );
}

export default App;
