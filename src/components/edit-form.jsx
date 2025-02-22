import CustomForm from "@/components/custom-form";

const EditForm = () => {
    const onSubmit = (values) => {
        console.log(values);
    };

    return (
        <div>
            <CustomForm onSubmit={onSubmit} />
        </div>
    );
}
 
export default EditForm;