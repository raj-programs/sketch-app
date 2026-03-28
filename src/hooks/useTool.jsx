import { useState } from 'react';

export function useTool() {
  const [tool, setTool] = useState('pen');
  return [tool, setTool];
}