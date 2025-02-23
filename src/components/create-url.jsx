import { Card, CardContent } from "@/components/ui/card";
import CustomForm from "@/components/custom-form";

import useGetIp from "@/hooks/use-get-ip";

import { useQueryClient } from "@tanstack/react-query";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const CreateURL = () => {
    const { ip } = useGetIp();
    const queryClient = useQueryClient();

    const onSubmit = async (values, resetField, setLoading) => {
        const body = {
            ipId: ip,
            name: values.name,
            link: values.link,
        };

        if (values.customLink.length > 0)
            body.customLink = values.customLink;

        setLoading(true);

        await fetch(`${SERVER_URL}/urls/create-url`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" },
        });

        queryClient.invalidateQueries(['urlStatus']);

        resetField("link");
        resetField("customLink");
        resetField("name");
        setLoading(false);
    };
    
    return (
        <Card className="bg-transparent backdrop-blur-sm">
            <CardContent>
                <CustomForm onSubmit={onSubmit} urlData={null} />
            </CardContent>
        </Card>
    );
}
 
export default CreateURL;