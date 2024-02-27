import React from 'react'
import { Link } from 'react-router-dom'
import "/public/css/navbar.css"

export default function BottomBar() {
  return (
    <div class="fixed-bottom bottom d-flex">
      <li className="list-unstyled"><Link to="/"><i class="fa-solid fa-house"></i>Overview</Link></li>
      <li className="list-unstyled"><Link to="/transactions"><i class="fa-solid fa-sliders"></i>Transactions</Link></li>
      {/* <li className="list-unstyled"><Link to="/cards"><i class="fa-brands fa-cc-mastercard"></i>My Cards</Link></li> */}
      <li className="list-unstyled"><Link to="/settings"><i class="fa-solid fa-gear"></i>Settings</Link></li>
    </div>
  )
}
