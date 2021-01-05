import classNames from "classnames";
import Image from "../elements/image";
import Video from "../elements/video";
import CustomLink from "../elements/custom-link";

const GradientCard = ({ images }) => {
  return <div className="w-full sm:9/12 lg:w-4/12 max-h-full gradient-card">
    <Image media={images.Back_Image} className="w-full h-auto" />
    <Image media={images.Front_Image} className="w-9/12 h-auto" />
  </div>
}

const FeatureTwoImageGradient = ({ data }) => {
  console.log({data })
  return (
    <div className="container flex flex-col gap-12 py-12">
        <div
          className={classNames(
            // Common classes
            "flex flex-col justify-start md:justify-between md:items-center gap-10",
            {
              "lg:flex-row": !data.Images_On_Left,
              "lg:flex-row-reverse": data.Images_On_Left,
            }
          )}
          key={data.id}
        >
          {/* Text section */}
          <div className="w-full lg:w-6/12 lg:pr-6 text-lg">
            <h3 className="title">{data.Title}</h3>
            <p className="my-6">{data.Text}</p>
            {data.Link && <CustomLink link={data.Link}>
              <div className="text-blue-600 with-arrow hover:underline">
                {data.link.text}
              </div>
            </CustomLink>}
          </div>
          <GradientCard images={data.Images} />
        </div>
    </div>
  );
};

export default FeatureTwoImageGradient;
