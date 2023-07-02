import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, useMediaQuery, Typography } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import useStyles from './styles';

// Import the SVG icons
import attraction from '../icons/attraction.svg';
import hotel from '../icons/hotel.svg';
import restaurant from '../icons/restaurant.svg';

const Map = ({ setCoordinates, setBounds, coordinates, places, setChildClicked }) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');

  const getIconByCategory = (category) => {
    switch (category) {
      case 'restaurant.svg':
        return <restaurant.svg />;
      case 'attraction.svg':
        return <attraction.svg />;
      case 'hotel':
        return <hotel.svg/>;
      default:
        return <LocationOnOutlinedIcon color="primary" fontSize="large" />;
    }
  };

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={''}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, i) => (
          <div className={classes.markerContainer} lat={Number(place.latitude)} lng={Number(place.longitude)} key={i}>
            {!isDesktop ? (
              getIconByCategory(place.category)
            ) : (
              <Paper elevation={6} className={classes.paper}>
                <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                  {place.name}
                </Typography>
                {getIconByCategory(place.category)}
              </Paper>
            )}
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
