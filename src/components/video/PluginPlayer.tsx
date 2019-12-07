import React, { useEffect } from 'react';
import 'dplayer/dist/DPlayer.min.css';
import DPlayer from 'dplayer';

export const PluginPlayer: React.FC<{ movieUrlsData: any[] }> = (props) => {
  const { movieUrlsData } = props;

  // dplayer 的控制
  useEffect(() => {
    const dp = new DPlayer({
      container: document.getElementById('dplayer'),
      video: {
        url: movieUrlsData[0] ? movieUrlsData[0].url : '',
      },
    })
  }, [movieUrlsData])

  return (
    <div id="dplayer" className="m-video"></div>
  )
}