import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CarDTO } from '../dtos/CarDTO';

export type RootStackParamList = {
  Home: undefined;
  Splash: undefined;
  MyCars: undefined;
  CarDetails: { car: CarDTO };
  Schedule: { car: CarDTO };
  SchedulingDetails: { car: CarDTO; dates: string[] };
  SchedulingComplete: undefined;
};

export type HomeScreenProps = StackNavigationProp<RootStackParamList, 'Home'>;

export type SplashScreenProps = StackNavigationProp<RootStackParamList, 'Splash'>;

export type MyCarsScreenProps = StackNavigationProp<RootStackParamList, 'MyCars'>;

export type CarDetailsRouteProp = RouteProp<RootStackParamList, 'CarDetails'>;
export type CarDetailsScreenProps = StackNavigationProp<RootStackParamList, 'CarDetails'>;

export type ScheduleRouteProp = RouteProp<RootStackParamList, 'Schedule'>;
export type ScheduleScreenProps = StackNavigationProp<RootStackParamList, 'Schedule'>;

export type SchedulingDetailsRouteProp = RouteProp<RootStackParamList, 'SchedulingDetails'>;
export type SchedulingDetailsScreenProps = StackNavigationProp<
  RootStackParamList,
  'SchedulingDetails'
>;
