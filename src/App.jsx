import React, { useState } from 'react'
import logo from './logo.svg';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import {Paper, Grid, Box, Typography} from '@material-ui/core';
import TinderCard from 'react-tinder-card';
import TabPanel from './Pages/DashboardModal';
import DataLayer from './Pages/DataLayer';
import Instruments from './Pages/Instruments';
import NavBar from './Pages/NavBar';
import {View} from 'react-native';
import ModalRoot from './Shared/ModalRoot';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { hideModal } from './actions/bluevilleActions';


function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

function App(props) {
  const modalProps=props.modalProps;
  const modalType=modalProps.modalType;
  const open=modalProps.open;
  const [selectedTab, setSelectedTab] = useState('instrument');
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  

 
  return (
    <React.Fragment>
     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Box>
      open{open.toString()}<br/>
      modalProps{JSON.stringify(modalProps)}<br/>
      {/* //modalTypes{modalTypes.toString()} */}
    <Router>
    {/* <Route exact path='/' component={tabs[selectedTab]}/> */}
    <Route exact path='/' component={Instruments}/>
    </Router>
    </Box>
       </View>
       {modalType!==undefined && modalType!==null && <ModalRoot handleClose={hideModal} open={open}/> }
       </React.Fragment>

       )
}
const mapStateToProps = (state) => ({
  modalProps: state.blueville.modalProps,
  modalType: state.blueville.modalTYpe
});
const mapDispatchToProps = (dispatch) => ({
  hideModal: () => dispatch(hideModal()),
  
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
