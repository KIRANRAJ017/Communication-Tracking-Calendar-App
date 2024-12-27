import { Link } from "react-router-dom"
import "./homePage.css"

export default function HomePage(){
    return(
        <div className="home">
            <Link to='/register'>Register </Link>
            <Link to='/login'>login</Link>
        </div>
    )
}