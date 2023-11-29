import { FaEnvelope, FaPhone, FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';

const HeaderTopArea = () => {
  return (
    <>
      <div className="page-barner-bg"></div>
      <div className="header-top-area bg-transparent text-white">
        <div className="top-bar">
          <div className="container mx-auto">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <div className="call-to-action">
                  <p>
                    <FaEnvelope /> Email: <a className="text-blue-500" href="mailto:info@kissmedialprodaction.com">info@kissmedialprodaction.com</a>
                  </p>
                  <p>
                    <FaPhone /> Telephone: <a className="text-blue-500" href="tel:+27735297441">+27735297441</a>
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="book-table-popup">
                  <a className="text-white" href="{% url 'Booking:reserve_table' }">Book Now</a>
                </div>
                <div className="top-social-bookmark">
                  <ul className="flex space-x-2">
                    <li>
                      <a href="https://instagram.com/kissmediaproduction?igshid=1l63vb3gxq814" target="_blank">
                        <FaInstagram />
                      </a>
                    </li>
                    <li>
                      <a href="https://m.facebook.com/kissmediaproduction/?ref=bookmarks" target="_blank">
                        <FaFacebook />
                      </a>
                    </li>
                    {/* Uncomment and add other social media icons as needed */}
                    {/* <li>
                      <a href="#">
                        <FaTwitter />
                      </a>
                    </li> */}
                    <li>
                      <a href="https://www.linkedin.com/in/kiss-media-production-ba182a19b" target="_blank">
                        <FaLinkedin />
                      </a>
                    </li>
                    {/* Uncomment and add other social media icons as needed */}
                    {/* <li>
                      <a href="#">
                        <FaFeed />
                      </a>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderTopArea;
