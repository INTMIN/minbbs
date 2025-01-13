```
一个简单的react版本的swiper代码示例
```

```ts app.ts 

import React, { Component } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, EffectCoverflow,  } from 'swiper';
// Import Swiper styles
import "swiper/swiper.less";
import './style.less';
import "swiper/swiper-bundle.css";
const videoData = [
 "4.mp4",
 "4.mp4",
 "4.mp4",
 "4.mp4",
 "4.mp4",
 "4.mp4",
];
SwiperCore.use([EffectCoverflow, Pagination]);
class Index extends Component {
  render() {
    return (
      <div style={{ width: "100%", height: "900px" }}>
        <Swiper
          style={{height: 500}}
          effect={"coverflow"}
          grabCursor
          centeredSlides
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          // slideShadows
          pagination
          onSlideChange={(swiper) => console.log(swiper.realIndex,"slide change")}
          // onSwiper={(swiper) => console.log(swiper)}
        >
          {videoData.map((item, i) => (
            <SwiperSlide key={i}>
              <div style={{  width: '100%', textAlign: 'center' }}>
                <video
                  controls
                  poster="back.png"
                  webkit-playsinline
                  playsinline
                  src="http://ss.mp4"
                  style={{ width: '90%' }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }
}
export default Index;
 
```