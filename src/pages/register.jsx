import React, { useRef, useState } from 'react'
import bg from "/public/img/bg.avif"
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from '../utils/axios'

export default function Register() {
    const [input, setInput] = useState("")
    const [cookie, setCookie] = useCookies("")
    const email = useRef("")
    const password = useRef("")
    const fullname = useRef("")
    const confirm_password = useRef("")

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
        var btn = document.getElementById("reg")
        btn.innerHTML = `Processing <div class="spinner-border spinner-border-sm"></div>`
        const name = fullname.current.value.split(" ")
        if(confirm_password.current.value != password.current.value){
            alert("error", "Password does not match")
            btn.innerHTML = "Sign up"
        }else if(confirm_password.current.value.length <= 5){
            alert("error", "minimum of six characters")
            btn.innerHTML = "Sign up"
        }
        else{
            
            axios.post("/user/signup",{
                "email" : email.current.value,
                "password" : password.current.value,
                "firstname" : name[0],
                "lastname" : name[1],
            })
            .then(res => {
                if(res.data.message == "user already exist"){
                    alert("warning", "User already exist")
                }else{
                    alert("success", "Signup successfully")
                    setTimeout(()=>{
                        window.location.href = "/"
                    },1000)
                    setCookie("user", res.data)
                }
                btn.innerHTML = "Sign in"
            })
            .catch(err => {
                alert("error", "invalid credentials")
                btn.innerHTML = "Sign in"
                console.log(err)
            })
        }
    }

    return (
        <div className='login'>
        <div className="imgBg">
            <img src={bg} alt="" />
        </div>
        <div className="content">
            <div className="form mt-3">
                <h2 className="text-center fw-bold mb-3">Sign up</h2>
                <form action="" onSubmit={submit}>
                    <div class="input-group mb-4">
                        <span class="input-group-text"><i class="fa-regular fa-user"></i></span>
                        <input ref={fullname} required onChange={e => setInput(e.target.value)} type="text" class="" placeholder="Fullname" />
                    </div>

                    <div class="input-group mb-4">
                        <span class="input-group-text"><i class="fa-regular fa-envelope"></i></span>
                        <input ref={email} required onChange={e => setInput(e.target.value)} type="email" class="" placeholder="Email" />
                    </div>

                    <div class="input-group mb-4">
                        <span class="input-group-text"><i class="fa-solid fa-lock"></i></span>
                        <input ref={password} required onChange={e => setInput(e.target.value)} type="password" class="" placeholder="Password" />
                    </div>

                    <div class="input-group mb-4">
                        <span class="input-group-text"><i class="fa-solid fa-lock"></i></span>
                        <input ref={confirm_password} required onChange={e => setInput(e.target.value)} type="password" class="" placeholder="Confirm Password" />
                    </div>

                    <button className='btn mt-3 mb-3' id="reg">Sign up</button>
                    <div className="d-flex mb-5">
                        <input type="checkbox" name="" id="" />
                        <p className="mb-0 mx-2">Keep me signed in</p>
                    </div>

                    <p className="text-center">Already have an account? <Link to="/login">Signin instead</Link></p>
                </form>
            </div>
        </div>
    </div>
    )
}
