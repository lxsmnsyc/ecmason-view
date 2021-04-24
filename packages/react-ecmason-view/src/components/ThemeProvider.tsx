import cxs, { CSSObject } from 'cxs';
import createModel, { createSelector, createValue } from 'react-scoped-model';
import THEMES, { Base16Theme } from '../base16/themes';

export interface ThemeProviderProps {
  theme?: Base16Theme;
  displayDataTypes?: boolean;
  collapseStringsAfterLength?: number;
  quotesOnKeys?: boolean;
  displayArrayKeys?: boolean;
  displayObjectSize?: boolean;
  indentSize?: number;
}

export interface ThemeProviderState {
  theme: Base16Theme;
  displayDataTypes: boolean;
  quotesOnKeys: boolean;
  displayArrayKeys: boolean;
  displayObjectSize: boolean;
  collapseStringsAfterLength?: number;
  indentSize: number;
  createStyle: (value: CSSObject) => string;
}

export const ThemeProvider = createModel(
  (props: ThemeProviderProps): ThemeProviderState => ({
    theme: props.theme ?? THEMES.default,
    displayDataTypes: props.displayDataTypes ?? true,
    quotesOnKeys: props.quotesOnKeys ?? true,
    displayArrayKeys: props.displayArrayKeys ?? true,
    displayObjectSize: props.displayObjectSize ?? true,
    collapseStringsAfterLength: props.collapseStringsAfterLength,
    indentSize: props.indentSize ?? 4,
    createStyle: cxs,
  }), {
    displayName: 'withReactECMASon(ThemeProvider)',
  },
);

export const useThemeProvider = createValue(ThemeProvider);

export const useTheme = createSelector(
  ThemeProvider,
  (state) => state.theme,
);

export const useCreateStyle = createSelector(
  ThemeProvider,
  (state) => state.createStyle,
);

export const useCollapseStringAfterLength = createSelector(
  ThemeProvider,
  (state) => state.collapseStringsAfterLength,
);

export const useDisplayDataTypes = createSelector(
  ThemeProvider,
  (state) => state.displayDataTypes,
);

export const useQuotesOnKeys = createSelector(
  ThemeProvider,
  (state) => state.quotesOnKeys,
);

export const useDisplayArrayKeys = createSelector(
  ThemeProvider,
  (state) => state.displayArrayKeys,
);

export const useDisplayObjectSize = createSelector(
  ThemeProvider,
  (state) => state.displayObjectSize,
);

export const useIndentSize = createSelector(
  ThemeProvider,
  (state) => state.indentSize,
);
