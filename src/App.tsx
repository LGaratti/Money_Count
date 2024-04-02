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
import { ModalProvider } from "./utils/ModalContext";

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
        <ModalProvider>
          <RouterProvider router={router} />
        </ModalProvider>
      </ChakraProvider>
    </I18nextProvider>
  );
}

export default App;
