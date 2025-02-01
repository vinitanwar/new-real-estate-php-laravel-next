import React from 'react';

const TermsandConditions = () => {
  return (
    <div className='main-div  w-full'>
      <div className="relative">
        <img 
          src="/images/headerimg.jpg" 
          alt="Header Image" 
          className="w-full h-[350px] object-cover" 
        />
        
        {/* Overlay Container */}
        <div className="absolute inset-0 flex flex-col justify-center items-start px-[10%] text-white bg-black bg-opacity-50">
       
          <h2 className="text-3xl font-bold mb-2">Terms & Condition</h2>

          <p className="text-lg">Disclaimer</p>
        </div>
      </div>
      
      {/* Privacy Policy Content */}
      <div className="p-6 max-w-7xl mx-auto rounded-lg mt-8 mb-8">
        <h1 className="text-4xl text-[#656665] font-semibold   mb-4">
        Terms & Condition
        </h1>
        <h2 className="text-2xl text-[#656665] mb-4">What information do we collect?</h2>
        <p className="text-base text-[#656665]  mb-4">
          InfoSec Train collects personal information and financial information as a result of your interactions with us. We may collect information such as:
        </p>
        <ul className="list-disc list-inside mb-4 text-[#656665] ">
          <li>Name</li>
          <li>Contact number</li>
          <li>Email address</li>
          <li>Location</li>
          <li>Work information</li>
          <li>Some of the information may be automatically collected such as IP addresses, browser, and device information.</li>
        </ul>
        <p className="text-base text-[#656665]  mb-4">
          The fine point: We at InfoSec Train only collect the information as a necessity to maintain the operation of our services and we do not acquire any information to personally identify you.
        </p>

        <h2 className="text-2xl text-[#656665]  font-semibold mb-4">How do we use your information?</h2>
        <p className="text-base text-[#656665]  mb-4">
          In short: We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent.
        </p>
        <p className="text-base text-[#656665]  mb-4">
          We use personal information collected via our Services for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations. We indicate the specific processing grounds we rely on next to each purpose listed below.
        </p>
        <ul className="list-disc list-inside mb-4 text-[#656665] ">
          <li>To facilitate account creation and logon process.</li>
          <li>To send you marketing and promotional communications.</li>
          <li>To send administrative information to you.</li>
          <li>Fulfill and manage your orders.</li>
          <li>Deliver targeted advertising to you.</li>
          <li>Request Feedback.</li>
          <li>To manage user accounts.</li>
          <li>To deliver services to the user.</li>
          <li>To respond to user inquiries/offer support to users.</li>
          <li>For other Business Purposes.</li>
        </ul>

        <h2 className="text-2xl text-[#656665]  font-semibold mb-4">Terms and Conditions</h2>
        <p className="text-base text-[#656665]  mb-4">
          India being our domicile country, any dispute or claim arising out of or in connection with this website shall be governed and construed in accordance with the laws of India.
        </p>
        <p className="text-base text-[#656665]  mb-4">
          Users above the age of 18 are eligible to register as a website user and are allowed to use the website and make a transaction. Minors below the age of 18 yrs. are prohibited to do the same.
        </p>
        <p className="text-base text-[#656665]  mb-4">
          Any details shared on our website, while making a payment for our products or services, will be directly submitted to our payment provider via a secured connection.
        </p>
        <p className="text-base text-[#656665]  mb-4">
          The cardholders are required to retain the copy of transaction receipts and adhere to the Merchant policies and rules.
        </p>

        <h2 className="text-2xl text-[#656665]  font-semibold mb-4">Mode of Payment</h2>
        <p className="text-base text-[#656665]  mb-4">
          Online payments are accepted through MasterCard/Visa credit/Debit cards/UPI/Wallets in USD, GBP, EUR, AED, and INR currencies only.
        </p>

        <h2 className="text-2xl text-[#656665]  font-semibold mb-4">Refund Policy</h2>
        <p className="text-base text-[#656665]  mb-4">
          Refunds will be made through the original mode of payment only, after reviewing the terms and conditions applied to the chosen service/product.
        </p>
        <ul className="list-disc list-inside mb-4 text-[#656665] ">
          <li>If a client is enrolled in training that has been withdrawn by InfoSec Train, he/she will be entitled to a 100% refund or will be entitled to take an equal value of services in exchange.</li>
          <li>In case a client is unable to attend the training due to personal reasons and informs us 15 working days prior to the batch schedule, a 100% refund will be processed.</li>
          <li>In case a client requests cancellation within 15 days of the training start date, an administrative charge of INR 5000 + 18% GST will be deducted from the deposit.</li>
          <li>Refunds will be processed within 7-10 working days, post sanction.</li>
        </ul>

        <h2 className="text-2xl text-[#656665]  font-semibold mb-4">Retake Policy</h2>
        <p className="text-base text-[#656665]  mb-4">
          The Client must fill the Interim and Final Feedback form to avail of Post-training Services else reschedule/redo policy will be ineligible.
        </p>
        <ul className="list-disc list-inside mb-4 text-[#656665] ">
          <li>Any feedback/escalation must be shared before 30% of the class is over to avail of the REDO Batch.</li>
          <li>If an individual is not satisfied with the training and has raised his feedback as per Points 1 and 2, he/she will be authorized to take the retake only within 3 months after his/her first batch end date. No Free Retakes will be allowed after this window.</li>
          <li>If an individual is unable to clear the exam on the first attempt, he/she can take a free redo in the next available batch within 3 months after the Exam result date or First batch attended. Retake requests post 3 months’ window will be chargeable at 50% of base fees plus taxes.</li>
          <li>80% of attendance is mandatory in the actual batch enrolled to qualify for revision or redo sessions.</li>
          <li>In case of a medical emergency or any unavoidable situation, one reschedule is allowed as per a mutually convenient schedule. All further reschedules will be charged at 100% of actual fees.</li>
        </ul>
      </div>
    </div>
  );
};

export default TermsandConditions;
