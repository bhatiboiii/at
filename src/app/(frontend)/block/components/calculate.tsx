import { Group } from "./type"

const calculateTotalTodiArea = (l: string, b: string, h: string): string => {
    const length = parseFloat(l) || 0;
    const breadth = parseFloat(b) || 0;
    const height = parseFloat(h) || 0;
    return (length * breadth * height).toFixed(2);
  };

 const calculateTotalTodiCost = (todiCost: string, hydraCost: string, truckCost: string): string => {
    const todi = parseFloat(todiCost) || 0;
    const hydra = parseFloat(hydraCost) || 0;
    const truck = parseFloat(truckCost) || 0;
    return (todi + hydra + truck).toFixed(2);
  };

 const calculateEstimateCost = (totalArea: string, totalCost: string): string => {
    return (parseFloat(totalArea) * parseFloat(totalCost)).toFixed(2);
  };

 const calculateFinalCost = (estimate: string, depreciation: string): string => {
    return ((parseFloat(estimate) - ((parseFloat(depreciation)/100)*parseFloat(estimate)))).toFixed(2);
  };

 export const calculateTotalBlockArea = (group: Group[]): string => {
    return group.reduce((total, group) => {
      return total + group.block.reduce((groupTotal, block) => {
        return groupTotal + block.addmeasures.reduce((measureTotal, measure) => {
          return measureTotal + parseFloat(measure.block_area || '0');
        }, 0);
      }, 0);
    }, 0).toFixed(2);
  };

 export const calculateTotalBlockCost = (group: Group[]): string => {
    return group.reduce((total, group) => {
      return total + group.block.reduce((groupTotal, block) => {
        return groupTotal + block.addmeasures.reduce((measureTotal, measure) => {
          return measureTotal + parseFloat(measure.block_cost || '0');
        }, 0);
      }, 0);
    }, 0).toFixed(2);
  };


type InputEvent = React.ChangeEvent<HTMLInputElement>;

export const handleInput = (e: InputEvent, setTodi: (updater: (prev: any) => any) => void) => {
  const { name, value } = e.target;

  setTodi((prev) => {
    const updatedTodi = { ...prev, [name]: value };

    const {
      l = '0',
      b = '0',
      h = '0',
      total_b = '0',
      gala_cost = '0',
      todi_cost = '0',
      hydra_cost = '0',
      truck_cost = '0',
      depreciation = '0',
    } = updatedTodi;


    if (['l', 'total_b', 'h'].includes(name)) {
      updatedTodi.total_gala_area = calculateTotalTodiArea(l, total_b, h);
    }

    if (['l', 'b', 'h'].includes(name)) {
      updatedTodi.total_todi_area = calculateTotalTodiArea(l, b, h);
    }


    if (['gala_cost', 'hydra_cost', 'truck_cost'].includes(name)) {
      updatedTodi.total_gala_cost = calculateTotalTodiCost(gala_cost, hydra_cost, truck_cost);
    }

    if (['todi_cost', 'hydra_cost', 'truck_cost'].includes(name)) {
      const todiFixed = parseFloat(todi_cost || '0').toFixed(2);
      updatedTodi.todi_cost = todiFixed;
      updatedTodi.total_todi_cost = calculateTotalTodiCost(todiFixed, hydra_cost, truck_cost);
    }


    const calcEstimate = (area: string, cost: string) => {
      const a = parseFloat(area);
      const c = parseFloat(cost);
      return a > 0 && c > 0 ? calculateEstimateCost(area, cost) : undefined;
    };

    updatedTodi.estimate_cost =
      calcEstimate(updatedTodi.total_todi_area, updatedTodi.total_todi_cost) ??
      calcEstimate(updatedTodi.total_gala_area, updatedTodi.total_gala_cost);


    if (updatedTodi.estimate_cost) {
      const dep = parseFloat(depreciation || '0');
      updatedTodi.final_cost = dep > 0
        ? calculateFinalCost(updatedTodi.estimate_cost, depreciation)
        : updatedTodi.estimate_cost;
    }

    if (
      name.startsWith('group.') ||
      name.startsWith('block.') ||
      name.startsWith('addmeasures.')
    ) {
      updatedTodi.total_block_area = calculateTotalBlockArea(updatedTodi.group);
      updatedTodi.total_block_cost = calculateTotalBlockCost(updatedTodi.group);
    }

    return updatedTodi;
  });
};

  


//  export const handleInput = (e: any, setTodi: (prev: any) => void) => {
//     const { name, value } = e.target;
//     // Update the state with the new value
//     setTodi((prev: any) => {
//       const updatedTodi = { ...prev, [name]: value };
      
//       // If any dimension changes, recalculate total_gala_area
//       if (name === 'l' || name === 'total_b' || name === 'h') {
//         updatedTodi.total_gala_area = calculateTotalTodiArea(
//           updatedTodi.l || '0',
//           updatedTodi.total_b || '0',
//           updatedTodi.h || '0'
//         );
//       }

//       // If any cost field changes, recalculate total_gala_cost
//       if (name === 'gala_cost' || name === 'hydra_cost' || name === 'truck_cost') {
//         updatedTodi.total_gala_cost = calculateTotalTodiCost(
//           updatedTodi.gala_cost || '0',
//           updatedTodi.hydra_cost || '0',
//           updatedTodi.truck_cost || '0'
//         );
//       }

