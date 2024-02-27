import React from 'react'
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'

export default function TopBAr({user, userBalance, openSheet, gettingActions}) {
  const [logOut, setlogout, removeLogout] = useCookies(["user"])

  const Logout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are logging out your account !!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#6236FF",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log out !!"
    }).then((result) => {
      if (result.isConfirmed) {
        removeLogout(["user"])
        Swal.fire({
          title: "Deleted!",
          text: "You are logged out",
          icon: "success"
        });
      }
    });
  }

  return (
    <div class="fixed-top bottom top d-flex">
      <div className="menu">
        <i class="fa-solid fa-bars text-white" data-bs-toggle="offcanvas" data-bs-target="#menu"></i>
      </div>

      <div className="name">
        <p className="mb-0 fw-bold">BANK OF AMERICA</p>
      </div>

      <div className="d-flex">
        <li className="list-unstyled"><Link><i class="text-white fa-regular fa-bell"></i></Link></li>
        <li className="list-unstyled"><Link><i class="text-white fa-regular fa-user"></i></Link></li>
      </div>

      <div class="offcanvas offcanvas-start" id="menu">

        <div class="offcanvas-header">
          <div className="d-flex">
            <i class="fa-regular fa-user"></i>
            <div className="">
              <p className="mb-2 text-capitalize fw-bold">{ user ?
              `${user.firstname } ${user.lastname }` : "Name is not set"}</p>
              <p className="mb-0 user_email">{user ? user.email : ""}</p>
            </div>
          </div>
          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
        </div>

        <div class="offcanvas-body">
            <div className="head">
                <p className="mb-1 fs-3">Balance</p>
                <h4 className="fw-bold">₦{new Intl.NumberFormat('en-IN', {}).format(userBalance)}.<span>00</span></h4>
                <div className="actions d-flex">
                    <div className="btn" data-bs-dismiss="offcanvas" onClick={() => {openSheet(), gettingActions("deposit")}}>
                      <i class="fa-solid fa-arrow-down"></i>
                      <p className="mb-0">Deposit</p>
                    </div>
                    <div className="btn" data-bs-dismiss="offcanvas" onClick={() => {openSheet(), gettingActions("withdraw")}}>
                    <i class="fa-solid fa-arrow-up-right-dots"></i>
                      <p className="mb-0">Withdraw</p>
                    </div>
                    <div className="btn" data-bs-dismiss="offcanvas" onClick={() => {openSheet(), gettingActions("send")}}>
                      <i class="fa-solid fa-arrow-right"></i>
                      <p className="mb-0">Send</p>
                    </div>
                    <a href='/cards' className="btn">
                      <i class="fa-brands fa-cc-discover"></i>
                      <p className="mb-0">My Cards</p>
                    </a >
                </div>
            </div>

            <div className="canvas_actions">
              <a href="/" className="d-flex">
                <p className="mb-0">Overview</p>
                <p className="mb-0"><i class="fa-solid fa-arrow-right"></i></p>
              </a>

              <a href="/transactions" className="d-flex">
                <p className="mb-0">Transactions</p>
                <p className="mb-0"><i class="fa-solid fa-arrow-right"></i></p>
              </a>

              <a href="/cards" className="d-flex">
                <p className="mb-0">My Cards</p>
                <p className="mb-0"><i class="fa-solid fa-arrow-right"></i></p>
              </a>

              <a href="/settings" className="d-flex">
                <p className="mb-0">Account Settings</p>
                <p className="mb-0"><i class="fa-solid fa-arrow-right"></i></p>
              </a>

              <a onClick={Logout} className="d-flex">
                <p  className="mb-0">Log Out</p>
                <p className="mb-0"><i class="fa-solid fa-arrows-turn-to-dots"></i></p>
              </a>
            </div>            
        </div>

      </div>
    </div>
  )
}
