import React from 'react';

function Footer() {
  return (
    <footer className='border-top bg-light container-fluid w-100 p-0 m-0'>
      <div className='container mt-4'>
        <div className='row'>
          <div className='col-3 '>
            <div className='d-flex gap-3 mb-3'>
                 <img style={{ width: "10%" }} src='\public\earth.png' alt='logo' /> <span style={{display:"inline"}} className='text-muted mt-1'>EcoSphere</span>
            </div>
            <p className='text-muted '>© 2025, GreenPulse Community<br />All rights reserved.</p>
            <i className="fa-brands fa-twitter mx-1 text-muted"></i>
            <i className="fa-brands fa-square-facebook mx-1 text-muted"></i>
            <i className="fa-brands fa-instagram mx-1 text-muted"></i>
            <i className="fa-brands fa-linkedin-in mx-1 text-muted"></i>
            <i className="fa-brands fa-telegram mx-1 text-muted"></i>
          </div>

          <div className='col-1'></div>

          <div className='col-2'>
            <p className='text-muted'><b>Company</b></p>
            <a href="#" className='text-muted d-block mb-1' style={{ textDecoration: 'none' }}>About Us</a>
            <a href="#" className='text-muted d-block mb-1' style={{ textDecoration: 'none' }}>Sustainability Mission</a>
            <a href="#" className='text-muted d-block mb-1' style={{ textDecoration: 'none' }}>How It Works</a>
            <a href="#" className='text-muted d-block mb-1' style={{ textDecoration: 'none' }}>Partnerships</a>
            <a href="#" className='text-muted d-block mb-1' style={{ textDecoration: 'none' }}>Careers</a>
            <a href="#" className='text-muted d-block mb-1' style={{ textDecoration: 'none' }}>EcoBlog</a>
            <a href="#" className='text-muted d-block mb-1' style={{ textDecoration: 'none' }}>Media Kit</a>
            <a href="#" className='text-muted d-block mb-1' style={{ textDecoration: 'none' }}>GreenPulse Cares</a>
          </div>

          <div className='col-1'></div>

          <div className='col-2'>
            <p className='text-muted'><b>Support</b></p>
            <a href="#" className='text-muted d-block mb-1' style={{ textDecoration: 'none' }}>Help Center</a>
            <a href="#" className='text-muted d-block mb-1' style={{ textDecoration: 'none' }}>Contact Us</a>
            <a href="#" className='text-muted d-block mb-1' style={{ textDecoration: 'none' }}>FAQs</a>
            <a href="#" className='text-muted d-block mb-1' style={{ textDecoration: 'none' }}>Carbon Tracker Guide</a>
            <a href="#" className='text-muted d-block mb-1' style={{ textDecoration: 'none' }}>Community Guidelines</a>
            <a href="#" className='text-muted d-block mb-1' style={{ textDecoration: 'none' }}>Resources</a>
          </div>

          <div className='col-1'></div>

          <div className='col-2'>
            <p className='text-muted'><b>Get Started</b></p>
            <a href="#" className='text-muted d-block mb-1' style={{ textDecoration: 'none' }}>Create an Account</a>
            <a href="#" className='text-muted d-block mb-1' style={{ textDecoration: 'none' }}>Start Your Eco Journey</a>
            <a href="#" className='text-muted d-block mb-1' style={{ textDecoration: 'none' }}>Join a Community</a>
          </div>
        </div>

        <div className='row'>
          <div className='col mt-3'>
            <p className='text-muted support-text'>
              GreenPulse is your one-stop platform to reduce your carbon footprint, join eco-conscious communities, and explore sustainable living. From tracking daily emissions to learning how to recycle and upcycle, we provide tools and motivation to live greener every day.
            </p>
            <p className='text-muted support-text'>
              All actions and data visualizations are meant to guide behavioral change and provide insights. This platform does not replace certified environmental auditing. Please consult experts for regulatory or commercial carbon reporting.
            </p>
            <p className='text-muted support-text'>
              For queries or feedback, reach out to <a href="mailto:support@greenpulse.org" className='text-muted' style={{ textDecoration: 'none' }}>support@greenpulse.org</a>.
            </p>
            <p className='text-muted support-text'>
              © 2025 GreenPulse. All rights reserved. Head Office: 221B Sustainability Lane, Eco District, New Delhi – 110001, India.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
