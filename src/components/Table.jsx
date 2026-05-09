import React from 'react';
import { Typography } from './Typography';

/**
 * A premium Table component.
 * @param {Object} props
 * @param {Array<{key: string, label: string, render?: Function}>} props.columns
 * @param {Array<Object>} props.data
 * @param {string} [props.emptyMessage="No data available"]
 */
export const Table = ({ columns, data, emptyMessage = 'No data available' }) => {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-surface-container-high bg-surface-container-lowest shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-surface-container-low border-b border-surface-container-high">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-4 text-sm font-semibold text-secondary uppercase tracking-wider"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-container-high">
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-surface-container-low transition-colors group">
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4 text-on-surface">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center">
                <Typography variant="body-md" className="text-secondary italic">
                  {emptyMessage}
                </Typography>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
