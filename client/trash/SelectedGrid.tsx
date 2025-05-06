import { useCallback, useState } from "react";

type SelectedGridProps = {
   cols: number;
   rows: number;
};

export default function SelectedGrid({
   cols = 10,
   rows = 10,
}: SelectedGridProps) {
   const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
   const [selectedBoxes, setselectedBoxes] = useState<number[]>([]);

   const handleMouseUp = () => {
      setIsMouseDown(false);
      console.log("mouse up");
   };

   const handleMouseEnter = useCallback(
      (boxNumber: number) => {
         if (isMouseDown) {
            const startBox = selectedBoxes[0];
            const endBox = boxNumber;

            const startRow = Math.floor(startBox / cols); // 40  / 10 = 4 (4)
            const startColumn = startBox % cols; // 36 % 10 = 6
            const endRow = Math.floor(endBox / cols);
            const endColumn = endBox % cols;

            const minStartColumn = Math.min(startColumn, endColumn);
            const minStartRow = Math.min(startRow, endRow);
            const maxEndColumn = Math.max(startColumn, endColumn);
            const maxEndRow = Math.max(startRow, endRow);
            // console.log({
            //    start: [minStartColumn, minStartRow],
            //    end: [maxEndColumn, maxEndRow],
            // });

            console.log(boxNumber);

            const selectedBox = [];
            for (let col = minStartColumn; col <= maxEndColumn; col++) {
               for (let row = minStartRow; row <= maxEndRow; row++) {
                  selectedBox.push(row * cols + col);
               }
            }
            // console.log(selectedBox);
            setselectedBoxes(selectedBox);
         }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [isMouseDown]
   );

   const handleMouseDown = (boxNumber: number) => {
      setIsMouseDown(true);
      setselectedBoxes([boxNumber]);
   };
   return (
      <div
         className="grid [user-select:none]"
         style={{
            gridTemplateColumns: `repeat(${cols}, 35px)`,
            gridTemplateRows: `repeat(${rows}, 35px)`,
            gap: "1px",
         }}
         onMouseUp={handleMouseUp}
      >
         {[...new Array(rows * cols).keys()].map((_, index) => {
            return (
               <div
                  key={index}
                  className="flex justify-center items-center border border-accent "
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseDown={() => handleMouseDown(index)}
                  style={{
                     backgroundColor: selectedBoxes.includes(index)
                        ? "var(--color-accent)"
                        : "transparent",
                  }}
               >
                  {index + 1}
               </div>
            );
         })}
      </div>
   );
}
