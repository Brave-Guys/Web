import Header from './components/HeaderMenu.js';
import './App.css';
import PageTitle from './components/PageTitle.js';

function App() {
  return (
    <div>
      <Header />
      <div className='content'>

        <PageTitle
          title="페이지 제목"
          description="해당 페이지에 대한 설명"
          showBackArrow={true}
        />

        <div>
          <p>asdfasdf</p>
        </div>
      </div>
    </div>
  );
}

export default App;
