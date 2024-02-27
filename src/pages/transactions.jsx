import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BottomBar from '../components/bottombar'
import Topbar from '../components/topar'
import loading from "/public/img/loading.png"
import { useCookies } from 'react-cookie'
import Cookies from 'js-cookie';
import axios from 'axios';

export default function Transactions() {
  const [isloadin,setLoading] = useState(true)
  const [cookie, setCookie] = useCookies("")
  const [user, setUser] = useState([])
  const [transactions, settransactions] = useState([])
  const [userBalance,setuserBalance] = useState(0)
  
  if(cookie.user){
    const tk = JSON.parse(Cookies.get('user'))
    let send = axios.create({
      baseURL: 'https://fintect-bank-app.onrender.com/',
      headers: {
          "Authorization" : `Bearer ${tk["access-token"]}`
      },
    });

    useEffect(()=>{
      send.get("/transact",{})
      .then(res => {
        setLoading(false)
        settransactions(res.data.data)
        
      })
      .catch(err => {
        console.log(err)
      })

      send.post("/user/get-user",{
        email : user ? user.email : ""
      })
      .then(res => {
        setuserBalance(res.data.users[0].balance)
      })
      .catch(err => {
        console.log(err)
      })
  
      setUser(cookie.user.user[0])
    },[transactions])

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
            <div className="section3">
                <div className="head d-flex">
                  <h4 className='fw-bold'>All Transactions</h4>
                </div>
                <div className="tx_container">
                    { user && transactions.map(data => {
                      if(data.recipient.email == user.email){
                        return(
                          <div className="tx d-flex">
                            <div className="d-flex">
                            <i class="fa-solid fa-arrow-up-right-dots"></i>
                              <div>
                                <p className="fw-semibold text-dark tx_ref  text-capitalize mb-1">{data.sender.firstname} {data.sender.lastname}</p>
                                <p className="tx_ref mb-0">{data.sender.email}</p>
                              </div>
                            </div>

                            <p className="mb-0 tx_amount">
                              +${new Intl.NumberFormat('en-IN', {}).format(data.amount)}.00
                            </p>
                          </div>
                        )
                      }else if(data.sender.email == user.email){
                        return(
                          <div className="tx d-flex">
                          <div className="d-flex">
                          <i class="fa-solid fa-arrow-up-right-dots"></i>
                            <div>
                              <p className="fw-semibold text-dark tx_ref  text-capitalize mb-1">{data.recipient.firstname} {data.recipient.lastname}</p>
                              <p className="tx_ref mb-0">{data.recipient.email}</p>
                            </div>
                          </div>

                          <p className="mb-0 text-danger tx_amount">
                            -${new Intl.NumberFormat('en-IN', {}).format(data.amount)}.00
                          </p>
                        </div>
                        )
                      }
                    })

                    }
                
                </div>
              </div>
        </div>
      }
        
        
        <BottomBar/>
      </>
    )
  }else{
    window.location.href = "/login"
  }
}
