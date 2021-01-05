import ButtonLink from "@/components/elements/button-link";
import { getButtonAppearance } from "utils/button";

const CarCard = ({ car, i }) => {
  return <li className={`text-left ${ (i == 0) ? 'ml-8' : '' }`}>
    <figure>
      <img src={ process.env.NEXT_PUBLIC_STRAPI_API_URL + car.Media[0].url } />
      <figcaption>{ `${ car.Year } ${ car.Make } ${ car.Model }` }</figcaption>
    </figure>
    <p>{ car.Vehicle_Class } · ${ car.Price_Rental } / day</p>
  </li>
}

const CarSlider = ({ data }) => {
  return (
    <section className="py-20 text-center car-slider">
      {/* Buttons row */}
      <div className="container flex flex-row px-8 flex-wrap gap-4">
        <h2 className="title mb-10">{data.Title}</h2>
        {data.Button.map((button) => (
          <ButtonLink
            button={button}
            appearance={getButtonAppearance(button.type, "light")}
            key={button.id}
          />
        ))}
      </div>
      <ul className="px-8 pb-8">
        {data.Cars.map((car, i) => (
          <CarCard key={ car.id } i={ i } car={ car } />
        ))}
      </ul>
    </section>
  );
};

export default CarSlider;
