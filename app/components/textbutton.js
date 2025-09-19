const TextButton = ({ text = "This is a text button" }) => {
    return (
        <div className="
        cursor-pointer rounded-lg 
        shadow-[0px_1px_2px_0px_rgba(71,163,252,0.60)] 
        hover:shadow-[0px_4px_20px_0px_rgba(71,163,252,0.60)] 
        transition duration-300 ease-in-out">
            <div className="px-5 py-2 bg-gradient-to-b from-[#037ffc] to-[#08519c] 
        from-80% to-100% rounded-lg 
        shadow-[inset_0.5px_0.5px_4px_1px_rgba(255,255,255,0.60)] 
        outline outline-1 outline-offset-[-1px] outline-[#096fd6] 
        inline-flex flex-row justify-center items-center gap-2.5 overflow-hidden">
                <div>
                    <div className="select-none absolute text-white text-xl font-normal 
            font-poppins [text-shadow:_-1px_-1px_4px_rgb(65_65_65_/_0.40)] ">
                        {text}
                    </div>
                    <div className="select-none 
        text-white text-xl font-normal font-poppins 
        [text-shadow:_1px_1px_4px_rgb(255_255_255_/_0.60)] ">
                        {text}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TextButton;