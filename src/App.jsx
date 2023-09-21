import './App.css';
import { Axios } from 'axios';
import { LinkSet, LayoutElement, SocialLink, BUTTON_ELEMENT, LABEL_ELEMENT } from './Data/LinkSet';

export default function App({ page }) {
  const links = new LinkSet()
    .fromJson(page);

  return (
    <div className='root' style={{ backgroundImage: "url(" + page.style.background_image + ")", backgroundColor: "#" + page.style.background_color, color: "#" + page.style.text_color }}>
      <div className='root-inner' style={{ width: '100%', minHeight: '100vh', backdropFilter: page.style.background_filters }}>
        <div className="App">
          <header className="App-header">
            <img src={page.avatar} className="App-logo" alt="avatar" />
            <div className='vgap-16' />
            <h1>{page.name}</h1>
            <div className='vgap-4' />
            <h2>{page.title}</h2>
          </header>
          {links.toReact()}
        </div>
      </div>
    </div>
  );
}