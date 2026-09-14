const Seat = ({ seat, onClick }) => {
  // Placeholder seat (empty space)
  if (seat.status === "EMPTY") {
    return <div style={{ width: 36, height: 36 }} />;
  }

  const base =
    "rounded-md border border-gray-500 flex items-center justify-center text-[11px] font-medium select-none transition";

  const styles = {
    AVAILABLE: "bg-gray-300 text-black hover:bg-green-400 cursor-pointer",
    SELECTED: "bg-green-500 text-white cursor-pointer",
    BOOKED: "bg-red-500 text-white cursor-not-allowed",
    WHEEL: "bg-blue-600 text-white cursor-not-allowed",
  };

  const isClickable = seat.status === "AVAILABLE" || seat.status === "SELECTED";

  return (
    <div
      style={{ width: 36, height: 36 }}
      className={`${base} ${styles[seat.status]}`}
      onClick={isClickable ? onClick : undefined}
    >
      {seat.icon ?? seat.number}
    </div>
  );
};

export default Seat;
