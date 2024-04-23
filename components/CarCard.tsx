"use client";

import { CarTypes } from "@/types";
import { calculateCarRent, generateCarImageUrl } from "@/utils";
import Image from "next/image";
import { useState } from "react";
import CustomButton from "./CustomButton";
import CarDetails from "./CarDetails";

interface CarProps {
  car: CarTypes;
}

const CarCard = ({ car }: CarProps) => {
  const { city_mpg, year, make, model, transmission, drive } = car;
  const [isOpen, setIsOpen] = useState(false);
  const carRent = calculateCarRent(city_mpg, year);

  return (
    <div className="car-card group">
      <div className="ca-card__content">
        <h3 className="car-card__content-title">
          {make} {model}
        </h3>
      </div>

      <p className="car-card__price">
        <span className="car-card__price-dollar">$</span>
        {carRent}
        <span className="car-card__price-day">/day</span>
      </p>

      <div className="car-card__image">
        <Image
          src={generateCarImageUrl(car, "01")}
          alt="car"
          fill
          priority
          className="object-contain"
        />
      </div>

      <div className="relative flex w-full mt-2">
        <div className="car-card__icon-container">
          <div className="car-card__icon">
            <Image
              src="/steering-wheel.svg"
              alt="steering"
              width={20}
              height={20}
            />
            <p className="car-card__icon-text">
              {transmission === "a" ? "Automatic" : "Manual"}
            </p>
          </div>
          <div className="car-card__icon">
            <Image src="/tire.svg" alt="tire" width={20} height={20} />
            <p className="car-card__icon-text">{drive}</p>
          </div>
          <div className="car-card__icon">
            <Image src="/gas.svg" alt="gas" width={20} height={20} />
            <p className="car-card__icon-text">{city_mpg} MPG</p>
          </div>
        </div>
        <div className="car-card__btn-container">
          <CustomButton
            title="More Details"
            containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      <CarDetails
        isOpen={isOpen}
        car={car}
        closeModal={() => setIsOpen(false)}
      />
    </div>
  );
};

export default CarCard;
