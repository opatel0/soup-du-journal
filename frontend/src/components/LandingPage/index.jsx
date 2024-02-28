import { Link } from 'react-router-dom'

export default function LandingPage() {
    return (
        <>
            <Link to="/auth/signup"><button>Sign Up</button></Link>
            <Link to="/auth/login"><button>Log In</button></Link>
        </>
    )
}