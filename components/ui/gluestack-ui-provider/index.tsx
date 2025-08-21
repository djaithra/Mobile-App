import * as React from 'react';
import { useEffect } from 'react';
import { config } from './config';
import { View, ViewProps } from 'react-native';
import { OverlayProvider } from '@gluestack-ui/overlay';
import { ToastProvider } from '@gluestack-ui/toast';
export function GluestackUIProvider({
  children,
  style
}: {
  children?: React.ReactNode;
  style?: ViewProps['style'];
}) {
  return (
    <View style={[{ flex: 1, height: '100%', width: '100%' }, style]}>
      <OverlayProvider>
        <ToastProvider>{children}</ToastProvider>
      </OverlayProvider>
    </View>
  );
}
