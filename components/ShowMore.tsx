"use client";

import { updateSearchParams } from "@/utils";
import CustomButton from "./CustomButton";
import { useRouter } from "next/navigation";

const ShowMore = ({
  pageNumber,
  isNext,
}: {
  pageNumber: number;
  isNext: boolean;
}) => {
  const router = useRouter();

  const handleNavigation = () => {
    const newPage = (pageNumber + 1) * 10;
    const newPathname = updateSearchParams("limit", `${newPage}`);

    router.push(newPathname);
  };
  return (
    <div className="w-full flex-center gap-5 mt-10">
      {!isNext && (
        <CustomButton
          title="Show More"
          containerStyles="bg-primary-blue text-white rounded-full"
          handleClick={handleNavigation}
        />
      )}
    </div>
  );
};

export default ShowMore;
