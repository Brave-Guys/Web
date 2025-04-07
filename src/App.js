import Header from './components/HeaderMenu.js';
import Box from './components/Box.js';
import './App.css';
import person from './assets/person.png'

function App() {
  return (
    <div>
      <Header />
      <div className='content'>

        <Box type={1}>
          <img src={person} style={{ width: 80, height: 80, borderRadius: '50%' }} alt="icon" />
          <div>
            <div style={{ fontWeight: 'bold', color: '#000' }}>버피 30회</div>
            <div style={{ fontSize: '14px', color: '#6B6B6B' }}>강인석 | 1시간 전</div>
          </div>
        </Box>

        <Box type={2} showArrow>
          <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Share+</div>
        </Box>

        <Box type={3} showArrow>
          <div style={{ fontSize: '18px' }}>asdfasdfasdfadfsafsd</div>
        </Box>

      </div>
    </div>
  );
}

export default App;
