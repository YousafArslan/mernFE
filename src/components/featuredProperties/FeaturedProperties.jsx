import "./featuredProperties.css";
import useFetch from "../../hooks/useFetch";
import { baseUrl } from "../../config";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch(
    `${baseUrl}/api/hotels?featured=true&limit=3`
  );
  return (
    <div className="fp">
      {loading && "Loading Please Wait"}
      {error && "Error In Loading"}
      {data &&
        data[1] &&
        data?.map((item, index) => {
          return <FeaturedProperty item={item} index={index} />;
        })}
    </div>
  );
};

export default FeaturedProperties;

function FeaturedProperty({ item, index }) {
  const images = [
    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/322658536.jpg?k=3fffe63a365fd0ccdc59210188e55188cdb7448b9ec1ddb71b0843172138ec07&o=&hp=1",
    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/232902339.jpg?k=3947def526b8af0429568b44f9716e79667d640842c48de5e66fd2a8b776accd&o=&hp=1",
    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/215955381.jpg?k=ff739d1d9e0c8e233f78ee3ced82743ef0355e925df8db7135d83b55a00ca07a&o=&hp=1",
  ];
  return (
    <div className="fpItem">
      <img src={images[index]} alt="" className="fpImg" />
      <span className="fpName">{item.name}</span>
      <span className="fpCity">{item.city}</span>
      <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
      {item?.rating && (
        <div className="fpRating">
          <button>{item?.rating}</button>
          <span>Excellent</span>
        </div>
      )}
    </div>
  );
}
