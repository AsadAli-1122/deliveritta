# React + Vite with Tailwind CSS

This project demonstrates how to set up a React application using Vite as the build tool and Tailwind CSS for styling.

## Getting Started

Follow these steps to create and set up your React project with Vite and Tailwind CSS:

#### 1.Create a new Vite project with the React template:

```bash
yarn create vite my-project --template react
cd my-project
yarn
```

   
OR

If you want to create the project in the current directory, use:

```
yarn create vite . --template react
yarn
```
#### 2.Update the `vite.config.js` file with the following configuration to specify the server port:

```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3030,
  },
})

```
#### 3.Start the development server:
```
yarn dev
```
#### 4.Add Tailwind CSS and related dependencies to your project:
```
yarn add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### 5.In your `tailwind.config.js` file, configure the content and any additional customizations:
```
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

#### 6.Update CSS file (`index.css`) to include the Tailwind CSS styles:
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```
#### 7.In your React component (e.g., `src/App.jsx`), use Tailwind CSS classes to style your elements:
```
import React from "react";
import "./App.css";

function App() {
  return (
    <>
      <h1 className="text-center text-3xl font-bold underline">
        Hello world!
      </h1>
    </>
  );
}

export default App;


```
### Usage
You can now start building your React application with Vite and leverage the power of Tailwind CSS for styling.


#



# Project Setup with React Router

#### 1. Install React Router


First, install `react-router-dom` in your project:
```
yarn add react-router-dom
```
#### 2. Create Pages

Create individual pages for your application. Here's how to create some basic pages:

`src/pages/Home.jsx`
```
import React from 'react';

const Home = () => {
  return (
    <div>Home</div>
  );
}

export default Home;

```
`src/pages/About.jsx`
```
import React from 'react';

const About = () => {
  return (
    <div>About</div>
  );
}

export default About;
```
`src/pages/ContactUs.jsx`
```
import React from 'react';

const ContactUs = () => {
  return (
    <div>ContactUs</div>
  );
}

export default ContactUs;
```
`src/pages/404.jsx`
```
import React from 'react';

const PageNotFound = () => {
  return (
    <div>PageNotFound</div>
  );
}

export default PageNotFound;
```
#### 3. Create a Header Component

Create a common header component for navigation. Here's how to create it:

`src/components/common/Header.jsx`
```
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <Link to='/'>Home</Link>
      <Link to='/about'>About</Link>
      <Link to='/contact-us'>Contact</Link>
    </>
  );
}

export default Header;
```
#### 4. Create a Layout Component

Create a basic layout component that includes the header and content. Here's how to create it:

`src/components/layout/Layout.jsx`
```
import React from 'react';
import Header from '../common/Header';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default Layout;
```
#### 5. Define Routes

Define your application's routes and their corresponding components. Here's how to define the routes:

`src/Navigation.jsx`
```
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import PageNotFound from './pages/404';
import Layout from './components/layout/Layout';

const Navigation = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout><Home /></Layout>} />
        <Route path='/about' element={<Layout><About /></Layout>} />
        <Route path='/contact-us' element={<Layout><ContactUs /></Layout>} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default Navigation;

```

#### 6. Configure `main.jsx`
Finally, configure your `main.jsx` file to import `BrowserRouter` and wrap your `Navigation` component within it.

`main.jsx`
```
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./Navigation.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  </React.StrictMode>
);

```

With these steps, you've set up a basic React application with routing using React Router. You have created pages, a common header component, a layout component, defined routes, and configured the application's entry point.

#

# Public and Private Routes

#### 1. Create Additional Pages

Create additional pages for authentication and dashboard:



`src/pages/auth/Login.jsx`
```
import React from 'react';

const Login = () => {
  return (
    <div>Login</div>
  );
}

export default Login;
```
`src/pages/admin/Dashboard.jsx`
```
import React from 'react';

const Dashboard = () => {
  return (
    <div>Dashboard</div>
  );
}

export default Dashboard;

