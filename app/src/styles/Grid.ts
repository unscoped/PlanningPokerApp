import { StyleSheet } from 'react-native';

const GUTTER_WIDTH = 24; // TODO: Make responsive for tablet & mobile
const COLUMN_COUNT = 4;
export const COLUMN_WIDTH = `${100 / COLUMN_COUNT}%`;

export const gridStyles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
  },
  column: {
    width: COLUMN_WIDTH,
    paddingHorizontal: GUTTER_WIDTH / 2,
  },
});
