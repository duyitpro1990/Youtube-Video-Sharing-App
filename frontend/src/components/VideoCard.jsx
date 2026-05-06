const VideoCard = ({ video }) => {
    return (
        <div className="flex flex-col md:flex-row gap-6 mb-8 w-full max-w-4xl mx-auto">
            <div className="w-full md:w-1/2 aspect-video bg-gray-200 border-2 border-black flex items-center justify-center relative">
                {video.youtube_url ? (
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${video.youtube_url.split('v=')[1]}`}
                        title={video.title}
                        frameBorder="0"
                        allowFullScreen
                        className="absolute inset-0"
                    ></iframe>
                ) : (
                    <span className="text-gray-500">Video Player</span>
                )}
            </div>

            <div className="w-full md:w-1/2 flex flex-col">
                <h3 className="text-xl font-bold text-red-600 mb-1">{video.title}</h3>
                <p className="text-sm text-gray-800 mb-2">Shared by: {video.user.email}</p>

                <div className="flex items-center gap-4 mb-2 text-xl">
          <span className="flex items-center gap-1 cursor-pointer hover:text-gray-600">
            👍 89
          </span>
                    <span className="flex items-center gap-1 cursor-pointer hover:text-gray-600">
            👎 12
          </span>
                </div>

                <p className="text-sm font-bold mb-1">Description:</p>
                <p className="text-sm text-gray-700 line-clamp-4 leading-relaxed font-serif italic">
                    {video.description}
                </p>
            </div>
        </div>
    );
};

export default VideoCard;
