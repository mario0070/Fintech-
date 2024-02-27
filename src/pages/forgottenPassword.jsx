import React from 'react'
import bg from "/public/img/bg.avif"
import { Link } from 'react-router-dom'

export default function ForgottenPassword() {
  return (
    <div className='login'>
        <div className="imgBg">
            <img src={bg} alt="" />
        </div>
        <div className="content">
            <div className="form mt-4">
                <h2 className="text-center fw-bold mb-3">Forgotten Password</h2>
                <form action="">
                    <div class="input-group mb-4">
                        <span class="input-group-text"><i class="fa-solid fa-lock"></i></span>
                        <input type="text" class="" placeholder="Email" />
                    </div>

                    <div class="input-group mb-4">
                        <span class="input-group-text"><i class="fa-solid fa-lock"></i></span>
                        <input type="text" class="" placeholder="New Password" />
                    </div>

                    <div class="input-group mb-4">
                        <span class="input-group-text"><i class="fa-solid fa-lock"></i></span>
                        <input type="text" class="" placeholder="Confirm Password" />
                    </div>

                    <button className='btn mt-3 mb-3'>Update Password</button>

                    <p className="text-center">Don't have an account? <Link to="/register">Signup instead</Link></p>
                </form>
            </div>
        </div>
    </div>
  )
}
