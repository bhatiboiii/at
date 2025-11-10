import React from "react";
import { BlockType } from "./type2"
import { Info } from "./function"
export function GroupBlock({
    group,
    groupIndex,
  }: {
    group:  BlockType['group'][number]
    groupIndex: number
  }) {
    return (
    <div className="mb-6 pt-4 border-t border-gray-200">
      <h2 className="text-base font-medium mb-4">Group {groupIndex + 1}</h2>

      <div className="grid grid-cols-5 gap-2 mb-6">
        <Info label="Hydra Cost" value={group.g_hydra_cost} />
        <Info label="Truck Cost" value={group.g_truck_cost} />
        <Info label="Date" value={`${new Date(group.date).getDate().toString().padStart(2, "0")}/${(new Date(group.date).getMonth() + 1).toString().padStart(2, "0")}/${new Date(group.date).getFullYear()}`}/>
        <Info label="Total Cost" value={group.g_total_cost} />  
        <Info label="Total Block Area" value={group.g_total_block_area} />  
      </div>

      <div className="border rounded-lg p-4 bg-white">
        <table className="w-full border-collapse mb-4">
          <thead>
            <tr className="bg-gray-50 border-b-2 border-gray-200">
              <th className="border p-3 text-left font-medium">Block</th>
              <th className="border p-3 text-left font-medium">Measurement</th>
              <th className="border p-3 text-left font-medium">L</th>
              <th className="border p-3 text-left font-medium">B</th>
              <th className="border p-3 text-left font-medium">H</th>
              <th className="border p-3 text-left font-medium">Block Area</th>
              <th className="border p-3 text-left font-medium">Block Cost</th>
            </tr>
          </thead>
          <tbody>
            {group.block.map((blockItem, blockIndex) => {
              const totalBlockCost = blockItem.addmeasures.reduce(
                (sum, m) => sum + (Number(m.block_cost) || 0), 
                0
              );

              return (
                <React.Fragment key={blockIndex}>
                {blockItem.addmeasures.map((measure, measureIndex) => (
                    <tr
                      key={measureIndex}
                      className={`border-b border-gray-200 ${
                        blockIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                      }`}
                    >
                      <td className="border p-3 font-medium text-sm">
                        Block {blockIndex + 1}
                      </td>
                      <td className="border p-3 text-sm">
                        Measure {measureIndex + 1}
                      </td>
                      <td className="border p-3 text-sm">{measure.l}</td>
                      <td className="border p-3 text-sm">{measure.b}</td>
                      <td className="border p-3 text-sm">{measure.h}</td>
                      <td className="border p-3 text-sm">{measure.block_area}</td>
                      <td className="border p-3 text-sm">{measure.block_cost}</td>
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
  }

