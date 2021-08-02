import { CheckCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import Header from "../components/Header" ;


function success() {
    const router = useRouter();
    return (
        <div className="h-screen bg-gray-100">
            <Header />   
            <main className="max-w-screen-lg mx-auto">
                <div className="flex flex-col p-10 bg-white">
                    <div className="flex justify-center mb-5 space-x-2 justify-items-center">
                        <CheckCircleIcon className="h-10 text-green-500"  />
                        <h1 className="text-3xl">Thank you for that, your oder has been confirmed</h1>
                    </div>
                    <p>Some thing look sick</p>
                    <button className="mt-8 button"
                    onClick={() => router.push("/oders")}
                    >Go to my Oders</button>
                </div>
            </main>         
        </div>
    )
}

export default success
