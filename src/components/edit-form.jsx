import CustomForm from "@/components/custom-form";
import { useQueryClient } from "@tanstack/react-query";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const EditForm = ({ urlData, setOpen }) => {
    const queryClient = useQueryClient();

    const onSubmit = async (values, resetField, setLoading) => {
        const body = {
            id: urlData.id,
            newName: values.name,
            newLink: values.link.includes("https://") ? values.link : "https://" + values.link,
        };

        if (values.customLink.length > 0)
            body.newCustomLink = values.customLink;

        setLoading(true);
        
        await fetch(`${SERVER_URL}/urls/edit-url`, {
            method: "PATCH",
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" },
        });

        queryClient.invalidateQueries(['urlStatus']);

        resetField("link");
        resetField("customLink");
        resetField("name");
        setOpen(false);
        setLoading(false);
    };

    return (
        <div>
            <CustomForm onSubmit={onSubmit} urlData={urlData} />
        </div>
    );
}
 
export default EditForm;