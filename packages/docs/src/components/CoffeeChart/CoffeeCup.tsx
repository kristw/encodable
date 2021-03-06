import React from 'react';
import { uniqueId } from 'lodash';

type CoffeeCupProps = {
  drinkLevel: number;
  drinkColor: string;
  isToGo: boolean;
  label: string;
};

export default function CoffeeCup({ drinkLevel, drinkColor, isToGo, label }: CoffeeCupProps) {
  const clipPathId = uniqueId('coffee-level-clip-');

  return (
    <svg
      key={label}
      style={{ display: 'inline-block', marginLeft: 4, marginRight: 4 }}
      width="40.25"
      height="61.25"
      viewBox="0 0 46 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath={`url(#${clipPathId})`}>
        <path
          d="M7 11H39L35.4604 47.3873C35.261 49.4367 33.5383 51 31.4792 51H14.534C12.4755 51 10.753 49.4376 10.553 47.3887L7 11Z"
          fill={drinkColor}
        />
      </g>
      {isToGo && (
        <>
          <path
            d="M10.4446 5.5H35.5085C37.6015 5.5 39.2266 7.32478 38.9851 9.40381L34.5715 47.4038C34.3665 49.1687 32.8716 50.5 31.0948 50.5H14.457C12.6663 50.5 11.1644 49.1483 10.9764 47.3675L6.96395 9.36752C6.7457 7.3006 8.36619 5.5 10.4446 5.5Z"
            stroke="black"
          />
          <path
            d="M6 5.5H40C41.3807 5.5 42.5 6.61929 42.5 8C42.5 9.38071 41.3807 10.5 40 10.5H6C4.61929 10.5 3.5 9.38071 3.5 8C3.5 6.61929 4.61929 5.5 6 5.5Z"
            fill="white"
            stroke="black"
          />
          <rect x="9.5" y="0.5" width="27" height="5" stroke="black" />
        </>
      )}
      {!isToGo && (
        <>
          <path
            d="M38.5664 17.5L38.9414 14.5H42C43.933 14.5 45.5 16.067 45.5 18V41C45.5 42.933 43.933 44.5 42 44.5H35.0664L35.4414 41.5H41C41.8284 41.5 42.5 40.8284 42.5 40V19C42.5 18.1716 41.8284 17.5 41 17.5H38.5664Z"
            stroke="black"
          />
          <path
            d="M10.9356 47.4118L6.56273 10.5H39.4306L34.6152 47.4523C34.388 49.1957 32.9027 50.5 31.1446 50.5H14.4112C12.6375 50.5 11.1442 49.1732 10.9356 47.4118Z"
            stroke="black"
          />
        </>
      )}
      <text x="23" y="66" textAnchor="middle" fill="#222" fontSize="12px" fontWeight="bold">
        {label}
      </text>
      <defs>
        <clipPath id={clipPathId}>
          <rect y={11 + 40 - drinkLevel * 40} width="46" height={40} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
