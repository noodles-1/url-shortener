import { Skeleton } from "@/components/ui/skeleton";

import CreateURL from "@/components/create-url";
import URLCard from "@/components/url-card";

import useGetIp from "@/hooks/use-get-ip";
import { useQuery } from "@tanstack/react-query";

import * as motion from "motion/react-client";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const urlVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 0.3 }
    }),
};

const Home = () => {
    const { ip } = useGetIp();

    const { data: urlData } = useQuery({
        queryKey: ['urlStatus'],
        queryFn: () => fetch(`${SERVER_URL}/urls/ip/${ip}`).then(res => res.json()),
        enabled: !!ip,
    });

    return (
        <>
            <section className="flex flex-col items-center justify-center">
                <div className="text-2xl sm:text-[2rem] lg:text-[3rem]">
                    <span className="font-bold text-gray-300"> chowlong </span>
                    <span 
                        className="left-[-6px] relative font-medium bg-gradient-to-r from-[#abafff] to-[#5868e0] bg-clip-text text-transparent"> 
                        .me 
                    </span>
                </div>
                <span className="relative top-[-8px] text-gray-400 font-medium"> URL Shortener / Custom URL </span>
            </section>
            <section className="flex flex-col gap-6">
                <CreateURL />
                {urlData && urlData.length > 0 &&
                    <div className="flex flex-col gap-4">
                        <h1 className="text-gray-300 text-[14px] text-center font-bold"> Your custom URLs</h1>
                        <section className="flex flex-col gap-3 max-h-[30dvh] overflow-y-auto">
                            {urlData.map((url, i) => (
                                <motion.div 
                                    key={i}
                                    variants={urlVariants}
                                    initial="hidden"
                                    animate="visible"
                                    custom={i}
                                >
                                    <URLCard key={url.id} url={url} />
                                </motion.div>
                            ))}
                        </section>
                    </div>
                }
                {!ip && <Skeleton className="h-16 bg-zinc-800 mx-4 md:mx-0" />}
            </section>
        </>
    );
}
 
export default Home;