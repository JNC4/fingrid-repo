import React, { useState } from 'react';

interface UpvoteButtonProps {
  initialCount?: number;
  onUpvote?: (isUpvoted: boolean) => void;
}

const UpvoteButton: React.FC<UpvoteButtonProps> = ({ 
  initialCount = 0,
  onUpvote = () => {},
}) => {
  const [upvoted, setUpvoted] = useState(false);
  const [count, setCount] = useState(initialCount);

  const handleUpvote = () => {
    if (!upvoted) {
      setCount(prev => prev + 1);
      setUpvoted(true);
      onUpvote(true);
    } else {
      setCount(prev => prev - 1);
      setUpvoted(false);
      onUpvote(false);
    }
  };

  return (
    <button
      onClick={handleUpvote}
      className={`flex flex-col items-center justify-center p-2 rounded-md border ${
        upvoted ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
      }`}
    >
      {/* Simple triangle arrow using Unicode */}
      <span className={`text-lg ${upvoted ? 'text-blue-500' : 'text-gray-500'}`}>
        ▲
      </span>
      <span className={`text-xs font-medium ${
        upvoted ? 'text-blue-500' : 'text-gray-500'
      }`}>
        {count}
      </span>
    </button>
  );
};

export default UpvoteButton;