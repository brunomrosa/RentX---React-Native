import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { CarDetails } from '../screens/CarDetails';
import { Home } from '../screens/Home';
import { Schedule } from '../screens/Schedule';
import { SchedulingComplete } from '../screens/SchedulingComplete';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { MyCars } from '../screens/MyCars';
import { Splash } from '../screens/Splash';

import { RootStackParamList } from './interfaces';

export function StackRoutes() {
  const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Screen name="Splash" component={Splash} />
      <Screen name="Home" component={Home} options={{
        gestureEnabled: false,
      }} />
      <Screen name="MyCars" component={MyCars} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Schedule" component={Schedule} />
      <Screen name="SchedulingComplete" component={SchedulingComplete} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
    </Navigator>
  );
}
