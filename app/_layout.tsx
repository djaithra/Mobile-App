import * as React from "react";
import "@/global.css";
import { Stack} from "expo-router";
import { StyleSheet } from 'react-native';
// TODO: Implement dark mode handling using a supported method or library if needed.


//import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
// import { config } from "@/components/ui/gluestack-ui.config";


export default function RootLayout() {
  return (
    // <GluestackUIProvider>
    //   <Stack/>
    // </GluestackUIProvider>   
      <Stack/> 
  ); 

}