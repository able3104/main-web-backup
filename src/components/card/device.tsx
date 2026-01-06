interface DeviceCardProps {
  image: string;
  name: string;
  colors: string[];
}

const DeviceCard = ({ image, name, colors }: DeviceCardProps) => {
  return (
    <div className="flex flex-row items-center gap-3 h-full">
      <img className="h-full aspect-square rounded-md" src={image} alt={name} />
      <div className="flex-1 flex flex-col justify-center h-full">
        <p className="text-base font-semibold">{name}</p>
        <div className="flex flex-row gap-1 py-0.5">
          {colors.map((color, index) => (
            <div
              key={index}
              style={{
                backgroundColor: color,
                boxShadow: "inset 0 1px 1px rgba(0,0,0,0.2)",
              }}
              className="w-3 h-3 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeviceCard;
