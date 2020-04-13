import React from "react";
import { Heading } from "rebass";
import throttle from "lodash/fp/throttle";
import debounce from "lodash/fp/debounce";

interface DurationTrackInterface {
  numbers: number[];
  qualifier: string;
  onChange: any;
  value?: number;
}

export default function DurationTrack({
  numbers,
  qualifier,
  onChange,
  value
}: DurationTrackInterface) {
  const list = React.useRef(null);

  const debouncedOnChange = debounce(100, onChange);

  React.useEffect(() => {

    const observer = new IntersectionObserver(
      throttle(100, (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          if (
            entry &&
            entry.intersectionRatio === 1 &&
            entry.target &&
            entry.target.textContent &&
            value + "" !== entry.target.textContent
          ) {
            debouncedOnChange(Number.parseFloat(entry.target.textContent));
          }
        });
      }),
      { threshold: 0.99 }
    );

    if (list && list.current) {
      const currRef = list.current as any;
      [...currRef.children].forEach((child) => {
        observer.observe(child);
      });
    }

    return () => observer.disconnect()
  }, [value, debouncedOnChange]);

  const renderNumberJSX = () => {
    return numbers.map((number, i) => {
      const numberStyle = {
        height: 72,
        backgroundColor: number === value ? "rgba(255, 203, 9, 0.3)" : "transparent",
        scrollSnapAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: i === 0 ? 60 : 0,
        marginBottom: i === numbers.length - 1 ? 60 : 0,
      };
      return (
        <li key={qualifier + number} style={numberStyle}>
          {number}
        </li>
      );
    });
  };

  return (
    <div style={{ width: '50%', textAlign: 'center', height: "100%" }}>
      <Heading my={3}>{qualifier}</Heading>
      <ol
        style={{
          overflowY: "auto",
          height: 192,
          scrollSnapType: "y mandatory",
          listStyle: "none",
          padding: "0",
          margin: 0,
        }}
        ref={list}
      >
        {renderNumberJSX()}
      </ol>
    </div>
  );
}
