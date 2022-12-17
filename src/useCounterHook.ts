import { useState } from "react";

const useCounterHook = () => {
  const [page, setPage] = useState<number>(1);
  const handleNext = () => {
    setPage(page + 1);
  };
  const handlePrev = () => {
    setPage((old) => Math.max(old - 1, 0));
  };
  return { page, handleNext, handlePrev };
};
export default useCounterHook;
