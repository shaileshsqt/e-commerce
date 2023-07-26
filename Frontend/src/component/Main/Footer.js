import React from "react";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="footer-col-1">
              <h3>Download Our App ApNa BaZaR</h3>
              <p>Download App for Android and iso mobile phone.</p>
              <div className="app-logo">
                <img src="https://i.ibb.co/KbPTYYQ/play-store.png" alt="" />
                <img src="https://i.ibb.co/hVM4X2p/app-store.png" alt="" />
              </div>
            </div>

            <div className="footer-col-2">
              <h3> ApNa BaZaR</h3>
              <p>
                Our Purpose Is To Give Best Product With More Discount
              </p>
            </div>

            <div className="footer-col-3">
              <h3>Useful Links</h3>
              <ul>
                <li>Coupons</li>
                <li>Blog Post</li>
                <li>Return Policy</li>
                <li>Join Affiliate</li>
              </ul>
            </div>

            <div className="footer-col-4">
              <h3>Follow us</h3>
              <ul>
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Instagram</li>
                <li>YouTube</li>
              </ul>
            </div>
          </div>
          <hr />
          <p className="copyright">Copyright &copy; 2023 - ApNa BaZaR</p>
        </div>
      </div>
    </>
  );
};
export default Footer;
