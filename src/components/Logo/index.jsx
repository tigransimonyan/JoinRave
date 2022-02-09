import './index.scss';

const Logo = () => {
  return (
    <div className="logo">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120.8 19.18">
        <path
          d="M2.61,18.2A6.38,6.38,0,0,1,0,16.27L2.73,13A4,4,0,0,0,5.8,14.87a2,2,0,0,0,1.65-.65A2.87,2.87,0,0,0,8,12.29V4.67H1.9V.8H13V12a7,7,0,0,1-1.74,5.16,6.92,6.92,0,0,1-5.1,1.72A9,9,0,0,1,2.61,18.2Z"
          fill="#ede715"
        />
        <path d="M35.44.8h5V18.52h-5Z" fill="#ede715" />
        <path d="M59.61.8V18.52H55.49L47.66,9.08v9.44H42.75V.8h4.13l7.82,9.44V.8Z" fill="#ede715" />
        <circle cx="24.07" cy="9.59" r="9.59" fill="#ede715" />
        <ellipse cx="21.3" cy="6.53" rx="1.44" ry="1.88">
          <animate
            id="op"
            attributeName="ry"
            attributeType="XML"
            to="0.1"
            begin="5s;op.end+10s"
            dur="0.15s"
            fill="remove"
            repeatCount="1"
          />
        </ellipse>
        <ellipse cx="27.37" cy="6.53" rx="1.44" ry="1.88" />
        <path d="M33,9.85a1,1,0,1,0-1.3.92,7.44,7.44,0,0,1-14.58,0,1,1,0,0,0,.65-.92,1,1,0,1,0-1,1,7.79,7.79,0,0,0,15.27,0A1,1,0,0,0,33,9.85Z" />
        <path
          d="M74.12,18.52l-4.05-5.7a13.07,13.07,0,0,1-1.42.08H63.89v5.62H62V.8h6.63A8,8,0,0,1,74,2.42a5.53,5.53,0,0,1,1.92,4.46,5.74,5.74,0,0,1-1,3.5,5.82,5.82,0,0,1-3,2.06l4.33,6.08Zm-1.5-8.38A4,4,0,0,0,74,6.88a4.05,4.05,0,0,0-1.4-3.31,6.14,6.14,0,0,0-4-1.15H63.89v8.89H68.6A6.08,6.08,0,0,0,72.62,10.14Z"
          fill="#fff"
        />
        <path
          d="M90.17,13.79H80.29l-2.12,4.73h-2L84.32.8h1.85l8.1,17.72h-2Zm-.69-1.52L85.23,2.75,81,12.27Z"
          fill="#fff"
        />
        <path d="M107.48.8,99.63,18.52H97.79L89.94.8h2l6.79,15.39L105.58.8Z" fill="#fff" />
        <path
          d="M120.8,16.9v1.62H108.27V.8h12.15V2.42H110.14v6.3h9.16v1.6h-9.16V16.9Z"
          fill="#fff"
        />
      </svg>
    </div>
  );
};

export default Logo;
