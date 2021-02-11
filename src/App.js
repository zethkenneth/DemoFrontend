import React,{ useState } from "react";
import Homepage1 from './components/homepage/Homepage';

import {
  Link,
  useLocation,
  Outlet,
  useRoutes,
  matchRoutes,
  useResolvedLocation,
} from "react-router-dom";


function NavLink({
  to,
  exact,
  className,
  activeClassName,
  inactiveClassName,
  ...rest
}) {
  let location = useLocation();
  let resolvedLocation = useResolvedLocation(to);
  let routeMatches = matchRoutes(routes, location);

  let isActive;
  if (exact) {
    isActive = location.pathname === resolvedLocation.pathname;
  } else {
    isActive = routeMatches.some(
      (match) => match.pathname === resolvedLocation.pathname
    );
  }

  let allClassNames =
    className + (isActive ? ` ${activeClassName}` : ` ${inactiveClassName}`);

  return <Link className={allClassNames} to={to} {...rest} />;
}

const setAuth = boolean => {
  GlobalVariables.isAuthenticated = boolean;
};

const GlobalVariables = {
  Logged: false,
  isAuthenticated: false
}

const IsLogged = () =>{
  GlobalVariables.Logged = !GlobalVariables.Logged;
}


const checkAuthenticated = async () => {
  try {
    const res = await fetch("http://localhost:5000/auth/verify", {
      method: "POST",
      headers: { jwt_token: localStorage.token }
    });

    const parseRes = await res.json();

    parseRes === true ? GlobalVariables.Logged = true : GlobalVariables.Logged = false;
  } catch (err) {
    console.error(err.message);
  }
}

const routes = [
  {
    path: "/", 
    element: <p>
        <Homepage1 />
    </p>
  },
  {
    path: "/login", 
    element: <Login />
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { 
        path: "/", 
        element: <p>Overview</p> 
      },
      { 
        path: "/new-users", 
        element:<p>New users </p>
      },
      { 
        path: "/sales", 
        element: <p>Sales</p> 
      },
    ],
  },
  { 
    path: "/transactions", 
    element: <Transactions /> 
  },
  { 
    path: "/records", 
    element: <Records />,
    children: [
      {
        path: "/", 
        element: <p>Overview</p> 
      },
      {
        path: "/students", 
        element: <Students/>
      },
      {
        path: "/employees", 
        element: <Employee/>

      },
      {
        path: "/patients", 
        element: <Patients/>
      }
    ] 
  },
  { 
    path: "/inventory", 
    element: <Inventory />,
    children: [
      { 
        path: "/", 
        element: <p>Overview</p> 
      },
      { 
        path: "/stocks", 
        element: <Stocks/>
      },      
      { 
        path: "/medicines", 
        element: <Medicine/>
      }
    ]
  },
  { 
    path: "/settings", 
    element: <Settings />,
    children: [
      { 
        path: "/", 
        element: <p>Overview</p> },
      { 
        path: "/accounts", 
        element: <Accountss /> 
      },
      { 
        path: "/departments", 
        element: <Departmentss /> 
      },
      { 
        path: "/courses", 
        element: <Coursess/> 
      },
      { path: "/units", 
        element: <Unitss/> 
      },
      { 
        path: "/accountlogs", 
        element: <Accountlogss/> 
      },
      { 
        path: "/medicinelogs", 
        element: <Medicinelogss/>
      },
    ] 
  },
];
 
export default function App() {
 
  const [Logged, setLogged] = useState(false);

  const onLogged = () => {
    GlobalVariables.Logged = !GlobalVariables.Logged;
  };

  let element = useRoutes(routes);
  
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b border-gray-200 mb-0">
        <div className=" max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
           
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <div className="lg:block h-8 w-auto ">
                    <NavLink
                      className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-lg font-medium leading-5  transition duration-150 ease-in-out"
                      to="/"
                    > 
                      WMSU Health Services
                    </NavLink>
                  </div>
                </div>
                {GlobalVariables.Logged ? 
             <div className="hidden sm:-my-px sm:ml-6 sm:flex space-x-8">
                <NavLink
                  activeClassName="border-indigo-500 text-gray-900"
                  inactiveClassName="text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5  transition duration-150 ease-in-out"
                  to="/dashboard"  
                >
                  Dashboard
                </NavLink>
                <NavLink
                  activeClassName="border-indigo-500 text-gray-900"
                  inactiveClassName="text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5  transition duration-150 ease-in-out"
                  to="/transactions"
                >
                  Transactions
                </NavLink>
                <NavLink
                  activeClassName="border-indigo-500 text-gray-900"
                  inactiveClassName="text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5  transition duration-150 ease-in-out"
                  to="/records"
                >
                  Records
                </NavLink>
                <NavLink
                  activeClassName="border-indigo-500 text-gray-900"
                  inactiveClassName="text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5  transition duration-150 ease-in-out"
                  to="/inventory"
                >
                  Inventory
                </NavLink>
                  <NavLink
                    activeClassName="border-indigo-500 text-gray-900"
                    inactiveClassName="text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5  transition duration-150 ease-in-out"
                    to="/settings"
                >
                    Settings
                </NavLink>
                <NavLink
                  activeClassName="border-indigo-500 text-gray-900"
                  inactiveClassName="text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5  transition duration-150 ease-in-out"
                      to="/" onClick={onLogged}
                >
                  Logout
                </NavLink> 
                  </div>
                  
                
                  :  
                <div className="hidden sm:-my-px sm:ml-6 sm:flex space-x-8">
                      <NavLink
                      activeClassName="border-indigo-500 text-gray-900"
                      inactiveClassName="text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      className="inline-flex  items-center  px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5  transition duration-150 ease-in-out"
                      to="/login" 
                  >
                      Login
                  </NavLink>
                </div>
              }
          </div>
        </div>
        </div>
      </nav>
      <div className="py-0">{element}</div>
    </div>
  );

}


