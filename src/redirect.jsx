import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const Redirect = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        const fetchLink = async () => {
            const response = await fetch(`${SERVER_URL}/urls/get-custom-link/${pathname.substring(1)}`);
            const data = await response.json();
            if (data.link !== null)
                window.location.replace(data.link);
            else
                navigate("/not-found");
        };
        fetchLink();
    }, [navigate, pathname]);
    
    return;
}
 
export default Redirect;