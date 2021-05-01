import { React, useEffect, useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  Circle,
  InfoBox,
  MarkerClusterer,
} from '@react-google-maps/api';
import useSound from 'use-sound';
import boopSfxBuzzer from './assets/sound/WarningBuzzer.mp3';
function App() {
  const [state, setState] = useState({
    markers: [
      // { lat: 13.03357218847357, lng: 77.67387421911434 },
      // { lat: 13.0335721884736, lng: 77.68387421911444 },
      // { lat: 13.0335721884737, lng: 77.69387421911454 },
      // { lat: 13.0335721884738, lng: 77.70387421911464 },
      // { lat: 13.0335721884739, lng: 77.71387421911474 },
    ],
  });

  const getMyLocation = async () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setState({
        ...state,
        position: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      });
    });
  };
  useEffect(async () => {
    await getMyLocation();
  }, [state.markers]);

  useEffect(() => {
    const timer = setInterval(async () => {
      fetch('http://localhost:3001/getAnimal')
        .then((response) => response.json())
        .then((data) => {
          setState({ ...state, markers: data });
        });
    }, 20000);
    // clearing interval
    // return () => clearInterval(timer);
  }, []);

  const containerStyle = {
    // height: '760px',
    // width: '1530px',
    height: window.screen.availHeight - 10,
    width: window.screen.availWidth - 20,
  };

  const [play] = useSound(boopSfxBuzzer, { volume: 0.5 });
  const playSound = () => {
    return play();
  };
  const options = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.6,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 200,
    zIndex: 1,
  };
  // after identifying the animal the conditional rendering of the
  //circle happens on the map and the sound is played on load
  const onLoad = (circle) => {
    console.log('Circle onLoad circle: ', circle);
    playSound();
  };

  const onUnmount = (circle) => {
    console.log('Circle onUnmount circle: ', circle);
  };

  // const handleAnimal = () => {
  //   setState({ ...state, isAnimal: true });
  //   setTimeout(() => {
  //     setState({ ...state, isAnimal: false });
  //   }, 100000);
  // };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_KEY}>
      <div
        style={{
          height: '100%',
        }}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={state.position}
          zoom={18}
        >
          {
            // state.isAnimal &&
            state.markers &&
              state.markers.map((x, i) => (
                <>
                  <Circle
                    // optional
                    key={i}
                    onLoad={playSound}
                    // optional
                    onUnmount={onUnmount}
                    // required
                    center={x.location}
                    // required
                    options={options}
                  />
                  <Marker
                    key={i}
                    icon={
                      'http://maps.google.com/mapfiles/kml/shapes/horsebackriding.png'
                    }
                    position={x.location}
                    // onClick={handleAnimal}
                  />
                  <InfoBox
                    onLoad={onLoad}
                    options={{ closeBoxURL: '', enableEventPropagation: true }}
                    position={x.location}
                  >
                    <div
                      style={{
                        backgroundColor: 'yellow',
                        opacity: 0.75,
                        padding: 12,
                      }}
                    >
                      <div style={{ fontSize: 16, fontColor: `#08233B` }}>
                        Animal activity detected,Go Slow
                      </div>
                    </div>
                  </InfoBox>{' '}
                </>
              ))
          }

          {/* Child components, such as markers, info windows, etc. */}
          <Marker
            position={state.position}
            icon={
              'http://earth.google.com/images/kml-icons/track-directional/track-0.png'
            }
            // onClick={handleAnimal}
            title={state.position}
            label="Click Me"
          />
        </GoogleMap>
      </div>
    </LoadScript>
  );
}

export default App;