function Login() {

  const onLogged = () => {
    GlobalVariables.Logged = !GlobalVariables.Logged;
  };

  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  });

  const { username, password } = inputs;

  const onChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    console.log(inputs);
  }

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const acc_password =  password;
      const acc_username =  username;
      const body = { acc_username, acc_password };
      
      const response = await fetch("http://localhost:5000/authentication/login"
        ,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      ).catch(function (error) {
          console.log(error);
      });
      
     
      const parseRes = await response.json()  ;
      console.log(parseRes.token);
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        console.log("Success!");
      } else {
        setAuth(false);
        console.log("Failed login");
      }
    } catch (err) {
      
      console.error(err.message);
    }
  };

  return (
          <main>
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="px-4 py-0 sm:px-0">
                      <div className="h-auto overflow-hidden flex items-center justify-center shadow">
                        <div className="bg-gray-200 rounded py-16 px-24 m-0 flex flex-col items-center justify-center">
                          <img className="rounded-full h-32 w-32" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="user avatar" />
                          <form onSubmit={onSubmitForm} className="mt-8 mb-4">
                            <div className="mb-4">
                              <label for="userEmail" className="sr-only">Username</label>
                              <input className="border-solid border border-gray-400 rounded px-2 py-3" type="text" name="username" id="userEmail" placeholder="Username" value={username} required onChange={e => onChange(e)}/>
                            </div>
                            <div>
                              <label for="userEmail" className="sr-only">Password</label>
                              <input className="border-solid border border-gray-400 rounded px-2 py-3" type="password" name="password" id="userPass" placeholder="Password" value={password} required  onChange={e => onChange(e)}/>
                            </div>
                            <div className="my-4 flex items-center">
                              <input className="h-4 w-4 mr-2" type="checkbox" id="userRemember" />
                              <label for="userRemember">Remember me</label>
                            </div>
                            <button onClick={onLogged} className="bg-gray-500 hover:bg-gray-600 text-white font-bold w-full py-3" type="submit" >Log in </button>
                          </form>
                        </div>
                      </div>
                </div>
              </div>
        </main>
            
  );
}

function Accountss() {
  return (
    <div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Account Information</h3>
          <p class="mt-1 text-sm text-gray-600">
            Use a permanent address where you can receive mail.
          </p>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form action="#" method="POST">
          <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-4">
                  <label for="account_type" class="block text-sm font-medium text-gray-700">Account Type</label>
                  <select id="account_type" name="account_type" autocomplete="account_type" class="mt-1 block w-80 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-80">
                    <option>Admin</option>
                    <option>Doctor</option>
                    <option>Nurse</option>
                    <option>Lab Assistance</option>
                   
                  </select>
                  </div>
                <div class="col-span-6 sm:col-span-3">
                  <label for="first_name" class="block text-sm font-medium text-gray-700">First name</label>
                  <input type="text" name="first_name" id="first_name" autocomplete="given-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-80 shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-200" />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label for="last_name" class="block text-sm font-medium text-gray-700">Last name</label>
                  <input type="text" name="last_name" id="last_name" autocomplete="family-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-80 shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-200" />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label for="last_name" class="block text-sm font-medium text-gray-700">Middle Name</label>
                  <input type="text" name="Middle_name" id="Middle_name" autocomplete="Middle-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-80 shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-200" />
                </div>
                <div class="col-span-6 sm:col-span-4">
                  <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
                  <input type="username" name="username" id="blood_pressure" autocomplete="username" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-80 shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-200" />
                </div>
                <div class="col-span-6 sm:col-span-4">
                  <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                  <input type="password" name="password" id="password" autocomplete="password" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-80 shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-200" />
                </div>
                <div class="col-span-6 sm:col-span-4">
                  <label for="password" class="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <input type="password" name="password" id="password" autocomplete="password" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-80 shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-200" />
                </div>
              </div>
            </div>
            
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button type="clear" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Clear
              </button>
              <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 m-2">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

            
  );
}

function Departmentss() {
  return (
    <div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Account Information</h3>
          <p class="mt-1 text-sm text-gray-600">
            Use a permanent address where you can receive mail.
          </p>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form action="#" method="POST">
          <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid grid-cols-6 gap-6">

             
              

               

             

                <div class="col-span-6 sm:col-span-3">
                  <label for="description" class="block text-sm font-medium text-gray-700">Department Name</label>
                  <input type="text" name="description" id="first_name" autocomplete="description" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-80 shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-200" />
                </div>
  
                
  
               

               

               

                

               


              </div>
            </div>
            
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button type="clear" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Clear
              </button>
              <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 m-2">
                ADD
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

            
  );
}

