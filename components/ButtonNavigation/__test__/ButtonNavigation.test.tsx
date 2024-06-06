import { render } from '@testing-library/react-native';
import { ButtonNavigation } from '../ButtonNavigation';

describe('ButtonNavigation', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(
      <ButtonNavigation href="/test" text="Click me" />
    );

    const buttonText = getByText('Click me');
    expect(buttonText).toBeTruthy();
    expect(buttonText.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: '#364A77' })])
    );
  });

  it('renders correctly with custom props', () => {
    const { getByText } = render(
      <ButtonNavigation
        href="/test"
        text="Click me"
        color="#123456"
        textColor="#abcdef"
      />
    );

    const buttonText = getByText('Click me');
    expect(buttonText).toBeTruthy();
    expect(buttonText.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: '#abcdef' })])
    );
  });
});
