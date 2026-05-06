import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import VideoCard from './VideoCard';

describe('VideoCard Component', () => {
    const mockVideo = {
        id: 1,
        title: 'Video Test Siêu Cấp',
        youtube_url: 'https://www.youtube.com/watch?v=123abc456',
        description: 'Đây là mô tả dùng để test',
        user: {
            email: 'tester@gmail.com'
        }
    };

    test('hiển thị đúng tiêu đề video', () => {
        render(<VideoCard video={mockVideo} />);

        // Kiểm tra xem tiêu đề có xuất hiện trên màn hình không
        const titleElement = screen.getByText('Video Test Siêu Cấp');
        expect(titleElement).toBeInTheDocument();
    });

    test('hiển thị đúng email người chia sẻ', () => {
        render(<VideoCard video={mockVideo} />);

        // Kiểm tra xem email người share có hiển thị đúng format không
        const sharedByElement = screen.getByText('Shared by: tester@gmail.com');
        expect(sharedByElement).toBeInTheDocument();
    });

    test('hiển thị đúng mô tả video', () => {
        render(<VideoCard video={mockVideo} />);

        const descElement = screen.getByText('Đây là mô tả dùng để test');
        expect(descElement).toBeInTheDocument();
    });
});
