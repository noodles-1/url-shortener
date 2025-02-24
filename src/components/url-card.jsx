import { useState } from "react";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import EditForm from "@/components/edit-form";

import { PenLine, Trash, Clipboard, Check, Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const URLCard = ({ url }) => {
    const [copied, setCopied] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();

    const customLink = `${window.location.host}/${url.customLink}`;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(customLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDelete = async () => {
        setDeleting(true);

        await fetch(`${SERVER_URL}/urls/delete-url/${url.id}`, {
            method: "DELETE",
        });

        queryClient.invalidateQueries(['urlStatus']);
    };

    return (
        <Card className="bg-transparent backdrop-blur-sm text-[12px] md:text-sm mx-2 md:mx-0">
            <CardHeader>
                <CardTitle className="text-sm font-bold"> {url.name} </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="max-w-[30rem]"> 
                    <span> Redirects to: </span>
                    <span className="text-[#abafff] line-clamp-1"> {url.link} </span> 
                </div>
                <span 
                    className="text-gray-400 flex items-center group cursor-pointer md:w-fit hover:text-gray-200"
                    onClick={handleCopy}
                > 
                    {customLink}
                    {copied ? 
                        <div className="flex items-center text-[#9ba6ff]">
                            <Check className="h-[16px] opacity-0 group-hover:opacity-100" />
                            <span className="opacity-0 group-hover:opacity-100"> copied </span>
                        </div>
                    :
                        <Clipboard className="h-[16px] opacity-0 group-hover:opacity-100" />
                    }
                </span>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="flex gap-2 items-center bg-transparent hover:cursor-pointer hover:text-[#9ba6ff]">
                            <PenLine className="h-[20px] " />
                            <span> Edit </span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent aria-describedby={undefined} className="bg-transparent backdrop-blur-xl md:min-w-[40rem]">
                        <DialogHeader>
                            <DialogTitle> Edit </DialogTitle>
                        </DialogHeader>
                        <EditForm urlData={url} setOpen={setOpen} />
                    </DialogContent>
                </Dialog>
                {!deleting ?
                    <Button variant="outline" onClick={handleDelete} className="flex gap-2 items-center bg-transparent hover:cursor-pointer hover:text-destructive">
                        <Trash className="h-[20px]" />
                        <span> Delete </span>
                    </Button>
                :
                    <Button disabled variant="outline" onClick={handleDelete} className="flex gap-2 items-center bg-transparent">
                        <Loader2 className="h-[20px] animate-spin" />
                        <span> Deleting </span>
                    </Button>
                }
            </CardFooter>
        </Card>
    );
}
 
export default URLCard;