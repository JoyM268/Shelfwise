import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function useMenu() {
	const [menu, setMenu] = useState(false);
	const scrollPosition = useRef(0);
	const location = useLocation();

	useEffect(() => {
		setMenu(false);
	}, [location]);

	useEffect(() => {
		if (menu) {
			scrollPosition.current = window.scrollY;
			document.body.style.position = "fixed";
			document.body.style.top = `-${scrollPosition.current}px`;
			document.body.style.width = "100%";
		} else {
			document.body.style.position = "";
			document.body.style.top = "";
			document.body.style.width = "";
			window.scrollTo(0, scrollPosition.current);
			scrollPosition.current = 0;
		}

		return () => {
			document.body.style.position = "";
			document.body.style.top = "";
			document.body.style.width = "";
		};
	}, [menu]);

	useEffect(() => {
		function handleResize() {
			if (window.innerWidth >= 640) {
				if (menu) {
					setMenu(false);
				}
			}
		}

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, [menu]);

	return { menu, setMenu };
}
