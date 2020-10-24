import React from 'react';

import CinemaOffAir from '../images/cinema_off_air.png';
import CinemaConfig from '../../cinema.config.js';
import VideoPlayer from './VideoPlayer.jsx';
import { ScreenContentLoader } from './ContentLoaders.jsx';

function getStreamMediaURL() {
  return `${CinemaConfig.stream_src}/${CinemaConfig.stream_key}.m3u8`;
}


class Screen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      live: null,
      title: 'Live'
    };

    this.player = React.createRef();
    
    this.videoJsOptions = {
      muted: true,
      autoplay: true,
      controls: true,
      fluid: true,
      sources: [{
        src: getStreamMediaURL(),
        type: 'application/x-mpegURL'
      }]
    };

    this.video = <VideoPlayer ref={this.player} { ... this.videoJsOptions } />;
    this.load();
  }

  load() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if(xhr.readyState === XMLHttpRequest.DONE) {
        if(xhr.status === 404) {
          xhr.abort();
        
          this.setState({ live: false });
          setTimeout(this.load.bind(this), 2500);
        } else if(xhr.status === 200) {
          xhr.abort();

          this.setState({ 
            live: true 
          }, () => {
            this.player.current.player.play();
            this.player.current.player.on('ready', () => {
              this.player.current.player.tech(true).on('retryplaylist', () => {
                this.load();
              });
            });
          });
        }
      }
    };
    xhr.open('GET', getStreamMediaURL(), true);
    xhr.send();
  }

  render() {
    document.title = this.state.live ? `🎥 ${this.state.title} - ${CinemaConfig.cinema_name}` : CinemaConfig.cinema_name;
    return (
      <div>
        <h1>{ this.state.live ? this.state.title : 'Off-Air' }</h1>
        { this.state.live === null ? <ScreenContentLoader/> : this.state.live ? this.video : <img src={CinemaOffAir} width="100%"/>}
      </div>
    );
  }
}

export default Screen;