```

#### 2. Create an Auth Context

Create an `AuthContext` that will manage the authentication state:

`src/context/AuthContext.jsx`
```
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const value = {
    isLoggedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

```
#### 3. Create Public and Private Routes

Create two route components: `PublicRoutes` and `PrivateRoutes`:

`src/routes/Public.jsx`
```
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoutes = () => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Outlet />;
  } else {
    return <Navigate to='/admin/dashboard' />;
  }
}

export default PublicRoutes;

```
`src/routes/Private.jsx`
```
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoutes = () => {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) {
    return <Outlet />;
  } else {
    return <Navigate to='/login' />;
  }
}

export default PrivateRoutes;
```
#### 4. Modify `main.jsx`

Modify the `main.jsx` file to include the `AuthProvider` and wrap the `Navigation` component with `BrowserRouter`.

`main.jsx`
```
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./Navigation.jsx";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);


```

#### 5. Update Header Component
Modify the `Header` component to include links to the new login and dashboard pages:

`src/components/common/Header.jsx`
```
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <Link to='/'>Home</Link>
      <Link to='/about'>About</Link>
      <Link to='/contact-us'>Contact</Link>
      <Link to='/login'>Login</Link>
      <Link to='/admin/dashboard'>Dashboard</Link>
    </>
  );
}

export default Header;

```

`src/Navigation.jsx`
```
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import PageNotFound from './pages/404';
import Layout from './components/layout/Layout';
import PublicRoutes from './routes/Public';
import Login from './pages/auth/Login';
import PrivateRoutes from './routes/Private';
import Dashboard from './pages/admin/dashboard';

const Navigation = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Layout><Home /></Layout>}/>
        <Route path='/about' element={<Layout><About /></Layout>}/>
        <Route path='/contact-us' element={<Layout><ContactUs /></Layout>}/>
        <Route path="/" element={<PublicRoutes />}>
        <Route path="login" element={<Login />} />
      </Route>
      <Route path="/admin" element={<PrivateRoutes />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
        <Route path='/*' element={<PageNotFound />}/>
    </Routes>
    </>
  )
}

export default Navigation;

```


#### 6. Testing Public and Private Routes

You can test your public and private routes by changing the `isLoggedIn` state in `AuthContext.jsx`. When `isLoggedIn` is `false`, you can visit the login page but can't visit the dashboard page. When `isLoggedIn` is `true`, you can visit the dashboard page but can't visit the login page or other public routes. This demonstrates how public and private routes work in your application.

Public routes are accessible to all users, while private routes are only accessible to logged-in users. This provides a simple yet effective way to control access to different parts of your application based on user authentication status.

This setup allows you to build authentication and authorization features within your React application easily.

# 

# Project with Day/Night Mode Switcher

This project demonstrates how to create a React application with Material-UI (MUI) for your UI components and Tailwind CSS for styling. It includes a day/night mode switcher that allows users to toggle between light and dark themes.

#### Getting Started

Follow these steps to set up your project with Material-UI, Tailwind CSS, and the day/night mode switcher:

#### 1.Install Material-UI and related dependencies:
```
yarn add @mui/material @emotion/react @emotion/styled
yarn add @mui/styled-engine-sc styled-components
yarn add @mui/icons-material
```

#### 2.Update your tailwind.config.js file to configure Tailwind CSS:
```
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

#### 3.Create a Day/Night Mode Switcher

