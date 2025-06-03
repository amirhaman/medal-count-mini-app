'use client';
import React from 'react';
import type { SortKey } from '@/app/types/medals';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

interface Column {
  key: SortKey;
  label: React.ReactNode | string;
}

const columns: Column[] = [
  { key: 'code', label: '' },
  { key: 'gold', label: <FontAwesomeIcon icon={faCircle} width="16" height="16" className="text-center" color="#FFD700" /> },
  { key: 'silver', label: <FontAwesomeIcon icon={faCircle} width="16" height="16" className="text-center" color="#C0C0C0" /> },
  { key: 'bronze', label: <FontAwesomeIcon icon={faCircle} width="16" height="16" className="text-center" color="#CD7F32" /> },
  { key: 'total', label: 'Total' },
];

const MedalsHeader = () => {
  // TODO: Implement sorting functionality
  return (
    <thead>
      <tr className="bg-gray-100 text-gray-700 text-sm">
        {columns.map((col) => (
          <th
            key={col.key}
            className="py-1 px-2 text-center cursor-pointer hover:bg-gray-200"
          >
            <div className="flex justify-center">
              {col.label}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default MedalsHeader;
