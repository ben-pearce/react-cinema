import React from 'react';

import CinemaOffAir from '../images/cinema_off_air.png';

import CinemaConfig from '../../cinema.config.js';

import Plyr from 'plyr-react';
import Hls from 'hls.js';

function getStreamMediaURL() {
  return `${CinemaConfig.stream_src}/${CinemaConfig.stream_key}.m3u8`;
}


class Screen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      live: false,
      title: 'Live'
    };

    this.player = React.createRef();
    this.plyr = <Plyr ref={this.player} poster={CinemaOffAir}
      options={{
        controls: ['play', 'mute', 'volume', 'pip', 'fullscreen'],
        autoplay: 'true',
        muted: true
      }}
      source={{
        type: 'video'
      }}
    />;
  }

  load() {
    if(Hls.isSupported()) {
      const video = document.getElementsByTagName('video')[0];
      const hls = new Hls();
      hls.loadSource(getStreamMediaURL());
      hls.once(Hls.Events.MANIFEST_PARSED, () => {
        hls.attachMedia(video);
        this.player.current.plyr.play();
        this.setState({ live: true });
      });
      hls.once(Hls.Events.ERROR, () => {
        this.player.current.plyr.stop();
        this.setState({ live: false });
        setTimeout(this.load.bind(this), 2500);
      });
    }
  }

  render() {
    document.title = this.state.live ? `🎥 ${this.state.title} - ${CinemaConfig.cinema_name}` : CinemaConfig.cinema_name;
    return (
      <div>
        <h1>{ this.state.live ? this.state.title : 'Off-Air' }</h1>
        {this.plyr}
      </div>
    );
  }
}

export default Screen;