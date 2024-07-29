/** @format */

import React from "react";
import Header from "../dashboard/_component/Header";


const layout = ({ children }) => {
	return (
		<div className="bg-[url('/background2.svg')] bg-cover h-screen text-center">
			<Header/>
			<div className='mx-5 md:mx-20 lg:mx-32'>{children}</div>
		</div>
	);
};

export default layout;
