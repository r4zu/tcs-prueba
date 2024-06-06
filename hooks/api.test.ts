import { renderHook } from '@testing-library/react-hooks';
import { useGetProducts, callUrl, URL } from './api';

global.fetch = jest.fn();

describe('useGetProducts', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('should fetch products and set them in state', async () => {
    const mockProducts = [{ id: '1', name: 'Product 1' }];
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });

    const { result, waitForNextUpdate } = renderHook(() => useGetProducts());

    await waitForNextUpdate();

    expect(result.current.products).toEqual(mockProducts);
    expect(fetch).toHaveBeenCalledWith(URL, { headers: { authorId: '43' } });
  });

  it('should return an empty array if fetch fails', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const { result, waitForNextUpdate } = renderHook(() => useGetProducts());

    // Wait for the async state update
    await waitForNextUpdate();

    expect(result.current.products).toEqual([]);
    expect(fetch).toHaveBeenCalledWith(URL, { headers: { authorId: '43' } });
  });

  it('callUrl should return products when fetch is successful', async () => {
    const mockProducts = [{ id: '1', name: 'Product 1' }];
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });

    const products = await callUrl();

    expect(products).toEqual(mockProducts);
    expect(fetch).toHaveBeenCalledWith(URL, { headers: { authorId: '43' } });
  });

  it('callUrl should return an empty array when fetch fails', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const products = await callUrl();

    expect(products).toEqual([]);
    expect(fetch).toHaveBeenCalledWith(URL, { headers: { authorId: '43' } });
  });
});
