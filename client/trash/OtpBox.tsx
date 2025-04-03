import { forwardRef, useEffect, useRef, useState } from "react";

export default function OtpBox() {
   const [value, setValue] = useState<number[]>([]);
   const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
   const inputRef = useRef<Array<HTMLInputElement | undefined>>([]);

   useEffect(() => {
      inputRef.current[currentStepIndex]?.focus();
   }, [currentStepIndex]);

   const next = () => {
      setCurrentStepIndex(current => {
         if (current === 3) return current;
         return current + 1;
      });
   };
   const back = () => {
      setCurrentStepIndex(current => {
         if (current === 0) return current;
         return current - 1;
      });
   };

   const handleBackspace = () => {
      setValue(prev => prev.slice(0, -1));
      back();
   };

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.value) return;
      const v = parseInt(e.target.value);
      setValue(prev => [...prev, v]);
      if (currentStepIndex !== 3) {
         next();
      }
   };
   return (
      <div className="flex justify-center items-center">
         {new Array(4).fill(null).map((_, index) => {
            return (
               <Box
                  key={index}
                  handleChange={handleChange}
                  defaultValue={value[index]}
                  ref={ref =>
                     (inputRef.current[index] = ref as HTMLInputElement)
                  }
                  disabled={index > currentStepIndex ? true : false}
                  handleBackSpace={handleBackspace}
               />
            );
         })}
      </div>
   );
}

type BoxProps = {
   handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
   handleBackSpace: () => void;
} & React.ComponentProps<"input">;

const Box = forwardRef<HTMLInputElement, BoxProps>(
   ({ handleChange, handleBackSpace, ...props }, ref) => {
      const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
         if (e.key === "Backspace") {
            // if (!value) {
            //    console.log(value);

            handleBackSpace();
            // }
         }
      };
      return (
         <div className="w-12 h-12 border border-black flex justify-center items-center text-white p-1">
            <input
               type="text"
               className="size-full text-center border-none outline-none text-black"
               onChange={handleChange}
               ref={ref}
               pattern="[0-9]"
               maxLength={1}
               required
               onKeyDown={handleKeyDown}
               {...props}
            />
         </div>
      );
   }
);

// const Box = forwardRef(function Box<Ref<HTMLInputElement | null>,BoxProps>({ handleChange, value }, ref) {
//    return (
// <div className="w-12 h-12 border border-black flex justify-center items-center text-white p-1">
//    <input
//       type="text"
//       className="size-full text-center border-none outline-none text-black"
//       onChange={handleChange}
//       ref={ref}
//       defaultValue={value ? value : undefined}
//       pattern="[0-9]"
//       maxLength={1}
//       required
//    />
// </div>
//    );
// });
