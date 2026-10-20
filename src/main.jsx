import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import styled from 'styled-components';
import dieFace1 from '../assets/Die Face 1.svg?raw';
import dieFace2 from '../assets/Die Face 2.svg?raw';
import dieFace3 from '../assets/Die Face 3.svg?raw';
import dieFace4 from '../assets/Die Face 4.svg?raw';
import dieFace5 from '../assets/Die Face 5.svg?raw';
import dieFace6 from '../assets/Die Face 6.svg?raw';
import cloud1 from '../assets/Cloud 1.svg?url';
import cloud2 from '../assets/Cloud 2.svg?url';
import cloud3 from '../assets/Cloud 3.svg?url';
import defaultUserIcon from '../assets/default-user.svg?url';
import blueprintIcon from '../assets/blueprint.svg';
import buildCityImage from '../assets/build-city.png';
import buildRoadImage from '../assets/build-road.png';
import buildSettlementImage from '../assets/build-settlement.png';
import buildTownImage from '../assets/build-town.png';
import dicePairImage from '../assets/dice-pair.png';
import joinHouseImage from '../assets/join-house.png';
import nextIcon from '../assets/next.svg';
import resourceCoalIcon from '../assets/resource-coal.svg';
import resourceFishIcon from '../assets/resource-fish.svg';
import resourceMeatIcon from '../assets/resource-meat.svg';
import resourceStoneIcon from '../assets/resource-stone.svg';
import resourceWheatIcon from '../assets/resource-wheat.svg';
import resourceWoodIcon from '../assets/resource-wood.svg';
import sendIcon from '../assets/send.svg';
import tradeIcon from '../assets/trade.svg';
import '../style.css';

const assetUrls = {
  'blueprint.svg': blueprintIcon,
  'build-city.png': buildCityImage,
  'build-road.png': buildRoadImage,
  'build-settlement.png': buildSettlementImage,
  'build-town.png': buildTownImage,
  'dice-pair.png': dicePairImage,
  'join-house.png': joinHouseImage,
  'next.svg': nextIcon,
  'resource-coal.svg': resourceCoalIcon,
  'resource-fish.svg': resourceFishIcon,
  'resource-meat.svg': resourceMeatIcon,
  'resource-stone.svg': resourceStoneIcon,
  'resource-wheat.svg': resourceWheatIcon,
  'resource-wood.svg': resourceWoodIcon,
  'send.svg': sendIcon,
  'trade.svg': tradeIcon,
};

function assetUrl(filename) {
  return assetUrls[filename];
}

const SwatchGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 4px 0;

  @media (max-width: 380px) {
    .color-swatch { margin: .8em !important; }
  }
`;

const ColorSwatch = styled.button`
  width: 2.65em;
  height: 2.65em;
  flex: 0 0 2.65em;
  margin: 1em;
  padding: 0;
  border: 0;
  border-radius: .5em;
  background: ${({ $fill }) => $fill};
  box-shadow: inset 0 .25em .25em rgb(255 255 255 / 25%), inset 0 -.25em rgb(0 0 0 / 25%);
  cursor: pointer;
  transform: scale(1);
  transition: transform .25s ease-in-out, box-shadow .25s ease-in-out;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    transform: scale(1.35);
    z-index: 4;
  }

  ${({ $selected, $dark }) => $selected && `
    box-shadow:
      inset 0 .25em .25em rgb(255 255 255 / 25%),
      inset 0 -.25em rgb(0 0 0 / 25%),
      0 0 0 .1em ${$dark ? '#fff' : 'rgb(0 0 0 / 25%)'},
      0 0 .5em ${$dark ? 'rgb(255 255 255 / 50%)' : 'rgb(0 0 0 / 50%)'};
    transform: scale(1.25);
    z-index: 3;
  `}

  ${({ $selected }) => $selected && `&:hover { transform: scale(1.35); }`}

  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 4px;
  }

  &:active { transform: scale(1.1); }

  @media (prefers-reduced-motion: reduce) { transition: none; }
