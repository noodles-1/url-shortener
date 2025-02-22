import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { 
    Card,
    CardContent
} from "@/components/ui/card";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

const formSchema = z.object({
    link: z
        .string()
        .min(1, { message: "Link cannot be empty." })
        .refine(e => /(https?:\/\/)?([a-zA-Z0-9-]+\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?/.test(e), {
            message: "Not a valid URL"
        })
        .transform(e => e.toLowerCase()),
    customLink: z
        .string()
        .max(30, { message: "Maximum of 30 characters." })
        .refine(e => e.length === 0 || !/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(e), {
            message: "URL should only contain letters and numbers."
        }),
    name: z
        .string()
        .refine(e => /[A-Za-z0-9 ]+/.test(e)  && !/[-]+/.test(e), {
            message: "Name should only contain letters and numbers."
        })
});

const CreateURL = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            link: "",
            customLink: "",
            name: "",
        }
    });

    const customLinkValue = useWatch({
        control: form.control,
        name: "customLink",
    });

    const customUrl = customLinkValue.trim().replace(/ /g, "-").replace(/[-]+/g, "-").substring(0, 30);

    const onSubmit = (values) => {
        console.log(values);
    };
    
    return (
        <Card className="bg-transparent backdrop-blur-sm">
            <CardContent>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-rows-2 gap-2 items-start">
                        <section className="grid grid-cols-2 gap-4 mt-4 items-start">
                            <FormField
                                control={form.control}
                                name="link"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-200 text-[12px]"> 
                                            Link <span className="text-destructive-foreground"> * </span> 
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                className="text-gray-300"
                                                placeholder="www.example.com" 
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="customLink"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-200 text-[12px]"> Custom URL </FormLabel>
                                        <FormControl>
                                            <Input 
                                                className="text-gray-300"
                                                placeholder="my-custom-url"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />
                        </section>
                        <section className="grid grid-cols-2 gap-4 items-start">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-200 text-[12px]"> 
                                            Name <span className="text-destructive-foreground"> * </span> 
                                        </FormLabel>
                                        <FormControl>
                                        <Input 
                                                className="text-gray-300"
                                                placeholder="My custom URL" 
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-[10px]" />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="bg-[#37439e] hover:bg-[#313761] hover:cursor-pointer mt-[26px] text-gray-200"> 
                                Generate URL 
                            </Button>
                        </section>
                    </form>
                </Form>
                <p className="text-gray-300 text-sm mt-4"> 
                    <strong> Your generated URL: </strong>
                    chowlong.me/
                    <strong className="relative left-[-2px] text-[#abafff]"> {customUrl.length > 0 ? customUrl : "<auto-generated>"} </strong>
                </p>
            </CardContent>
        </Card>
    );
}
 
export default CreateURL;