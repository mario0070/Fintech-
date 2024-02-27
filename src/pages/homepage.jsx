import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "/public/css/style.css"
import loading from "/public/img/loading.png"
import BottomBar from '../components/bottombar'
import Topbar from '../components/topar'
import { useCookies } from 'react-cookie'
import Cookies from 'js-cookie';
import axios from 'axios';
import Send from '../utils/send'

export default function Homepage() {
  const [cookie, setCookie] = useCookies("")
  const [user, setUser] = useState([])
  const [isloadin,setLoading] = useState(true)
  const [transactions, settransactions] = useState([])
  const [accountFetch,setAccountFetch] = useState(false)
  const [isFound,setisFound] = useState(false)
  const [userFetch,setuserFetch] = useState("")
  const [recipient,setRecipient] = useState("")
  const [sender,setSender] = useState("")
  const [userBalance,setuserBalance] = useState(0)
  const [actions,setActions] = useState("")

  useEffect(()=>{
    setUser(cookie.user.user[0] || cookie.user.user)
  },[])

  const alert = (icon, msg) => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: icon,
        title: msg
      });
  }

  const gettingActions = (actions) => {
    setActions(actions)
  }

  const openSheet = () => {
    const content = document.getElementById("sheet")
    const bottom_sheet = document.getElementById("bottom_sheet")
    content.classList.add("remove")
    bottom_sheet.classList.add("fades")
    
  }

  const closeSheet = () => {
    const content = document.getElementById("sheet")
    const bottom_sheet = document.getElementById("bottom_sheet")
    content.classList.remove("remove")
    setTimeout(() =>{
      bottom_sheet.classList.remove("fades")
    }, 300)
  }

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
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })

      send.post("/user/get-user",{
        email : user.email
      })
      .then(res => {
        setuserBalance(res.data.users[0].balance)
      })
      .catch(err => {
        console.log(err)
      })
    },[transactions, userBalance])

    const sendingTX = (e) => {
      e.preventDefault()
      e.target[2].innerHTML = `processing <div class="spinner-border spinner-border-sm"></div>`
      let amount = e.target[1].value
      if(amount <= userBalance){
        send.post("/transact/send",{
          amount : amount,
          recipient : recipient,
          sender : sender,
        }).then(tx => {
          e.target[2].innerHTML = "Confirm Transaction"
          Swal.fire({
            title: "Money sent",
            text: `You sent $${new Intl.NumberFormat('en-IN', {}).format(amount)}.00 to ${userFetch}.`,
            icon: "success",
            background : "azure"
          });
          e.target[1].value = ""
          e.target[0].value = ""        
          setuserFetch("")
          closeSheet()
        })
        .catch(err => {
          e.target[2].innerHTML = "Confirm Transaction"
          console.log(err)
          alert("error", "An error occur, try again!!")
        })
      }else{
        e.target[2].innerHTML = "Confirm Transaction"
        alert("error", "Insufficient funds")
      }
     
    }

    const findUser = (e) => {
      setAccountFetch(true)
      send.post("/user/get-user",{
        email : e.target.value
      })
      .then(res => {
        setuserFetch(`${res.data.users[0].firstname} ${res.data.users[0].lastname}`)
        setAccountFetch(false)
        setisFound(true)
        setRecipient(res.data.users[0]._id )
        setSender(user.id)
        

      })
      .catch(err => {
        setAccountFetch(false)
        setisFound(false)
        console.log(err)
      })
    }

    const depositTX = (e) => {
      e.preventDefault()
      e.target[2].innerHTML = `processing <div class="spinner-border spinner-border-sm"></div>`
      let amount = e.target[1].value
      let reciever = e.target[0].value

      send.post("/transact/deposit",{
        amount : amount,
        email : reciever
      }).then(tx => {
        e.target[2].innerHTML = "Confirm Transaction"
        Swal.fire({
          title: "Money Recieved",
          text: `Deposit of $${new Intl.NumberFormat('en-IN', {}).format(amount)}.00 to your account was successful`,
          icon: "success",
          background : "azure"
        });
        e.target[1].value = ""
        closeSheet()
      })
      .catch(err => {
        e.target[2].innerHTML = "Confirm Transaction"
        console.log(err)
        alert("error", "An error occur, try again!!")
      })
     
    }

    return (
      <>
      <Topbar user={user} gettingActions={gettingActions} userBalance={userBalance} openSheet={openSheet}/>
        {isloadin ?  

        <div className='loading'>
            <div className="img text-center ">
              <img src={loading} width={50} alt="" />
            </div>
        </div>

        :
        <div className="homepage contents">
          <div className="bg"></div>

          <Send depositTX={depositTX} user={user} actions={actions} openSheet={openSheet} sendingTX={sendingTX} isFound={isFound} userFetch={userFetch} accountFetch={accountFetch} closeSheet={closeSheet} findUser={findUser}/>

          <div className="content">

            <div className="section1">
              <div className="head d-flex">
                <div className="bal">
                  <h5 className="user_fullname">{`Hi, ${user.lastname}.`}</h5>
                  <p className="mb-1 mt-3">Total Balance</p>
                  <h4 className="fw-bold mb-0 bal_amount"><span className='kobo text-muted'>$</span>{new Intl.NumberFormat('en-IN', {}).format(userBalance)}.<span className='kobo'>00</span> </h4>
                </div>

                <div className="plus" onClick={() => {openSheet(); gettingActions("send")}}>
                  <i className="fa-solid fa-plus"></i>
                </div>
              </div>

              <div className="actions d-flex">
                <div className="action" onClick={() => {openSheet(); gettingActions("withdraw")}}>
                  <button className='btn withdraw'><i className="fa-solid fa-arrow-up-right-dots"></i></button>
                  <p className="mb-o">Withdraw</p>
                </div>
                <div className="action" onClick={() => {openSheet(); gettingActions("send")}}>
                  <button className='btn send'><i className="fa-solid fa-arrow-right"></i></button>
                  <p className="mb-o">Send</p>
                </div>
                <div className="action">
                  <Link to="/cards"><button className='btn cards'><i className="fa-brands fa-cc-discover"></i></button>
                  <p className="mb-o">Cards</p></Link>
                </div>
                <div className="action" onClick={() => {openSheet(); gettingActions("deposit")}}>
                  <button className='btn bg-warning'><i className="fa-solid fa-arrow-down"></i></button>
                  <p className="mb-o">Deposit</p>
                </div>
              </div>
            </div>


            <div className="section3 mt-4">
              <div className="head d-flex">
                <h4 className='fw-bold'>Transactions</h4>
                <p className="mb-0"><Link to="/transactions" >View All</Link></p>
              </div>

              <div className="tx_container">
                {transactions.map((data, index) => {
                  if(index <=  2){
                    if(data.recipient.email == user.email){
                      return(
                        <div className="tx d-flex">
                          <div className="d-flex">
                          <i class="fa-solid fa-arrow-up-right-dots"></i>
                            <div>
                              <p className="fw-semibold tx_ref text-dark text-capitalize mb-1">{data.sender.firstname} {data.sender.lastname}</p>
                              <p className="tx_ref mb-0">{data.sender.email}</p>
                            </div>
                          </div>

                          <p className="mb-0 tx_amount">
                            +${new Intl.NumberFormat('en-IN', {}).format(data.amount)}.00
                          </p>
                        </div>
                      )
                    }
                    else if(data.sender.email == user.email){
                      return(
                        <div className="tx d-flex">
                          <div className="d-flex">
                          <i class="fa-solid fa-arrow-up-right-dots"></i>
                            <div>
                              <p className="fw-semibold text-dark tx_ref text-capitalize mb-1">{data.recipient.firstname} {data.recipient.lastname}</p>
                              <p className="tx_ref mb-0">{data.recipient.email}</p>
                            </div>
                          </div>

                          <p className="mb-0 text-danger tx_amount">
                            -${new Intl.NumberFormat('en-IN', {}).format(data.amount)}.00
                          </p>
                        </div>
                      )
                    }  
                  }                
                })}
              </div>
            </div>

            <div className="section4">
              <div className="head d-flex">
                  <h4>My Cards</h4>
                  <p className="mb-0"><Link to="/cards" >View All</Link></p>
              </div>

              <div className="cards d-flex">
                <div className="my_card">
                    <div className="">
                        <p className="mb-1">Balance</p>
                        <h4>${new Intl.NumberFormat('en-IN', {}).format(userBalance)}.00</h4>
                        <p className="mb-1">Card Number</p>
                        <h4 className="mb-4">****** 4059</h4>
                        <div className="exp d-flex">
                            <div className="">
                              <p className="mb-1">Expiry</p>
                              <p>12/25</p>
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
