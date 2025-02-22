import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { PenLine, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const URLCard = () => {
    return (
        <Card className="w-full bg-transparent backdrop-blur-sm text-sm">
            <CardHeader>
                <CardTitle className="text-sm font-bold"> My custom URL </CardTitle>
            </CardHeader>
            <CardContent>
                <p> Redirects to: <strong className="text-[#abafff]"> www.example.com </strong> </p>
                <p className="text-gray-400"> chowlong.me/custom-url </p>
            </CardContent>
            <CardFooter className="flex justify-end gap-4">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="flex gap-2 items-center bg-transparent hover:cursor-pointer hover:text-[#9ba6ff]">
                            <PenLine className="h-[20px] " />
                            <span> Edit </span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-transparent backdrop-blur-lg">
                        <DialogHeader>
                            <DialogTitle> Edit </DialogTitle>
                            <DialogDescription> Edit this custom URL </DialogDescription>
                        </DialogHeader>
                        <p> Hello world </p>
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