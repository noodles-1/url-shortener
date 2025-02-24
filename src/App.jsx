import "@/App.css";
import Home from "@/home";
import NotFound from "@/not-found";
import Redirect from "@/redirect";

import { 
    Route,
    Routes,
    BrowserRouter
} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <main className="h-dvh shadow-[inset_0_0_500px_#000] flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/not-found" element={<NotFound />} />
                        <Route path="*" element={<Redirect />} />
                    </Routes>
                </div>
            </main>
        </BrowserRouter>
    );
}

export default App;
