import React, { Component } from "react";
import Logo from "../Components/Logo";

export default class Footer extends Component {
	render() {
		return (
			<div>
				<footer>
					<div className='reseau'>

					</div>
					<div className="footerCap">
						<div className="footerFirst fooboo">
							<h3>COMPANY NAME</h3>
							<p>Lorem ipsum dolor sit amet.</p>
							<p>Lorem ipsum dolor sit amet.</p>
							<p>Lorem ipsum dolor sit amet.</p>
							<p>Lorem ipsum dolor sit amet.</p>
						</div>

						<div className="footerSecond fooboo" >
								<Logo/>
						</div>

						<div className="footerThird fooboo">
							<h3>CONTACT</h3>
							<p>09 75 75 12 39</p>
							<p>Lorem ipsum dolor sit amet.</p>
							<p>Lorem ipsum dolor sit amet.</p>
							<p>Lorem ipsum dolor sit amet.</p>
						</div>
					</div>

					<div className='copy-right'>
						<h4>copy right Jega KULATHILAGAPILLAI</h4>
					</div>
				</footer>



			</div>
		);
	}
}