`src/components/common/ThemeSwitcher.jsx`
```
import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 10,
  paddingLeft: 7,
  paddingRight: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

const ThemeSwitcher = () => {
  const [theme, setTheme] = React.useState(() => {
    const savedTheme = localStorage.getItem("custom-theme");
    if (savedTheme) {
      return savedTheme;
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    } else {
      return "light";
    }
  });

  const [isChecked, setIsChecked] = React.useState(theme === 'dark');

  React.useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setIsChecked(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsChecked(false);
    }
  }, [theme]);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const updateTheme = (event) => {
      if (event.matches) {
        setTheme("dark");
        setIsChecked(true);
      } else {
        setTheme("light");
        setIsChecked(false);
      }
    };

    mediaQuery.addListener(updateTheme);
    return () => {
      mediaQuery.removeListener(updateTheme);
    };
  }, []);

  const handleThemeSwitcher = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("custom-theme", newTheme);
    setIsChecked(newTheme === 'dark');
  };

  return (
    <div>
      <FormControlLabel
        onClick={handleThemeSwitcher}
        control={<MaterialUISwitch sx={{ m: 1 }} checked={isChecked} />}
      />
    </div>
  );
};

export default ThemeSwitcher;
```

#### 4.Update Header and Footer for Day/Night Mode

`src/components/common/Header.jsx`
```
import React from "react";
import { NavLink } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <div className="bg-white dark:bg-gray-900">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-2 lg:py-2 flex justify-between items-center">
          <div className="mb-0">
            <NavLink to="https://flowbite.com/" className="flex items-center">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-8 mr-3"
                alt="FlowBite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Flowbite
              </span>
            </NavLink>
          </div>
          <div class="hidden justify-between items-center w-full lg:flex lg:w-auto">
            <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "font-bold dark:text-gray-300" : "dark:text-gray-400"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "font-bold dark:text-gray-300" : "dark:text-gray-400"
                  }
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact-us"
                  className={({ isActive }) =>
                    isActive ? "font-bold dark:text-gray-300" : "dark:text-gray-400"
                  }
                >
                  Contact Us
                </NavLink>
              </li>
              {!isLoggedIn && (
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                    isActive ? "font-bold dark:text-gray-300" : "dark:text-gray-400"
                  }
                  >
                    Login
                  </NavLink>
                </li>
              )}
              {isLoggedIn && (
                <li>
                  <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) =>
                    isActive ? "font-bold dark:text-gray-300" : "dark:text-gray-400"
                  }
                  >
                    Dashboard
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
          <div>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
```

`src/components/common/Footer.jsx`

```
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="bg-white dark:bg-gray-900">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <Link to="https://flowbite.com/" className="flex items-center">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-8 mr-3"
                  alt="FlowBite Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  Flowbite
                </span>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Resources
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <Link
                      to="https://flowbite.com/"
                      className="hover:underline"
                    >
                      Flowbite
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://tailwindcss.com/"
                      className="hover:underline"
                    >
                      Tailwind CSS
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Follow us
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <Link
                      to="https://github.com/themesberg/flowbite"
                      className="hover:underline "
                    >
                      Github
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://discord.gg/4eeurUVvTy"
                      className="hover:underline"
                    >
                      Discord
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Legal
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <Link to="/" className="hover:underline">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="hover:underline">
                      Terms &amp; Conditions
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2023{" "}
              <Link to="https://flowbite.com/" className="hover:underline">
                Flowbite™
              </Link>
              . All Rights Reserved.
            </span>
            <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
              <Link
                to="/"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 8 19"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Facebook page</span>
              </Link>
              <Link
                to="/"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 21 16"
                >
                  <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
                </svg>
                <span className="sr-only">Discord community</span>
              </Link>
              <Link
                to="/"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 17"
                >
                  <path
                    fillRule="evenodd"
                    d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Twitter page</span>
              </Link>
              <Link
                to="/"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">GitHub account</span>
              </Link>
              <Link
                to="/"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Dribbble account</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
```

#### Define `Footer.jsx` in layout 

`src/components/layout/Layout.jsx`
```
import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
```

#### Usage

Start your project, and use the day/night mode switcher to toggle between light and dark themes.


#



# Internationalization (i18n) Setup in React

Internationalization (i18n) allows you to create a multilingual React application. You've set up i18n using the i18next library. This guide will show you how to use this i18n configuration in your project for translating your application into different languages.

#### 1: Install Dependencies

First, make sure you've installed the necessary dependencies:
```
yarn add react-i18next i18next i18next-http-backend i18next-browser-languagedetector flag-icons
```

