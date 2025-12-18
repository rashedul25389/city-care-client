// import React from 'react';
// import { Link } from 'react-router';

// const PaymentCancelled = () => {
//     return (
//         <div className="flex flex-col items-center justify-center h-64 gap-4">
//             <h2 className="text-2xl font-semibold">Payment is cancelled.</h2>
//             <p>Please try again.</p>
//             <Link to="/dashboard/my-issues">
//                 <button className="btn btn-primary text-black">
//                     Try Again
//                 </button>
//             </Link>
//         </div>
//     );
// };

// export default PaymentCancelled;

import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div>
            <h2>Payment is cancelled. Please try again</h2>
            <Link to="/dashboard/my-issues">
                <button className="btn btn-primary text-black">
                    Try Again
                </button>
            </Link>
        </div>
    );
};

export default PaymentCancelled;
