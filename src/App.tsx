import React from 'react';
import { Calendar } from './components/Calendar';
import { staticEvents } from './data/events';

function App() {
  return <Calendar events={staticEvents} />;
}

export default App;