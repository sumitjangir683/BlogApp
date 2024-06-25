import { useEffect, useState } from 'react'
import './App.css'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import {login,logout} from './store/authSlice'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import {Outlet} from 'react-router-dom'
import appwriteService from "./appwrite/config"
import { getPostData } from './store/postSlice'
function App() {
 const [loading, setLoading] = useState(true)
 const dispatch = useDispatch()
 
 useEffect (() =>{
      authService.getCurrentUser()
      .then((userData) => {
        if (userData){
          dispatch(login({userData}))
          appwriteService.getPosts().then((posts) => {
            if (posts) {
                posts.documents.forEach(post => {
                    dispatch(getPostData(post));
                });
            }
        });
        }
        else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))

 } ,[])

  return !loading ? (
   <div className='min-h-screen flex flex-wrap 
   content-between bg-gray-400'>
   <div className='w-full block'>
    <Header/>
    <main>
      <Outlet/>
    </main>
    <Footer/>
   </div>
   </div>
  ) : (<div> Loading...</div>)
}

export default App
