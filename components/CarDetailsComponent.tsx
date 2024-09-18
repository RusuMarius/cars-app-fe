
const CarDetailsComponent = ({ carData }: { carData: any }) => {

  return (
    <div className="container overflow-hidden">
      <div className="content-car my-10 w-[100%] text-center md:items-left md:text-left">
        <div>
          <img className="w-full relative car-big-image" src={carData.imageUrl} alt={carData.title} />
        </div>
        <div className="w-full">
          <div>
            <h2>{carData.title}</h2>
          </div>
          <p>{carData.description}</p>
          <div className="ml-auto">
            <div className="cart">
              <h4 className="mt-6 nb-4">
                Product price: <span className="text-red-600 font-bold">${carData.price}k</span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsComponent;