#### 2: Initialize i18n
Create an `i18.jsx` file in your project's src directory to initialize the i18n settings. Here's an example of what this file should look like:

`src/i18n.jsx`

```
import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    },
    backend: {
      loadPath: "/src/locales/{{lng}}/translation.json",
    },
    react: {
      useSuspense: false,
    }
  });

export default i18n;

```
This initializes the i18n settings, including the ability to detect the user's browser language.

####  3: Import i18n and Flag Icons 

`src/main.jsx`

```
import React from "react";
import ReactDOM from "react-dom/client";
import "./i18n"; // Import your i18n setup
import "./index.css";
import "./App.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";
// ... (other imports)


```



#### 4: Create and Implement Language Switcher

You can create a language switcher component `LanguageSwitcher.jsx` to allow users to change the language. Include this component in your application. Here's an example:

`src/components/common/LanguageSwitcher.jsx`
```
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { label: "English", value: "en", flag: "fi fi-us" },
  { label: "Español", value: "es", flag: "fi fi-es" },
  { label: "اردو", value: "ur", flag: "fi fi-pk" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg border border-gray-400 dark:border-gray-600"
        onClick={toggleDropdown}
      >
        {languages.find((lang) => lang.value === i18n.language)?.label}
      </button>
      {isOpen && (
        <ul className="absolute mt-2 space-y-1 right-0 bg-white dark:bg-gray-900 dark:border dark:border-gray-600 w-36 rounded-lg shadow-lg">
          {languages.map((lang) => (
            <li key={lang.value}>
              <button
                onClick={() => handleLanguageChange(lang.value)}
                className={`flex items-center justify-between w-full px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 ${
                  lang.value === i18n.language ? "bg-gray-300 dark:bg-gray-700" : ""
                } ${lang === languages[0] ? "rounded-t-lg" : ""} ${
                  lang === languages[languages.length - 1] ? "rounded-b-lg" : ""
                }`}
              >
                <span className={`${lang.flag}`}></span> <span>{lang.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
```

This component will allow users to switch between languages.


#### 5: Define Translations

Provide translations for different languages. Store these translations in separate JSON files in the `src/locales` directory. Here are examples for `English`, `Spanish`, and `Urdu`:

`src/locales/en/translation.json`
```
{
    "home": "Home",
    "about": "About Us",
    "contact": "Contact Us",
    "login": "Login",
    "dashboard": "Dashboard",
    "resources" : "RESOURCES",
    "flowbite" : "Flowbite",
    "tailwind_css" : "Tailwind CSS",
    "follow_us" : "FOLLOW US",
    "github" : "Github",
    "discord" : "Discord",
    "legal" : "LEGAL",
    "privacy_policy" : "Privacy Policy",
    "term&conditions" : "Terms & Conditions",
    "footer": {
        "all_right_reserverd": "2023 Flowbite™. All Rights Reserved."
    }
  }

```


`src/locales/es/translation.json`
```
{
  "home": "Inicio",
  "about": "Acerca de nosotros",
  "contact": "Contáctenos",
  "login": "Iniciar sesión",
  "dashboard": "Tablero",
  "resources" : "RECURSOS",
  "flowbite" : "Flowbite",
  "tailwind_css" : "Tailwind CSS",
  "follow_us" : "SÍGUENOS",
  "github" : "Github",
  "discord" : "Discord",
  "legal" : "LEGAL",
  "privacy_policy" : "Política de privacidad",
  "term&conditions" : "Términos y condiciones",
  "footer": {
      "all_right_reserverd": "2023 Flowbite™. Todos los derechos reservados."
  }
}
```

