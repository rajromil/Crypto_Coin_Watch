import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import axios from "axios";

const TrendingCarousel = () => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      const { data } = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 10,
            page: 1,
            sparkline: false,
          },
        }
      );
      setTrending(data);
    };
    fetchTrendingCoins();
  }, []);

  const items = trending.map((coin) => (
    <div
      key={coin.id}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 20px",
      }}
    >
      <img src={coin.image} alt={coin.name} height="50" style={{ marginBottom: 10 }} />
      <span style={{ fontWeight: 700 }}>{coin.symbol.toUpperCase()}</span>
      <span style={{ color: coin.price_change_percentage_24h >= 0 ? "limegreen" : "red" }}>
        {coin.price_change_percentage_24h?.toFixed(2)}%
      </span>
      <span style={{ fontSize: 18, fontWeight: 500 }}>
        ${coin.current_price.toLocaleString()}
      </span>
    </div>
  ));

  return (
    <div
      style={{
        margin: "32px 0",
        padding: "24px 0",
        borderRadius: "20px",
        background: "linear-gradient(90deg, #232526 0%, #414345 100%)",
        boxShadow: "0 4px 32px 0 rgba(0,0,0,0.25)",
      }}
    >
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1500}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={{
          0: { items: 2 },
          512: { items: 4 },
          1024: { items: 6 },
        }}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default TrendingCarousel;