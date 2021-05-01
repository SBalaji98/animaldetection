import './App.css';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import { compose, withProps } from 'recompose';
import { React, useEffect, useState } from 'react';
import boopSfx from './assets/sound/notification.mp3';
import useSound from 'use-sound';
const MyMapComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=API_KEY' +
      process.env.REACT_APP_MAP_KEY,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `190%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap defaultZoom={14} defaultCenter={props.position}>
    {props.isMarkerShown && (
      <Marker
        onClick={() => {
          props.play();
        }}
        position={props.position}
      />
    )}
  </GoogleMap>
));

function App() {
  const [state, setstate] = useState({});

  const [play] = useSound(boopSfx, { volume: 0.2 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      playSound();
      setstate({
        position: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      });
    });
  }, []);

  const playSound = () => {
    console.log('play');
    return play();
  };

  return (
    <div className="App">
      <MyMapComponent
        isMarkerShown
        play={playSound}
        position={state.position}
      />
    </div>
  );
}

export default App;
