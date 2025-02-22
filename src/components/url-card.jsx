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
    DialogFooter, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { PenLine, Trash, Clipboard, Check } from "lucide-react";
import EditForm from "@/components/edit-form";

const URLCard = () => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText("chowlong.me/custom-url");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Card className="bg-transparent backdrop-blur-sm text-sm">
            <CardHeader>
                <CardTitle className="text-sm font-bold"> My custom URL </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="max-w-[30rem]"> 
                    <span> Redirects to: </span>
                    <span className="text-[#abafff] line-clamp-1"> www.example.com</span> 
                </div>
                <span 
                    className="text-gray-400 flex items-center group cursor-pointer w-fit"
                    onClick={handleCopy}
                > 
                    chowlong.me/custom-url
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
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="flex gap-2 items-center bg-transparent hover:cursor-pointer hover:text-[#9ba6ff]">
                            <PenLine className="h-[20px] " />
                            <span> Edit </span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-transparent backdrop-blur-xl min-w-[40rem]">
                        <DialogHeader>
                            <DialogTitle> Edit </DialogTitle>
                        </DialogHeader>
                        <EditForm />
                        <DialogFooter className="flex justify-end gap-2">
                            <DialogClose asChild>
                                <Button variant="outline" className="bg-transparent hover:cursor-pointer hover:text-destructive">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button variant="outline" className="bg-transparent hover:cursor-pointer hover:text-[#9ba6ff]">
                                    Edit
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Button variant="outline" className="flex gap-2 items-center bg-transparent hover:cursor-pointer hover:text-destructive">
                    <Trash className="h-[20px]" />
                    <span> Delete </span>
                </Button>
            </CardFooter>
        </Card>
    );
}
 
export default URLCard;