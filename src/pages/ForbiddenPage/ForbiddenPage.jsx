import {BsFillExclamationTriangleFill} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import "./ForbiddenPage.css";

const ForbiddenPage = () => {

    let navigate = useNavigate();

    return (
        <div className={"text-center"} id={"forbiddenPage"}>
            <h1 className={"mt-4 mb-5"}>Access denied...</h1>
            <BsFillExclamationTriangleFill className={"forbidden-icon"} size={200}/>
            <div className={"my-3"}>You are not allowed on this page!</div>
            <button className={"btn btn-primary w-100"} onClick={() => navigate("/home")}>Go back</button>
        </div>)
}

export default ForbiddenPage;

