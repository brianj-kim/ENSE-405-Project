import { useEffect } from 'react';
import Header from '../components/header';
import Timeline from '../components/timeline';

export default function Dashboard() {
  useEffect(() => {
    document.title = 'Youniversity';
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <Timeline />
      </div>
    </div>
  );
}
