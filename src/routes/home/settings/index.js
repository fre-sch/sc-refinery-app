import { h } from 'preact';
import {useEffect, useState} from "preact/hooks";
import style from './style.css';

// Note: `user` comes from the URL, courtesy of our router
const Default = () => (
	<div class="p-3">Welcome</div>
  )
  
  const SettinsIndex = () => {
	return (
	  <div class="d-flex flex-grow-1">
		<Sidebar />
		<Router>
		  <Default path={constants.BASEURL + "/home"} />
		  <MiningSession path={constants.BASEURL + "/home/mining_session"} />
		  <MiningSession path={constants.BASEURL + "/home/settings"} />
		</Router>
	  </div>
	)
  }
  
  export default SettinsIndex
