import { useEffect } from "react";

export default function useDragScrollX() {
  useEffect(() => {
    const slider = document.querySelector(".reviews");
    if (!slider) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    // Mouse
    const mouseDown = (e) => {
      isDown = true;
      startX = e.pageX;
      scrollLeft = slider.scrollLeft;
    };

    const mouseUp = () => {
      isDown = false;
      slider.classList.remove("active");
    };

    const mouseLeave = () => {
      isDown = false;
      slider.classList.remove("active");
    };

    const mouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();

      const dx = e.pageX - startX;
      slider.scrollLeft = scrollLeft - dx;
    };

    // Mobile
    const touchStart = (e) => {
      startX = e.touches[0].pageX;
      scrollLeft = slider.scrollLeft;
    };

    const touchMove = (e) => {
      const dx = e.touches[0].pageX - startX;
      slider.scrollLeft = scrollLeft - dx;
    };

    slider.addEventListener("mousedown", mouseDown);
    slider.addEventListener("mouseup", mouseUp);
    slider.addEventListener("mouseleave", mouseLeave);
    slider.addEventListener("mousemove", mouseMove);
    slider.addEventListener("touchStart", touchStart);
    slider.addEventListener("touchMove", touchMove);
  }, []);
}