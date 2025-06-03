import React from 'react';
import type { MedalsType } from '@/app/types/medals';
import { useMedalContext } from '@/app/ui/medals/context/MedalsContext';
import LoadingIcon from '@/app/ui/loading/LoadingIcon';
import FlagIcon from './FlagIcon';

const MedalItem = () => {
  const { medals, loading, error } = useMedalContext();

  if (loading) {
    return (
      <tbody>
        <tr>
          <td colSpan={5} className="text-center py-8 text-gray-600">
            <div className="flex items-center justify-center space-x-2">
              <LoadingIcon />
            </div>
          </td>
        </tr>
      </tbody>
    );
  }

  if (error) {
    return (
      <tbody>
        <tr>
          <td colSpan={5} className="text-center py-8 text-red-500">
            Error: {error.message}
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {medals.map((country: MedalsType, index: number) => (
        <tr key={country.code} className="border-b border-gray-200 hover:bg-gray-100">
          <td className="py-1 px-1 text-center whitespace-nowrap">
            <div className="flex items-center">
              <div className="flex flex-row space-between items-center font-medium">
                <span className='min-w-[28px]'>{index + 1}</span> 
                <FlagIcon countryId={country.code} /> 
                <span>{country.code}</span>
              </div>
            </div>
          </td>
          <td className="py-1 px-1 text-center">{country.gold}</td>
          <td className="py-1 px-1 text-center">{country.silver}</td>
          <td className="py-1 px-1 text-center">{country.bronze}</td>
          <td className="py-1 px-1 text-center font-bold">{country.total}</td>
        </tr>
      ))}
    </tbody>
  )
}

export default MedalItem;

