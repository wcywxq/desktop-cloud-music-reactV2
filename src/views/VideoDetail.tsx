import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useVideoDetail } from '@/hooks';

const VideoDetail: React.FC = () => {
  const { id } = useParams();
  /**
   * 获取 setVid 方法，用来传递 videoid 的值，用来发起请求
   */
  const { setVid } = useVideoDetail();

  useEffect(() => {
    if (id) {
      setVid(id);
    }
  }, [id, setVid])

  return (
    <div>
      视频详情 {id}
    </div>
  )
}

export default VideoDetail