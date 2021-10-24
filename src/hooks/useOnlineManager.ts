import NetInfo from '@react-native-community/netinfo';
import React from 'react';
import {onlineManager} from 'react-query';

export function useOnlineManager() {
  React.useEffect(() => {
    return NetInfo.addEventListener(state => {
      onlineManager.setOnline(
        state.isConnected != null &&
          state.isConnected &&
          Boolean(state.isInternetReachable),
      );
    });
  }, []);
}
