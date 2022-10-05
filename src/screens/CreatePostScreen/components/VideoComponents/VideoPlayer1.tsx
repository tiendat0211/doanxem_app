import React, { useState, useRef } from 'react';
import { StyleSheet, View, Platform, Text, Dimensions } from 'react-native';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import Video from 'react-native-video';

const widthWD = Dimensions.get('window').width
const heightWD = Dimensions.get('window').height


interface VideoPlayer1Props  {
  uri?:string,
  content:any
}

const VideoPlayer1:React.FC<VideoPlayer1Props> = (props) => {
  // The video we will play on the player.
 const { uri, content } = props
  const videoPlayer = useRef(null);
  const [duration, setDuration] = useState(0);
  const [paused, setPaused] = useState(true);

  const [currentTime, setCurrentTime] = useState(0);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PAUSED);
  const [isLoading, setIsLoading] = useState(true);
  const [heightViewImageOrVideo, setHeightViewImageOrVideo] = useState(300);

  const onSeek = (seek: any) => {
    videoPlayer?.current.seek(seek);
  };

  const onSeeking = (currentVideoTime: any) => setCurrentTime(currentVideoTime);

  const onPaused = (newState: any) => {
    setPaused(!paused);
    setPlayerState(newState);
  };

  const onReplay = () => {
    videoPlayer?.current.seek(0);
    setCurrentTime(0);
    if (Platform.OS === 'android') {
      setPlayerState(PLAYER_STATES.PAUSED);
      setPaused(true);
    } else {
      setPlayerState(PLAYER_STATES.PLAYING);
      setPaused(false);
    }
  };

  const onProgress = (data:any) => {
    if (!isLoading) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data:any) => {
    setDuration(Math.round(data.duration));
    setIsLoading(false);
    const { width, height } = data.naturalSize;
    if (height >= heightWD * 0.6) {
      const heights = heightWD * 0.6;
      setHeightViewImageOrVideo(heights);
    } else {
      const heightScaled = (height / width) * widthWD;
      setHeightViewImageOrVideo(heightScaled);
    }
  };

  const onLoadStart = () => setIsLoading(true);

  const onEnd = () => {
    setPlayerState(PLAYER_STATES.ENDED);
    setCurrentTime(duration);
  };

  return (
    <View style={styles.container}>
      <Video
        // onPictureInPictureStatusChanged={{
        //   isActive: true,
        // }}

        onEnd={onEnd}
        onLoad={onLoad}
        allowsExternalPlayback={false}
        onLoadStart={onLoadStart}
        posterResizeMode={'contain'}
        playInBackground={false}
        playWhenInactive={false}
        onProgress={onProgress}
        controls={Platform.OS === 'ios' ? true : false}
        paused={paused}
        ref={(ref:any) => (videoPlayer.current = ref)}
        resizeMode={'contain'}
        ignoreSilentSwitch={'ignore'}
        poster={uri}
        source={{
          uri: uri,
          // cache: true,
        }}
        // style={styles.backgroundVideo}
        style={[styles.backgroundVideo, { height: heightViewImageOrVideo }]}
      />

      {Platform.OS === 'ios' ? null : (
        <MediaControls
          isFullScreen={false}
          duration={duration}
          isLoading={isLoading}
          progress={currentTime}
          onPaused={onPaused}
          showOnStart={true}
          onReplay={onReplay}
          onSeek={onSeek}
          onSeeking={onSeeking}
          // mainColor="#000000AA"
          mainColor={'blue'}
          playerState={playerState}
          // toolbar={renderToolbar()}
          toolbarStyle={styles.toolbar}
          containerStyle={styles.container}
        // sliderStyle={{containerStyle: {}, thumbStyle: {}, trackStyle: {}}}
        >
          <MediaControls.Toolbar>
            <View style={styles.toolbar}>
              <Text style={styles.txtContent}>{content || ''}</Text>
            </View>
          </MediaControls.Toolbar>
        </MediaControls>
      )}
    </View>
  );
};

const renderToolbar = () => (
  <View>
    <Text style={styles.toolbar}> toolbar </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  backgroundVideo: {
    width: '100%',
  },
  mediaControls: {
    height: '100%',
    flex: 1,
    alignSelf: 'center',
  },
  txtContent: {
    color: 'white',
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
});

export default VideoPlayer1;