function Coursess() {
  return (
    <div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Account Information</h3>
          <p class="mt-1 text-sm text-gray-600">
            Use a permanent address where you can receive mail.
          </p>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form action="#" method="POST">
          <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid grid-cols-6 gap-6">

             
              <div class="col-span-6 sm:col-span-4">
                  <label for="department" class="block text-sm font-medium text-gray-700">Select Department</label>
                  <select id="department" name="department" autocomplete="department" class="mt-1 block w-80 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-80">
                    <option>Department Of Egineering</option>
                    <option>Department Of Nursing</option>
                    <option>Institute Of Computer Studies</option>
                    <option>Department Of Architecture</option>
                   
                  </select>
                  </div>

               

             

                <div class="col-span-6 sm:col-span-3">
                  <label for="description" class="block text-sm font-medium text-gray-700">Course Name</label>
                  <input type="text" name="course_name" id="course_name" autocomplete="course_name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-80 shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-200" />
                </div>
  
                
  
               

               

               

                

               


              </div>
            </div>
            
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button type="clear" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Clear
              </button>
              <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 m-2">
                ADD
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

            
  );
}

function Unitss() {
  return (
    <div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Name Of Unit/Office</h3>
          <p class="mt-1 text-sm text-gray-600">
            Use a permanent address where you can receive mail.
          </p>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form action="#" method="POST">
          <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid grid-cols-6 gap-6">

             
              

               

             

                <div class="col-span-6 sm:col-span-3">
                  <label for="unit" class="block text-sm font-medium text-gray-700">Unit/Office Name</label>
                  <input type="text" name="unit" id="unit" autocomplete="unit" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-80 shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-200" />
                </div>
  
                
  
               

               

               

                

               


              </div>
            </div>
            
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button type="clear" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Clear
              </button>
              <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 m-2">
                ADD
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

            
  );
}

function Accountlogss() {
  return (
    <div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Search Account</h3>
          <p class="mt-1 text-sm text-gray-600">
            Use a permanent address where you can receive mail.
          </p>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form action="#" method="POST">
          <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid grid-cols-6 gap-6">

             
              

               

             

                <div class="col-span-6 sm:col-span-3">
                  <label for="unit" class="block text-sm font-medium text-gray-700">Search Account</label>
                  <input type="text" name="unit" id="unit" autocomplete="unit" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-80 shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-200" />
                </div>
  
                
  
               

               

               

                

               


              </div>
            </div>
            
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            
              <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 m-2">
                SEARCH
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

            
  );
}

function Medicinelogss() {
  return (
    <div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Search Medicine</h3>
          <p class="mt-1 text-sm text-gray-600">
            Use a permanent address where you can receive mail.
          </p>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form action="#" method="POST">
          <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid grid-cols-6 gap-6">

             
              

               

             

                <div class="col-span-6 sm:col-span-3">
                  <label for="unit" class="block text-sm font-medium text-gray-700">Search Medicine</label>
                  <input type="text" name="unit" id="unit" autocomplete="unit" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-80 shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-200" />
                </div>
  
                
  
               

               

               

                

               


              </div>
            </div>
            
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            
              <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 m-2">
                SEARCH
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

            
  );
}

function Medicine() {
  return (
    <div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Add Medicine</h3>
          <p class="mt-1 text-sm text-gray-600">
            Use a permanent address where you can receive mail.
          </p>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form action="#" method="POST">
          <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid grid-cols-6 gap-6">

    

                <div class="col-span-6 sm:col-span-3">
                  <label for="unit" class="block text-sm font-medium text-gray-700">Generic Name</label>
                  <input type="text" name="unit" id="unit" autocomplete="unit" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-80 shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-200" />
                </div>
  
                <div class="col-span-6 sm:col-span-3">
                  <label for="unit" class="block text-sm font-medium text-gray-700">Brand Name</label>
                  <input type="text" name="unit" id="unit" autocomplete="unit" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-80 shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-200" />
                </div>
  

                <div class="col-span-6 sm:col-span-3">
                  <label for="unit" class="block text-sm font-medium text-gray-700">Dosage</label>
                  <input type="text" name="unit" id="unit" autocomplete="unit" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-80 shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-200" />
                </div>
  
    

              </div>
            </div>
            
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            
            <button type="clear" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Clear
              </button>
              <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 m-2">
                ADD
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

            
  );
}

