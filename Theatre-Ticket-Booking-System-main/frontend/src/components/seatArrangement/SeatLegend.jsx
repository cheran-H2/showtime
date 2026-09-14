const Item = ({ color, label }) => (
  <div className="flex items-center gap-2 text-sm">
    <span className={`w-4 h-4 rounded ${color}`}></span>
    <span>{label}</span>
  </div>
);

const SeatLegend = () => {
  return (
    <div className="flex justify-center gap-6 mt-6">
      <Item color="bg-gray-300" label="Available" />
      <Item color="bg-green-500" label="Selected" />
      <Item color="bg-red-500" label="Booked" />
    </div>
  );
};

export default SeatLegend;