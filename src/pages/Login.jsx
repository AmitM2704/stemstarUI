import { useState } from "react"
import api from "../services/api"
//import { useState } from "react"
import { Music2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleLogin() {

    try {

        setLoading(true)

        const response = await api.post(
            "/login",
            {
                email,
                password
            }
        )

        localStorage.setItem(
            "token",
            response.data.access_token
        )
        navigate("/dashboard")

        alert("Login successful")

    } catch (error) {

        alert("Login failed")
        console.error(error)

    } finally {

        setLoading(false)
    }
}
    return (

    <div className="
        min-h-screen
        bg-gradient-to-br
        from-black
        via-zinc-950
        to-zinc-900
        flex
        items-center
        justify-center
        p-6
    ">

        <div className="
            w-full
            max-w-md
            bg-zinc-900/80
            backdrop-blur-xl
            border
            border-zinc-800
            rounded-3xl
            shadow-2xl
            p-8
            flex
            flex-col
            gap-6
        ">

            <div className="
                flex
                flex-col
                items-center
                text-center
                gap-3
            ">

                <div className="
                    w-16
                    h-16
                    rounded-2xl
                    bg-white
                    flex
                    items-center
                    justify-center
                ">
                    <Music2
                        className="text-black"
                        size={30}
                    />
                </div>

                <div>

                    <h1 className="
                        text-white
                        text-4xl
                        font-bold
                        font-serif
                    ">
                        StemStar
                    </h1>

                    <p className="
                        text-zinc-400
                        mt-2
                    ">
                        AI Stem Separation Platform
                    </p>

                </div>

            </div>

            <div className="
                flex
                flex-col
                gap-4
            ">

                <input
                    className="
                        bg-zinc-800
                        border
                        border-zinc-700
                        text-white
                        p-4
                        rounded-xl
                        outline-none
                        focus:border-white
                        transition
                    "
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="
                        bg-zinc-800
                        border
                        border-zinc-700
                        text-white
                        p-4
                        rounded-xl
                        outline-none
                        focus:border-white
                        transition
                    "
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="
                        bg-white
                        text-black
                        p-4
                        rounded-xl
                        font-semibold
                        hover:opacity-90
                        transition
                    "
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {
                        loading
                        ? "Signing in..."
                        : "Login"
                    }
                </button>

            </div>

            <div className="
                text-center
                text-zinc-500
                text-sm
            ">
                Don't have an account? Register
            </div>

        </div>

    </div>
)}