function Stocks() {
  return (
    <div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Stocks</h3>
          <p class="mt-1 text-sm text-gray-600">
            Use a permanent address where you can receive mail.
          </p>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form action="#" method="POST">
          <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid grid-cols-6 gap-6">

              <div class="col-span-6 sm:col-span-4">
                  <label for="department" class="block text-sm font-medium text-gray-700">Name Of Medicine</label>
                  <select id="department" name="department" autocomplete="department" class="mt-1 block w-80 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-80">
                    <option>Paracetamol</option>
                    <option>Biogesic</option>
                    <option>Aspirin</option>
                    <option>Diatabs</option>
                   
                  </select>                  
                  </div>
                  <div class="col-span-6 sm:col-span-4">
                  <label for="department" class="block text-sm font-medium text-gray-700">Name Of Medicine</label>
                  <select id="department" name="department" autocomplete="department" class="mt-1 block w-80 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-80">
                    <option>Paracetamol</option>
                    <option>Biogesic</option>
                    <option>Aspirin</option>
                    <option>Diatabs</option>
                   
                  </select>
                  
                  </div>
                
                  

                <div class="col-span-6 sm:col-span-3">
                  <label for="unit" class="block text-sm font-medium text-gray-700">Arrive Date</label>
                  <input type="text" name="unit" id="unit" autocomplete="unit" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-80 shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-200" />
                </div>
  
                <div class="col-span-6 sm:col-span-3">
                  <label for="unit" class="block text-sm font-medium text-gray-700">Expiration Date</label>
                  <input type="text" name="unit" id="unit" autocomplete="unit" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-80 shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-200" />
                </div>
  

                <div class="col-span-6 sm:col-span-3">
                  <label for="unit" class="block text-sm font-medium text-gray-700">Dosage</label>
                  <input type="text" name="unit" id="unit" autocomplete="unit" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-80 shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-200" />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label for="unit" class="block text-sm font-medium text-gray-700">Quantity</label>
                  <input type="text" name="unit" id="unit" autocomplete="unit" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-80 shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-200" />
                </div>
  
                
              </div>
            </div>
            
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            
            <button type="clear" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Clear
              </button>
              <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 m-2">
                ADD
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
    <div class="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">
        <div class="flex justify-between">
            <div class="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent">
                <div class="flex flex-wrap items-stretch w-full h-full mb-6 relative">
                    <div class="flex">
                        <span class="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
                            <svg width="18" height="18" class="w-4 lg:w-auto" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z" stroke="#455A64" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M16.9993 16.9993L13.1328 13.1328" stroke="#455A64" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>
                    </div>
                    <input type="text" class="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px flex-1 border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base text-gray-500 font-thin " placeholder="Search" />
                </div>
            </div>
        </div>
    </div>
    <div class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
        <table class="min-w-full">
            <thead>
                <tr>
               
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-black-500 tracking-wider">Stock ID</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-black-500 tracking-wider">Name</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-black-500 tracking-wider">Dosage</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-black-500 tracking-wider">Arrive Date</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">Expiration Date</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">Initial Quantity</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">Current Quantity</th>                                   
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">Medicine ID</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">Remarks</th>
                   
                   </tr>
            </thead>
            <tbody class="bg-white">
                    <tr>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div class="flex items-center">
                                <div>
                                    <div class="text-sm leading-5 text-gray-800">#1</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div class="text-sm leading-5 text-black  -900">Damilare Anjorin</div>
                        </td>
         
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>                                       
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">+2348106420637</td>
                      
                      
              </tr>
                   <tr>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div class="flex items-center">
                                <div>
                                    <div class="text-sm leading-5 text-gray-800">#1</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div class="text-sm leading-5 text-black-900">Damilare Anjorin</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>                                       
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">+2348106420637</td>
                      
                      
              </tr>
              <tr>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div class="flex items-center">
                                <div>
                                    <div class="text-sm leading-5 text-gray-800">#1</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div class="text-sm leading-5 text-black-900">Damilare Anjorin</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>                                       
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">+2348106420637</td>
                      
                      
              </tr>
              <tr>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div class="flex items-center">
                                <div>
                                    <div class="text-sm leading-5 text-gray-800">#1</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div class="text-sm leading-5 text-black-900">Damilare Anjorin</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>                                       
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">+2348106420637</td>
                      
                      
              </tr>
              <tr>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div class="flex items-center">
                                <div>
                                    <div class="text-sm leading-5 text-gray-800">#1</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div class="text-sm leading-5 text-black-900">Damilare Anjorin</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>                                       
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">+2348106420637</td>
                      
                      
              </tr>
            </tbody>
        </table>
      <div class="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans">

<div>
<nav class="relative z-0 inline-flex shadow-sm">
    <div>
      
    </div>
    <div>
        <a href="/#" class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-700 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary">
            1
        </a>
      <a href="/#" class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-600 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary">
            2
        </a>
       <a href="/#" class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-600 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary">
            3
        </a>
    </div>
    <div v-if="pagination.current_page < pagination.last_page">
        <a href="/#" class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150" aria-label="Next">
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
        </a>
    </div>
</nav>
</div>
</div>
    </div>
</div> 
  </div>


            
  );
}

