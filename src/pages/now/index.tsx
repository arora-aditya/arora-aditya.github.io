import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import FancyLink from '../../components/FancyLink';

import useMusic from '../../hooks/useMusic';

export const Text = ({ text } : any) => {
  if (!text) {
    return null;
  }
  return text.map((value: any) => {
    const {
      annotations: { color },
      text,
    } = value;
    return (
      <span
        style={color !== "default" ? { color } : {}}
      >
        {text.link ? <FancyLink href={text.link.url} className="highlight">{text.content}</FancyLink> : text.content}
      </span>
    );
  });
};

const renderBlock = (block: any) => {
  const { type, id } = block;
  const value = block[type];
  switch (type) {
    case "paragraph":
      return (
        <p>
          <Text text={value.rich_text} />
        </p>
      );
    case "heading_1":
      return (
        <h1>
          <Text text={value.rich_text} />
        </h1>
      );
    case "heading_2":
      return (
        <h2>
          <Text text={value.rich_text} />
        </h2>
      );
    case "heading_3":
      return (
        <h3>
          <Text text={value.rich_text} />
        </h3>
      );
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <div style={{paddingTop: "0.5rem"}}>
          - <Text text={value.rich_text} />
          <div style={{paddingLeft: "1rem"}}>
            {value.children?.map((block: any) => (
                <Fragment key={block.id}>{renderBlock(block)}</Fragment>
            ))}
          </div>
        </div>
      );
    case "to_do":
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />{" "}
            <Text text={value.rich_text} />
          </label>
        </div>
      );
    case "toggle":
      return (
        <details>
          <summary>
            <Text text={value.text} />
          </summary>
          {value.children?.map((block: any) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </details>
      );
    case "image":
      const src =
        value.type === "external" ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <figure>
          <img src={src} alt={caption} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    default:
      return `❌ Unsupported block (${
        type === "unsupported" ? "unsupported by Notion API" : type
      })`;
  }
};

const Now = styled.div`
p {
  font-family: 'Source Sans Pro';
  display: block;
  padding-top: 1rem;
}
`

export function Post({ last_updated, blocks }: any) {
var localDate = new Date(last_updated);
  if (!blocks) {
    return <div />;
  }
  return (
    <Now>
        <p>Last updated at: {localDate.toLocaleString()}</p>
        {blocks.map((block: any) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
        ))}
    </Now>
  );
}

export default function NowNowNow() {
    const [dataSet, setDataSet] = useState(false);
    const [data, setData] = useState({page: {last_edited_time: "2022-03-05T23:53:00.000Z"}, blocksWithChildren: []});
    const {nowPlaying, artist, song, dataExists, url, lastListenedAt} = useMusic();

    useEffect(() => {
        const getData = async () => {
            const d = await fetch('https://lichess-proxy.herokuapp.com/nownownow')
            const j = await d.json()
            setData(j)
            setDataSet(true)
        };
        getData();
    }, [])
    if(!!!dataSet) {
        return <div>Loading...</div>
    }

    return (
      <Fragment>
        <Post last_updated={data["page"].last_edited_time} blocks={data.blocksWithChildren} />
        <p>{dataExists ? <span>{nowPlaying ? `Currently listening to ` : `Last listened to `} <FancyLink href={url} className="highlight">{`${song} by ${artist}`}</FancyLink>{lastListenedAt}</span> : "can't reach spotify yet to get the last song"}</p>
      </Fragment> 
    )
}