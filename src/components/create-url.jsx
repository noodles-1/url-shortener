import { Card, CardContent } from "@/components/ui/card";

import CustomForm from "@/components/custom-form";

const CreateURL = () => {
    const onSubmit = (values) => {
        console.log(values);
    };
    
    return (
        <Card className="bg-transparent backdrop-blur-sm">
            <CardContent>
                <CustomForm onSubmit={onSubmit} />
            </CardContent>
        </Card>
    );
}
 
export default CreateURL;