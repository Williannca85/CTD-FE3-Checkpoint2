
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainRoutes } from "./Components/MainRoutes";
import { ThemeProvider } from "./hooks/useTheme";
import { TokenProvider } from "./hooks/useToken";
import Detail from "./Routes/Detail";
import Home from "./Routes/Home";
import Contact from "./Routes/Login";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: '',
      element: <MainRoutes />,
      children: [
        {
          path: '',
          element: <Home />
        },
        {
          path: 'home',
          element: <Home />
        },
        {
          path: 'contact',
          element: <Contact />
        },
        {
          path: '/dentista/:id',
          element: <Detail />
        }
      ]
    }
  ])

  return (
    <ThemeProvider>
      <TokenProvider>
        <RouterProvider router={appRouter} />
      </TokenProvider>
    </ThemeProvider>


  );
}

export default App;
