import Image from "next/image";

const Button = ({ children }) => {
    return (
        <div className="w-14 h-14 bg-linear-to-b from-[#BCC9CF] to-[#B2C1C7] from-70% to-300% rounded-3xl shadow-[0px_1px_2px_0px_rgba(96,135,152,0.80)] shadow-[inset_0.5px_0.5px_5px_1px_rgba(238,250,255,1.00)] outline-solid outline-1 -outline-offset-1 outline-[#7A8F98] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden" >
            <Image src="/light-theme.png" alt="theme" width={40} height={40} />
            </div>
    )
}

export default Button;