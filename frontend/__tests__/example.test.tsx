import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Home from '@/app/page';

// axiosのモック
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Home', () => {
  beforeEach(() => {
    // axiosのモックをリセット
    mockedAxios.post.mockReset();
  });

  it('renders file input and upload button', () => {
    render(<Home />);
    
    const fileInput = screen.getByLabelText('ファイルを選択');
    expect(fileInput).toBeInTheDocument();

    const uploadButton = screen.getByRole('button', { name: /アップロード/i });
    expect(uploadButton).toBeInTheDocument();
    expect(uploadButton).toBeDisabled();
  });

  it('enables upload button when file is selected', () => {
    render(<Home />);
    
    const fileInput = screen.getByLabelText('ファイルを選択') as HTMLInputElement;
    const uploadButton = screen.getByRole('button', { name: /アップロード/i });

    const file = new File(['test'], 'test.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(uploadButton).toBeEnabled();
  });

  it('uploads file and displays status', async () => {
    // モックレスポンスの設定
    mockedAxios.post.mockResolvedValue({
      data: {
        message: 'ファイルが正常にアップロードされました',
        file: { filename: '1726356094725_test-image.png' },
        url: 'http://localhost:3001/Images/1726356094725_test-image.png'
      }
    });

    render(<Home />);
    
    const fileInput = screen.getByLabelText('ファイルを選択') as HTMLInputElement;
    const uploadButton = screen.getByRole('button', { name: /アップロード/i });

    const file = new File(['test'], 'test.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [file] } });
    fireEvent.click(uploadButton);

    await waitFor(() => {
      expect(screen.getByText(/アップロードステータス: ファイルが正常にアップロードされました/)).toBeInTheDocument();
    });

    const uploadedImage = await screen.findByAltText('Uploaded');
    expect(uploadedImage).toBeInTheDocument();
    expect(uploadedImage).toHaveAttribute('src', 'http://localhost:3001/Images/1726356094725_test-image.png');
  });

  it('displays error message on upload failure', async () => {
    // エラーレスポンスのモック
    mockedAxios.post.mockRejectedValue(new Error('Network Error'));

    render(<Home />);
    
    const fileInput = screen.getByLabelText('ファイルを選択') as HTMLInputElement;
    const uploadButton = screen.getByRole('button', { name: /アップロード/i });

    const file = new File(['test'], 'test.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [file] } });
    fireEvent.click(uploadButton);

    await waitFor(() => {
      expect(screen.getByText(/アップロードステータス: アップロードエラーが発生しました/)).toBeInTheDocument();
    });
  });
});