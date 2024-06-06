import React from 'react';
import { Text, Platform } from 'react-native';
import { render } from '@testing-library/react-native';

import { HeaderContainer } from '../HeaderContainer';

describe('HeaderContainer component', () => {
  it('renders correctly on Android', () => {
    Platform.OS = 'android';
    const { getByText, getByTestId } = render(
      <HeaderContainer>
        <Text>Child Component</Text>
      </HeaderContainer>
    );

    // Check if the SafeAreaView is rendered
    const safeAreaView = getByTestId('safe-area-view');
    expect(safeAreaView).toBeTruthy();

    // Check if the FontAwesome6 icon is rendered
    const icon = getByTestId('font-awesome-icon');
    expect(icon).toBeTruthy();

    // Check if the header text is rendered
    const headerText = getByTestId('header-text');
    expect(headerText).toBeTruthy();

    // Check if the separator is rendered
    const separator = getByTestId('separator-view');
    expect(separator).toBeTruthy();

    // Check if the children are rendered correctly
    const childComponent = getByText('Child Component');
    expect(childComponent).toBeTruthy();
  });

  it('renders correctly on iOS', () => {
    Platform.OS = 'ios';
    const { getByText, getByTestId } = render(
      <HeaderContainer>
        <Text>Child Component</Text>
      </HeaderContainer>
    );

    // Check if the SafeAreaView is rendered
    const safeAreaView = getByTestId('safe-area-view');
    expect(safeAreaView).toBeTruthy();

    // Check if the FontAwesome6 icon is rendered
    const icon = getByTestId('font-awesome-icon');
    expect(icon).toBeTruthy();

    // Check if the header text is rendered
    const headerText = getByTestId('header-text');
    expect(headerText).toBeTruthy();

    // Check if the separator is rendered
    const separator = getByTestId('separator-view');
    expect(separator).toBeTruthy();

    // Check if the children are rendered correctly
    const childComponent = getByText('Child Component');
    expect(childComponent).toBeTruthy();
  });

  it('matches snapshot on Android', () => {
    Platform.OS = 'android';
    const { toJSON } = render(
      <HeaderContainer>
        <Text>Snapshot Test</Text>
      </HeaderContainer>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('matches snapshot on iOS', () => {
    Platform.OS = 'ios';
    const { toJSON } = render(
      <HeaderContainer>
        <Text>Snapshot Test</Text>
      </HeaderContainer>
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
