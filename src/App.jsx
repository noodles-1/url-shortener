import "@/App.css";
import CreateURL from "@/components/create-url";
import URLCard from "@/components/url-card";

function App() {
    return (
        <main className="h-dvh w-screen shadow-[inset_0_0_500px_#000] flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <section className="flex flex-col items-center justify-center">
                    <div className="text-[3rem]">
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
                    <div className="flex flex-col gap-4">
                        <h1 className="text-gray-300 text-[14px] text-center font-bold"> Your custom URLs</h1>
                        <section className="flex flex-col gap-3 max-h-[30dvh] overflow-y-scroll">
                            <URLCard />
                        </section>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default App;
