import axios from "axios";
import { useQuery } from "react-query";

export const useApiRequestCurrency = () => {
    const { isLoading, error, data } = useQuery("currencyData", async () =>
        await axios.get(
            "https://api.bithumb.com/public/ticker/ALL", {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
        ), {
        refetchInterval: 10000,
        staleTime: 2000,
        cacheTime: Infinity
    }
    );

    return { loading: isLoading, error: error, data: data?.data?.data };
};