`src/locales/ur/translation.json`
```
{
  "home": "ہوم",
  "about": "ہمارے بارے میں",
  "contact": "ہم سے رابطہ کریں",
  "login": "لاگ ان کریں",
  "dashboard": "ڈیش بورڈ",
  "resources" : "وسائل",
  "flowbite" : "فلو بائٹ",
  "tailwind_css" : "ٹیل وائنڈ سی ایس ایس",
  "follow_us" : "ہمیں پیروی کریں",
  "github" : "گِٹ ہب",
  "discord" : "ڈسکورڈ",
  "legal" : "قانونی",
  "privacy_policy" : "رازداری کی پالیسی",
  "term&conditions" : "شرائط و ضوابط",
  "footer": {
      "all_right_reserverd": "2023 Flowbite™. تمام حقوق محفوظ ہیں۔"
  }
}
```
You can add translations for each language in their respective JSON files.


6: Update Header and Footer

Update your header and footer components (`Header.jsx` and `Footer.jsx`) to include translations. For instance, replace static text with translated strings using the `useTranslation` hook.

`src/components/common/Header.jsx`
```
import React from "react";
import { NavLink } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
  const { isLoggedIn } = useAuth();

  return (
    <>
      <div className="bg-white dark:bg-gray-900">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-2 lg:py-2 flex justify-between items-center dark:text-white">
          <div className="mb-0">
            <NavLink to="https://flowbite.com/" className="flex items-center">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-8 mr-3"
                alt="FlowBite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                {t("flowbite")}
              </span>
            </NavLink>
          </div>
          <div class="hidden justify-between items-center w-full lg:flex lg:w-auto">
            <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold dark:text-gray-300"
                      : "dark:text-gray-400"
                  }
                >
                  {t("home")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold dark:text-gray-300"
                      : "dark:text-gray-400"
                  }
                >
                  {t("about")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact-us"
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold dark:text-gray-300"
                      : "dark:text-gray-400"
                  }
                >
                  {t("contact")}
                </NavLink>
              </li>
              {!isLoggedIn && (
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "font-bold dark:text-gray-300"
                        : "dark:text-gray-400"
                    }
                  >
                    {t("login")}
                  </NavLink>
                </li>
              )}
              {isLoggedIn && (
                <li>
                  <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) =>
                      isActive
                        ? "font-bold dark:text-gray-300"
                        : "dark:text-gray-400"
                    }
                  >
                    {t("dashboard")}
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
          <div className="flex items-center">
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
```


`src/components/common/Footer.jsx`
```
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="bg-white dark:bg-gray-900">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <Link to="https://flowbite.com/" className="flex items-center">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-8 mr-3"
                  alt="FlowBite Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  {t("flowbite")}
                </span>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  {t("resources")}
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <Link
                      to="https://flowbite.com/"
                      className="hover:underline"
                    >
                      {t("flowbite")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://tailwindcss.com/"
                      className="hover:underline"
                    >
                      {t("tailwind_css")}
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  {t("follow_us")}
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <Link
                      to="https://github.com/themesberg/flowbite"
                      className="hover:underline "
                    >
                      {t("github")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://discord.gg/4eeurUVvTy"
                      className="hover:underline"
                    >
                      {t("discord")}
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  {t("legal")}
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <Link to="/" className="hover:underline">
                      {t("privacy_policy")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="hover:underline">
                      {t("term&conditions")}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © {t("footer.all_right_reserverd")}
            </span>
            <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
              <Link
                to="/"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 8 19"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Facebook page</span>
              </Link>
              <Link
                to="/"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 21 16"
                >
                  <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
                </svg>
                <span className="sr-only">Discord community</span>
              </Link>
              <Link
                to="/"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 17"
                >
                  <path
                    fillRule="evenodd"
                    d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Twitter page</span>
              </Link>
              <Link
                to="/"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">GitHub account</span>
              </Link>
              <Link
                to="/"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Dribbble account</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
```

#### Usage

With these steps completed, your React application is now configured for internationalization. Users can switch between languages using the LanguageSwitcher component, and the translated content will be displayed in the Header and Footer components.

Remember to maintain your translation files in the specified directory and ensure that translations are available for the desired languages.

By following these steps, you can create a multilingual React application that provides a better user experience for your international audience.

