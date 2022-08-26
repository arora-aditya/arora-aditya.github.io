import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';

export default function useMusic() {  
    const [nowPlaying, setNowPlaying] = useState<boolean>(false);
    const [artist, setArtist] = useState<string>("");
    const [song, setSong] = useState<string>("");
    const [dataExists, setDataExists] = useState<boolean>(false);
    const [url, setUrl] = useState<string>("");
    const [lastListenedAt, setLastListenedAt] = useState<string>("");
    
    useEffect(() => {
        const getData = async () => {
          var xhr = new XMLHttpRequest();
          xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
              let d = JSON.parse(this.responseText);
              if("@attr" in d && "nowplaying" in d["@attr"]) {
                setNowPlaying(true);
              } else {
                const now = DateTime.now();
                const ts = DateTime.fromSeconds(Number(d["date"]["uts"]));
                if(now.diff(ts).as("hours") < 1) {
                  setLastListenedAt(` ${Math.round(now.diff(ts).as("minute"))} minutes ago`);
                } else {
                  setLastListenedAt(` ${Math.round(now.diff(ts).as("hour"))} hours ago`);
                }
              }
              setArtist(d["artist"]["#text"]);
              setSong(d["name"]);
              setUrl(d["url"]);
              setDataExists(true);
            }
          });
    
          xhr.open("GET", "https://backend.arora-aditya.com/spotify");
          xhr.send();
        };
        getData();
    }, [])

    return {
        nowPlaying,
        artist,
        song,
        dataExists,
        url,
        lastListenedAt
    }
}