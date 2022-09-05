import React from 'react';
import { IoCashOutline } from 'react-icons/io5';

const Cash = ({selected = false, onSelect = (f) => f }) => (
    <IoCashOutline
      color={selected ? 'green':'grey'} 
      className="inline-block"
      onClick={onSelect}
    />
  );

export default function CashRating({ totalCash=5, selectedCash = 0, onRate}) {
  return (
    <>
    <div>
      {[...new Array(totalCash)].map((cash, i ) => (
      <Cash 
        id={i} 
        selected={selectedCash > i} 
        onSelect={() => onRate(i + 1)} 
        />
      ))}
      <p className="text-xs text-gray-700">
        {selectedCash} of {totalCash} cash
      </p>
    </div>
    </>
  );
}