import * as React from "react";
import "@/global.css";
import { Stack} from "expo-router";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
// import { config } from "@/components/ui/gluestack-ui.config";


export default function RootLayout() {
  return (
    <GluestackUIProvider>
      <Stack/>
    </GluestackUIProvider>    
  ); 

}