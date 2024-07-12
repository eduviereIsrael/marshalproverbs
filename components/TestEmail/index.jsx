import * as React from 'react';


export const EmailTemplate = ({
  firstName,
}) => (
  <div style={{backgroundColor: "#cccccc", padding: "20px"}} >
    <div style={{backgroundColor: "#F3F3F3", padding: "30px 12px"}} >
        
     <h1>Welcome to Mawshal Proverbs, {firstName}!</h1>
    </div>
  </div>
);
