const ImageCard = ({ image, title, description }) => {
const height = "h-40";
  return (
    <div className={"flex flex-col justify-end rounded-3xl h-80 w-80 overflow-clip shadow-[0px_1px_2px_0px_rgba(65,65,65,0.60)] hover:shadow-[0px_4px_20px_0px_rgba(65,65,65,0.60)] top-10 hover:top-10 transition duration-300 ease-in-out"}>
    <img src={image} alt="" className="h-80 w-80 object-cover"/>
      <div className={"absolute "+height+" w-80 [mask-image:linear-gradient(180deg,transparent_0%,transparent_50%)] backdrop-blur-xl rounded-3xl overflow-clip "}>
      </div>
      <div className={"absolute "+height+" w-80 p-5 text-white"}>
      <div className="font-semibold text-lg">{title}</div>
      <p className="font-thin text-sm">{description}</p>
      </div>
    </div>
  )
}

export default ImageCard;