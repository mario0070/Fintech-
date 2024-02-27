import React, { useEffect, useState } from 'react'
import BottomBar from '../components/bottombar'
import Topbar from '../components/topar'
import loading from "/public/img/loading.png"
import { useCookies } from 'react-cookie'
import Cookies from 'js-cookie';
import axios from 'axios'

export default function Settings() {
  const [isloadin,setLoading] = useState(true)
  const [cookie, setCookie] = useCookies("")
  const [user, setUser] = useState([])
  const [userBalance,setuserBalance] = useState(0)
  const [transactions, settransactions] = useState([])

  setTimeout(()=>{
    setLoading(false)
  },500)

  useEffect(()=>{
    setUser(cookie.user.user[0])
  },[])

  if(cookie.user){
    const tk = JSON.parse(Cookies.get('user'))
    let send = axios.create({
      baseURL: 'https://fintect-bank-app.onrender.com/',
      headers: {
          "Authorization" : `Bearer ${tk["access-token"]}`
      },
    });

    useEffect(()=>{
      send.get("/transact",)
      .then(res => {
        settransactions(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
      send.post("/user/get-user",{
        email :user ? user.email : ""
      })
      .then(res => {
        setuserBalance(res.data.users[0].balance)
      })
      .catch(err => {
        console.log(err)
      })
    },[transactions, userBalance])

    return (
      <>
      <Topbar user={user} userBalance={userBalance}/>
      
      { isloadin 
      ?
          <div className='loading'>
            <div className="img text-center ">
              <img src={loading} width={50} alt="" />
            </div>
          </div>
        :
        <div className='contents settings adjust'>
          <div className="pic mb-3">
            <div className="img text-center">
            <i class="fa-regular fa-user"></i>
              {/* <img src="" alt="" /> */}
              <div className="icon">
                <label htmlFor='file' className="mb-0"><i class="fa-solid fa-camera-retro"></i></label>
                <input type="file" className='d-none' name="file" id="file" />
              </div>
            </div>
          </div>

          <p className="mb-1 fw-semibold text-muted">Theme</p>
          <div className="theme bg">
            <div className="d-flex">
              <p className="mb-0">Dark Mode</p>
              <p className="mb-0"><i class="fa-solid fa-toggle-off"></i></p>
            </div>
          </div>

          <p className="mb-1 fw-semibold text-muted">Notifications</p>
          <div className="notify bg">
            <div className="d-flex head">
              <p className="mb-0">Notify when new payment is received</p>
              <p className="mb-0"><i class="fa-solid fa-toggle-on"></i></p>
            </div>
            <div className="d-flex">
              <p className="mb-0">Notifation sound</p>
              <p className="mb-0"><i class="fa-solid fa-arrow-right-arrow-left"></i></p>
            </div>
          </div>

          <p className="mb-1 fw-semibold text-muted">Profile Settings</p>
          <div className="p_settings bg">
            <div className="d-flex bd">
              <p className="mb-0">Change Username</p>
              <p className="mb-0"><i class="fa-solid fa-pen"></i></p>
            </div>
            <div className="d-flex bd">
              <p className="mb-0">Update Email</p>
              <p className="mb-0"><i class="fa-solid fa-pen"></i></p>
            </div>
            <div className="d-flex bd">
              <p className="mb-0">Address</p>
              <p className="mb-0"><i class="fa-solid fa-pen"></i></p>
            </div>
            <div className="d-flex mt-2">
              <p className="mb-0">Private Profile</p>
              <p className="mb-0"><i class="fa-solid fa-toggle-off"></i></p>
            </div>
          </div>

          <p className="mb-1 fw-semibold text-muted">Security</p>
          <div className="security bg">
            <div className="d-flex bd">
              <p className="mb-0">Update Password</p>
              <p className="mb-0"><i class="fa-solid fa-arrow-right-arrow-left"></i></p>
            </div>
            <div className="d-flex bd">
              <p className="mb-0">Address</p>
              <p className="mb-0"><i class="fa-solid fa-toggle-on"></i></p>
            </div>
            <div className="d-flex mt-2">
              <p className="mb-0">Log Out</p>
              <p className="mb-0"><i class="fa-solid fa-right-from-bracket"></i></p>
            </div>
          </div>
        </div>
      }
        <BottomBar/>
      </>
    )
  }
  else{
    window.location.href = "/login"
  }
}
