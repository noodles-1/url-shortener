import { useState } from "react";

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
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

import { Loader2 } from "lucide-react";
import useGetIp from "@/hooks/use-get-ip";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const CustomForm = ({ onSubmit, urlData }) => {
    const { ip } = useGetIp();
    const [loading, setLoading] = useState(false);
    
    const formSchema = z.object({
        link: z
            .string()
            .min(1, { message: "Link cannot be empty." })
            .refine(e => /(https?:\/\/)([a-zA-Z0-9-]+\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?/.test(e), {
                message: "Not a valid URL"
            }),
        customLink: z
            .string()
            .max(30, { message: "Maximum of 30 characters." })
            .refine(e => e.length === 0 || !/[`!@#$%^&*()_+=[\]{};':"\\|,.<>/?~]/.test(e), {
                message: "URL should only contain letters and numbers."
            })
            .refine(e => {
                if (e.length === 0)
                    return true;
                return e !== "not-found";
            }, {
                message: "Custom link not allowed."
            })
            .refine(async (e) => {
                if (e.length === 0)
                    return true;

                const response = await fetch(`${SERVER_URL}/urls/custom-link/${e}`);
                const urlExists = await response.json();
                return urlData ? urlData.customLink === e || !urlExists : !urlExists;
            }, {
                message: "Custom link already exists."
            }),
        name: z
            .string()
            .min(1, { message: "Name cannot be empty." })
            .refine(e => !/[`!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?~]/.test(e), {
                message: "Name should only contain letters and numbers."
            })
            .refine(async (e) => {
                if (e.length === 0)
                    return true;

                const response = await fetch(`${SERVER_URL}/urls/name-and-ip/${e}/${ip}`);
                const nameExists = await response.json();
                return urlData ? urlData.name === e || !nameExists : !nameExists;
            }, {
                message: "Name already exists."
            }),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            link: urlData ? urlData.link : "",
            customLink: urlData ? urlData.customLink : "",
            name: urlData ? urlData.name : "",
        }
    });

    const { resetField } = form;

    const customLinkValue = useWatch({
        control: form.control,
        name: "customLink",
    });

    const linkValue = useWatch({
        control: form.control,
        name: "link",
    });

    const customUrl = customLinkValue.trim().replace(/ /g, "-").replace(/[-]+/g, "-").substring(0, 30);

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(data => onSubmit(data, resetField, setLoading))} className="grid grid-rows-2 gap-2 items-start">
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
                                            placeholder="https://www.example.com" 
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
                        {!urlData && <>
                            {!loading ?
                                <Button type="submit" className="bg-[#37439e] hover:bg-[#313761] hover:cursor-pointer mt-[26px] text-gray-200"> 
                                    Generate URL 
                                </Button>
                            :
                                <Button disabled className="bg-[#37439e] mt-[26px] text-gray-200"> 
                                    <Loader2 className="h-[20px] animate-spin" />
                                    Generating URL 
                                </Button>
                            }
                        </>}
                    </section>
                    {linkValue &&
                        <p className="text-gray-300 text-sm mt-1"> 
                            <strong> Your generated URL: </strong>
                            {window.location.host}/
                            <strong className="relative left-[-2px] text-[#abafff]"> {customUrl.length > 0 ? customUrl : "<auto-generated>"} </strong>
                        </p>
                    }
                    {urlData &&
                        <DialogFooter className="flex justify-end gap-2">
                            <DialogClose asChild>
                                <Button variant="outline" className="bg-transparent hover:cursor-pointer hover:text-destructive">
                                    Cancel
                                </Button>
                            </DialogClose>
                            {!loading ?
                                <Button type="submit" variant="outline" className="bg-transparent hover:cursor-pointer hover:text-[#9ba6ff]">
                                    Edit
                                </Button>
                            :
                                <Button disabled type="submit" variant="outline" className="bg-transparent">
                                    <Loader2 className="h-[20px] animate-spin" />
                                    Editing
                                </Button>
                            }
                        </DialogFooter>
                    }
                </form>
            </Form>
        </>
    );
}
 
export default CustomForm;