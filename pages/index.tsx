import type { NextPage } from "next";
import { SetStateAction } from "react";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [partyTime, setPartyTime] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const myLoader = ({ src, width, quality }: { src: string, width: number, quality: number}) => {
    return `https://example.com/${src}?w=${width}&q=${quality || 75}`
  }

  const format = (index: number | SetStateAction<number>) =>
    index <= 9 ? index : Number(`0${index}`);

  useEffect(() => {
    const target = new Date("10/30/2022 00:00:00");

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(format(d));

      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setHours(format(h));

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(format(m));

      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s <= 9 ? Number(`0${s}`) : s);

      if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
        setPartyTime(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Countdown Timer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {partyTime ? (
        <>
          <h1>Happy new year!</h1>
          <video autoPlay loop muted>
            <source src="/party.mp4" />
          </video>
        </>
      ) : (
        <>
          <div className="timer-wrapper">
            <div className="timer-inner">
              <div className="timer-segment">
                <span className="time">{format(days)}</span>
                <span className="label">Days</span>
              </div>
              <span className="divider">:</span>
              <div className="timer-segment">
                <span className="time">{format(hours)}</span>
                <span className="label">Hours</span>
              </div>
              <span className="divider">:</span>
              <div className="timer-segment">
                <span className="time">{format(minutes)}</span>
                <span className="label">Minutes</span>
              </div>
              <span className="divider">:</span>
              <div className="timer-segment">
                <span className="time">{format(seconds)}</span>
                <span className="label">Seconds</span>
              </div>
            </div>
          </div>
            {/* <Image
              alt="background image"
              src="https://picsum.photos/1920/1080?random=1"
              layout="fill"
              quality={100}
          /> */}
        </>
      )}
    </div>
  );
};

export default Home;
