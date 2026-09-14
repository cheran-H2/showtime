import Seat from "./Seat";

const SeatBlock = ({ seats = [], cols, onSeatClick }) => {
  const filledSeats = [...seats];

  
  while (filledSeats.length < cols) {
    filledSeats.push({
      id: `empty-${filledSeats.length}`,
      status: "EMPTY",
      number: null,
    });
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 36px)`,
        gap: "8px",
      }}
    >
      {filledSeats.map((seat) => (
        <Seat
          key={seat.id}
          seat={seat}
          onClick={() => {
           
            if (seat.status === "EMPTY" || seat.status === "BOOKED") return;
            onSeatClick(seat.number);
          }}
        />
      ))}
    </div>
  );
};

export default SeatBlock;
