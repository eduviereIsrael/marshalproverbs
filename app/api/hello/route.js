import { NextResponse } from 'next/server';
// import https

export async function GET(req){

    try {
        // request body from the clients
        const email = req.body.email;
        const amount = req.body.amount;
        // params
        const params = JSON.stringify({
          "email": email,
          "amount": amount * 100,
          callback_url: "http://localhost:3001/verify",
          metadata: {"cart_id":398,"custom_fields":[{"display_name":"Invoice ID","variable_name":"Invoice ID","value":209},{"display_name":"Cart Items","variable_name":"cart_items","value":"3 bananas, 12 mangoes"}]}
        })
  
       
        // options
        const options = {
          hostname: 'api.paystack.co',
          port: 443,
          path: '/transaction/initialize',
          method: 'POST',
          headers: {
            Authorization: process.env.PUBLIC_KEY, // where you place your secret key copied from your dashboard
            'Content-Type': 'application/json'
          }
        }
        // client request to paystack API
        const clientReq = https.request(options, apiRes => {
          let data = ''
          apiRes.on('data', (chunk) => {
            data += chunk
          });
          apiRes.on('end', () => {
            console.log(data);
            return res.status(200).json(data);
          })
        }).on('error', error => {
          console.error(error)
        })
        clientReq.write(params)
        clientReq.end()
        
      } catch (error) {
        // Handle any errors that occur during the request
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
      }
    
      return NextResponse.json({ message: 'We touched the backend' })
    
  }