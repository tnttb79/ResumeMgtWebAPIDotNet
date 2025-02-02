{
  /* <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
  <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
  <g
    id='SVGRepo_tracerCarrier'
    stroke-linecap='round'
    stroke-linejoin='round'
  ></g>
  <g id='SVGRepo_iconCarrier'>
    {" "}
    <path
      d='M13 6V3M18.5 12V7M14.5 4.5H11.5M21 9.5H16M15.5548 16.8151C16.7829 16.8151 17.9493 16.5506 19 16.0754C17.6867 18.9794 14.7642 21 11.3698 21C6.74731 21 3 17.2527 3 12.6302C3 9.23576 5.02061 6.31331 7.92462 5C7.44944 6.05072 7.18492 7.21708 7.18492 8.44523C7.18492 13.0678 10.9322 16.8151 15.5548 16.8151Z'
      stroke='#000000'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    ></path>{" "}
  </g>
</svg>; */
}

import React from "react";

interface MoonIconProps {
  width?: string;
  height?: string;
  fill?: string;
  stroke?: string;
  title?: string;
}

const MoonIcon: React.FC<MoonIconProps> = ({
  width = "24",
  height = "24",
  fill = "none",
  stroke = "#000000",
  title = "Moon Icon",
}) => {
  return (
    <svg
      viewBox='0 0 24 24'
      width={width}
      height={height}
      fill={fill}
      xmlns='http://www.w3.org/2000/svg'
      aria-labelledby='moonIconTitle'
      role='img'
    >
      <title id='moonIconTitle'>{title}</title>
      <path
        d='M13 6V3M18.5 12V7M14.5 4.5H11.5M21 9.5H16M15.5548 16.8151C16.7829 16.8151 17.9493 16.5506 19 16.0754C17.6867 18.9794 14.7642 21 11.3698 21C6.74731 21 3 17.2527 3 12.6302C3 9.23576 5.02061 6.31331 7.92462 5C7.44944 6.05072 7.18492 7.21708 7.18492 8.44523C7.18492 13.0678 10.9322 16.8151 15.5548 16.8151Z'
        stroke={stroke}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default MoonIcon;
