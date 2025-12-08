"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { Login, register } from "@/services/auth";
import LoadingSpinnerButton from "@/ui/LoadingSpinnerButton";
import Modal from "@/ui/Modal";
const AuthPage = () => {

    const [type, settype] = useState<"login" | "register">("login");
    const [showPassword, setPassword] = useState(false);
    const termsCheckBoxref = useRef<HTMLInputElement>(null)
    const [errors, setError] = useState<Record<string, string>>({})
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    const [formData, setformData] = useState({
        name: "",
        number: "",
        email: "",
        password: "",

    })

    const isLogin = type === "login";
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError({});
        setLoading(true)


        try {
            let response;

            if (isLogin) {
                // Login flow
                response = await Login({
                    email: formData.email,
                    password: formData.password
                });
            } else {
                // Register flow
                if (!termsCheckBoxref.current?.checked) {
                    setError({
                        terms: "Kamu harus menyetujui Terms & Privacy"
                    });
                    setLoading(false); // Jangan lupa set loading false
                    return;
                }

                response = await register({
                    ...formData,
                    number: `+62${formData.number}`});
            }

            const token = response.data.token

            localStorage.setItem("token", token)
            console.log({response, token})
            // router.push("/dashboard")


        } catch (error) {
            if (error instanceof Error) {
                setError({ general: error.message })
            }

        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg=gray-100 px-4 py-12">
            {/* INi BAGIAN KIRI CARD*/}
            <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-7xl
             bg-white shadow-2xl rounded-2xl overflow-hidden">

                {/* INi JUDUL*/}

                <div className="px-8 sm:p-12 min-h-[750px] flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {isLogin ? "Sign In" : "Sign Up"}

                    </h2>
                    <p className="text-sm text-gray-600 mb-4">
                        {isLogin ? "Welcome Back!" : "let's Sign Up To Get Started"}
                    </p>
                    {/* FORM INPUT UNTUK REGISTER DAN LOGIN*/}
                    {/* INi MUNCUL KETIKA KONDISI NYA REGISTER*/}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input
                                        type="text" name="" id="" placeholder="Jonh Doe" value={formData.name}
                                        onChange={(e) => setformData({
                                            ...formData, name: e.target.value
                                        })}
                                        className="w-full mt-1 px-4 py-2 border rounded-md border-gray-400" />
                                </div>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Phone Number
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center justify-center pl-3 pt-1 text-gray-500 text-sm">
                                            +62
                                        </div>
                                        <input
                                            type="number" name="" id="" placeholder="81234...." value={formData.number}
                                            onChange={(e) => setformData({
                                                ...formData, number: e.target.value
                                            })}
                                            className="pl-12 w-full mt-1 px-4 py-2 border rounded-md border-gray-400"
                                        />
                                    </div>

                                </div>
                            </div>


                        )}
                        {/* INi MUNCUL KETIKA KONDISI NYA LOGIN ATAU REGISTER*/}
                        <div className="">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" value={formData.email} onChange={(e) => setformData({...formData, email: e.target.value})}
                            placeholder="alicebob@gmail.com" 
                            className="w-full mt-1 px-4 py-2 border rounded-md border-gray-400" />
                        </div>
                        <div className="">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>

                            <div className="relative">
                                <input type={showPassword ? "text" : "password"} 
                                value={formData.password}
                                onChange={(e) => setformData({...formData, password: e.target.value})}
                                placeholder="**********"
                                    className="w-full mt-1 px-4 py-2 border rounded-md border-gray-400" />


                                <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2
                            text-gray-600" onClick={() => setPassword(!showPassword)}>
                                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                </button>
                            </div>
                        </div>

                            {errors.general && (
                                <div className="text-red-500 text-sm mt-1">{errors.general}</div>
                            )}

                        {!isLogin && (
                            <div className="flex items-center">
                                <input ref={termsCheckBoxref} id="terms" type="checkbox"
                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />

                                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                                    I agree to the {" "}
                                    <button type="button" className="text-indigo-600 hover:underline cursor-pointer"
                                    onClick={() => (setShowModal(!showModal))}>
                                        Terms And Privacy
                                    </button>
                                </label>

                            </div>
                        )}

                        {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms}</p>}


                        {/* BUTTON SUBMIT FORM*/}
                        <button type="submit"
                            disabled={loading}
                            className={`w-full py-2 px-4 rounded-md flex items-center justify-center gap-2
                         ${loading ? "bg-indigo-600 cursor-not-allowed text-white" : "bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"}`}>
                            {loading ? (
                                <>
                                    <LoadingSpinnerButton />
                                    processing...
                                </>
                            ) : (
                                isLogin? "Let's Explore": "get started"
                            )}


                        </button>
                        {/* INi BUTTON UNTUK MENGUBAH KONDISI REGISTER DAN LOGIN*/}
                        <p className="mt-6 text-sm text-center text-gray-600">
                            {isLogin ? (
                                <>
                                    Dont Have an account? {" "}
                                    <button
                                        type="button" className="text-indigo-600 hover:underline cursor-pointer"
                                        onClick={() => {
                                            settype("register")
                                        }}>Sign Up</button>
                                </>
                            ) : (
                                <>
                                    Already have an account?  {" "}
                                    <button
                                        type="button" className="text-indigo-600 hover:underline cursor-pointer"
                                        onClick={() => {
                                            settype("login")
                                        }}>Sign In</button>
                                </>

                            )}

                        </p>


                    </form>


                </div>
                {/* BAGIAN KANAN CARD GAMBAR*/}
                <div className="hidden-md:block bg-indigo-600 relative min-h-[750px] w-full">
                    <Image src="/images/auth-img.png" alt="auth image"
                        fill
                        className="object-cover"
                        priority />

                </div>

            </div>
            {showModal && (
                <Modal 
                    type="information"
                    message="By using this application, you agree to our Terms and Privacy Policy.
                            we may collect usage data to improve your experience. we do not share your
                            data with third parties without your consent. For full details, visit our legal page."
                            onOk={() => {
                                setShowModal(false)
                                if(termsCheckBoxref.current) termsCheckBoxref.current.checked = true;
                            }}
                            onCancel={() => setShowModal(false)}
                />
            )}
        </div>
    )
}

export default AuthPage;