`;

function ThemeSwitch({ dark, onChange, embedded = false }) {
  return <ThemeSwitchStyles className={embedded ? 'theme-switch embedded' : 'theme-switch'}>
    <label id="theme-toggle-button" title={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
      <input id="theme-toggle-input" type="checkbox" role="switch" checked={dark} onChange={onChange} aria-label="Dark mode" aria-checked={dark} />
      <svg viewBox="0 0 69.667 44" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <g transform="translate(3.5 3.5)">
          <g id="container-group"><rect id="container" fill="#83cbd8" rx="17.5" height="35" width="60.667" /></g>
          <g transform="translate(2.333 2.333)" id="button">
            <g id="sun"><circle fill="#f8e664" r="15.167" cy="15.167" cx="15.167" /><circle fill="#fcf4b9" transform="translate(8.167 8.167)" r="7" cy="7" cx="7" /></g>
            <g id="moon"><circle fill="#cce6ee" r="15.167" cy="15.167" cx="15.167" /><g fill="#a6cad0" transform="translate(-24.415 -1.009)"><circle transform="translate(43.009 4.496)" r="2" /><circle transform="translate(39.366 17.952)" r="2" /><circle transform="translate(33.016 8.044)" r="1" /><circle transform="translate(51.081 18.888)" r="1" /><circle transform="translate(33.016 22.503)" r="1" /><circle transform="translate(50.081 10.53)" r="1.5" /></g></g>
          </g>
          <g id="cloud" transform="translate(-3.5 -3.5)"><path fill="#fff" d="M46.34 12.875a4.463 4.463 0 0 1 2.243.62.95.95 0 0 1 .72-1.281 4.852 4.852 0 0 1 2.623.519c.034.02-.5-1.968.281-2.716a2.117 2.117 0 0 1 2.829-.274 1.821 1.821 0 0 1 .854 1.858c.063.037 2.594-.049 3.285 1.273s-.865 2.544-.807 2.626a12.192 12.192 0 0 1 2.278.892c.553.448 1.106 1.992-1.62 2.927a7.742 7.742 0 0 1-3.762-.3c-1.28-.49-1.181-2.65-1.137-2.624s-1.417 2.2-2.623 2.2a4.172 4.172 0 0 1-2.394-1.206 3.825 3.825 0 0 1-2.771.774c-3.429-.46-2.333-3.267-2.2-3.55a3.721 3.721 0 0 1 2.201-1.738Z" /></g>
          <g id="stars" fill="#def8ff" transform="translate(3.585 1.325)">
            <path transform="matrix(-1, 0.017, -0.017, -1, 24.231, 3.055)" d="M.774,0 .566,.559 0,.539 .458,.933 .25,1.492 .735,1.131 1.193,1.525 1.024,.953 1.509,.592 .943,.572Z" />
            <path transform="matrix(-.777, .629, -.629, -.777, 23.185, 12.358)" d="m1.341,.529-.505-.057L.736,0 .505,.46 0,.4 .4,.729 .169,1.189 .605,.932 1.005,1.258 .9,.786Z" />
            <path transform="matrix(.438, .899, -.899, .438, 23.177, 29.735)" d="m.015,1.065 .46-.165 .285,.365L.766,.772l.46-.164L.745,.494 .751,0 .481,.407 0,.293 .285,.658Z" />
            <path transform="translate(12.677 .388) rotate(104)" d="m1.161,1.6-.102-.6 .515-.278L.962,.607 .86,0 .613,.572 0,.457 .446,.881 .2,1.454l.516-.274Z" />
            <path transform="matrix(-.07, .998, -.998, -.07, 11.066, 15.457)" d="m.873,1.648 .114-.62L1.579,.945 1.03,.62 1.144,0 .706,.464 .157,.139 .438,.7 0,1.167 .592,1.084Z" />
            <path transform="translate(8.326 28.061) rotate(11)" d="M.593,0 .638,.724 0,.982l.7,.211 .045,.724 .36-.64 .7,.211L1.342,.935l.36-.641- .639,.258Z" />
            <path transform="translate(5.012 5.962) rotate(172)" d="M.816,0 .5,.455 0,.311 .323,.767 .011,1.222 .527,1.007 .85,1.463 .827,.911 1.343,.696 .839,.552Z" />
            <path transform="translate(2.218 14.616) rotate(169)" d="m1.261,0-.487,.571L.114,.3 .487,.967 0,1.538 .728,1.32l.372,.662 .047-.749 .728-.218L1.215,.749Z" />
          </g>
        </g>
      </svg>
    </label>
  </ThemeSwitchStyles>;
}

const ThemeSwitchStyles = styled.div`
  position: fixed;
  z-index: 30;
  top: calc(env(safe-area-inset-top) + 10px);
  right: 15px;
  display: flex;
  width: 70px;
  height: 44px;
  align-items: center;
  justify-content: center;
  line-height: 0;

  #theme-toggle-button { position: relative; display: block; width: 70px; height: 44px; cursor: pointer; }
  #theme-toggle-input { position: absolute; inset: 0; z-index: 2; width: 100%; height: 100%; margin: 0; opacity: 0; cursor: pointer; }
  svg { display: block; width: 100%; height: 100%; overflow: visible; }
  #container, #button, #sun, #moon, #cloud, #stars { transition: all .25s cubic-bezier(.4,0,.2,1); }
  #container { fill: #83cbd8; }
  #theme-toggle-input:checked + svg #container { fill: #2b4360; }
  #theme-toggle-input:checked + svg #button { transform: translate(28px, 2.333px); }
  #sun { opacity: 1; }
  #theme-toggle-input:checked + svg #sun { opacity: 0; }
  #moon { opacity: 0; }
  #theme-toggle-input:checked + svg #moon { opacity: 1; }
  #cloud { opacity: 1; }
  #theme-toggle-input:checked + svg #cloud { opacity: 0; }
  #stars { opacity: 0; }
  #theme-toggle-input:checked + svg #stars { opacity: 1; }
  #theme-toggle-input:focus-visible + svg { outline: 3px solid #fff; outline-offset: 4px; border-radius: 24px; }
  @media (prefers-reduced-motion: reduce) { #container, #button, #sun, #moon, #cloud, #stars { transition: none; } }
`;

const resources = [
  ['resource-wood.svg', 'Wood'], ['resource-wheat.svg', 'Wheat'],
  ['resource-meat.svg', 'Meat'], ['resource-coal.svg', 'Coal'],
  ['resource-stone.svg', 'Stone'], ['resource-fish.svg', 'Fish'],
];
const colors = [
  ['#f3485a', 'Red', '🧑🏻'], ['#159efa', 'Blue', '🧑🏽'],
  ['#ffd13f', 'Yellow', '🧑🏼‍🦱'], ['#60b92d', 'Green', '👩🏻'],
  ['#ff9100', 'Custom', '🧑🏾'],
];
const styles = [
  ['🏡', 'Classic'], ['🏠', 'Timber'], ['🏰', 'Castle'], ['🛖', 'Coastal'],
  ['🏯', 'Imperial'], ['🏘️', 'Village'], ['🏛️', 'Marble'],
];
const players = [
  { name: 'Sarah', color: 1, emoji: '👩🏻', kind: 'settlement' },
  { name: 'Mike', color: 2, emoji: '🧑🏼‍🦱', kind: 'town' },
  { name: 'Emily', color: 3, emoji: '👩🏻', kind: 'road' },
  { name: 'Alex', color: 0, emoji: '👩🏽', kind: 'town' },
  { name: 'Taylor', color: 2, emoji: '🧑🏾', kind: 'ship' },
];
const buildOptions = [
  ['build-settlement.png', 'Settlement', '1 wood, 1 coal, 1 wheat'],
  ['build-town.png', 'Town', '2 wood, 2 coal, 2 wheat'],
  ['build-city.png', 'City', '3 wheat, 2 stone'],
  ['build-road.png', 'Road', '1 wood, 1 coal'],
];
const buildCosts = [[1, 1, 0, 1, 0, 0], [2, 2, 0, 2, 0, 0], [0, 3, 0, 0, 2, 0], [1, 0, 0, 1, 0, 0]];
const fallbackEmojis = ['😀', '😎', '🦊', '🐼', '🐸', '🐯', '🐙', '🦉', '🐨', '🐻'];
const dieFaceMarkup = [dieFace1, dieFace2, dieFace3, dieFace4, dieFace5, dieFace6].map((svg) => svg
  .replace(/^[\s\S]*?<svg[^>]*>/, '')
  .replace(/<\/svg>\s*$/, '')
  .replace(/fill:#fefefe|fill:rgb\(254,254,254\)/g, 'fill:hsl(var(--theme-hue,204) 78% 93%)')
  .replace(/stroke:(?:#000|black)/g, 'stroke:currentColor')
  .replace(/style="fill-rule:nonzero;"/g, 'style="fill-rule:nonzero;fill:currentColor;"'));

function DieFace({ value, className = '' }) {
  return <svg className={className} viewBox="0 0 1022 1022" role="img" aria-label={`Die showing ${value}`} dangerouslySetInnerHTML={{ __html: dieFaceMarkup[value - 1] }} />;
}

const cloudSources = [cloud1, cloud2, cloud3];
function createCloud(id) {
  const duration = 55 + Math.random() * 55;
  return {
    id,
    source: cloudSources[Math.floor(Math.random() * cloudSources.length)],
    size: 100 + Math.random() * 200,
    top: Math.random() * 130,
    duration,
    // Keep new clouds offscreen until their pan animation begins so they never
    // appear suddenly midway across the sky.
    delay: Math.random() * 8,
    flipped: Math.random() < 0.5,
  };
}
function createClouds(count) {
  return Array.from({ length: count }, (_, index) => createCloud(index));
}
function CloudBackground({ darkMode }) {
  const [clouds, setClouds] = useState(() => createClouds(darkMode ? 4 : 10));
  const cloudTarget = darkMode ? 4 : 10;
  const finishCloud = (id) => {
    setClouds((current) => {
      const remaining = current.filter((cloud) => cloud.id !== id);
      // Let excess clouds finish naturally at night, then refill to the light-mode target.
      const refillCount = current.length <= cloudTarget
        ? Math.max(0, cloudTarget - remaining.length)
        : 0;
      const replacements = Array.from({ length: refillCount }, (_, index) =>
        createCloud(`${Date.now()}-${index}-${Math.random()}`)
      );
      return [...remaining, ...replacements];
    });
  };
  return <div className="cloud-background" aria-hidden="true">
    <div className="night-sky">
      <div className="stars stars-1" />
      <div className="stars stars-2" />
      <div className="stars stars-3" />
      <div className="meteor m1" />
      <div className="meteor m2" />
      <div className="meteor m3" />
    </div>
    {clouds.map((cloud) => <div className="cloud-flight" key={cloud.id} onAnimationEnd={() => finishCloud(cloud.id)} style={{
      '--cloud-size': `${cloud.size}px`,
      '--cloud-top': `${cloud.top}px`,
      '--cloud-duration': `${cloud.duration}s`,
      '--cloud-delay': `${cloud.delay}s`,
    }}><span className="cloud-shape" style={{
      '--cloud-mask': `url("${cloud.source}")`,
      '--cloud-flip': cloud.flipped ? '-1' : '1',
    }} /></div>)}
  </div>;
}

const initialState = {
  screen: 'join', name: '', emoji: fallbackEmojis[Math.floor(Math.random() * fallbackEmojis.length)], avatarChosen: false, steamAvatar: '', color: 1, customHue: 28, customValue: 100, themeMode: 'light',
  colorPopup: false, steamPopup: false, style: 0, qty: [5, 4, 2, 3, 1, 2], rolled: false, rolling: false,
  diceFaces: [1, 1], roll: 7, selectedPlayer: 0, give: [0, 0, 0, 0, 0, 0],
  want: [0, 0, 0, 0, 0, 0],
};

function customHex(hue, value, saturation = 100) {
  const h = ((hue % 360) + 360) % 360;
  const v = value / 100;
  const chroma = v * saturation / 100;
  const x = chroma * (1 - Math.abs((h / 60) % 2 - 1));
  const min = v - chroma;
  const rgb = h < 60 ? [chroma, x, 0] : h < 120 ? [x, chroma, 0] : h < 180 ? [0, chroma, x] : h < 240 ? [0, x, chroma] : h < 300 ? [x, 0, chroma] : [chroma, 0, x];
  return `#${rgb.map((part) => Math.round((part + min) * 255).toString(16).padStart(2, '0')).join('')}`;
}
function colorHex(index, hue, value) { return index === 4 ? customHex(hue, value) : colors[index][0]; }
function hueFromHex(hex) {
  const [r, g, b] = [1, 3, 5].map((offset) => parseInt(hex.slice(offset, offset + 2), 16) / 255);
  const max = Math.max(r, g, b); const min = Math.min(r, g, b); const d = max - min;
  if (!d) return 0;
  const h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return Math.round((h * 60 + 360) % 360);
}

