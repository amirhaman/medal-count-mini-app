import React from 'react';
import type { MedalsType } from '@/app/types/medals';
import { useMedalContext } from '@/app/ui/medals/context/MedalsContext';
import LoadingIcon from '@/app/ui/loading/LoadingIcon';

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
      {medals.map((country: MedalsType) => (
        <tr key={country.code} className="border-b border-gray-200 hover:bg-gray-100">
          <td className="py-1 px-1 text-center whitespace-nowrap">
            <div className="flex items-center">
              <span className="font-medium">{country.code}</span>
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

