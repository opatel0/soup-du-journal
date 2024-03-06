import { Link } from 'react-router-dom'
import './styles.css'

export default function LandingPage() {
    return (
        <div 
            className="flex-row landing h-screen w-screen md:flex md:justify-center md:items-center"
        >
            <div className="flex justify-center items-center h-1/2 md:h-full my-4 md:mr-8"><h1 className="header">Soup<br/>du<br/>Journal</h1></div>
            <div className="formButtons md:ml-8 flex flex-col justify-center items-center text-center border-1 border-solid border-black">
                <Link to="/auth/signup"><button className="bg-white mb-8 p-4 text-2xl rounded-md">Sign Up</button></Link>
                <Link to="/auth/login"><button className="bg-white mt-8 p-4 text-2xl rounded-md">Log In</button></Link>
            </div>
        </div>
    )
}