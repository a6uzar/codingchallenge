import React, { useCallback, useEffect, useState } from 'react';
import { Tldraw, TldrawProps  } from '@tldraw/tldraw';

interface TldrawComponentProps {
  itemCount: number;
  shouldGenerate: boolean;
  onGenerated: () => void;
}

const TldrawComponent: React.FC<TldrawComponentProps> = ({ itemCount, shouldGenerate, onGenerated }) => {
  const [app, setApp] = useState<any>(null);

  const generateTimeline = useCallback(() => {
    if (!app) return;

    const { currentPage } = app;
    if (!currentPage) return;

    // Clear existing shapes
    /* currentPage.shapes.forEach(shape => {
      currentPage.deleteShape(shape.id);
    }); */

    // Clear existing shapes
    /* Object.values(currentPage.shapes).forEach((shape: TLShape) => {
      app.deleteShape(shape.id);
    }); */

    // Clear existing shapes
Object.values(currentPage.shapes).forEach((shape) => {
  if (typeof shape === 'object' && shape !== null && 'id' in shape) {
    app.deleteShape(shape.id);
  }
});

    const baselineY = 200;
    const startX = 100;
    const endX = 900;
    const step = (endX - startX) / (Math.max(itemCount - 1, 1));

    // Create baseline
    currentPage.createShape({
      type: 'line',
      x: startX,
      y: baselineY,
      props: {
        handles: {
          start: { id: 'start', index: 0, x: 0, y: 0 },
          end: { id: 'end', index: 1, x: endX - startX, y: 0 },
        },
      },
    });

    // Create timeline items
    for (let i = 0; i < itemCount; i++) {
      const x = startX + i * step;
      currentPage.createShape({
        type: 'geo',
        x: x - 5,
        y: baselineY - 5,
        props: {
          w: 10,
          h: 10,
          geo: 'ellipse',
        },
      });

      currentPage.createShape({
        type: 'text',
        x: x - 10,
        y: baselineY + 10,
        props: {
          text: `Item ${i + 1}`,
        },
      });
    }

    onGenerated();
  }, [app, itemCount, onGenerated]);

  useEffect(() => {
    if (shouldGenerate && app) {
      generateTimeline();
    }
  }, [shouldGenerate, generateTimeline, app]);

  /* const onMount: TldrawProps['onMount'] = useCallback((app) => {
    setApp(app);
  }, []); */

  const onMount: TldrawProps['onMount'] = useCallback((app: TldrawApp) => {
    setApp(app);
  }, []);

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Tldraw onMount={onMount} />
    </div>
  );
};

export default TldrawComponent;