function Header({ title, subtitle }) {
  return <header className="screen-head"><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</header>;
}
function Action({ children, action, className = 'action', onClick }) {
  return <button type="button" className={className} data-action={action} onClick={onClick}>{children}</button>;
}
function StyleArrow({ direction, onClick }) {
  const label = direction === 'left' ? 'Previous style' : 'Next style';
  return <button type="button" className={`style-arrow ${direction}`} onClick={onClick} aria-label={label}>
    <span className="style-arrow-box" aria-hidden="true">{[0, 1].map((copy) => <span className="style-arrow-elem" key={copy}><svg viewBox="0 0 46 40"><path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z" /></svg></span>)}</span>
  </button>;
}
function ResourceCards({ qty, dark, onThemeChange }) {
  return <section className="inventory"><h2>Your Inventory</h2><ThemeSwitch dark={dark} onChange={onThemeChange} embedded /><div className="resource-row">
    {resources.map(([icon, name], i) => <div className="resource" key={name}><img className="resource-img" src={assetUrl(icon)} alt={name} /><span className="count">{qty[i]}</span></div>)}
  </div></section>;
}
function TradeInventoryPicker({ mode, qty, selected, onSelect, dark, onThemeChange }) {
  const giving = mode === 'give';
  return <section className={`inventory trade-inventory ${giving ? 'give-picker' : 'want-picker'}`}>
    {giving && <><h2>Your Inventory</h2><ThemeSwitch dark={dark} onChange={onThemeChange} embedded /></>}
    <p>{giving ? 'Tap a resource to add it to I’ll Give.' : 'Tap a resource you want in return.'}</p>
    <div className="resource-row">
      {resources.map(([icon, name], i) => {
        const available = giving ? Math.max(0, qty[i] - selected[i]) : Math.max(0, 10 - selected[i]);
        const maxed = giving ? available === 0 : selected[i] >= 10;
        return <button type="button" className={`resource trade-picker-button${maxed ? ' is-maxed' : ''}`} key={name} disabled={maxed} onClick={() => onSelect(i)} aria-label={`Add ${name} to ${giving ? 'I’ll Give' : 'I Want'}${giving ? `, ${available} available` : `, ${selected[i]} selected`}`}>
          <img className="resource-img" src={assetUrl(icon)} alt="" />
          <span className="count">{giving ? available : selected[i]}</span>
          <span className="trade-picker-plus" aria-hidden="true">＋</span>
        </button>;
      })}
    </div>
  </section>;
}
function PlayerAvatar({ name, color, customHue, customValue, emoji = '🙂', src = '' }) {
  return <div className="avatar" style={{ '--accent': colorHex(color, customHue, customValue) }} role="img" aria-label={`${name} avatar`}>
    {src ? <img className="avatar-portrait" src={src} alt="" /> : <span className="avatar-emoji" aria-hidden="true">{emoji}</span>}
  </div>;
}

function App() {
  const [state, setState] = useState(initialState);
  const [toastMessage, setToastMessage] = useState('');
  const [playerInput, setPlayerInput] = useState('');
  const [steamUsername, setSteamUsername] = useState('');

  const set = (patch) => setState((current) => ({ ...current, ...patch }));
  const color = colorHex(state.color, state.customHue, state.customValue);

  useEffect(() => {
    const hue = state.color === 4 ? state.customHue : hueFromHex(color);
    document.documentElement.style.setProperty('--theme-hue', `${hue}`);
    document.documentElement.style.setProperty('--wave-hue-shift', `${hue - 201}deg`);
    document.documentElement.style.setProperty('--custom-color', customHex(state.customHue, state.customValue));
    document.documentElement.style.setProperty('--theme-color-30', customHex(hue, 30, 50));
    document.documentElement.dataset.theme = state.themeMode;
    const browserThemeColor = state.themeMode === 'dark' ? customHex(hue, 26, 24) : customHex(hue, 78, 56);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', browserThemeColor);
  }, [state.color, state.customHue, state.customValue, state.themeMode, color]);

  useEffect(() => {
    if (!toastMessage) return undefined;
    const timer = window.setTimeout(() => setToastMessage(''), 2300);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  useEffect(() => {
    if (!state.rolling) return undefined;
    const randomFaces = () => [1 + Math.floor(Math.random() * 6), 1 + Math.floor(Math.random() * 6)];
    const interval = window.setInterval(() => {
      setState((current) => ({ ...current, diceFaces: randomFaces(), roll: 1 + Math.floor(Math.random() * 12) }));
    }, 100);
    const timeout = window.setTimeout(() => {
      const diceFaces = randomFaces();
      setState((current) => ({ ...current, diceFaces, roll: diceFaces[0] + diceFaces[1], rolling: false, rolled: true, screen: 'after' }));
    }, 2000);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [state.rolling]);

  useEffect(() => {
    const closeOnEscape = (event) => { if (event.key === 'Escape') setState((current) => ({ ...current, colorPopup: false, steamPopup: false })); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);
  const toast = (message) => setToastMessage(message);
  const toggleTheme = () => set({ themeMode: state.themeMode === 'dark' ? 'light' : 'dark' });
  const hasInventory = ['game', 'after', 'trackpad', 'build', 'trade'].includes(state.screen);
  const goto = (screen) => set({ screen });
  const closeColorPopup = () => set({ colorPopup: false });
  const saveSteamAvatar = async () => {
    const username = steamUsername.trim();
    if (!username) {
      set({ emoji: fallbackEmojis[Math.floor(Math.random() * fallbackEmojis.length)], avatarChosen: true, steamAvatar: '', steamPopup: false });
      return;
    }
    const endpoint = import.meta.env.VITE_STEAM_PROFILE_API_URL;
    if (!endpoint) { toast('Steam avatar lookup is not configured.'); return; }
    try {
      const response = await fetch(`${endpoint}?username=${encodeURIComponent(username)}`);
      const result = await response.json();
      if (!response.ok || !result.avatarUrl) throw new Error(result.error || 'Steam profile not found.');
      set({ steamAvatar: result.avatarUrl, steamPopup: false });
    } catch (error) {
      toast(error.message || 'Could not load that Steam profile.');
    }
  };
  const chooseColor = (index) => {
    set({ color: index, colorPopup: index === 4 });
  };
  const changeStyle = (direction) => set({ style: (state.style + direction + styles.length) % styles.length });
  const startGame = () => {
    set({ screen: 'loading' });
    window.setTimeout(() => set({ screen: 'game' }), 3000);
  };
  const rollDice = () => {
    if (!state.rolling) set({ rolling: true, rolled: false, roll: 1 + Math.floor(Math.random() * 12) });
  };
  const changeQuantity = (key, index, delta) => {
    const limit = key === 'want' ? 10 : 9;
    set({ [key]: state[key].map((n, i) => i === index ? Math.max(0, Math.min(limit, n + delta)) : n) });
  };
  const addTradeResource = (key, index) => {
    if (key === 'give' && state.give[index] >= state.qty[index]) return;
    if (state[key][index] >= (key === 'want' ? 10 : 9)) return;
    changeQuantity(key, index, 1);
  };
  const choosePlayer = (index) => {
    set({ selectedPlayer: index, screen: 'game', give: Array(6).fill(0), want: Array(6).fill(0) });
    toast(`Trade offer sent to ${players[index].name}`);
  };
  const build = (index) => {
    const cost = buildCosts[index];
    if (cost.some((amount, i) => state.qty[i] < amount)) { toast('Not enough resources yet'); return; }
    set({ qty: state.qty.map((amount, i) => amount - cost[i]), rolled: true, screen: 'game' });
    toast('Built successfully');
  };
  const confirmTrade = () => {
    if (!state.give.some(Boolean) || !state.want.some(Boolean)) { toast('Add resources to both sides'); return; }
    if (state.give.some((amount, i) => amount > state.qty[i])) { toast('You do not have those resources'); return; }
    goto('tradePlayers');
  };

  let screen;
  if (state.screen === 'join') {
    screen = <section className="screen join-screen">
      <Header title="Meridia" />
      <div className="join-name-row"><button type="button" className="join-player-icon" onClick={() => set({ steamPopup: true })} aria-label="Set Steam profile picture">{state.steamAvatar ? <PlayerAvatar name="Player" color={state.color} customHue={state.customHue} customValue={state.customValue} src={state.steamAvatar} /> : state.avatarChosen ? <PlayerAvatar name="Player" color={state.color} customHue={state.customHue} customValue={state.customValue} emoji={state.emoji} /> : <img className="default-user-icon" src={defaultUserIcon} alt="" />}<span className="player-icon-plus" aria-hidden="true">+</span></button><label className="field"><input maxLength="18" placeholder="Name" value={playerInput} onChange={(e) => setPlayerInput(e.target.value)} aria-label="Player name" /></label></div>
      <h2 className="section-label">Empire Color</h2>
      <SwatchGrid className="swatches">{colors.map((entry, i) => <ColorSwatch type="button" key={entry[1]} className="color-swatch" $selected={state.color === i} $dark={state.themeMode === 'dark'} $fill={i === 4 ? 'conic-gradient(from 0deg, #f33, #ff0, #3c6, #09f, #a3f, #f33)' : entry[0]} onClick={() => chooseColor(i)} aria-label={i === 4 ? 'Custom color' : `${entry[1]} color`} aria-pressed={state.color === i} />)}</SwatchGrid>
      <h2 className="section-label">Settlement Style</h2>
      <div className="style-card"><StyleArrow direction="left" onClick={() => changeStyle(-1)} /><div><img className="style-house" src={joinHouseImage} alt="Settlement preview" /><div className="style-dots">● ● ● ● ● ● ●</div><div className="style-name">{styles[state.style][1]}</div></div><StyleArrow direction="right" onClick={() => changeStyle(1)} /></div>
      <Action onClick={() => { const name = playerInput.trim(); if (!name) { toast('Enter your name first'); return; } set({ name, avatarChosen: true, emoji: state.avatarChosen ? state.emoji : fallbackEmojis[Math.floor(Math.random() * fallbackEmojis.length)], screen: 'lobby' }); }}>Join Game</Action>
    </section>;
  } else if (state.screen === 'lobby') {
    screen = <section className="screen lobby-screen"><p className="lobby-waiting">Waiting for players...</p>
      <div className="lobby-stage"><div className="lobby-mark"><div className="lobby-meridia-logo" role="img" aria-label="Meridia" /></div>
        <div className="player p1"><div className="player-float"><PlayerAvatar name={state.name} color={state.color} customHue={state.customHue} customValue={state.customValue} emoji={state.emoji} src={state.steamAvatar} /><span>{state.name}</span></div></div>
        {players.map((p, i) => <div className={`player p${i + 2}`} key={p.name}><div className="player-float"><PlayerAvatar name={p.name} color={p.color} customHue={state.customHue} customValue={state.customValue} emoji={p.emoji} /><span>{p.name}</span></div></div>)}
      </div><div className="joined"><b>6 Players Joined</b></div><Action className="action lobby-action" onClick={startGame}>Start Game</Action>
    </section>;
  } else if (state.screen === 'loading') {
    screen = <section className="screen loading"><div className="loading-glass"><div className="loading-logo"><div className="loading-meridia-logo" role="img" aria-label="Meridia" /></div><h2>Generating Your World</h2><p>This may take a moment...</p><div className="honeycomb" role="img" aria-label="Loading animation">{Array.from({ length: 7 }, (_, index) => <div key={index} />)}</div><div className="progress"><i /></div></div></section>;
  } else if (state.screen === 'game' || state.screen === 'after') {
    screen = <section className="screen game-screen"><ResourceCards qty={state.qty} dark={state.themeMode === 'dark'} onThemeChange={toggleTheme} /><div className="roll-display-wrap"><div className="roll-display">{state.rolled ? <div className="roll-result roll-display-content"><div className="dice-face-pair">{state.diceFaces.map((face, index) => <DieFace key={index} value={face} className="roll-die-face" />)}</div><div className="total">{state.roll}</div></div> : <div className="roll-pre-roll-content roll-display-content">{state.rolling ? <><div className="dice-face-pair">{state.diceFaces.map((face, index) => <DieFace key={index} value={face} className="roll-die-face" />)}</div><p className="rolling-label" aria-live="polite">Rolling...</p><div className="total rolling-total" aria-live="polite">{state.roll}</div></> : <div className="board-hint">Explore the board<br />and plan your next move.</div>}</div>}</div></div>
      {!state.rolled ? <button type="button" className="roll-button" onClick={rollDice} disabled={state.rolling} aria-label="Roll dice"><img src={dicePairImage} alt="Roll the dice" /></button> : <div className="turn-actions"><button type="button" className="turn-btn trade" onClick={() => set({ give: Array(6).fill(0), want: Array(6).fill(0), screen: 'trade' })} aria-label="Trade"><img src={tradeIcon} alt="" /></button><button type="button" className="turn-btn build" onClick={() => set({ screen: 'trackpad' })} aria-label="Build"><img src={blueprintIcon} alt="" /></button><button type="button" className="turn-btn end" onClick={() => { set({ rolled: false }); toast('Turn ended'); }} aria-label="End turn"><img src={nextIcon} alt="" /></button></div>}
    </section>;
  } else if (state.screen === 'trackpad') {
    screen = <section className="screen trackpad-screen"><ResourceCards qty={state.qty} dark={state.themeMode === 'dark'} onThemeChange={toggleTheme} /><div className="roll-display-wrap"><div className="roll-display build-trackpad" aria-hidden="true" /></div>
      <div className="actions"><Action className="action secondary" onClick={() => goto('game')}>Cancel</Action><Action onClick={() => goto('build')}>Next</Action></div></section>;
  } else if (state.screen === 'build') {
    screen = <section className="screen build-screen"><ResourceCards qty={state.qty} dark={state.themeMode === 'dark'} onThemeChange={toggleTheme} /><div className="cards build-options scroll-box">{buildOptions.map(([image, title, cost], i) => <button type="button" className="choice-card" key={title} onClick={() => build(i)}><img className="choice-art" src={assetUrl(image)} alt="" /><span className="choice-copy"><strong>{title}</strong><span>{cost}</span></span></button>)}</div><div className="actions"><Action onClick={() => goto('game')}>Cancel</Action></div></section>;
  } else if (state.screen === 'trade') {
    const tradeBox = (title, key) => (
      <section className="trade-box" key={key}>
        <div className="trade-box-heading">
          <h2>{title}</h2>
          <span>Tap to remove</span>
        </div>
        <div className="trade-slots">
          {resources.flatMap(([image, name], index) =>
            Array.from({ length: state[key][index] }, (_, item) => (
              <button
                type="button"
                className="trade-token"
                key={`${name}-${item}`}
                onClick={() => changeQuantity(key, index, -1)}
                aria-label={`Remove ${name} from ${title}`}
              >
                <img className="resource-img" src={assetUrl(image)} alt="" />
                <span>{name}</span>
              </button>
            ))
          )}
          {!state[key].some(Boolean) && (
            <span className="trade-empty">Tap an inventory resource to add it here.</span>
          )}
        </div>
      </section>
    );
    screen = <section className="screen trade-screen">
      <TradeInventoryPicker mode="give" qty={state.qty} selected={state.give} onSelect={(i) => addTradeResource('give', i)} dark={state.themeMode === 'dark'} onThemeChange={toggleTheme} />
      {tradeBox('I’ll Give', 'give')}
      <div className="trade-direction" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m8 16 4 4 4-4M8 8l4-4 4 4" /></svg></div>
      {tradeBox('I Want', 'want')}
      <TradeInventoryPicker mode="want" qty={state.qty} selected={state.want} onSelect={(i) => addTradeResource('want', i)} dark={state.themeMode === 'dark'} onThemeChange={toggleTheme} />
      <div className="actions"><Action className="action secondary" onClick={() => goto('game')}>Cancel</Action><Action onClick={confirmTrade}>Next</Action></div>
    </section>;
  } else if (state.screen === 'tradePlayers') {
    screen = <section className="screen trade-player-screen"><div className="cards trade-player-list scroll-box">{players.map((p, i) => <button type="button" className="choice-card compact" key={p.name} onClick={() => choosePlayer(i)}><PlayerAvatar name={p.name} color={p.color} customHue={state.customHue} customValue={state.customValue} emoji={p.emoji} /><span className="choice-copy"><strong>{p.name}</strong></span><img className="send-icon" src={sendIcon} alt="" /></button>)}</div><div className="actions"><Action onClick={() => goto('trade')}>← Back</Action></div></section>;
  } else {
    screen = <section className="screen"><Header title="Meridia" /><div className="home-mark">⌁</div><p className="hero-copy">Build a world together.</p><Action onClick={() => goto('join')}>Join Game</Action></section>;
  }

  return <>
    <CloudBackground darkMode={state.themeMode === 'dark'} />
    {!hasInventory && state.screen !== 'loading' && <ThemeSwitch dark={state.themeMode === 'dark'} onChange={toggleTheme} />}
    {screen}
    {state.colorPopup && <div className="color-modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) closeColorPopup(); }}><section className="custom-color-popup" role="dialog" aria-modal="true" aria-label="Custom empire color"><button type="button" className="popup-close" onClick={closeColorPopup} aria-label="Close">×</button>
      <div className="custom-color-preview swatch-shape" style={{ '--preview-color': customHex(state.customHue, state.customValue) }} role="img" aria-label="Selected custom color preview" />
      <input className="color-slider hue-slider" type="range" min="0" max="359" value={state.customHue} onChange={(e) => set({ customHue: +e.target.value })} aria-label="Hue" />
    </section></div>}
    {state.steamPopup && <div className="color-modal-backdrop" onClick={(event) => { if (event.target === event.currentTarget) set({ steamPopup: false }); }}><section className="custom-color-popup steam-popup" role="dialog" aria-modal="true" aria-label="Steam profile picture"><button type="button" className="popup-close" onClick={() => set({ steamPopup: false })} aria-label="Close">×</button><input className="steam-input" value={steamUsername} onChange={(event) => setSteamUsername(event.target.value)} placeholder="Steam Username" autoComplete="off" /><button type="button" className="action steam-submit" onClick={saveSteamAvatar}>{steamUsername.trim() ? 'Save' : 'Pick random emoji'}</button></section></div>}
    {toastMessage && <div className="toast" role="status">{toastMessage}</div>}
  </>;
}

createRoot(document.getElementById('app')).render(<App />);

