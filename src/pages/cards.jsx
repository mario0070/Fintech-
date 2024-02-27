import React, { useEffect, useState } from 'react'
import BottomBar from '../components/bottombar'
import Topbar from '../components/topar'
import { Link } from 'react-router-dom'
import loading from "/public/img/loading.png"
import { useCookies } from 'react-cookie'
import Cookies from 'js-cookie';
import axios from 'axios'

export default function Cards() {
  const [isloadin,setLoading] = useState(true)
  const [cookie, setCookie] = useCookies("")
  const [user, setUser] = useState([])
  const [userBalance,setuserBalance] = useState(0)
  const [transactions, settransactions] = useState([])

  setTimeout(()=>{
    setLoading(false)
  },100)

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
          <div className='contents homepage adjust'>
            <div className="section4">
                  <div className="head d-flex">
                      <h4>My Cards</h4>
                    </div>

                  <div className="cards">
                    <div className="my_card">
                        <div className="">
                            <p className="mb-1">Balance</p>
                            <h4>₦{new Intl.NumberFormat('en-IN', {}).format(userBalance)}.00</h4>
                            <p className="mb-1">Card Number</p>
                            <h4 className="mb-4">****** 4059</h4>
                            <div className="exp d-flex">
                                <div className="">
                                  <p className="mb-1">Expiry</p>
                                  <p>12/45</p>
                                </div>
                                <div className="">
                                  <p className="mb-1">cvv</p>
                                  <p>145</p>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
          </div>
        }
        <BottomBar/>
      </>
    )
  }
  else{
    window.location.href="/login"
  }
}
