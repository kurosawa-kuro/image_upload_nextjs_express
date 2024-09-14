import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home', () => {
  it('renders file input and upload button', () => {
    render(<Home />);
    
    // ファイル入力フィールドをチェック
    const fileInput = screen.getByLabelText('ファイルを選択', { selector: 'input[type="file"]' });
    expect(fileInput).toBeInTheDocument();

    // アップロードボタンをチェック
    const uploadButton = screen.getByRole('button', { name: /アップロード/i });
    expect(uploadButton).toBeInTheDocument();
    expect(uploadButton).toBeDisabled();
  });

  // オプション：アップロードステータスのテスト
  it('initially does not show upload status', () => {
    render(<Home />);
    const statusElement = screen.queryByText(/アップロードステータス/i);
    expect(statusElement).not.toBeInTheDocument();
  });
});