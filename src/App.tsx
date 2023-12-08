import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ErrorPage from "./pages/ErrorPage";
import Components from "./pages/Components";
import Layout from "./components/layout/Layout";
import { I18nextProvider } from "react-i18next";
import i18n from "./locales/i18n";
import { useEffect, useReducer } from "react";
import { getOpsFromServer } from "./utils/supabaseClient";
import { operationArrayReducer } from "./utils/OperationArrayReducer";
// import { OperationsAction } from '../interfaces/OperationTypes';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Homepage/>,
      },
      {
        path: "/components",
        element: <Components/>,
      },
    ]
  },
]);

// VERA qua reinderizza alle varie pagine, log ecc+++
function App() {

  const [operationArray, dispatch] = useReducer(operationArrayReducer, []);

  // Hook per ricevere l'array dal server
  useEffect(() => { 
    getOpsFromServer(dispatch);
    // recvOpArrayFromServer(setServerOpArray, dispatch, dispatchActive, dispatchInactive);
  },[]);

  return (
    <I18nextProvider i18n={i18n}>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </I18nextProvider>
  );
}

export default App;
