import { useEffect, useState } from "react";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const useGetIp = () => {
    const [ip, setIp] = useState(null);
    
    useEffect(() => {
        const handleIp = async () => {
            const ipResponse = await fetch("https://api.ipify.org/?format=json");
            const ipData = await ipResponse.json();

            const ipExistsResponse = await fetch(`${SERVER_URL}/ips/${ipData.ip}`);
            const ipExists = await ipExistsResponse.json();

            if (!ipExists) {
                await fetch(`${SERVER_URL}/ips/create-ip`, {
                    method: "POST",
                    body: JSON.stringify({ ip: ipData.ip }),
                    headers: { "Content-Type": "application/json" },
                });
            }

            setIp(ipData.ip);
        };
        handleIp();
    }, []);

    return { ip };
}
 
export default useGetIp;