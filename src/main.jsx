import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './component/Home.jsx'
import About from './component/About.jsx'
import User from './component/Recipedata.jsx'
import MealCard from './component/Mealcard.jsx'
import Recipedata from './component/Recipedata.jsx'
import Popular from './component/Popular.jsx'
// import Contact from './components/Contact.jsx'
// import Github from './components/Github.jsx'
// import User from './components/User.jsx'


const route=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/popular' element={<Popular/>}/>
      <Route path='/:dishid' element={<Recipedata/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={route}/>
  </StrictMode>,
)
