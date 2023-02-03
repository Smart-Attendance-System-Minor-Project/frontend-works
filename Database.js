import SQLite from "react-native-sqlite-storage";
import React,{useState,useEffect} from "react";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "Reactoffline.db";
const database_version = "1.0";
const database_displayname = "WellAttend Mobile Database";
const database_size = 200000;

export default function DatabaseWellAttend() {

 
return(
    <View>Database</View>
)
}