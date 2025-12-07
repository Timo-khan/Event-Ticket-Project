import logo from "../../assets/Fanzone.png";

export default function Footer() {
	return (
		<footer className="tp-footer">
			<div className="container tp-footer-grid">
				{/* Column 1 */}
				<div className="tp-footer-col">
					<div className="tp-footer-logo">
						<img
							src={logo}
							alt="Fanzone"
							className="tp-footer-logo-img"
							onError={(e) => {
								(e.currentTarget as HTMLImageElement).style.display = "none";
							}}
						/>
						{/* <div className="tp-footer-logo-text">Fanzone</div> */}
					</div>

					<div className="tp-footer-small">
						Buy | Sell | Create
						<br />©{new Date().getFullYear()} Fanzone LLC.
						<br />
						Terms of Service | Privacy Policy
					</div>

					<div className="tp-footer-section-title">Get in touch</div>
					<div className="tp-footer-small" style={{ marginTop: 6 }}>
						Questions or feedback?
						<br />
						We'd love to hear from you
					</div>

					<div className="tp-footer-social">
						<a aria-label="Instagram" href="#">
							📷
						</a>
						<a aria-label="X" href="#">
							𝕏
						</a>
						<a aria-label="YouTube" href="#">
							▶️
						</a>
						<a aria-label="Facebook" href="#">
							f
						</a>
					</div>
				</div>

				{/* Column 2 */}
				<div className="tp-footer-col">
					<div className="tp-footer-section-title">Company</div>
					<ul className="tp-footer-links">
						<li><a href="#">About Us</a></li>
						<li><a href="#">Partners</a></li>
						<li><a href="#">Press</a></li>
						<li><a href="#">Mobile Apps</a></li>
						<li><a href="#">Gift Cards</a></li>
						<li><a href="#">Contact Us</a></li>
						<li><a href="#">Careers</a></li>
						<li><a href="#">Blog</a></li>
						<li><a href="#">Ticket Brokers</a></li>
						<li><a href="#">Seating Charts</a></li>
						<li><a href="#">Refer Friends</a></li>
						<li><a href="#">Affiliates</a></li>
						<li><a href="#">Broker Licenses</a></li>
					</ul>
				</div>

				{/* Column 3 */}
				<div className="tp-footer-col">
					<div className="tp-footer-section-title">Our Promise</div>
					<ul className="tp-footer-links">
						<li><a href="#">BuyerTrust Guarantee</a></li>
						<li><a href="#">BestPrice Guarantee</a></li>
						<li><a href="#">User Agreement</a></li>
						<li><a href="#">Privacy Policy</a></li>
						<li><a href="#">Cookie Policy</a></li>
						<li><a href="#">Do Not Sell or Share My Personal Information</a></li>
						<li><a href="#">CCPA Notice</a></li>
						<li><a href="#">FAQ</a></li>
						<li><a href="#">Accessibility</a></li>
					</ul>
				</div>

				{/* Column 4 */}
				<div className="tp-footer-col">
					<div className="tp-footer-section-title">Get the App</div>

					<div className="tp-footer-rating">
						<div className="stars">★★★★★</div>
						<div className="rating-text">4.9 Rating</div>
					</div>

					<div className="tp-footer-store-btn">
						<span>App Store</span>
						<span className="store-icon"></span>
					</div>

					<div className="tp-footer-store-btn">
						<span>Google Play</span>
						<span className="store-icon">▶</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
