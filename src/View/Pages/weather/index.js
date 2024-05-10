import L from 'leaflet';
import 'View/css/scroll.css';
import 'leaflet/dist/leaflet.css';
import { motion } from "framer-motion";
import Search from "View/Parts/weather/search";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import SearchList from "View/Parts/weather/searchList";
import { fetchWeather } from "View/Common/RequestHandler/actions";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'

const Weather = () => {
    const [selected, setSelected] = useState({ name: "행운동", lat: 37.4806541, lon: 126.9570456 });
    const [SearchText, setSearchText] = useState(undefined);

    const key = "가립니다"

    const customIcon = new L.Icon({
        iconUrl: '/img/marker.png',
        iconSize: [20, 20],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });

    const { isLoading, error, data, isSuccess, refetch } = useQuery(
        ["WeatherData", selected], () =>
        fetchWeather(selected.lat, selected.lon, key), {
        // enabled: ipData.isSuccess
    }
    );

    const LocationMarker = () => {
        const map = useMapEvents({})

        useEffect(() => {
            if (selected) {
                map.setView(selected, map.getZoom());
            }
        }, [selected, map]);

        return selected === null ? null : (
            <Marker icon={customIcon} position={selected}>
                <Popup>You are here</Popup>
            </Marker>
        )
    }

    return (
        <motion.div className="weatherContent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="wrap">
                <div className="search_grid">
                    <Search SearchText={SearchText} setSearchText={setSearchText} />
                    <SearchList SearchText={SearchText} setSelected={setSelected} setSearchText={setSearchText} />
                </div>
                <div className="weather">
                    <div className="_item">
                        <div className="_item-bg">
                            <img src={`https://openweathermap.org/img/wn/${data && data?.weather[0].icon}@2x.png`} />
                            <div className="flex" style={{ justifyContent: "space-between", padding: "0 40px 0 20px" }}>
                                <div className="_item-title">{selected.name}</div>
                            </div>
                            <div className="flex" style={{ justifyContent: "space-between", padding: "0 40px 0 20px", marginTop: 10}}>
                                <div className="_item-temp">{data && (data?.main.temp - 273.15).toFixed(1)}<span className="small">°C</span></div>
                                <div className="_item-temp">바람 {data && data?.wind.speed} <span className="small">(M/S)</span></div>
                                <div className="_item-temp">{data && data?.weather[0]?.description}</div>
                            </div>
                        </div>
                        <div className="_item-bg"></div>
                        <div className="_item-bg"></div>
                        <div className="_item-bg"></div>
                        <div className="_item-bg"></div>
                        <div className="_item-bg"></div>
                        <div className="_item-bg"></div>
                    </div>
                    <div className="_item">
                        <MapContainer style={{ width: "100%", height: "100%" }} center={selected} zoom={16} scrollWheelZoom={false}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <LocationMarker />
                        </MapContainer>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Weather;

