export const handleDragEnd = async (event, shape) => {
    const container = event.target.offsetParent;
    const rect = container.getBoundingClientRect();
    shape.position = {
      top: event.clientY - rect.top,
      left: event.clientX - rect.left,
    };
  
    try {
      const response = await fetch(`/api/shapes/${shape.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ position: shape.position }),
      });
  
      if (!response.ok) {
        console.error('Failed to update shape position:', await response.text());
      }
    } catch (error) {
      console.error('Error updating shape position:', error);
    }
  };
  
  export const handleResizeEnd = async (shape, event) => {
    const target = event.target;
    shape.width = target.offsetWidth;
    shape.height = target.offsetHeight;
  
    try {
      const response = await fetch(`/api/shapes/${shape.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ width: shape.width, height: shape.height }),
      });
  
      if (!response.ok) {
        console.error('Failed to update shape size:', await response.text());
      }
    } catch (error) {
      console.error('Error updating shape size:', error);
    }
  };
  