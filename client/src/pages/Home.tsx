import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../constants/constanst";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import ListingItems from "../components/ListingItems";

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/api/listing/get?offer=true&limit=4`,
          { credentials: "include" }
        );
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error: any) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/api/listing/get?type=sale&limit=4`,
          { credentials: "include" }
        );
        const data = await res.json();
        setSaleListings(data);
      } catch (error: any) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/api/listing/get?type=rent&limit=4`,
          { credentials: "include" }
        );
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span> perfect </span>
          <br />
          place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Ketan Estate is the best place to find your next perfect place to
          live. <br />
          We have wide range of properties for you to choose from.
        </div>
        <Link
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
          to={`/search`}
        >
          Let's get started...
        </Link>
      </div>

      {/* swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listings: any) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listings.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="'h-[500px]"
                key={listings._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/*listing results for offer, sale and rent */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                {" "}
                Recent Offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={`/search?offer=true`}
              >
                {" "}
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings &&
                offerListings.map((listings: any) => (
                  <ListingItems lisitng={listings} key={listings._id} />
                ))}
            </div>
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                {" "}
                Recent Places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={`/search?type=rent`}
              >
                {" "}
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings &&
                rentListings.map((listings: any) => (
                  <ListingItems lisitng={listings} key={listings._id} />
                ))}
            </div>
          </div>
        )}

        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                {" "}
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={`/search?type=sale`}
              >
                {" "}
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings &&
                saleListings.map((listings: any) => (
                  <ListingItems lisitng={listings} key={listings._id} />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
