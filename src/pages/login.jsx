import React, { useRef, useState } from 'react'
import bg from "/public/img/bg.avif"
import { Link } from 'react-router-dom'
import axios from '../utils/axios'
import { useCookies } from 'react-cookie'

export default function Login() {
    const [input, setInput] = useState("")
    const [cookie, setCookie] = useCookies("")
    const email = useRef("")
    const password = useRef("")

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

    const submit = (e) => {
        e.preventDefault()
        var btn = document.getElementById("login")
        btn.innerHTML = `Processing <div class="spinner-border spinner-border-sm"></div>`

        axios.post("/user/login",{
            "email" : email.current.value,
            "password" : password.current.value,
        })
        .then(res => {
            alert("success", "Signed in successfully")
            setTimeout(()=>{
                window.location.href = "/"
            },1000)
            setCookie("user", res.data)
            btn.innerHTML = "Sign in"
        })
        .catch(err => {
            alert("error", "invalid credentials")
            btn.innerHTML = "Sign in"
            console.log(err)
        })
    }

  return (
    <div className='login'>
        <div className="imgBg">
            <img src={bg} alt="" />
        </div>
        <div className="content">
            <div className="form mt-4">
                <h2 className="text-center fw-bold mb-3">Login in</h2>
                <div className="text-center mb-4">
                    <img src="https://www1.bac-assets.com/homepage/spa-assets/images/assets-images-global-logos-bac-logo-v2-CSX3648cbbb.svg" alt="" />
                </div>
                <form action="" onSubmit={submit} className=''>
                    <div class="input-group mb-2 w-100">
                        <span class="input-group-text"><i class="fa-regular fa-envelope"></i></span>
                        <input required ref={email} onChange={e => setInput(e.target.value)} type="email" class="" placeholder="Email" />
                    </div>

                    <div class="input-group mb-5">
                        <span class="input-group-text"><i class="fa-solid fa-lock"></i></span>
                        <input required ref={password} onChange={e => setInput(e.target.value)} type="password" class="" placeholder="Password" />
                    </div>

                    <button id='login' className='btn mt-3 mb-3'>Sign in</button>
                    <div className="d-flex mb-5">
                        <input type="checkbox" name="" id="" />
                        <p className="mb-0 mx-2">Keep me signed in</p>
                    </div>

                 <p className="text-center">Don't have an account? <Link to="/register" className='text-dark'>Signup instead</Link></p>
                </form>
            </div>
        </div>
    </div>
  )
}
