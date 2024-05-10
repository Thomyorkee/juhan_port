import axios from "axios";

export const fetchChartData = async (row) => {
    const response = await axios.get(
        `https://api.bithumb.com/public/candlestick/${row}_KRW/24h`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Cross-Origin-Embedder-Policy': 'require-corp',
            'Cross-Origin-Opener-Policy': 'same-origin',
        }
    }
    )
    return response.data;
}

export const fetchDashboardData = async () => {
    const response = await axios.get(
        `${process.env.REACT_APP_API}/getBoardData`
    )
    return response.data;
}

export const fetchWeather = async (lat, lon, key) => {
    const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&lang=kr`
    )
    return response.data;
}

export const fetchSheetData = async () => {
    const response = await axios.get(
        `${process.env.REACT_APP_API}/sheet/getAll`
    )
    return response.data;
}

export const fetchIpData = async () => {
    const response = await axios.get(
        `/json/?key=demo2`, {
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    }
    )
    return response.data;
}