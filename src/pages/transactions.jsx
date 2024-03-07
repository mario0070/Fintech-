import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BottomBar from '../components/bottombar'
import Topbar from '../components/topar'
import loading from "/public/img/loading.png"
import { useCookies } from 'react-cookie'
import Cookies from 'js-cookie';
import axios from 'axios';
import numeral from 'numeral';

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
        email : cookie.user.user.email ?? cookie.user.user[0].email
      })
      .then(res => {
        setuserBalance(res.data.users[0].balance)
      })
      .catch(err => {
        console.log(err)
      })
  
      setUser(cookie.user.user[0] ?? cookie.user.user)
    },[])

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
                              <div>
                                <p className="mb-1"><i class="fa-solid fa-arrow-trend-up text-success"></i> Recieved from</p>
                                <p className="fw-semibold text-dark tx_ref  text-capitalize mb-1">${data.sender.email.split("@")[0]}</p>
                                <p className="tx_ref mb-1">{new Date(data.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                <p className="mb-0 tx_ref" style={{fontSize:"12px"}}>Completed</p>
                              </div>
                            </div>

                            <p className="mb-2 fw-bold tx_amount">
                              +${numeral(data.amount).format('0,0.00')}   <br /> <br />
                              {/* <span className='text-success text-end'>${numeral(userBalance).format('0,0.00')}</span> */}
                            </p>
                          </div>
                        )
                      }else if(data.sender.email == user.email){
                        return(
                          <div className="tx d-flex">
                          <div className="d-flex">
                            <div>
                              <p className="mb-1"><i class="fa-solid fa-arrow-trend-down text-danger"></i> Transfer to</p>
                              <p className="fw-semibold text-dark tx_ref  text-capitalize mb-1">${data.recipient.email.split("@")[0]}</p>
                              <p className="tx_ref mb-1">{new Date(data.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                              <p className="mb-0 tx_ref" style={{fontSize:"12px"}}>Completed</p>
                            </div>
                          </div>

                          <p className="mb-2 text-danger fw-bold tx_amount">
                            -${numeral(data.amount).format('0,0.00')} <br />     <br />                      
                              {/* <span className='text-success text-end'>${numeral(userBalance).format('0,0.00')}</span> */}
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