function Dashboard() {
  return (
    <div>
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Dashboard
          </h1>
          <nav className="flex ml-8">
            <NavLink
              to=""
              exact={true}
              activeClassName="text-gray-700 bg-gray-100"
              inactiveClassName="text-gray-500 hover:text-gray-700"
              className="ml-4 px-2 py-1 font-medium text-xs leading-5 rounded-md"
            >
              Overview
            </NavLink>
            <NavLink
              to="new-users"
              activeClassName="text-gray-700 bg-gray-100"
              inactiveClassName="text-gray-500 hover:text-gray-700"
              className="ml-4 px-2 py-1 font-medium text-xs leading-5 rounded-md"
            >
              New users
            </NavLink>
            <NavLink
              to="sales"
              activeClassName="text-gray-700 bg-gray-100"
              inactiveClassName="text-gray-500 hover:text-gray-700"
              className="ml-4 px-2 py-1 font-medium text-xs leading-5 rounded-md"
            >
              Sales
            </NavLink>
          </nav>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

function Transactions() {
  return (
    <div>
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Transactions
          </h1>
          <nav className="flex ml-8">
            <NavLink
              to=""
              exact={true}
              activeClassName="text-gray-700 bg-gray-100"
              inactiveClassName="text-gray-500 hover:text-gray-700"
              className="ml-4 px-2 py-1 font-medium text-xs leading-5 rounded-md"
            >
              Overview
            
            </NavLink>
          </nav>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
          <div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
          <p class="mt-1 text-sm text-gray-600">
            Use a permanent address where you can receive mail.
          </p>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form action="#" method="POST">
          <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid grid-cols-6 gap-6">

              <div class="col-span-6 sm:col-span-4">
                  <label for="patient_type" class="block text-sm font-medium text-gray-700">Patient Type</label>
                  <select id="Postition" name="Postition" autocomplete="Postition" class="mt-1 block w-80 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-80">
                    <option>Student</option>
                    <option>Employee</option>
                   
                  </select>
                  </div>

                <div class="col-span-6 sm:col-span-3">
                  <label for="Postition" class="block text-sm font-medium text-gray-700">Postition</label>
                  <select id="Postition" name="Postition" autocomplete="Postition" class="mt-1 block w-80 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-80">
                    <option>Registrar</option>
                    <option>Teacher</option>
                   
                  </select>
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label for="Course" class="block text-sm font-medium text-gray-700">Course</label>
                  <select id="Course" name="Course" autocomplete="Course" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ">
                    <option>Student</option>
                    <option>Employee</option>
                   
                  </select>
                </div>

              <div class="col-span-6 sm:col-span-4">
                  <label for="Student_id" class="block text-sm font-medium text-gray-700">ID</label>
                  <input type="text" name="Student_id" id="Student_id" autocomplete="Student_id" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-50 shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-200 text-center" />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label for="first_name" class="block text-sm font-medium text-gray-700">First name</label>
                  <input type="text" name="first_name" id="first_name" autocomplete="given-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-80 shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-200" />
                </div>
  
                <div class="col-span-6 sm:col-span-3">
                  <label for="last_name" class="block text-sm font-medium text-gray-700">Last name</label>
                  <input type="text" name="last_name" id="last_name" autocomplete="family-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-80 shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-200" />
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label for="last_name" class="block text-sm font-medium text-gray-700">Middle Name</label>
                  <input type="text" name="Middle_name" id="Middle_name" autocomplete="Middle-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-80 shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-200" />
                </div>
  
               

                <div class="col-span-6 sm:col-span-4">
                  <label for="blood_pressure" class="block text-sm font-medium text-gray-700">Blood Pressure</label>
                  <input type="text" name="blood_presssure" id="blood_pressure" autocomplete="blood_pressure" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-25 shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-200" />
                </div>

                <div class="col-span-6 sm:col-span-4">
                  <label for="Blood_sugar" class="block text-sm font-medium text-gray-700">Blood Sugar</label>
                  <input type="text" name="Blood_sugar" id="Blood_sugar" autocomplete="Blood_sugar" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-25 shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-200" />
                </div>


                <div class="col-span-6 sm:col-span-4">
                  <label for="height" class="text-sm font-medium text-gray-700">Height</label>
                  <div class="flex">
                  <input type="text" name="Weight" id="height" autocomplete="height" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-15 shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-200 text-center"  />
                 <p class="ml-1">cm</p>
                  </div>
                  
                </div>

                <div class="col-span-6 sm:col-span-4">
                  <label for="Weight" class="text-sm font-medium text-gray-700">Weight</label>
                  <div class="flex">
                  <input type="text" name="Weight" id="Weight" autocomplete="Weight" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-15 shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-200 text-center"  />
                  <select id="Weight" name="Weight" autocomplete="Weight" class="mt-1 block  border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-7 w-14">
                    <option>kg</option>
                    <option>lbs</option>
                   
                  </select>
                  </div>
                </div>

               

              </div>
            </div>
            
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button type="clear" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Clear
              </button>
              <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 m-2">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
          </div>
        </div>  
      </main>
    </div>
  );
}

function Records() {
  return (
    <div>
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Records
          </h1>
          <nav className="flex ml-8">
            <NavLink
              to=""
              exact={true}
              activeClassName="text-gray-700 bg-indigo-300"
              inactiveClassName="text-gray-500 hover:text-gray-700 hover:bg-indigo-100"
              className="ml-4 px-2 py-1 font-medium text-xs leading-5 rounded-md"
            >
              Overview
            </NavLink>
            <NavLink
              to="students"
              activeClassName="text-gray-700 bg-indigo-300"
              inactiveClassName="text-gray-500 hover:text-gray-700 hover:bg-indigo-100"
              className="ml-4 px-2 py-1 font-medium text-xs leading-5 rounded-md"
            >
              Students
            </NavLink>
            <NavLink
              to="employees"
              activeClassName="text-gray-700 bg-indigo-300"
              inactiveClassName="text-gray-500 hover:text-gray-700 hover:bg-indigo-100"
              className="ml-4 px-2 py-1 font-medium text-xs leading-5 rounded-md"
            >
              Employees
            </NavLink>
            <NavLink
              to="patients"
              activeClassName="text-gray-700 bg-indigo-300"
              inactiveClassName="text-gray-500 hover:text-gray]-700 hover:bg-indigo-100"
              className="ml-4 px-2 py-1 font-medium text-xs leading-5 rounded-md"
            >
              Patients
            </NavLink>
          </nav>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

function Inventory() {
  return (
    <div>
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Inventory
          </h1>
          <nav className="flex ml-8">
            <NavLink
              to=""
              exact={true}
              activeClassName="text-gray-700 bg-gray-100"
              inactiveClassName="text-gray-500 hover:text-gray-700"
              className="ml-4 px-2 py-1 font-medium text-xs leading-5 rounded-md"
            >
              Overview
            </NavLink>
            <NavLink
              to="stocks"
              activeClassName="text-gray-700 bg-gray-100"
              inactiveClassName="text-gray-500 hover:text-gray-700"
              className="ml-4 px-2 py-1 font-medium text-xs leading-5 rounded-md"
            >
              Stocks
            </NavLink>
            <NavLink
              to="medicines"
              activeClassName="text-gray-700 bg-gray-100"
              inactiveClassName="text-gray-500 hover:text-gray-700"
              className="ml-4 px-2 py-1 font-medium text-xs leading-5 rounded-md"
            >
             Add New Medicines
            </NavLink>
          </nav>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

function Settings() {
  return (
    <div>
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Settings
          </h1>
          <nav className="flex ml-8">
            <NavLink
              to=""
              exact={true}
              activeClassName="text-gray-700 bg-gray-100"
              inactiveClassName="text-gray-500 hover:text-gray-700"
              className="ml-4 px-2 py-1 font-medium text-xs leading-5 rounded-md"
            >
              Overview
            </NavLink>
            <NavLink
              to="accounts"
              activeClassName="text-gray-700 bg-gray-100"
              inactiveClassName="text-gray-500 hover:text-gray-700"
              className="ml-4 px-2 py-1 font-medium text-xs leading-5 rounded-md"
            >
               Accounts
            </NavLink>
            <NavLink
              to="departments"
              activeClassName="text-gray-700 bg-gray-100"
              inactiveClassName="text-gray-500 hover:text-gray-700"
              className="ml-4 px-2 py-1 font-medium text-xs leading-5 rounded-md"
            >
              Departments
            </NavLink>
            <NavLink
              to="courses"
              activeClassName="text-gray-700 bg-gray-100"
              inactiveClassName="text-gray-500 hover:text-gray-700"
              className="ml-4 px-2 py-1 font-medium text-xs leading-5 rounded-md"
            >
              Courses
            </NavLink>
            <NavLink
              to="units"
              activeClassName="text-gray-700 bg-gray-100"
              inactiveClassName="text-gray-500 hover:text-gray-700"
              className="ml-4 px-2 py-1 font-medium text-xs leading-5 rounded-md"
            >
              Units
            </NavLink>
            <NavLink
              to="accountlogs"
              activeClassName="text-gray-700 bg-gray-100"
              inactiveClassName="text-gray-500 hover:text-gray-700"
              className="ml-4 px-2 py-1 font-medium text-xs leading-5 rounded-md"
            >
              Account Logs
            </NavLink>
            <NavLink
              to="medicinelogs"
              activeClassName="text-gray-700 bg-gray-100"
              inactiveClassName="text-gray-500 hover:text-gray-700"
              className="ml-4 px-2 py-1 font-medium text-xs leading-5 rounded-md"
            >
              Medicine Logs
            </NavLink>
          </nav>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

function Patients() {
  return (
  
    <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
    <div class="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">
        <div class="flex justify-between">
            <div class="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent">
                <div class="flex flex-wrap items-stretch w-full h-full mb-6 relative">
                    <div class="flex">
                        <span class="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
                            <svg width="18" height="18" class="w-4 lg:w-auto" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z" stroke="#455A64" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M16.9993 16.9993L13.1328 13.1328" stroke="#455A64" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>
                    </div>
                    <input type="text" class="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px flex-1 border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base text-gray-500 font-thin " placeholder="Search" />
                </div>
            </div>
        </div>
    </div>
    <div class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
        <table class="min-w-full">
            <thead>
                <tr>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-black-500 tracking-wider">Unit</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-black-500 tracking-wider">ID</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">Last Name</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">First Name</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">Middle Name</th> 
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-black-500 tracking-wider">Course</th>                                  
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">Blood Pressure</th>                                                                      
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">Blood Sugar</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">Height</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">Weight</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">Chief complain</th>                                    
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">Issued Med/ Nsg. Care</th>                                   
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">Qty</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">Action</th>
                   </tr>
            </thead>
            <tbody class="bg-white">
                    <tr>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div class="flex items-center">
                                <div>
                                    <div class="text-sm leading-5 text-gray-800">#1</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div class="text-sm leading-5 text-black  -900">Damilare Anjorin</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>                                       
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">+2348106420637</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">
                            <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span aria-hidden class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                            <span class="relative text-xs">active</span>
                        </span>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-black-500 text-sm leading-5">September 12</td>
                        <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                            <button class="px-5 py-2 border-blue-500 border text-black-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">Edit</button>
                        </td>
              </tr>
                   <tr>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div class="flex items-center">
                                <div>
                                    <div class="text-sm leading-5 text-gray-800">#1</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div class="text-sm leading-5 text-black-900">Damilare Anjorin</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">+2348106420637</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">
                            <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span aria-hidden class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                            <span class="relative text-xs">active</span>
                        </span>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-black-500 text-sm leading-5">September 12</td>
                        <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                            <button class="px-5 py-2 border-blue-500 border text-black-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">Edit</button>
                        </td>
              </tr>
              <tr>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div class="flex items-center">
                                <div>
                                    <div class="text-sm leading-5 text-gray-800">#1</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div class="text-sm leading-5 text-black-900">Damilare Anjorin</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">+2348106420637</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">
                            <span class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                            <span aria-hidden class="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                            <span class="relative text-xs">not active</span>
                        </span>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-black-500 text-sm leading-5">September 12</td>
                        <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                            <button class="px-5 py-2 border-blue-500 border text-black-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">Edit</button>
                        </td>
              </tr>
              <tr>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div class="flex items-center">
                                <div>
                                    <div class="text-sm leading-5 text-gray-800">#1</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div class="text-sm leading-5 text-black-900">Damilare Anjorin</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">+2348106420637</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">
                            <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span aria-hidden class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                            <span class="relative text-xs">active</span>
                        </span>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-black-500 text-sm leading-5">September 12</td>
                        <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                            <button class="px-5 py-2 border-blue-500 border text-black-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">Edit</button>
                        </td>
              </tr>
              <tr>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div class="flex items-center">
                                <div>
                                    <div class="text-sm leading-5 text-gray-800">#1</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div class="text-sm leading-5 text-black-900">Damilare Anjorin</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">+2348106420637</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">
                            <span class="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight">
                            <span aria-hidden class="absolute inset-0 bg-orange-200 opacity-50 rounded-full"></span>
                            <span class="relative text-xs">disabled</span>
                        </span>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">September 12</td>
                        <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                            <button class="px-5 py-2 border-blue-500 border text-black-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">Edit</button>
                      </td>
              </tr>
            </tbody>
        </table>
      <div class="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans">
  <div>
<nav class="relative z-0 inline-flex shadow-sm">
    <div	>
      
    </div>
    <div>
        <a href="/#" class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-700 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary">
            1
        </a>
      <a href="/#" class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-600 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary">
            2
        </a>
       <a href="/#" class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-600 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary">
            3
        </a>
    </div>
    <div v-if="pagination.current_page < pagination.last_page">
        <a href="/#" class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150" aria-label="Next">
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
        </a>
    </div>
</nav>
</div>
</div>
    </div>
</div>  );
}

function Students() {
  return (
  
    <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
    <div class="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">
        <div class="flex justify-between">
            <div class="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent">
                <div class="flex flex-wrap items-stretch w-full h-full mb-6 relative">
                    <div class="flex">
                        <span class="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
                            <svg width="18" height="18" class="w-4 lg:w-auto" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z" stroke="#455A64" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M16.9993 16.9993L13.1328 13.1328" stroke="#455A64" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>
                    </div>
                    <input type="text" class="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px flex-1 border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base text-gray-500 font-thin " placeholder="Search" />
                </div>
            </div>
        </div>
    </div>
    <div class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
        <table class="min-w-full">
            <thead>
                <tr>
               
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-black-500 tracking-wider">ID</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-black-500 tracking-wider">Course</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">Last Name</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">First Name</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">Middle Name</th>                                   
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">Blood Pressure</th>                                                                      
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">Blood Sugar</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">Height</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">Weight</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">Chief complain</th>                                    
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">Issued Med/ Nsg. Care</th>                                   
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">Qty</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">Action</th>
                   </tr>
            </thead>
            <tbody class="bg-white">
                    <tr>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div class="flex items-center">
                                <div>
                                    <div class="text-sm leading-5 text-gray-800">#1</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div class="text-sm leading-5 text-black  -900">Damilare Anjorin</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>                                       
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">+2348106420637</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">
                            <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span aria-hidden class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                            <span class="relative text-xs">active</span>
                        </span>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-black-500 text-sm leading-5">September 12</td>
                        <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                            <button class="px-5 py-2 border-blue-500 border text-black-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">Edit</button>
                        </td>
              </tr>
                   <tr>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div class="flex items-center">
                                <div>
                                    <div class="text-sm leading-5 text-gray-800">#1</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div class="text-sm leading-5 text-black-900">Damilare Anjorin</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">+2348106420637</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">
                            <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span aria-hidden class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                            <span class="relative text-xs">active</span>
                        </span>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-black-500 text-sm leading-5">September 12</td>
                        <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                            <button class="px-5 py-2 border-blue-500 border text-black-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">Edit</button>
                        </td>
              </tr>
              <tr>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div class="flex items-center">
                                <div>
                                    <div class="text-sm leading-5 text-gray-800">#1</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div class="text-sm leading-5 text-black-900">Damilare Anjorin</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">+2348106420637</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">
                            <span class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                            <span aria-hidden class="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                            <span class="relative text-xs">not active</span>
                        </span>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-black-500 text-sm leading-5">September 12</td>
                        <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                            <button class="px-5 py-2 border-blue-500 border text-black-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">Edit</button>
                        </td>
              </tr>
              <tr>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div class="flex items-center">
                                <div>
                                    <div class="text-sm leading-5 text-gray-800">#1</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div class="text-sm leading-5 text-black-900">Damilare Anjorin</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">+2348106420637</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">
                            <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span aria-hidden class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                            <span class="relative text-xs">active</span>
                        </span>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-black-500 text-sm leading-5">September 12</td>
                        <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                            <button class="px-5 py-2 border-blue-500 border text-black-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">Edit</button>
                        </td>
              </tr>
              <tr>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div class="flex items-center">
                                <div>
                                    <div class="text-sm leading-5 text-gray-800">#1</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                            <div class="text-sm leading-5 text-black-900">Damilare Anjorin</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">+2348106420637</td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">
                            <span class="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight">
                            <span aria-hidden class="absolute inset-0 bg-orange-200 opacity-50 rounded-full"></span>
                            <span class="relative text-xs">disabled</span>
                        </span>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">September 12</td>
                        <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                            <button class="px-5 py-2 border-blue-500 border text-black-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">Edit</button>
                        </td>
              </tr>
            </tbody>
        </table>
      <div class="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans">

<div>
<nav class="relative z-0 inline-flex shadow-sm">
    <div	>
      
    </div>
    <div>
        <a href="/#" class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-700 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary">
            1
        </a>
      <a href="/#" class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-600 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary">
            2
        </a>
       <a href="/#" class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-600 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary">
            3
        </a>
    </div>
    <div v-if="pagination.current_page < pagination.last_page">
        <a href="/#" class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150" aria-label="Next">
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
        </a>
    </div>
</nav>
</div>
</div>
    </div>
</div>          
);
}

function Employee() {
  return (
  
    <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
                    <div class="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">
                        <div class="flex justify-between">
                            <div class="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent">
                                <div class="flex flex-wrap items-stretch w-full h-full mb-6 relative">
                                    <div class="flex">
                                        <span class="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
                                            <svg width="18" height="18" class="w-4 lg:w-auto" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z" stroke="#455A64" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M16.9993 16.9993L13.1328 13.1328" stroke="#455A64" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </span>
                                    </div>
                                    <input type="text" class="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px flex-1 border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base text-gray-500 font-thin " placeholder="Search" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
                        <table class="min-w-full">
                            <thead>
                                <tr>
                               
                                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-black-500 tracking-wider">ID</th>
                                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-black-500 tracking-wider">Unit</th>
                                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">Last Name</th>
                                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">First Name</th>
                                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">Middle Name</th>                                   
                                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">Blood Pressure</th>                                                                      
                                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">Blood Sugar</th>
                                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">Height</th>
                                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">Weight</th>
                                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">Chief complain</th>                                    
                                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">Issued Med/ Nsg. Care</th>                                   
                                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">Qty</th>
                                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black-500 tracking-wider">Action</th>
                                   </tr>
                            </thead>
                            <tbody class="bg-white">
                                    <tr>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                            <div class="flex items-center">
                                                <div>
                                                    <div class="text-sm leading-5 text-gray-800">#1</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                            <div class="text-sm leading-5 text-black  -900">Damilare Anjorin</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>                                       
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">+2348106420637</td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">
                                            <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                            <span aria-hidden class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                            <span class="relative text-xs">active</span>
                                        </span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-black-500 text-sm leading-5">September 12</td>
                                        <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                                            <button class="px-5 py-2 border-blue-500 border text-black-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">Edit</button>
                                        </td>
                              </tr>
                                   <tr>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                            <div class="flex items-center">
                                                <div>
                                                    <div class="text-sm leading-5 text-gray-800">#1</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                            <div class="text-sm leading-5 text-black-900">Damilare Anjorin</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">+2348106420637</td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">
                                            <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                            <span aria-hidden class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                            <span class="relative text-xs">active</span>
                                        </span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-black-500 text-sm leading-5">September 12</td>
                                        <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                                            <button class="px-5 py-2 border-blue-500 border text-black-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">Edit</button>
                                        </td>
                              </tr>
                              <tr>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                            <div class="flex items-center">
                                                <div>
                                                    <div class="text-sm leading-5 text-gray-800">#1</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                            <div class="text-sm leading-5 text-black-900">Damilare Anjorin</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">+2348106420637</td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">
                                            <span class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                                            <span aria-hidden class="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                                            <span class="relative text-xs">not active</span>
                                        </span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-black-500 text-sm leading-5">September 12</td>
                                        <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                                            <button class="px-5 py-2 border-blue-500 border text-black-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">Edit</button>
                                        </td>
                              </tr>
                              <tr>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                            <div class="flex items-center">
                                                <div>
                                                    <div class="text-sm leading-5 text-gray-800">#1</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                            <div class="text-sm leading-5 text-black-900">Damilare Anjorin</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">+2348106420637</td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">
                                            <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                            <span aria-hidden class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                            <span class="relative text-xs">active</span>
                                        </span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-black-500 text-sm leading-5">September 12</td>
                                        <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                                            <button class="px-5 py-2 border-blue-500 border text-black-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">Edit</button>
                                        </td>
                              </tr>
                              <tr>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                            <div class="flex items-center">
                                                <div>
                                                    <div class="text-sm leading-5 text-gray-800">#1</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                            <div class="text-sm leading-5 text-black-900">Damilare Anjorin</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">damilareanjorin1@gmail.com</td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">+2348106420637</td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b text-black-900 border-gray-500 text-sm leading-5">
                                            <span class="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight">
                                            <span aria-hidden class="absolute inset-0 bg-orange-200 opacity-50 rounded-full"></span>
                                            <span class="relative text-xs">disabled</span>
                                        </span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">September 12</td>
                                        <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                                            <button class="px-5 py-2 border-blue-500 border text-black-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">Edit</button>
                                        </td>
                              </tr>
                            </tbody>
                        </table>
                      <div class="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans">
           
            <div>
                <nav class="relative z-0 inline-flex shadow-sm">
                    <div	>
                      
                    </div>
                    <div>
                        <a href="/#" class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-700 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary">
                            1
                        </a>
                      <a href="/#" class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-600 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary">
                            2
                        </a>
                       <a href="/#" class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-600 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary">
                            3
                        </a>
                    </div>
                    <div v-if="pagination.current_page < pagination.last_page">
                        <a href="/#" class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150" aria-label="Next">
                            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </nav>
            </div>
        </div>
                    </div>
                </div>          
  );
}

// function Page({ title }) {
//   return (
//     <div>
//       <header>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end">
//           <h1 className="text-3xl font-bold leading-tight text-gray-900">
//             {title}
//           </h1>
//         </div>
//       </header>
//       <main>
//         <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
//           <div className="px-4 py-8 sm:px-0">
//             <Outlet />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
