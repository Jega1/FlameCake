import React from "react";
import { UncontrolledCarousel } from "reactstrap";
import image1 from "../static/images/img1.jpg";
import image2 from "../static/images/img2.jpg";
import image3 from "../static/images/img3.jpg";

const items = [
	{
		src: image1,
		altText: "Slide 1",
		caption: "Slide 1",
		header: "Slide 1 Header",
		key: "1"
	},
	{
		src: image2,
		altText: "Slide 2",
		caption: "Slide 2",
		header: "SlideHeader",
		key: "2"
	},
	{
		src: image3,
		altText: "Slide 3",
		caption: "Slide 3",
		header: "Slide 3 Header",
        key: "3"
       
	}
];

const Carousel = () => <UncontrolledCarousel items={items} />;

export default CarouselC;
