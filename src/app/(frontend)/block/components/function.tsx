export function Info({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <p className="text-xs font-medium pb-3 text-gray-500 mb-1">{label}</p>
      <div className="text-xs pb-3 font-normal text-gray-900 border px-3 py-1 bg-white rounded">
        {value || '-'}
      </div>
    </div>
  )
}

import { BlockType } from "./type2"
export function renderGroupHTML(group: BlockType['group'][number], index: number): string {
  const groupDate = new Date(group.date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  return `
    <div style="padding: 24px; border: 1px solid #ccc; background-color: white; font-family: sans-serif; font-size: 12px;">
      <h2 style="font-weight: bold; margin-bottom: 8px;">Group ${index + 1}</h2>
      <div style="display: flex; gap: 16px; margin-bottom: 12px;">
        <div><strong>Hydra Cost:</strong> ${group.g_hydra_cost}</div>
        <div><strong>Truck Cost:</strong> ${group.g_truck_cost}</div>
        <div><strong>Date:</strong> ${groupDate}</div>
      </div>
      ${group.block
        .map((blockItem, bIndex) => {
          return `
          <div style="margin-bottom: 12px; border: 1px solid #eee; padding: 8px;">
            <h3>Block ${bIndex + 1}</h3>
            ${blockItem.addmeasures
              .map(
                (m, mIndex) => `
                <div style="margin-top: 4px;">
                  <strong>Measurement ${mIndex + 1}:</strong>
                  L: ${m.l}, B: ${m.b}, H: ${m.h},
                  Area: ${m.block_area}, Cost: ${m.block_cost}
                </div>
              `
              )
              .join('')}
          </div>
        `
        })
        .join('')}
    </div>
  `
}