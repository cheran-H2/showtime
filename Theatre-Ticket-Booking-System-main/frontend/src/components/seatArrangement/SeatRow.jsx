import { useState } from "react";
import SeatBlock from "./SeatBlock";

const SeatRow = ({ rowLabel, left, center, right, onSeatClick }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-6">
        <div className="w-6 text-gray-400 text-xs">{rowLabel}</div>

        <div className="w-2 h-8 bg-gray-600"></div>

        <SeatBlock seats={left} cols={4} onSeatClick={onSeatClick} />

        <div className="w-10"></div>

        <SeatBlock seats={center} cols={10} onSeatClick={onSeatClick} />

        <div className="w-10"></div>

        <SeatBlock seats={right} cols={4} onSeatClick={onSeatClick} />

        <div className="w-2 h-8 bg-gray-600"></div>
      </div>
    </div>
  );
};

export default SeatRow;
