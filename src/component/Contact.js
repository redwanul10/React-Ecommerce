import React from 'react';

const Contact = () => {
    return ( 
        <div className="contact p-b-38">
            <h2 className="pageHeader l-text2 t-center">Contact</h2>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <form class="leave-comment" name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field">
                            <h4 class="m-text26 p-b-36 p-t-15">
                            Send us your message
                            </h4>
                            <input type="hidden" name="form-name" value="contact"/>
                            <div class="bo4 of-hidden size15 m-b-20">
                                <input class="sizefull s-text7 p-l-22 p-r-22" type="text" name="name" placeholder="Full Name"/>
                            </div>
                            <div class="bo4 of-hidden size15 m-b-20">
                                <input class="sizefull s-text7 p-l-22 p-r-22" type="text" name="phone-number" placeholder="Phone Number"/>
                            </div>
                            <div class="bo4 of-hidden size15 m-b-20">
                                <input class="sizefull s-text7 p-l-22 p-r-22" type="text" name="email" placeholder="Email Address"/>
                            </div>
                            <textarea class="dis-block s-text7 size20 bo4 p-l-22 p-r-22 p-t-13 m-b-20" name="message" placeholder="Message"></textarea>
                            <div class="w-size25">

                                <button class="flex-c-m size2 bg1 bo-rad-23 hov1 m-text3 trans-0-4">
                                Send
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Contact;