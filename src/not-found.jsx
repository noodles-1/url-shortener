const NotFound = () => {
    return (
        <div className="text-center">
            <h1 className="text-5xl relative font-bold bg-gradient-to-r from-[#abafff] to-[#5868e0] bg-clip-text text-transparent"> 404 </h1>
            <span> 
                Page not found. Click to go back&nbsp;
                <a href="/" className="underline text-[#abafff] hover:text-[#8286d6]">home.</a> 
            </span>
        </div>
    );
}
 
export default NotFound;