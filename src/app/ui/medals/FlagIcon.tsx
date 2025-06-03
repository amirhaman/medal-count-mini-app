'use client';
import React from 'react';

export const COUNTRY_CODES_ALPHABETICAL = [
  'AUT',
  'BLR',
  'CAN',
  'CHN',
  'FRA',
  'GER',
  'ITA',
  'NED',
  'NOR',
  'RUS',
  'SUI',
  'SWE',
  'USA',
];

const FlagIcon = ({ countryId } : {countryId: string}) => {
  const countryIndex = COUNTRY_CODES_ALPHABETICAL.indexOf(countryId);
  if (countryIndex === -1) {
    console.warn(`Country code "${countryId}" not found in the list.`);
    return null;
  }
  const backgroundPositionX = -(countryIndex) * 17; // Each flag is 17px height
  return (
    <span
      className="inline-block bg-no-repeat flex-shrink-0"
      style={{
        width: `28px`,
        height: `17px`,
        backgroundImage: `url('/assets/flags.png')`,
        backgroundPosition: `0 ${backgroundPositionX}px`,
        verticalAlign: 'middle',
        marginRight: '8px',
        border: '1px solid #ccc',
        borderRadius: '2px'
      }}
      role="img"
    ></span>
  );
};

export default FlagIcon;