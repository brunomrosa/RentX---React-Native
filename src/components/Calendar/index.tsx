import React from 'react';
import { Calendar as CustomCalendar, LocaleConfig, CalendarProps } from 'react-native-calendars';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { ptBr } from './localeConfig';

LocaleConfig.locales['pt-br'] = ptBr;
LocaleConfig.defaultLocale = 'pt-br';

export interface MarkedDateProps {
  [key: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disableTouchEvent?: boolean;
  };
}

export interface DayProps {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

export function Calendar({ markedDates, onDayPress }: CalendarProps) {
  const theme = useTheme();
  return (
    <CustomCalendar
      renderArrow={(direction) => (
        <Feather size={24} color={theme.colors.text} name={`chevron-${direction}`} />
      )}
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_detail,
        paddingBottom: 10,
        marginBottom: 10,
      }}
      theme={{
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        textDayHeaderFontSize: 10,
        textMonthFontFamily: theme.fonts.secondary_600,
        textMonthFontSize: 20,
        monthTextColor: theme.colors.title,
        arrowStyle: {
          marginHorizontal: -15,
        },
      }}
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
      firstDay={1}
      minDate={`${new Date()}`}
    />
  );
}
