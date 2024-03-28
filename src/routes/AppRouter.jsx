import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom'
import LoginForm from '../layout/LoginForm'
import RegisterForm from '../layout/RegisterForm'
import useAuth from '../hooks/useAuth'
import Header from '../layout/Header'
import UserHome from '../layout/UserHome'
import NewTodoForm from '../layout/NewTodoForm'
import TodosComponent from '../layout/TodosComponent';
import MapUser from '../layout/่MapUser'
import Adminmenu from '../admin/adminmenu'
import Adminuser from '../admin/adminuser'
import ModalEditUser from '../components/ModalEditUser'
import EditUserForm from '../admin/EditUserForm'


const guestRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Header />
      <Outlet />
    </>,
    children: [
      { index: true, element: <LoginForm /> },
      { path: '/register', element: <RegisterForm />}
    ]
  }
])

const userRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Header />
      <Outlet />
    </>,
    children : [
      { index: true, element: <UserHome /> },
      { path: '/new', element: <NewTodoForm />},
      { path: '/todos', element: <TodosComponent /> },
      { path: '/maps', element: <MapUser />},

    ]
  }
])

const adminRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Adminmenu />
      <Outlet />
      {/* <Footer/> */}
      
      </>,
    children: [
      
      { index: true, element: <Adminuser /> },
      
      { path: '/user', element: <Adminuser /> },
      { path: '/edit', element: <ModalEditUser /> },
      { path: '/test', element: <EditUserForm /> },
      // { path: '/AdminDashbord', element: <AdminDashbord /> },
      // { path: '/Adminheader', element: <Adminheader to='/' /> },
      // { path: '/Admininformation', element: <Admininformation /> },
    ]
  }
])

export default function AppRouter() {
  const { user } = useAuth()
  const finalRouter = !user?.id ? guestRouter : user.role === 'ADMIN' ? adminRouter : userRouter
  return (
    <>
      <RouterProvider router={finalRouter} />
    </>
  )
}

// export default function AppRouter() {
//   const {user} = useAuth()
//   const finalRouter = user?.id ? userRouter : guestRouter
//   return (
//     <RouterProvider router={finalRouter} />
//   )
// }
