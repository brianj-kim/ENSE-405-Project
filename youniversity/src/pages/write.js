import { useEffect } from 'react';
import Header from '../components/header';
import WritePosts from '../components/writePosts';

export default function Write() {
  useEffect(() => {
    document.title = 'Youniversity';
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <WritePosts/>
      </div>
    </div>
  );
}
