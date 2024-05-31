import React from 'react';
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useFetch = (url) => {

    const {
		isLoading,
		error,
		data: products,
	} = useQuery({
		queryKey: ["products"],
		queryFn: () => {
			return axios
				.get(url)
				.then((item) => item?.data);
		},
	});


    return [products , isLoading , error]
};

export default useFetch;