//       // Always recalculate estimate_cost if total_gala_area or total_gala_cost is available
//       if (updatedTodi.total_gala_area && typeof updatedTodi.total_gala_area === 'string' &&
//           updatedTodi.total_gala_cost && typeof updatedTodi.total_gala_cost === 'string') {
//         const area = parseFloat(updatedTodi.total_gala_area);
//         const cost = parseFloat(updatedTodi.total_gala_cost);
//         if (area > 0 && cost > 0) {
//           updatedTodi.estimate_cost = calculateEstimateCost(
//             updatedTodi.total_gala_area,
//             updatedTodi.total_gala_cost
//           );
//         }
//       }


//       // Always recalculate final_cost if estimate_cost is available
//       if (updatedTodi.estimate_cost) {
//         const depreciation = parseFloat(updatedTodi.depreciation || '0');
//         if (depreciation > 0) {
//           updatedTodi.final_cost = calculateFinalCost(
//             updatedTodi.estimate_cost,
//             updatedTodi.depreciation
//           );
//         } else {
//           // If depreciation is removed or 0, set final_cost to estimate_cost
//           updatedTodi.final_cost = updatedTodi.estimate_cost;
//         }
//       }


//       // Recalculate total block area and cost whenever group data changes
//       if (name.startsWith('group.') || name.startsWith('block.') || name.startsWith('addmeasures.')) {
//         updatedTodi.total_block_area = calculateTotalBlockArea(updatedTodi.group);
//         updatedTodi.total_block_cost = calculateTotalBlockCost(updatedTodi.group);
//       }
      
//       return updatedTodi;
//     });
//   }




// export const handleInput = (e: any, setTodi: (prev: any) => void) => {
//   const { name, value } = e.target;
//   setTodi((prev: any) => {
//     const updatedTodi = { ...prev, [name]: value };
    
//     if (name === 'l' || name === 'total_b' || name === 'h') {
//       updatedTodi.total_gala_area = calculateTotalTodiArea(
//         updatedTodi.l || '0',
//         updatedTodi.total_b || '0',
//         updatedTodi.h || '0'
//       );
//   }

//     if (name === 'l' || name === 'b'  || name === 'h') {
//       updatedTodi.total_todi_area = calculateTotalTodiArea(
//         updatedTodi.l || '0',
//         updatedTodi.b || '0',
//         updatedTodi.h || '0'
//       );
//     }

//     if (name === 'gala_cost' || name === 'hydra_cost' || name === 'truck_cost') {
//       updatedTodi.total_gala_cost = calculateTotalTodiCost(
//         updatedTodi.gala_cost || '0',
//         updatedTodi.hydra_cost || '0',
//         updatedTodi.truck_cost || '0'
//       );
//     }

//     if (name === 'todi_cost' || name === 'hydra_cost' || name === 'truck_cost') {
//       const todiNum = parseFloat(updatedTodi.todi_cost || '0');
//       updatedTodi.todi_cost = todiNum.toFixed(2);
//       updatedTodi.total_todi_cost = calculateTotalTodiCost(
//         updatedTodi.todi_cost || '0',
//         updatedTodi.hydra_cost || '0',
//         updatedTodi.truck_cost || '0'
//       );
//     }

//     if (updatedTodi.total_todi_area && typeof updatedTodi.total_todi_area === 'string' &&
//         updatedTodi.total_todi_cost && typeof updatedTodi.total_todi_cost === 'string') {
//       const area = parseFloat(updatedTodi.total_todi_area);
//       const cost = parseFloat(updatedTodi.total_todi_cost);
//       if (area > 0 && cost > 0) {
//         updatedTodi.estimate_cost = calculateEstimateCost(
//           updatedTodi.total_todi_area,
//           updatedTodi.total_todi_cost
//         );
//       }
//     }

//     if (updatedTodi.total_gala_area && typeof updatedTodi.total_gala_area === 'string' &&
//         updatedTodi.total_gala_cost && typeof updatedTodi.total_gala_cost === 'string') {
//       const area = parseFloat(updatedTodi.total_gala_area);
//       const cost = parseFloat(updatedTodi.total_gala_cost);
//       if (area > 0 && cost > 0) {
//         updatedTodi.estimate_cost = calculateEstimateCost(
//           updatedTodi.total_gala_area,
//           updatedTodi.total_gala_cost
//         );
//       }
//     }

//     if (updatedTodi.estimate_cost) {
//       const depreciation = parseFloat(updatedTodi.depreciation || '0');
//       if (depreciation > 0) {
//         updatedTodi.final_cost = calculateFinalCost(
//           updatedTodi.estimate_cost,
//           updatedTodi.depreciation
//         );
//       } else {
//         updatedTodi.final_cost = updatedTodi.estimate_cost;
//       }
//     }

//     if (name.startsWith('group.') || name.startsWith('block.') || name.startsWith('addmeasures.')) {
//       updatedTodi.total_block_area = calculateTotalBlockArea(updatedTodi.group);
//       updatedTodi.total_block_cost = calculateTotalBlockCost(updatedTodi.group);
//     }
    
//     return updatedTodi;
//   });
// }